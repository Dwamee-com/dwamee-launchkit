import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, User, DollarSign, TrendingUp, TrendingDown,
  ChevronDown, ChevronUp, Calendar, Banknote, Minus, Plus,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const months = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface DetailItem {
  date: string;
  explanation: string;
  amount: number;
}

const mockEmployees = [
  {
    id: 1, name: "Ahmed Hassan", basicSalary: 5500,
    bonuses: [
      { date: "2026-01-05", explanation: "Perfect attendance bonus", amount: 200 },
      { date: "2026-01-20", explanation: "Project completion incentive", amount: 350 },
    ],
    deductions: [
      { date: "2026-01-08", explanation: "Late arrival (15 min)", amount: 50 },
    ],
  },
  {
    id: 2, name: "Sara Mohamed", basicSalary: 6200,
    bonuses: [
      { date: "2026-01-15", explanation: "Overtime hours (8h)", amount: 400 },
    ],
    deductions: [
      { date: "2026-01-03", explanation: "Early leave (1h)", amount: 75 },
      { date: "2026-01-12", explanation: "Absent without notice", amount: 200 },
    ],
  },
  {
    id: 3, name: "Omar Ali", basicSalary: 4800,
    bonuses: [],
    deductions: [
      { date: "2026-01-10", explanation: "Late arrival (30 min)", amount: 100 },
      { date: "2026-01-22", explanation: "Late arrival (10 min)", amount: 30 },
    ],
  },
];

function DetailRow({ items, type }: { items: DetailItem[]; type: "bonus" | "deduction" }) {
  const [open, setOpen] = useState(false);
  const total = items.reduce((s, d) => s + d.amount, 0);
  const isBonus = type === "bonus";

  return (
    <div className="rounded-xl overflow-hidden">
      <button
        onClick={() => items.length > 0 && setOpen(!open)}
        className={`w-full flex items-center justify-between py-3 px-4 transition-colors text-sm ${
          items.length === 0 ? "opacity-40 cursor-default" : "cursor-pointer hover:bg-muted/60"
        } ${open ? "bg-muted/40" : ""}`}
        disabled={items.length === 0}
      >
        <span className="flex items-center gap-2.5 text-muted-foreground font-medium">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isBonus ? "bg-accent/10" : "bg-destructive/10"}`}>
            {isBonus ? <Plus className="w-4 h-4 text-accent" /> : <Minus className="w-4 h-4 text-destructive" />}
          </div>
          {isBonus ? "Bonuses" : "Deductions"}
          <Badge variant="secondary" className="text-[10px] h-5">{items.length}</Badge>
        </span>
        <span className="flex items-center gap-2.5">
          <span className={`font-bold text-base ${isBonus ? "text-accent" : "text-destructive"}`}>
            {isBonus ? "+" : "-"}${total}
          </span>
          {items.length > 0 && (
            <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </motion.div>
          )}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 space-y-2">
              {items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`flex items-center justify-between py-2.5 px-4 rounded-xl border ${
                    isBonus ? "border-accent/15 bg-accent/5" : "border-destructive/15 bg-destructive/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="text-xs font-mono">{item.date}</span>
                    </div>
                    <span className="text-sm text-foreground">{item.explanation}</span>
                  </div>
                  <span className={`font-bold text-sm ${isBonus ? "text-accent" : "text-destructive"}`}>
                    {isBonus ? "+" : "-"}${item.amount}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SalaryDetails() {
  const navigate = useNavigate();
  const { year, month } = useParams();
  const monthName = months[Number(month)] || "Unknown";

  const totalBasic = mockEmployees.reduce((s, e) => s + e.basicSalary, 0);
  const totalBonuses = mockEmployees.reduce((s, e) => s + e.bonuses.reduce((a, b) => a + b.amount, 0), 0);
  const totalDeductions = mockEmployees.reduce((s, e) => s + e.deductions.reduce((a, d) => a + d.amount, 0), 0);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => navigate("/dashboard/salaries")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {monthName} {year}
          </h1>
          <p className="text-muted-foreground text-sm">Salary breakdown per employee</p>
        </div>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Total Basic", value: `$${totalBasic.toLocaleString()}`, icon: Banknote, color: "text-foreground", bg: "bg-muted" },
          { label: "Total Bonuses", value: `+$${totalBonuses}`, icon: TrendingUp, color: "text-accent", bg: "bg-accent/10" },
          { label: "Total Deductions", value: `-$${totalDeductions}`, icon: TrendingDown, color: "text-destructive", bg: "bg-destructive/10" },
        ].map((s) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Employee cards */}
      <div className="space-y-4">
        {mockEmployees.map((emp, i) => {
          const totalBonus = emp.bonuses.reduce((s, b) => s + b.amount, 0);
          const totalDeduction = emp.deductions.reduce((s, d) => s + d.amount, 0);
          const net = emp.basicSalary + totalBonus - totalDeduction;

          return (
            <motion.div
              key={emp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                {/* Top color bar */}
                <div className="h-1 bg-gradient-to-r from-primary to-accent" />
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">{emp.name}</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <DollarSign className="w-3 h-3" /> Basic: ${emp.basicSalary.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Net Salary</p>
                      <p className="text-2xl font-black text-primary">${net.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="border-t border-border pt-3 space-y-0.5">
                    <DetailRow items={emp.bonuses} type="bonus" />
                    <DetailRow items={emp.deductions} type="deduction" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
