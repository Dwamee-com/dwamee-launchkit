import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Search, Wallet, TrendingDown, Users, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAdvances } from "@/contexts/AdvanceContext";
import { computeAdvanceStats } from "@/lib/advance";

export default function Advances() {
  const navigate = useNavigate();
  const { advances } = useAdvances();
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => advances.filter((a) => a.employeeName.toLowerCase().includes(search.toLowerCase())),
    [advances, search]
  );

  const totals = useMemo(() => {
    const all = advances.map((a) => computeAdvanceStats(a));
    return {
      activeCount: all.filter((s) => s.remaining > 0).length,
      totalLent: all.reduce((s, x) => s + x.total, 0),
      totalRemaining: all.reduce((s, x) => s + x.remaining, 0),
    };
  }, [advances]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Salary Advances</h1>
          <p className="text-muted-foreground">Manage employee loans and repayment schedules</p>
        </div>
        <Button onClick={() => navigate("/dashboard/advances/new")}>
          <Plus className="w-4 h-4" /> New Advance
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard icon={Users} label="Active Advances" value={totals.activeCount.toString()} tone="primary" />
        <SummaryCard icon={Wallet} label="Total Lent" value={`$${totals.totalLent.toLocaleString()}`} tone="success" />
        <SummaryCard
          icon={TrendingDown}
          label="Outstanding Balance"
          value={`$${totals.totalRemaining.toLocaleString()}`}
          tone="warning"
        />
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((advance, i) => {
          const stats = computeAdvanceStats(advance);
          return (
            <motion.div
              key={advance.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card
                className="cursor-pointer hover:shadow-lg transition-all hover:border-primary/40"
                onClick={() => navigate(`/dashboard/advances/${advance.id}`)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-lg">{advance.employeeName}</CardTitle>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        Starts {new Date(advance.startDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={stats.remaining === 0 ? "secondary" : "default"}>
                      {stats.remaining === 0 ? "Completed" : `${stats.paidCount}/${advance.months} paid`}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <Stat label="Total" value={`$${advance.totalAmount.toLocaleString()}`} />
                    <Stat label="Monthly" value={`$${advance.monthlyDeduction.toLocaleString()}`} />
                    <Stat
                      label="Remaining"
                      value={`$${stats.remaining.toLocaleString()}`}
                      tone={stats.remaining > 0 ? "warning" : "success"}
                    />
                  </div>

                  <RepaymentBoxes schedule={stats.schedule} />

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {stats.paidCount} months completed / {advance.months - stats.paidCount} remaining
                    </span>
                    <span className="font-medium text-foreground">{stats.progressPct}%</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
        {filtered.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="py-16 text-center text-muted-foreground">
              No advances found. Click "New Advance" to create one.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  tone: "primary" | "success" | "warning";
}) {
  const toneMap = {
    primary: "bg-primary/10 text-primary",
    success: "bg-emerald-500/10 text-emerald-600",
    warning: "bg-amber-500/10 text-amber-600",
  };
  return (
    <Card>
      <CardContent className="p-5 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${toneMap[tone]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "warning" | "success" }) {
  const color = tone === "warning" ? "text-amber-600" : tone === "success" ? "text-emerald-600" : "text-foreground";
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`font-semibold ${color}`}>{value}</p>
    </div>
  );
}

function RepaymentBoxes({ schedule }: { schedule: ReturnType<typeof computeAdvanceStats>["schedule"] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {schedule.map((s) => {
        const cls =
          s.status === "paid"
            ? "bg-emerald-500"
            : s.status === "overdue"
            ? "bg-destructive"
            : "bg-muted";
        return (
          <div
            key={s.index}
            title={`Month ${s.index + 1} — ${s.status}`}
            className={`h-6 w-6 rounded ${cls} transition-colors`}
          />
        );
      })}
    </div>
  );
}
