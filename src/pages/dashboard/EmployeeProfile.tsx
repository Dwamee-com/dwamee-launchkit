import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Clock, TrendingUp, Award, Star, BookOpen, FileText, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const employeesData = [
  {
    id: "1", name: "Ahmed Hassan", avatar: "AH", email: "ahmed@dwamee.com", phone: "+20 123 456 789",
    branch: "Cairo HQ", group: "Engineering", position: "Senior Developer", joinDate: "2022-03-15",
    attendance: { present: 56, absent: 1, late: 3, vacation: 4, totalDays: 60, avgCheckIn: "08:52", avgCheckOut: "17:15", avgHours: 8.3, overtimeHours: 12 },
    vacations: [
      { type: "Annual", from: "2025-06-01", to: "2025-06-05", status: "Approved", days: 5 },
      { type: "Sick", from: "2025-04-10", to: "2025-04-11", status: "Approved", days: 2 },
      { type: "Annual", from: "2025-08-15", to: "2025-08-22", status: "Pending", days: 7 },
    ],
    vacationBalance: { annual: { used: 7, total: 21 }, sick: { used: 2, total: 10 }, emergency: { used: 0, total: 3 } },
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker", "GraphQL"],
    certificates: [
      { name: "AWS Solutions Architect", issuer: "Amazon", date: "2024-01", expiry: "2027-01" },
      { name: "Certified Scrum Master", issuer: "Scrum Alliance", date: "2023-06", expiry: "2025-06" },
      { name: "Google Cloud Professional", issuer: "Google", date: "2024-08", expiry: "2026-08" },
    ],
    performance: { rating: 4.5, tasksCompleted: 42, avgTaskTime: "3.2 days", onTimeRate: 94 },
    monthlyAttendance: [
      { month: "Jan", present: 20, absent: 1, late: 1 },
      { month: "Feb", present: 18, absent: 0, late: 2 },
      { month: "Mar", present: 21, absent: 0, late: 0 },
      { month: "Apr", present: 19, absent: 1, late: 1 },
      { month: "May", present: 20, absent: 0, late: 2 },
      { month: "Jun", present: 18, absent: 1, late: 1 },
    ],
  },
];

export default function EmployeeProfile() {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const emp = employeesData.find((e) => e.id === employeeId) || employeesData[0];
  const attendPct = Math.round((emp.attendance.present / emp.attendance.totalDays) * 100);

  return (
    <div>
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4 gap-1 text-muted-foreground">
        <ArrowLeft className="w-4 h-4" /> Back
      </Button>

      {/* Profile Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="mb-6 overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-primary to-accent" />
          <CardContent className="relative pt-0 pb-6 px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-10">
              <Avatar className="w-20 h-20 border-4 border-background text-xl shadow-lg">
                <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">{emp.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground">{emp.name}</h1>
                <p className="text-muted-foreground text-sm">{emp.position} · {emp.group}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {emp.email}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {emp.phone}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {emp.branch}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Joined {emp.joinDate}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge className="bg-accent/10 text-accent border-accent/30">{attendPct}% Attendance</Badge>
                <Badge className="bg-primary/10 text-primary border-primary/30">
                  <Star className="w-3 h-3 mr-1" /> {emp.performance.rating}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {[
          { label: "Present Days", value: emp.attendance.present, icon: TrendingUp, color: "text-accent bg-accent/10" },
          { label: "Absent Days", value: emp.attendance.absent, icon: Calendar, color: "text-destructive bg-destructive/10" },
          { label: "Late Days", value: emp.attendance.late, icon: Clock, color: "text-primary bg-primary/10" },
          { label: "Avg Hours/Day", value: `${emp.attendance.avgHours}h`, icon: Clock, color: "text-primary bg-primary/10" },
          { label: "Tasks Done", value: emp.performance.tasksCompleted, icon: Award, color: "text-accent bg-accent/10" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.color}`}><s.icon className="w-4 h-4" /></div>
                <div>
                  <p className="text-lg font-bold text-foreground">{s.value}</p>
                  <p className="text-[10px] text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="attendance" className="space-y-4">
        <TabsList className="flex-wrap">
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="vacations">Vacations</TabsTrigger>
          <TabsTrigger value="info">Info & Skills</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Attendance */}
        <TabsContent value="attendance" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-base">Attendance Overview</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Present", value: emp.attendance.present, max: emp.attendance.totalDays, color: "bg-accent" },
                  { label: "Absent", value: emp.attendance.absent, max: emp.attendance.totalDays, color: "bg-destructive" },
                  { label: "Late", value: emp.attendance.late, max: emp.attendance.totalDays, color: "bg-primary" },
                  { label: "Vacation", value: emp.attendance.vacation, max: emp.attendance.totalDays, color: "bg-muted-foreground" },
                ].map((row) => (
                  <div key={row.label} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{row.label}</span>
                      <span className="font-semibold text-foreground">{row.value} / {row.max}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${row.color}`} style={{ width: `${(row.value / row.max) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-base">Monthly Trend</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {emp.monthlyAttendance.map((m) => (
                    <div key={m.month} className="flex items-center gap-3">
                      <span className="w-8 text-xs font-medium text-muted-foreground">{m.month}</span>
                      <div className="flex-1 flex items-center gap-1 h-6">
                        <div className="bg-accent/80 h-full rounded-l" style={{ width: `${(m.present / 22) * 100}%` }} />
                        {m.late > 0 && <div className="bg-primary/60 h-full" style={{ width: `${(m.late / 22) * 100}%` }} />}
                        {m.absent > 0 && <div className="bg-destructive/60 h-full rounded-r" style={{ width: `${(m.absent / 22) * 100}%` }} />}
                      </div>
                      <span className="text-xs text-foreground font-medium w-6 text-right">{m.present}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-accent" /> Present</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary" /> Late</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-destructive" /> Absent</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Check-in / Check-out Stats</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Avg Check-in", value: emp.attendance.avgCheckIn },
                  { label: "Avg Check-out", value: emp.attendance.avgCheckOut },
                  { label: "Avg Hours", value: `${emp.attendance.avgHours}h` },
                  { label: "Overtime", value: `${emp.attendance.overtimeHours}h` },
                ].map((s) => (
                  <div key={s.label} className="p-3 rounded-lg bg-muted/50 text-center">
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className="text-lg font-bold text-foreground mt-1">{s.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vacations */}
        <TabsContent value="vacations" className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            {Object.entries(emp.vacationBalance).map(([type, bal]) => (
              <Card key={type}>
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-foreground capitalize mb-2">{type} Leave</p>
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-2xl font-bold text-foreground">{bal.total - bal.used}</span>
                    <span className="text-xs text-muted-foreground">of {bal.total} remaining</span>
                  </div>
                  <Progress value={(bal.used / bal.total) * 100} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Leave History</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {emp.vacations.map((v, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">{v.type}</Badge>
                      <div>
                        <p className="text-sm font-medium text-foreground">{v.from} → {v.to}</p>
                        <p className="text-xs text-muted-foreground">{v.days} days</p>
                      </div>
                    </div>
                    <Badge className={v.status === "Approved" ? "bg-accent/10 text-accent border-accent/30" : "bg-primary/10 text-primary border-primary/30"}>
                      {v.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Info & Skills */}
        <TabsContent value="info" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><Briefcase className="w-4 h-4" /> Employment Info</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Position", value: emp.position },
                  { label: "Branch", value: emp.branch },
                  { label: "Group", value: emp.group },
                  { label: "Email", value: emp.email },
                  { label: "Phone", value: emp.phone },
                  { label: "Join Date", value: emp.joinDate },
                ].map((r) => (
                  <div key={r.label} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{r.label}</span>
                    <span className="font-medium text-foreground">{r.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><BookOpen className="w-4 h-4" /> Skills</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {emp.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Certificates */}
        <TabsContent value="certificates">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {emp.certificates.map((cert, i) => (
              <motion.div key={cert.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Card className="hover:shadow-md transition-all">
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm">{cert.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{cert.issuer}</p>
                    <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                      <span>Issued: {cert.date}</span>
                      <span>Expires: {cert.expiry}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Performance */}
        <TabsContent value="performance">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Rating", value: `${emp.performance.rating}/5`, icon: Star },
              { label: "Tasks Completed", value: emp.performance.tasksCompleted, icon: Award },
              { label: "Avg Task Time", value: emp.performance.avgTaskTime, icon: Clock },
              { label: "On-time Rate", value: `${emp.performance.onTimeRate}%`, icon: TrendingUp },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card>
                  <CardContent className="p-5 text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <s.icon className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
