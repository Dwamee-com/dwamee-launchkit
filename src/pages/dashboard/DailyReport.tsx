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
import { Search, Download, TrendingUp, TrendingDown, Clock, Filter, ArrowUpRight, ArrowDownRight } from "lucide-react";

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

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  "On Time": { bg: "bg-accent/10", text: "text-accent", dot: "bg-accent" },
  "Late": { bg: "bg-destructive/10", text: "text-destructive", dot: "bg-destructive" },
  "Absent": { bg: "bg-destructive/10", text: "text-destructive", dot: "bg-destructive" },
  "Early Leave": { bg: "bg-primary/10", text: "text-primary", dot: "bg-primary" },
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
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Daily Report</h1>
          <p className="text-muted-foreground text-sm">Attendance bonuses & deductions</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 rounded-xl">
          <Download className="w-4 h-4" /> Export
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Bonuses", value: `+$${totalBonus}`, icon: TrendingUp, color: "text-accent", bg: "bg-gradient-to-br from-accent/10 to-accent/5", arrow: ArrowUpRight },
          { label: "Total Deductions", value: `-$${totalDeduction}`, icon: TrendingDown, color: "text-destructive", bg: "bg-gradient-to-br from-destructive/10 to-destructive/5", arrow: ArrowDownRight },
          { label: "Records", value: filtered.length, icon: Clock, color: "text-primary", bg: "bg-gradient-to-br from-primary/10 to-primary/5", arrow: null },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="overflow-hidden">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center`}>
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
                    <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
                  </div>
                </div>
                {s.arrow && <s.arrow className={`w-5 h-5 ${s.color} opacity-40`} />}
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
              <Input placeholder="Search employee..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9 rounded-xl" />
            </div>
            <Input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="w-[160px] h-9 rounded-xl" />
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px] h-9 rounded-xl">
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
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Employee</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">In</TableHead>
                <TableHead className="font-semibold">Out</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold text-right">Amount</TableHead>
                <TableHead className="font-semibold">Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((row, i) => {
                const sc = statusConfig[row.status] || statusConfig["On Time"];
                return (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="hover:bg-muted/30 border-b border-border"
                  >
                    <TableCell className="font-semibold text-foreground">{row.name}</TableCell>
                    <TableCell className="text-muted-foreground text-xs font-mono">{row.date}</TableCell>
                    <TableCell className="font-mono text-xs">{row.checkIn}</TableCell>
                    <TableCell className="font-mono text-xs">{row.checkOut}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full ${sc.bg} ${sc.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                        {row.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={row.type === "bonus" ? "default" : "destructive"}
                        className="text-[10px] rounded-full"
                      >
                        {row.type === "bonus" ? "Bonus" : "Deduction"}
                      </Badge>
                    </TableCell>
                    <TableCell className={`font-bold text-right ${row.type === "bonus" ? "text-accent" : "text-destructive"}`}>
                      {row.type === "bonus" ? "+" : "-"}${row.amount}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">{row.reason}</TableCell>
                  </motion.tr>
                );
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-16 text-muted-foreground">
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
