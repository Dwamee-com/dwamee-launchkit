import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Eye, CheckCircle2, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface MonthData {
  month: number;
  basicSalary: number;
  deduction: number;
  bonus: number;
  acceptedBy: string | null;
  acceptedDate: string | null;
}

const generateMockData = (year: number): MonthData[] =>
  months.map((_, i) => {
    const isPast = i < 2; // Jan, Feb accepted
    return {
      month: i + 1,
      basicSalary: 5000 + Math.floor(Math.random() * 3000),
      deduction: Math.floor(Math.random() * 800),
      bonus: Math.floor(Math.random() * 600),
      acceptedBy: isPast ? "Ahmed Hassan" : null,
      acceptedDate: isPast ? `${year}-${String(i + 1).padStart(2, "0")}-28` : null,
    };
  });

export default function MonthlySalaries() {
  const navigate = useNavigate();
  const [year, setYear] = useState(2026);
  const data = generateMockData(year);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Monthly Salaries</h1>
          <p className="text-muted-foreground text-sm">Overview of salaries for the year</p>
        </div>
        <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-2 py-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setYear(y => y - 1)}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-lg font-bold text-foreground w-16 text-center">{year}</span>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setYear(y => y + 1)}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((m, i) => {
          const net = m.basicSalary + m.bonus - m.deduction;
          const isAccepted = !!m.acceptedBy;

          return (
            <motion.div
              key={m.month}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden ${
                isAccepted ? "border-accent/30" : "border-border"
              }`}>
                {/* Month header strip */}
                <div className={`h-1.5 ${isAccepted ? "bg-accent" : "bg-primary/20"}`} />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-foreground text-sm">{months[i]}</h3>
                    {isAccepted ? (
                      <Badge variant="secondary" className="text-[10px] bg-accent/10 text-accent border-0">
                        <CheckCircle2 className="w-3 h-3 mr-0.5" /> Accepted
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px]">Pending</Badge>
                    )}
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Basic</span>
                      <span className="font-medium text-foreground">${m.basicSalary.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bonus</span>
                      <span className="font-medium text-accent">+${m.bonus.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Deduction</span>
                      <span className="font-medium text-destructive">-${m.deduction.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-border pt-1.5 flex justify-between">
                      <span className="font-semibold text-foreground">Net</span>
                      <span className="font-bold text-primary">${net.toLocaleString()}</span>
                    </div>
                  </div>

                  {isAccepted && (
                    <div className="mt-2 text-[10px] text-muted-foreground">
                      <p>By: {m.acceptedBy}</p>
                      <p>On: {m.acceptedDate}</p>
                    </div>
                  )}

                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-8 text-xs"
                      onClick={() => navigate(`/dashboard/salary-details/${year}/${m.month}`)}
                    >
                      <Eye className="w-3 h-3 mr-1" /> Details
                    </Button>
                    {!isAccepted && (
                      <Button size="sm" className="flex-1 h-8 text-xs bg-accent hover:bg-accent/90 text-accent-foreground">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Accept
                      </Button>
                    )}
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
