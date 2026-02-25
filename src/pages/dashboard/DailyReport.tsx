import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Search, Download, TrendingUp, TrendingDown, Clock, Filter } from "lucide-react";

const mockReport = [
  { id: 1, name: "Ahmed Hassan", date: "2026-02-25", checkIn: "08:02", checkOut: "17:00", status: "On Time", type: "bonus", amount: 50, reason: "Early check-in incentive" },
  { id: 2, name: "Sara Mohamed", date: "2026-02-25", checkIn: "08:35", checkOut: "17:00", status: "Late", type: "deduction", amount: 75, reason: "Late arrival (35 min)" },
  { id: 3, name: "Omar Ali", date: "2026-02-25", checkIn: "—", checkOut: "—", status: "Absent", type: "deduction", amount: 200, reason: "Absent without notice" },
  { id: 4, name: "Nour Ibrahim", date: "2026-02-25", checkIn: "07:55", checkOut: "15:30", status: "Early Leave", type: "deduction", amount: 100, reason: "Early leave (1.5h)" },
  { id: 5, name: "Youssef Kamal", date: "2026-02-25", checkIn: "08:00", checkOut: "18:30", status: "On Time", type: "bonus", amount: 80, reason: "Overtime (1.5h)" },
  { id: 6, name: "Layla Fahmy", date: "2026-02-24", checkIn: "08:10", checkOut: "17:00", status: "Late", type: "deduction", amount: 30, reason: "Late arrival (10 min)" },
  { id: 7, name: "Hassan Mahmoud", date: "2026-02-24", checkIn: "08:00", checkOut: "17:00", status: "On Time", type: "bonus", amount: 50, reason: "Perfect attendance" },
  { id: 8, name: "Dina Samir", date: "2026-02-24", checkIn: "09:15", checkOut: "17:00", status: "Late", type: "deduction", amount: 150, reason: "Late arrival (1h 15m)" },
];

const statusColors: Record<string, string> = {
  "On Time": "bg-accent/10 text-accent border-0",
  "Late": "bg-destructive/10 text-destructive border-0",
  "Absent": "bg-destructive/10 text-destructive border-0",
  "Early Leave": "bg-primary/10 text-primary border-0",
};

export default function DailyReport() {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = mockReport.filter((r) => {
    const matchName = r.name.toLowerCase().includes(search.toLowerCase());
    const matchDate = !dateFilter || r.date === dateFilter;
    const matchType = typeFilter === "all" || r.type === typeFilter;
    return matchName && matchDate && matchType;
  });

  const totalBonus = filtered.filter(r => r.type === "bonus").reduce((s, r) => s + r.amount, 0);
  const totalDeduction = filtered.filter(r => r.type === "deduction").reduce((s, r) => s + r.amount, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Daily Bonus & Deduction Report</h1>
          <p className="text-muted-foreground text-sm">Track daily attendance rewards and penalties</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Download className="w-4 h-4" /> Export
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Bonuses", value: `+$${totalBonus}`, icon: TrendingUp, color: "text-accent", bg: "bg-accent/10" },
          { label: "Total Deductions", value: `-$${totalDeduction}`, icon: TrendingDown, color: "text-destructive", bg: "bg-destructive/10" },
          { label: "Records", value: filtered.length, icon: Clock, color: "text-primary", bg: "bg-primary/10" },
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

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[180px] max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search employee..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
            </div>
            <Input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="w-[160px] h-9" />
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px] h-9">
                <Filter className="w-3.5 h-3.5 mr-1.5" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="bonus">Bonus</SelectItem>
                <SelectItem value="deduction">Deduction</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <Card>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Employee</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium text-foreground">{row.name}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{row.date}</TableCell>
                  <TableCell className="font-mono text-xs">{row.checkIn}</TableCell>
                  <TableCell className="font-mono text-xs">{row.checkOut}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[10px] ${statusColors[row.status] || ""}`}>
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={row.type === "bonus" ? "default" : "destructive"} className="text-[10px]">
                      {row.type === "bonus" ? "Bonus" : "Deduction"}
                    </Badge>
                  </TableCell>
                  <TableCell className={`font-semibold ${row.type === "bonus" ? "text-accent" : "text-destructive"}`}>
                    {row.type === "bonus" ? "+" : "-"}${row.amount}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">{row.reason}</TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                    No records found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </motion.div>
    </div>
  );
}
