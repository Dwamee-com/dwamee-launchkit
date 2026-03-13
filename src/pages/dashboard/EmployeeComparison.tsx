import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, Clock, Calendar, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface EmployeeStats {
  id: string;
  name: string;
  avatar: string;
  branch: string;
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
}

const employees: EmployeeStats[] = [
  { id: "1", name: "Ahmed Hassan", avatar: "AH", branch: "Cairo HQ", totalDays: 60, presentDays: 56, lateDays: 3, absentDays: 1, avgCheckIn: "08:52", avgCheckOut: "17:15", avgHoursPerDay: 8.3, overtimeHours: 12, earlyArrivals: 40, perfectDays: 45 },
  { id: "2", name: "Sara Mohamed", avatar: "SM", branch: "Alexandria Branch", totalDays: 60, presentDays: 58, lateDays: 1, absentDays: 1, avgCheckIn: "08:45", avgCheckOut: "17:30", avgHoursPerDay: 8.7, overtimeHours: 18, earlyArrivals: 50, perfectDays: 52 },
  { id: "3", name: "Omar Ali", avatar: "OA", branch: "Cairo HQ", totalDays: 60, presentDays: 52, lateDays: 5, absentDays: 3, avgCheckIn: "09:10", avgCheckOut: "17:05", avgHoursPerDay: 7.9, overtimeHours: 4, earlyArrivals: 28, perfectDays: 35 },
  { id: "4", name: "Fatma Ibrahim", avatar: "FI", branch: "Giza Office", totalDays: 60, presentDays: 57, lateDays: 2, absentDays: 1, avgCheckIn: "08:48", avgCheckOut: "17:20", avgHoursPerDay: 8.5, overtimeHours: 15, earlyArrivals: 45, perfectDays: 48 },
  { id: "5", name: "Khaled Youssef", avatar: "KY", branch: "Mansoura Branch", totalDays: 60, presentDays: 54, lateDays: 4, absentDays: 2, avgCheckIn: "09:02", avgCheckOut: "17:10", avgHoursPerDay: 8.1, overtimeHours: 6, earlyArrivals: 32, perfectDays: 38 },
];

const metrics: { key: keyof EmployeeStats; label: string; icon: React.ElementType; higherBetter: boolean; suffix?: string }[] = [
  { key: "presentDays", label: "Present Days", icon: Calendar, higherBetter: true },
  { key: "lateDays", label: "Late Days", icon: Clock, higherBetter: false },
  { key: "absentDays", label: "Absent Days", icon: Clock, higherBetter: false },
  { key: "avgHoursPerDay", label: "Avg Hours/Day", icon: TrendingUp, higherBetter: true, suffix: "h" },
  { key: "overtimeHours", label: "Overtime Hours", icon: TrendingUp, higherBetter: true, suffix: "h" },
  { key: "earlyArrivals", label: "Early Arrivals", icon: Star, higherBetter: true },
  { key: "perfectDays", label: "Perfect Days", icon: Trophy, higherBetter: true },
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
        <p className="text-muted-foreground text-sm">Compare attendance performance between two employees</p>
      </div>

      {/* Selectors */}
      <div className="flex items-center gap-4 mb-8 flex-wrap">
        <Select value={emp1Id} onValueChange={setEmp1Id}>
          <SelectTrigger className="w-52"><SelectValue /></SelectTrigger>
          <SelectContent>{employees.filter(e => e.id !== emp2Id).map(e => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}</SelectContent>
        </Select>
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"><ArrowRight className="w-5 h-5 text-primary" /></div>
        <Select value={emp2Id} onValueChange={setEmp2Id}>
          <SelectTrigger className="w-52"><SelectValue /></SelectTrigger>
          <SelectContent>{employees.filter(e => e.id !== emp1Id).map(e => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      {/* Winner Banner */}
      <motion.div key={`${emp1Id}-${emp2Id}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <Card className={`mb-8 ${winner ? "border-yellow-300 bg-gradient-to-r from-yellow-50 to-amber-50" : "border-border"}`}>
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {winner ? (
                <>
                  <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Trophy className="w-7 h-7 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Winner</p>
                    <h2 className="text-xl font-bold text-foreground">{winner.name}</h2>
                    <p className="text-sm text-muted-foreground">{winner.branch}</p>
                  </div>
                </>
              ) : (
                <div><h2 className="text-xl font-bold text-foreground">It's a Tie!</h2><p className="text-sm text-muted-foreground">Both employees performed equally</p></div>
              )}
            </div>
            <div className="flex items-center gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-primary">{pct1}%</p>
                <p className="text-xs text-muted-foreground">{emp1.name.split(" ")[0]}</p>
              </div>
              <span className="text-muted-foreground text-xl">vs</span>
              <div>
                <p className="text-3xl font-bold text-primary">{pct2}%</p>
                <p className="text-xs text-muted-foreground">{emp2.name.split(" ")[0]}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Attendance overview */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {[emp1, emp2].map((emp, idx) => (
          <motion.div key={emp.id} initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }} animate={{ opacity: 1, x: 0 }}>
            <Card className={winner?.id === emp.id ? "ring-2 ring-yellow-300" : ""}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">{emp.avatar}</div>
                  <div>
                    <CardTitle className="text-lg">{emp.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{emp.branch}</p>
                  </div>
                  {winner?.id === emp.id && <Badge className="bg-yellow-100 text-yellow-700 border-0 ml-auto"><Trophy className="w-3 h-3 mr-1" /> Winner</Badge>}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Attendance Rate</span>
                  <span className="font-bold text-foreground">{attendancePct(emp)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-primary rounded-full h-2.5 transition-all" style={{ width: `${attendancePct(emp)}%` }} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 rounded-lg bg-muted/50"><span className="text-muted-foreground">Check-in</span><p className="font-medium text-foreground">{emp.avgCheckIn}</p></div>
                  <div className="p-2 rounded-lg bg-muted/50"><span className="text-muted-foreground">Check-out</span><p className="font-medium text-foreground">{emp.avgCheckOut}</p></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Metric-by-Metric */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Metric Comparison</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {metrics.map(m => {
            const v1 = emp1[m.key] as number;
            const v2 = emp2[m.key] as number;
            const w = m.higherBetter ? (v1 > v2 ? 1 : v2 > v1 ? 2 : 0) : (v1 < v2 ? 1 : v2 < v1 ? 2 : 0);
            return (
              <div key={m.key} className="flex items-center gap-4">
                <div className={`w-20 text-right text-sm font-semibold ${w === 1 ? "text-accent" : "text-foreground"}`}>{v1}{m.suffix || ""}</div>
                <div className="flex-1 text-center">
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <m.icon className="w-3.5 h-3.5" /> {m.label}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex-1 flex justify-end"><div className={`h-2 rounded-l-full ${w === 1 ? "bg-accent" : "bg-muted-foreground/30"}`} style={{ width: `${Math.max(10, (v1 / Math.max(v1, v2)) * 100)}%` }} /></div>
                    <div className="w-px h-4 bg-border" />
                    <div className="flex-1"><div className={`h-2 rounded-r-full ${w === 2 ? "bg-accent" : "bg-muted-foreground/30"}`} style={{ width: `${Math.max(10, (v2 / Math.max(v1, v2)) * 100)}%` }} /></div>
                  </div>
                </div>
                <div className={`w-20 text-sm font-semibold ${w === 2 ? "text-accent" : "text-foreground"}`}>{v2}{m.suffix || ""}</div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
