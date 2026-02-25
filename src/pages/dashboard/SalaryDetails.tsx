import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, DollarSign, TrendingUp, TrendingDown, ChevronDown, ChevronUp, Calendar } from "lucide-react";
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
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors text-sm ${
          items.length === 0 ? "opacity-50 cursor-default" : "cursor-pointer"
        }`}
        disabled={items.length === 0}
      >
        <span className="flex items-center gap-2 text-muted-foreground">
          {isBonus ? <TrendingUp className="w-3.5 h-3.5 text-accent" /> : <TrendingDown className="w-3.5 h-3.5 text-destructive" />}
          {isBonus ? "Bonuses" : "Deductions"} ({items.length})
        </span>
        <span className="flex items-center gap-2">
          <span className={`font-semibold ${isBonus ? "text-accent" : "text-destructive"}`}>
            {isBonus ? "+" : "-"}${total}
          </span>
          {items.length > 0 && (open ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />)}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pl-8 pr-3 pb-2 space-y-1.5">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1.5 px-3 rounded-md bg-muted/40">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{item.date}</span>
                    <span className="text-foreground">{item.explanation}</span>
                  </div>
                  <span className={`font-medium ${isBonus ? "text-accent" : "text-destructive"}`}>
                    {isBonus ? "+" : "-"}${item.amount}
                  </span>
                </div>
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

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => navigate("/dashboard/salaries")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {monthName} {year} — Salary Details
          </h1>
          <p className="text-muted-foreground text-sm">Employee salary breakdown with bonuses & deductions</p>
        </div>
      </div>

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
              <Card className="hover:shadow-md transition-all duration-200">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{emp.name}</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <DollarSign className="w-3 h-3" /> Basic: ${emp.basicSalary.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Net Salary</p>
                      <p className="text-xl font-bold text-primary">${net.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="space-y-1 border-t border-border pt-3">
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
