import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, TrendingUp, Clock, Calendar, Star, ArrowRight, Award, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";

interface EmployeeStats {
  id: string;
  name: string;
  avatar: string;
  branch: string;
  position: string;
  totalDays: number;
  presentDays: number;
  lateDays: number;
  absentDays: number;
  avgCheckIn: string;
  avgCheckOut: string;
  avgHoursPerDay: number;
  overtimeHours: number;
  earlyArrivals: number;
  perfectDays: number;
  tasksCompleted: number;
  onTimeRate: number;
  monthlyData: { month: string; present: number; late: number; absent: number }[];
}

const employees: EmployeeStats[] = [
  {
    id: "1", name: "Ahmed Hassan", avatar: "AH", branch: "Cairo HQ", position: "Senior Dev",
    totalDays: 60, presentDays: 56, lateDays: 3, absentDays: 1, avgCheckIn: "08:52", avgCheckOut: "17:15",
    avgHoursPerDay: 8.3, overtimeHours: 12, earlyArrivals: 40, perfectDays: 45, tasksCompleted: 42, onTimeRate: 94,
    monthlyData: [
      { month: "Jan", present: 20, late: 1, absent: 1 }, { month: "Feb", present: 18, late: 2, absent: 0 },
      { month: "Mar", present: 21, late: 0, absent: 0 }, { month: "Apr", present: 19, late: 1, absent: 1 },
      { month: "May", present: 20, late: 2, absent: 0 }, { month: "Jun", present: 18, late: 1, absent: 1 },
    ],
  },
  {
    id: "2", name: "Sara Mohamed", avatar: "SM", branch: "Alexandria Branch", position: "Team Lead",
    totalDays: 60, presentDays: 58, lateDays: 1, absentDays: 1, avgCheckIn: "08:45", avgCheckOut: "17:30",
    avgHoursPerDay: 8.7, overtimeHours: 18, earlyArrivals: 50, perfectDays: 52, tasksCompleted: 38, onTimeRate: 97,
    monthlyData: [
      { month: "Jan", present: 21, late: 0, absent: 1 }, { month: "Feb", present: 19, late: 1, absent: 0 },
      { month: "Mar", present: 22, late: 0, absent: 0 }, { month: "Apr", present: 20, late: 0, absent: 0 },
      { month: "May", present: 21, late: 0, absent: 1 }, { month: "Jun", present: 19, late: 1, absent: 0 },
    ],
  },
  {
    id: "3", name: "Omar Ali", avatar: "OA", branch: "Cairo HQ", position: "Developer",
    totalDays: 60, presentDays: 52, lateDays: 5, absentDays: 3, avgCheckIn: "09:10", avgCheckOut: "17:05",
    avgHoursPerDay: 7.9, overtimeHours: 4, earlyArrivals: 28, perfectDays: 35, tasksCompleted: 30, onTimeRate: 82,
    monthlyData: [
      { month: "Jan", present: 18, late: 2, absent: 2 }, { month: "Feb", present: 17, late: 2, absent: 1 },
      { month: "Mar", present: 19, late: 1, absent: 2 }, { month: "Apr", present: 18, late: 1, absent: 1 },
      { month: "May", present: 17, late: 3, absent: 0 }, { month: "Jun", present: 16, late: 2, absent: 2 },
    ],
  },
  {
    id: "4", name: "Fatma Ibrahim", avatar: "FI", branch: "Giza Office", position: "Designer",
    totalDays: 60, presentDays: 57, lateDays: 2, absentDays: 1, avgCheckIn: "08:48", avgCheckOut: "17:20",
    avgHoursPerDay: 8.5, overtimeHours: 15, earlyArrivals: 45, perfectDays: 48, tasksCompleted: 35, onTimeRate: 91,
    monthlyData: [
      { month: "Jan", present: 20, late: 1, absent: 1 }, { month: "Feb", present: 19, late: 0, absent: 1 },
      { month: "Mar", present: 21, late: 1, absent: 0 }, { month: "Apr", present: 20, late: 0, absent: 0 },
      { month: "May", present: 20, late: 1, absent: 1 }, { month: "Jun", present: 19, late: 1, absent: 0 },
    ],
  },
  {
    id: "5", name: "Khaled Youssef", avatar: "KY", branch: "Mansoura Branch", position: "QA Engineer",
    totalDays: 60, presentDays: 54, lateDays: 4, absentDays: 2, avgCheckIn: "09:02", avgCheckOut: "17:10",
    avgHoursPerDay: 8.1, overtimeHours: 6, earlyArrivals: 32, perfectDays: 38, tasksCompleted: 28, onTimeRate: 86,
    monthlyData: [
      { month: "Jan", present: 19, late: 1, absent: 2 }, { month: "Feb", present: 18, late: 2, absent: 0 },
      { month: "Mar", present: 20, late: 1, absent: 1 }, { month: "Apr", present: 19, late: 1, absent: 0 },
      { month: "May", present: 18, late: 2, absent: 2 }, { month: "Jun", present: 17, late: 1, absent: 2 },
    ],
  },
];

const metrics: { key: keyof EmployeeStats; label: string; icon: React.ElementType; higherBetter: boolean; suffix?: string }[] = [
  { key: "presentDays", label: "Present Days", icon: Calendar, higherBetter: true },
  { key: "lateDays", label: "Late Days", icon: Clock, higherBetter: false },
  { key: "absentDays", label: "Absent Days", icon: Clock, higherBetter: false },
  { key: "avgHoursPerDay", label: "Avg Hours/Day", icon: TrendingUp, higherBetter: true, suffix: "h" },
  { key: "overtimeHours", label: "Overtime", icon: Zap, higherBetter: true, suffix: "h" },
  { key: "earlyArrivals", label: "Early Arrivals", icon: Star, higherBetter: true },
  { key: "perfectDays", label: "Perfect Days", icon: Trophy, higherBetter: true },
  { key: "tasksCompleted", label: "Tasks Done", icon: Target, higherBetter: true },
  { key: "onTimeRate", label: "On-Time Rate", icon: Award, higherBetter: true, suffix: "%" },
];

export default function EmployeeComparison() {
  const [emp1Id, setEmp1Id] = useState("1");
  const [emp2Id, setEmp2Id] = useState("2");

  const emp1 = employees.find(e => e.id === emp1Id)!;
  const emp2 = employees.find(e => e.id === emp2Id)!;

  let score1 = 0, score2 = 0;
  metrics.forEach(m => {
    const v1 = emp1[m.key] as number;
    const v2 = emp2[m.key] as number;
    if (m.higherBetter ? v1 > v2 : v1 < v2) score1++;
    else if (m.higherBetter ? v2 > v1 : v2 < v1) score2++;
  });
  const total = metrics.length;
  const pct1 = Math.round((score1 / total) * 100);
  const pct2 = Math.round((score2 / total) * 100);
  const winner = score1 > score2 ? emp1 : score2 > score1 ? emp2 : null;

  const attendancePct = (e: EmployeeStats) => Math.round((e.presentDays / e.totalDays) * 100);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Employee Comparison</h1>
        <p className="text-muted-foreground text-sm">Head-to-head attendance and performance analysis</p>
      </div>

      {/* Selectors */}
      <div className="flex items-center gap-4 mb-8 flex-wrap">
        <Select value={emp1Id} onValueChange={setEmp1Id}>
          <SelectTrigger className="w-52"><SelectValue /></SelectTrigger>
          <SelectContent>{employees.filter(e => e.id !== emp2Id).map(e => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}</SelectContent>
        </Select>
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">VS</div>
        <Select value={emp2Id} onValueChange={setEmp2Id}>
          <SelectTrigger className="w-52"><SelectValue /></SelectTrigger>
          <SelectContent>{employees.filter(e => e.id !== emp1Id).map(e => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      {/* Winner Banner */}
      <motion.div key={`${emp1Id}-${emp2Id}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <Card className={`mb-8 overflow-hidden ${winner ? "border-0" : "border-border"}`}>
          {winner && <div className="h-1.5 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500" />}
          <CardContent className="p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                {winner ? (
                  <>
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 flex items-center justify-center shadow-lg">
                        <Trophy className="w-8 h-8 text-yellow-900" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                        <Star className="w-3 h-3 text-accent-foreground" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">🏆 Winner</p>
                      <h2 className="text-2xl font-bold text-foreground">{winner.name}</h2>
                      <p className="text-sm text-muted-foreground">{winner.position} · {winner.branch}</p>
                    </div>
                  </>
                ) : (
                  <div>
                    <h2 className="text-xl font-bold text-foreground">It's a Tie! 🤝</h2>
                    <p className="text-sm text-muted-foreground">Both employees performed equally</p>
                  </div>
                )}
              </div>

              {/* Score circles */}
              <div className="flex items-center gap-8">
                {[{ emp: emp1, pct: pct1, score: score1 }, { emp: emp2, pct: pct2, score: score2 }].map((side, idx) => (
                  <div key={side.emp.id} className="text-center">
                    <div className="relative w-20 h-20 mx-auto">
                      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        <circle cx="18" cy="18" r="16" fill="none" stroke="hsl(var(--muted))" strokeWidth="2.5" />
                        <circle cx="18" cy="18" r="16" fill="none" stroke={winner?.id === side.emp.id ? "hsl(var(--accent))" : "hsl(var(--primary))"} strokeWidth="2.5"
                          strokeDasharray={`${side.pct} 100`} strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-foreground">{side.pct}%</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{side.emp.name.split(" ")[0]}</p>
                    <p className="text-[10px] text-muted-foreground">{side.score}/{total} wins</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Attendance Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {[emp1, emp2].map((emp, idx) => (
          <motion.div key={emp.id} initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }} animate={{ opacity: 1, x: 0 }}>
            <Card className={winner?.id === emp.id ? "ring-2 ring-yellow-300" : ""}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-primary-foreground font-bold ${winner?.id === emp.id ? "bg-gradient-to-br from-yellow-400 to-amber-500" : "bg-primary"}`}>
                    {emp.avatar}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{emp.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{emp.position} · {emp.branch}</p>
                  </div>
                  {winner?.id === emp.id && <Badge className="bg-yellow-100 text-yellow-700 border-0"><Trophy className="w-3 h-3 mr-1" /> Winner</Badge>}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Attendance donut */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 shrink-0">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke="hsl(var(--accent))" strokeWidth="3"
                        strokeDasharray={`${attendancePct(emp)} 100`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-foreground">{attendancePct(emp)}%</span>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-2 text-sm">
                    <div className="p-2 rounded-lg bg-muted/50">
                      <span className="text-xs text-muted-foreground">Check-in</span>
                      <p className="font-semibold text-foreground">{emp.avgCheckIn}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/50">
                      <span className="text-xs text-muted-foreground">Check-out</span>
                      <p className="font-semibold text-foreground">{emp.avgCheckOut}</p>
                    </div>
                  </div>
                </div>

                {/* Monthly sparkline */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Monthly Trend</p>
                  <div className="flex items-end gap-1 h-12">
                    {emp.monthlyData.map((m) => {
                      const maxVal = 22;
                      return (
                        <div key={m.month} className="flex-1 flex flex-col items-center gap-0.5">
                          <div className="w-full flex flex-col gap-0" style={{ height: "40px" }}>
                            <div className="bg-accent/70 rounded-t-sm" style={{ height: `${(m.present / maxVal) * 100}%` }} />
                            {m.late > 0 && <div className="bg-primary/50" style={{ height: `${(m.late / maxVal) * 100}%` }} />}
                            {m.absent > 0 && <div className="bg-destructive/50 rounded-b-sm" style={{ height: `${(m.absent / maxVal) * 100}%` }} />}
                          </div>
                          <span className="text-[8px] text-muted-foreground">{m.month}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Metric-by-Metric */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Detailed Metric Comparison</CardTitle>
          <p className="text-sm text-muted-foreground">Green highlight indicates the winning metric</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {metrics.map((m, mi) => {
            const v1 = emp1[m.key] as number;
            const v2 = emp2[m.key] as number;
            const w = m.higherBetter ? (v1 > v2 ? 1 : v2 > v1 ? 2 : 0) : (v1 < v2 ? 1 : v2 < v1 ? 2 : 0);
            const maxVal = Math.max(v1, v2) || 1;

            return (
              <motion.div
                key={m.key}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: mi * 0.04 }}
                className="p-3 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* Left value */}
                  <div className={`w-24 text-right ${w === 1 ? "text-accent font-bold" : "text-foreground font-semibold"}`}>
                    <span className="text-lg">{v1}{m.suffix || ""}</span>
                    {w === 1 && <span className="ml-1 text-[10px]">✓</span>}
                  </div>

                  {/* Center bars */}
                  <div className="flex-1">
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-1.5">
                      <m.icon className="w-3.5 h-3.5" /> {m.label}
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex-1 flex justify-end">
                        <motion.div
                          className={`h-3 rounded-l-full ${w === 1 ? "bg-accent" : "bg-muted-foreground/20"}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.max(15, (v1 / maxVal) * 100)}%` }}
                          transition={{ duration: 0.6, delay: mi * 0.04 }}
                        />
                      </div>
                      <div className="w-px h-5 bg-border" />
                      <div className="flex-1">
                        <motion.div
                          className={`h-3 rounded-r-full ${w === 2 ? "bg-accent" : "bg-muted-foreground/20"}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.max(15, (v2 / maxVal) * 100)}%` }}
                          transition={{ duration: 0.6, delay: mi * 0.04 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right value */}
                  <div className={`w-24 ${w === 2 ? "text-accent font-bold" : "text-foreground font-semibold"}`}>
                    <span className="text-lg">{v2}{m.suffix || ""}</span>
                    {w === 2 && <span className="ml-1 text-[10px]">✓</span>}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        {[
          { label: "Attendance Winner", value: attendancePct(emp1) >= attendancePct(emp2) ? emp1.name : emp2.name, detail: `${Math.max(attendancePct(emp1), attendancePct(emp2))}% rate`, icon: Calendar },
          { label: "Productivity Winner", value: emp1.tasksCompleted >= emp2.tasksCompleted ? emp1.name : emp2.name, detail: `${Math.max(emp1.tasksCompleted, emp2.tasksCompleted)} tasks`, icon: Target },
          { label: "Reliability Winner", value: emp1.onTimeRate >= emp2.onTimeRate ? emp1.name : emp2.name, detail: `${Math.max(emp1.onTimeRate, emp2.onTimeRate)}% on-time`, icon: Award },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }}>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-base font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.detail}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
