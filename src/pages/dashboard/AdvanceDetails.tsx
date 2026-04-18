import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Edit, CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAdvances } from "@/contexts/AdvanceContext";
import { addMonthsISO, computeAdvanceStats } from "@/lib/advance";
import { toast } from "@/hooks/use-toast";

export default function AdvanceDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { advances, togglePaid } = useAdvances();
  const advance = advances.find((a) => a.id === id);

  if (!advance) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => navigate("/dashboard/advances")}>
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <p>Advance not found.</p>
      </div>
    );
  }

  const stats = computeAdvanceStats(advance);

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard/advances")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{advance.employeeName}</h1>
            <p className="text-muted-foreground">
              Started {new Date(advance.startDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <Button variant="outline" onClick={() => navigate(`/dashboard/advances/${advance.id}/edit`)}>
          <Edit className="w-4 h-4" /> Edit
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="Total Amount" value={`$${advance.totalAmount.toLocaleString()}`} />
        <MetricCard label="Monthly Deduction" value={`$${advance.monthlyDeduction.toLocaleString()}`} />
        <MetricCard label="Paid" value={`$${stats.paidAmount.toLocaleString()}`} tone="success" />
        <MetricCard label="Remaining" value={`$${stats.remaining.toLocaleString()}`} tone="warning" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Repayment Progress</span>
            <Badge variant="secondary">
              {stats.paidCount} / {advance.months} months
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={stats.progressPct} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">{stats.progressPct}% completed</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Installment Schedule</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="border-b text-muted-foreground">
              <tr>
                <th className="text-left p-4">#</th>
                <th className="text-left p-4">Month</th>
                <th className="text-right p-4">Amount</th>
                <th className="text-center p-4">Status</th>
                <th className="text-right p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {stats.schedule.map((s) => (
                <tr key={s.index} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="p-4 text-muted-foreground">{s.index + 1}</td>
                  <td className="p-4">
                    {new Date(addMonthsISO(advance.startDate, s.index)).toLocaleDateString(undefined, {
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-4 text-right font-medium">${s.amount.toFixed(2)}</td>
                  <td className="p-4">
                    <StatusBadge status={s.status} />
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      size="sm"
                      variant={s.status === "paid" ? "secondary" : "default"}
                      onClick={() => {
                        togglePaid(advance.id, s.index);
                        toast({ title: s.status === "paid" ? "Marked as unpaid" : "Marked as paid" });
                      }}
                    >
                      {s.status === "paid" ? "Undo" : "Mark Paid"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCard({ label, value, tone }: { label: string; value: string; tone?: "success" | "warning" }) {
  const color = tone === "success" ? "text-emerald-600" : tone === "warning" ? "text-amber-600" : "text-foreground";
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: "paid" | "pending" | "future" | "overdue" }) {
  const map = {
    paid: { icon: CheckCircle2, cls: "bg-emerald-500/15 text-emerald-700", label: "Paid" },
    pending: { icon: AlertCircle, cls: "bg-amber-500/15 text-amber-700", label: "Pending" },
    overdue: { icon: AlertCircle, cls: "bg-destructive/15 text-destructive", label: "Overdue" },
    future: { icon: Circle, cls: "bg-muted text-muted-foreground", label: "Future" },
  } as const;
  const { icon: Icon, cls, label } = map[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cls}`}>
      <Icon className="w-3.5 h-3.5" /> {label}
    </span>
  );
}
