import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GitBranch, Plus, Calendar, MoreHorizontal, Users, TrendingUp, Clock, Award } from "lucide-react";
import DashboardFilters from "@/components/DashboardFilters";
import { motion } from "framer-motion";

interface Branch {
  id: number;
  name: string;
  createdAt: string;
  userCount: number;
  attendanceRate: number;
  avgCheckIn: string;
  avgLate: number;
  totalPresent: number;
  totalAbsent: number;
}

const mockBranches: Branch[] = [
  { id: 1, name: "Cairo HQ", createdAt: "2025-01-15", userCount: 45, attendanceRate: 94.2, avgCheckIn: "08:48", avgLate: 3, totalPresent: 1250, totalAbsent: 78 },
  { id: 2, name: "Alexandria Branch", createdAt: "2025-03-22", userCount: 28, attendanceRate: 91.5, avgCheckIn: "08:55", avgLate: 5, totalPresent: 780, totalAbsent: 72 },
  { id: 3, name: "Giza Office", createdAt: "2025-06-10", userCount: 32, attendanceRate: 96.1, avgCheckIn: "08:42", avgLate: 2, totalPresent: 920, totalAbsent: 37 },
  { id: 4, name: "Mansoura Branch", createdAt: "2025-09-01", userCount: 18, attendanceRate: 89.3, avgCheckIn: "09:05", avgLate: 7, totalPresent: 480, totalAbsent: 57 },
];

export default function Branches() {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filtered = mockBranches.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  const best = [...mockBranches].sort((a, b) => b.attendanceRate - a.attendanceRate)[0];
  const totalUsers = mockBranches.reduce((s, b) => s + b.userCount, 0);
  const avgAttendance = (mockBranches.reduce((s, b) => s + b.attendanceRate, 0) / mockBranches.length).toFixed(1);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Branches</h1>
          <p className="text-muted-foreground text-sm">Manage your organization branches</p>
        </div>
        <Button><Plus className="w-4 h-4 mr-2" /> Add Branch</Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {([
          { label: "Total Branches", value: mockBranches.length, icon: GitBranch, color: "text-primary bg-primary/10" },
          { label: "Total Users", value: totalUsers, icon: Users, color: "text-accent bg-accent/10" },
          { label: "Avg Attendance", value: `${avgAttendance}%`, icon: TrendingUp, color: "text-primary bg-primary/10" },
          { label: "Best Branch", value: best.name, icon: Award, color: "bg-yellow-100 text-yellow-700" },
        ]).map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}><stat.icon className="w-5 h-5" /></div>
                <div>
                  <p className="text-lg font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Comparison Chart */}
      <Card className="mb-6">
        <CardHeader className="pb-3"><CardTitle className="text-base">Branch Attendance Comparison</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...mockBranches].sort((a, b) => b.attendanceRate - a.attendanceRate).map((branch, i) => (
              <div key={branch.id} className="flex items-center gap-4">
                <div className="w-36 text-sm font-medium text-foreground truncate flex items-center gap-2">
                  {i === 0 && <Award className="w-4 h-4 text-yellow-500 shrink-0" />}
                  {branch.name}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                      <motion.div
                        className={`h-3 rounded-full ${i === 0 ? "bg-accent" : "bg-primary"}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${branch.attendanceRate}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-foreground w-14 text-right">{branch.attendanceRate}%</span>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />{branch.userCount}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{branch.avgCheckIn}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <DashboardFilters searchValue={search} onSearchChange={setSearch} startDate={startDate} onStartDateChange={setStartDate} endDate={endDate} onEndDateChange={setEndDate} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((branch) => (
          <Card key={branch.id} className="group hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <GitBranch className="w-5 h-5 text-primary" />
                </div>
                <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              <h3 className="font-semibold text-foreground text-lg">{branch.name}</h3>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <Badge variant="outline" className="text-xs flex items-center gap-1"><Users className="w-3 h-3" /> {branch.userCount} users</Badge>
                <Badge variant="outline" className={`text-xs ${branch.id === best.id ? "bg-accent/10 text-accent border-accent/30" : ""}`}>
                  <TrendingUp className="w-3 h-3 mr-1" /> {branch.attendanceRate}%
                </Badge>
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Avg {branch.avgCheckIn}</span>
                <span>{branch.avgLate} late/mo</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Created {branch.createdAt}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
