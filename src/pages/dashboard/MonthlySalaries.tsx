import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Wallet, CheckCircle2, Eye, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const monthNames = [
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
  monthNames.map((_, i) => {
    const isPast = i < 2;
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
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Monthly Salaries</h1>
          <p className="text-muted-foreground text-sm">Salary calendar for the year</p>
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

      {/* Calendar Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((m, i) => {
          const isAccepted = !!m.acceptedBy;
          const net = m.basicSalary + m.bonus - m.deduction;

          return (
            <motion.div
              key={m.month}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
            >
              <div
                className={`relative overflow-hidden rounded-2xl cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  isAccepted
                    ? "bg-gradient-to-br from-accent to-accent/80 text-accent-foreground"
                    : "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground"
                }`}
                style={{ minHeight: 200 }}
              >
                {/* Month number - top left */}
                <span className="absolute top-3 left-4 text-4xl font-black opacity-20 select-none leading-none">
                  {String(m.month).padStart(2, "0")}
                </span>

                {/* Status icon - center */}
                <div className="flex flex-col items-center justify-center pt-10 pb-3 px-4">
                  <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    {isAccepted ? (
                      <CheckCircle2 className="w-7 h-7" />
                    ) : (
                      <Wallet className="w-7 h-7" />
                    )}
                  </div>

                  {/* Net salary */}
                  <p className="text-lg font-bold">${net.toLocaleString()}</p>
                  <p className="text-[10px] opacity-70 mb-1">
                    {isAccepted ? "Accepted" : "Pending"}
                  </p>
                </div>

                {/* Month name - footer */}
                <div className="bg-black/10 backdrop-blur-sm px-4 py-2.5 flex items-center justify-between">
                  <span className="font-bold text-sm">{monthNames[i]}</span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/dashboard/salary-details/${year}/${m.month}`);
                      }}
                      className="w-7 h-7 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    {!isAccepted && (
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="w-7 h-7 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
                  backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
