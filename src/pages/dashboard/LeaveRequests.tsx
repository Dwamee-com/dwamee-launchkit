import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Eye, Star, AlertTriangle, Clock, CheckCircle2, XCircle, Calendar, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface LeaveRequest {
  id: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  status: "pending" | "approved" | "rejected";
  hasAttachment: boolean;
  annualDeduction: boolean;
  financialRule: "full_paid" | "unpaid" | "half_paid";
  financialOverride?: "full_paid" | "unpaid" | "half_paid" | null;
  reason: string;
  remainingBalance: number;
  totalEntitlement: number;
}

const mockRequests: LeaveRequest[] = [
  { id: "1", employeeName: "Ahmed Hassan", leaveType: "Annual Leave", startDate: "2026-03-15", endDate: "2026-03-20", days: 5, status: "pending", hasAttachment: false, annualDeduction: true, financialRule: "full_paid", reason: "Family vacation", remainingBalance: 16, totalEntitlement: 21 },
  { id: "2", employeeName: "Sara Mohamed", leaveType: "Sick Leave", startDate: "2026-03-10", endDate: "2026-03-12", days: 2, status: "approved", hasAttachment: true, annualDeduction: false, financialRule: "full_paid", reason: "Medical appointment", remainingBalance: 13, totalEntitlement: 15 },
  { id: "3", employeeName: "Omar Ali", leaveType: "Emergency Leave", startDate: "2026-03-18", endDate: "2026-03-19", days: 1, status: "pending", hasAttachment: false, annualDeduction: false, financialRule: "unpaid", reason: "Family emergency", remainingBalance: 999, totalEntitlement: 999 },
  { id: "4", employeeName: "Fatma Ibrahim", leaveType: "Maternity Leave", startDate: "2026-04-01", endDate: "2026-06-29", days: 90, status: "approved", hasAttachment: true, annualDeduction: false, financialRule: "full_paid", reason: "Maternity", remainingBalance: 90, totalEntitlement: 90 },
  { id: "5", employeeName: "Khaled Youssef", leaveType: "Annual Leave", startDate: "2026-03-16", endDate: "2026-03-18", days: 2, status: "rejected", hasAttachment: false, annualDeduction: true, financialRule: "full_paid", reason: "Personal", remainingBalance: 10, totalEntitlement: 21 },
  { id: "6", employeeName: "Nour Adel", leaveType: "Annual Leave", startDate: "2026-03-15", endDate: "2026-03-17", days: 2, status: "approved", hasAttachment: false, annualDeduction: true, financialRule: "full_paid", reason: "Travel", remainingBalance: 14, totalEntitlement: 21 },
];

const previousLeaves = [
  { type: "Annual Leave", dates: "Feb 1-3, 2026", days: 2 },
  { type: "Sick Leave", dates: "Jan 15, 2026", days: 1 },
  { type: "Annual Leave", dates: "Dec 20-25, 2025", days: 5 },
];

const statusConfig: Record<string, { icon: React.ElementType; color: string }> = {
  pending: { icon: Clock, color: "bg-yellow-100 text-yellow-700" },
  approved: { icon: CheckCircle2, color: "bg-accent/10 text-accent" },
  rejected: { icon: XCircle, color: "bg-destructive/10 text-destructive" },
};

const financialLabels: Record<string, string> = {
  full_paid: "Full Paid (100%)",
  unpaid: "Unpaid",
  half_paid: "Half Paid (50%)",
};

export default function LeaveRequests() {
  const [requests, setRequests] = useState(mockRequests);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [financialOverride, setFinancialOverride] = useState<string>("");

  const filtered = requests.filter(r => {
    const matchSearch = r.employeeName.toLowerCase().includes(search.toLowerCase()) || r.leaveType.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    pending: requests.filter(r => r.status === "pending").length,
    approved: requests.filter(r => r.status === "approved").length,
    rejected: requests.filter(r => r.status === "rejected").length,
  };

  const conflicting = selectedRequest
    ? requests.filter(r => r.id !== selectedRequest.id && r.status !== "rejected" && r.startDate <= selectedRequest.endDate && r.endDate >= selectedRequest.startDate)
    : [];

  const handleAction = (action: "approved" | "rejected") => {
    if (!selectedRequest) return;
    setRequests(prev => prev.map(r => r.id === selectedRequest.id ? {
      ...r,
      status: action,
      financialOverride: financialOverride ? financialOverride as LeaveRequest["financialRule"] : r.financialOverride,
    } : r));
    setSelectedRequest(null);
    setRejectReason("");
    setFinancialOverride("");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leave Requests</h1>
          <p className="text-muted-foreground text-sm">Review and manage employee leave requests</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {([["pending", "Pending", Clock, "bg-yellow-100 text-yellow-700"], ["approved", "Approved", CheckCircle2, "bg-accent/10 text-accent"], ["rejected", "Rejected", XCircle, "bg-destructive/10 text-destructive"]] as const).map(([key, label, Icon, color]) => (
          <motion.div key={key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}><Icon className="w-5 h-5" /></div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats[key]}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <Input placeholder="Search employee or leave type..." value={search} onChange={e => setSearch(e.target.value)} className="max-w-xs" />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Leave Type</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Days</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Attachment</TableHead>
              <TableHead>Annual Deduction</TableHead>
              <TableHead>Financial</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(r => {
              const sc = statusConfig[r.status];
              return (
                <TableRow key={r.id} className="cursor-pointer hover:bg-muted/50" onClick={() => { setSelectedRequest(r); setFinancialOverride(r.financialOverride || ""); }}>
                  <TableCell className="font-medium">{r.employeeName}</TableCell>
                  <TableCell>{r.leaveType}</TableCell>
                  <TableCell className="text-sm">{r.startDate} → {r.endDate}</TableCell>
                  <TableCell>{r.days}</TableCell>
                  <TableCell>
                    <Badge className={`${sc.color} border-0`}>
                      <sc.icon className="w-3 h-3 mr-1" />{r.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{r.hasAttachment ? <Paperclip className="w-4 h-4 text-primary" /> : <span className="text-muted-foreground text-xs">—</span>}</TableCell>
                  <TableCell><Badge variant="outline" className="text-xs">{r.annualDeduction ? "Yes" : "No"}</Badge></TableCell>
                  <TableCell className="text-xs">{financialLabels[r.financialOverride || r.financialRule]}</TableCell>
                  <TableCell><Button variant="ghost" size="sm" onClick={e => { e.stopPropagation(); setSelectedRequest(r); }}><Eye className="w-4 h-4" /></Button></TableCell>
                </TableRow>
              );
            })}
            {filtered.length === 0 && (
              <TableRow><TableCell colSpan={9} className="text-center text-muted-foreground py-10">No requests found</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Intelligence Modal */}
      <Dialog open={!!selectedRequest} onOpenChange={() => { setSelectedRequest(null); setRejectReason(""); setFinancialOverride(""); }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedRequest && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" /> Leave Request — {selectedRequest.employeeName}
                </DialogTitle>
                <DialogDescription>Review request details, employee history, and team conflicts.</DialogDescription>
              </DialogHeader>

              <div className="grid md:grid-cols-5 gap-6 py-4">
                {/* Left: Request Details */}
                <div className="md:col-span-3 space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><span className="text-muted-foreground">Leave Type:</span><p className="font-medium">{selectedRequest.leaveType}</p></div>
                    <div><span className="text-muted-foreground">Status:</span><Badge className={`${statusConfig[selectedRequest.status].color} border-0 mt-1`}>{selectedRequest.status}</Badge></div>
                    <div><span className="text-muted-foreground">Period:</span><p className="font-medium">{selectedRequest.startDate} → {selectedRequest.endDate}</p></div>
                    <div><span className="text-muted-foreground">Duration:</span><p className="font-medium">{selectedRequest.days} day(s)</p></div>
                    <div className="col-span-2"><span className="text-muted-foreground">Reason:</span><p className="font-medium">{selectedRequest.reason}</p></div>
                    {selectedRequest.hasAttachment && (
                      <div className="col-span-2"><Button variant="outline" size="sm"><Paperclip className="w-4 h-4 mr-1" /> View Attachment</Button></div>
                    )}
                  </div>

                  {/* Financial Override */}
                  <Card className="border-dashed">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-2 text-sm font-medium"><TrendingUp className="w-4 h-4 text-primary" /> Financial Impact</div>
                      <p className="text-sm text-muted-foreground">Default: <strong>{financialLabels[selectedRequest.financialRule]}</strong></p>
                      <Select value={financialOverride || selectedRequest.financialRule} onValueChange={setFinancialOverride}>
                        <SelectTrigger><SelectValue placeholder="Override financial rule" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full_paid">Full Paid (100%)</SelectItem>
                          <SelectItem value="unpaid">Unpaid</SelectItem>
                          <SelectItem value="half_paid">Half Paid (50%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  {/* Conflict Detector */}
                  {conflicting.length > 0 && (
                    <Card className="border-yellow-200 bg-yellow-50/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-yellow-700 mb-2">
                          <AlertTriangle className="w-4 h-4" /> Who else is off? ({conflicting.length})
                        </div>
                        <div className="space-y-1">
                          {conflicting.map(c => (
                            <div key={c.id} className="flex items-center justify-between text-sm">
                              <span className="font-medium text-foreground">{c.employeeName}</span>
                              <span className="text-muted-foreground">{c.startDate} — {c.endDate}</span>
                              <Badge className={`${statusConfig[c.status].color} border-0 text-xs`}>{c.status}</Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Right: Employee Insights */}
                <div className="md:col-span-2 space-y-4">
                  <Card>
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-2 text-sm font-medium"><Users className="w-4 h-4 text-primary" /> Vacation Insights</div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Remaining</span>
                        <span className="font-bold text-foreground">{selectedRequest.remainingBalance} days</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Entitlement</span>
                        <span className="font-medium text-foreground">{selectedRequest.totalEntitlement} days</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mt-1">
                        <div className="bg-primary rounded-full h-2 transition-all" style={{ width: `${Math.min(100, ((selectedRequest.totalEntitlement - selectedRequest.remainingBalance) / selectedRequest.totalEntitlement) * 100)}%` }} />
                      </div>
                      <p className="text-xs text-muted-foreground">{selectedRequest.totalEntitlement - selectedRequest.remainingBalance} days used this year</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <div className="text-sm font-medium mb-2">Previous Leaves</div>
                      {previousLeaves.map((pl, i) => (
                        <div key={i} className="flex items-center justify-between text-sm border-b border-border last:border-0 pb-1.5 last:pb-0">
                          <div><p className="font-medium text-foreground">{pl.type}</p><p className="text-xs text-muted-foreground">{pl.dates}</p></div>
                          <Badge variant="outline" className="text-xs">{pl.days}d</Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Actions */}
              {selectedRequest.status === "pending" && (
                <div className="space-y-3 border-t pt-4">
                  <Textarea placeholder="Rejection reason (required to reject)..." value={rejectReason} onChange={e => setRejectReason(e.target.value)} />
                  <DialogFooter>
                    <Button variant="destructive" disabled={!rejectReason.trim()} onClick={() => handleAction("rejected")}>
                      <XCircle className="w-4 h-4 mr-1" /> Reject
                    </Button>
                    <Button onClick={() => handleAction("approved")}>
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Approve
                    </Button>
                  </DialogFooter>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
