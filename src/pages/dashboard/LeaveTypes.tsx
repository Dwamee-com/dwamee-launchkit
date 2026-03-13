import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, CalendarDays, Shield, DollarSign, Paperclip, Clock, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LeaveType {
  id: string;
  name: string;
  balanceType: "fixed" | "unlimited";
  fixedDays?: number;
  approvalWorkflow: "auto" | "managerial";
  financialImpact: "full_paid" | "unpaid" | "half_paid";
  requiresAttachment: boolean;
  requestLimit: number;
  approvalChain: string[];
  carryOver: boolean;
}

const defaultLeaveTypes: LeaveType[] = [
  { id: "1", name: "Sick Leave", balanceType: "fixed", fixedDays: 15, approvalWorkflow: "auto", financialImpact: "full_paid", requiresAttachment: true, requestLimit: 5, approvalChain: ["Project Manager"], carryOver: false },
  { id: "2", name: "Annual Leave", balanceType: "fixed", fixedDays: 21, approvalWorkflow: "managerial", financialImpact: "full_paid", requiresAttachment: false, requestLimit: 14, approvalChain: ["Project Manager", "HR Manager"], carryOver: true },
  { id: "3", name: "Maternity Leave", balanceType: "fixed", fixedDays: 90, approvalWorkflow: "managerial", financialImpact: "full_paid", requiresAttachment: true, requestLimit: 90, approvalChain: ["HR Manager", "CEO"], carryOver: false },
  { id: "4", name: "Paternity Leave", balanceType: "fixed", fixedDays: 7, approvalWorkflow: "managerial", financialImpact: "full_paid", requiresAttachment: true, requestLimit: 7, approvalChain: ["Project Manager"], carryOver: false },
  { id: "5", name: "Emergency Leave", balanceType: "unlimited", approvalWorkflow: "auto", financialImpact: "unpaid", requiresAttachment: false, requestLimit: 3, approvalChain: ["Project Manager"], carryOver: false },
];

const approvalRoles = ["Project Manager", "HR Manager", "CEO", "Team Lead", "Department Head"];

const financialLabels: Record<string, { label: string; color: string }> = {
  full_paid: { label: "Full Paid (100%)", color: "bg-accent/10 text-accent" },
  unpaid: { label: "Unpaid", color: "bg-destructive/10 text-destructive" },
  half_paid: { label: "Half Paid (50%)", color: "bg-yellow-100 text-yellow-700" },
};

const emptyLeave: Omit<LeaveType, "id"> = {
  name: "", balanceType: "fixed", fixedDays: 21, approvalWorkflow: "managerial",
  financialImpact: "full_paid", requiresAttachment: false, requestLimit: 7,
  approvalChain: [], carryOver: false,
};

export default function LeaveTypes() {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>(defaultLeaveTypes);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLeave, setEditingLeave] = useState<LeaveType | null>(null);
  const [form, setForm] = useState<Omit<LeaveType, "id">>(emptyLeave);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openCreate = () => { setEditingLeave(null); setForm(emptyLeave); setDialogOpen(true); };
  const openEdit = (lt: LeaveType) => { setEditingLeave(lt); setForm({ ...lt }); setDialogOpen(true); };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editingLeave) {
      setLeaveTypes(prev => prev.map(l => l.id === editingLeave.id ? { ...l, ...form } : l));
    } else {
      setLeaveTypes(prev => [...prev, { ...form, id: Date.now().toString() }]);
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) setLeaveTypes(prev => prev.filter(l => l.id !== deleteId));
    setDeleteId(null);
  };

  const toggleApprovalChain = (role: string) => {
    setForm(prev => ({
      ...prev,
      approvalChain: prev.approvalChain.includes(role)
        ? prev.approvalChain.filter(r => r !== role)
        : [...prev.approvalChain, role],
    }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leave Types</h1>
          <p className="text-muted-foreground text-sm">Configure leave categories and their policies</p>
        </div>
        <Button onClick={openCreate}><Plus className="w-4 h-4 mr-2" /> Add Leave Type</Button>
      </div>

      <div className="grid gap-4">
        {leaveTypes.map((lt, i) => (
          <motion.div key={lt.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <CalendarDays className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground text-lg">{lt.name}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {lt.balanceType === "unlimited" ? "Unlimited" : `${lt.fixedDays} days`}
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${financialLabels[lt.financialImpact].color}`}>
                          {financialLabels[lt.financialImpact].label}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Shield className="w-3 h-3 mr-1" />
                          {lt.approvalWorkflow === "auto" ? "Auto-Approve" : "Managerial Approval"}
                        </Badge>
                        {lt.requiresAttachment && (
                          <Badge variant="outline" className="text-xs"><Paperclip className="w-3 h-3 mr-1" /> Attachment Required</Badge>
                        )}
                        {lt.carryOver && (
                          <Badge variant="outline" className="text-xs text-accent">Carry-over ✓</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-muted-foreground mr-3 hidden sm:flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" /> {lt.approvalChain.join(", ")}
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => openEdit(lt)}><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => setDeleteId(lt.id)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingLeave ? "Edit Leave Type" : "New Leave Type"}</DialogTitle>
            <DialogDescription>Configure the leave policy fields below.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 py-2">
            <div className="grid gap-2">
              <Label>Leave Name</Label>
              <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Sick Leave" />
            </div>

            <div className="flex items-center justify-between">
              <Label>Balance Type</Label>
              <div className="flex items-center gap-2 text-sm">
                <span className={form.balanceType === "fixed" ? "font-medium text-foreground" : "text-muted-foreground"}>Fixed Days</span>
                <Switch checked={form.balanceType === "unlimited"} onCheckedChange={v => setForm(p => ({ ...p, balanceType: v ? "unlimited" : "fixed" }))} />
                <span className={form.balanceType === "unlimited" ? "font-medium text-foreground" : "text-muted-foreground"}>Unlimited</span>
              </div>
            </div>

            {form.balanceType === "fixed" && (
              <div className="grid gap-2">
                <Label>Number of Days</Label>
                <Input type="number" min={1} value={form.fixedDays ?? 21} onChange={e => setForm(p => ({ ...p, fixedDays: parseInt(e.target.value) || 0 }))} />
              </div>
            )}

            <div className="flex items-center justify-between">
              <Label>Approval Workflow</Label>
              <div className="flex items-center gap-2 text-sm">
                <span className={form.approvalWorkflow === "auto" ? "font-medium text-foreground" : "text-muted-foreground"}>Auto</span>
                <Switch checked={form.approvalWorkflow === "managerial"} onCheckedChange={v => setForm(p => ({ ...p, approvalWorkflow: v ? "managerial" : "auto" }))} />
                <span className={form.approvalWorkflow === "managerial" ? "font-medium text-foreground" : "text-muted-foreground"}>Managerial</span>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Financial Impact</Label>
              <Select value={form.financialImpact} onValueChange={v => setForm(p => ({ ...p, financialImpact: v as LeaveType["financialImpact"] }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="full_paid">Full Paid (100% Salary)</SelectItem>
                  <SelectItem value="unpaid">Unpaid (Deducted from Basic)</SelectItem>
                  <SelectItem value="half_paid">Half Paid (50% Deduction)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox checked={form.requiresAttachment} onCheckedChange={v => setForm(p => ({ ...p, requiresAttachment: !!v }))} />
              <Label className="cursor-pointer">Requires Attachment (e.g., medical certificate)</Label>
            </div>

            <div className="grid gap-2">
              <Label>Max Days Per Request</Label>
              <Input type="number" min={1} value={form.requestLimit} onChange={e => setForm(p => ({ ...p, requestLimit: parseInt(e.target.value) || 1 }))} />
            </div>

            <div className="grid gap-2">
              <Label>Approval Chain</Label>
              <div className="flex flex-wrap gap-2">
                {approvalRoles.map(role => (
                  <Badge key={role} variant={form.approvalChain.includes(role) ? "default" : "outline"}
                    className="cursor-pointer transition-colors" onClick={() => toggleApprovalChain(role)}>
                    {role}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label>Carry-over to Next Year</Label>
              <Switch checked={form.carryOver} onCheckedChange={v => setForm(p => ({ ...p, carryOver: v }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={!form.name.trim()}>{editingLeave ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Leave Type</DialogTitle>
            <DialogDescription>This action cannot be undone. Are you sure?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
