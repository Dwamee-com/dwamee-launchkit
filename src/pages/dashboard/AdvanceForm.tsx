import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAdvances } from "@/contexts/AdvanceContext";
import { mockUsers } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import { addMonthsISO, buildPreviewSchedule } from "@/lib/advance";

export default function AdvanceForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { advances, addAdvance, updateAdvance, deleteAdvance } = useAdvances();
  const editing = advances.find((a) => a.id === id);

  const [employeeName, setEmployeeName] = useState(editing?.employeeName ?? "");
  const [totalAmount, setTotalAmount] = useState<number>(editing?.totalAmount ?? 0);
  const [months, setMonths] = useState<number>(editing?.months ?? 6);
  const [monthlyDeduction, setMonthlyDeduction] = useState<number>(editing?.monthlyDeduction ?? 0);
  const [startDate, setStartDate] = useState<string>(editing?.startDate ?? new Date().toISOString().slice(0, 10));
  const [manualOverride, setManualOverride] = useState(false);

  // auto-calc monthly when total/months change (unless overridden)
  useEffect(() => {
    if (!manualOverride && totalAmount > 0 && months > 0) {
      setMonthlyDeduction(Math.round((totalAmount / months) * 100) / 100);
    }
  }, [totalAmount, months, manualOverride]);

  const preview = useMemo(
    () => buildPreviewSchedule(totalAmount, months, monthlyDeduction, startDate),
    [totalAmount, months, monthlyDeduction, startDate]
  );

  const sumMatches = Math.abs(preview.reduce((s, p) => s + p.amount, 0) - totalAmount) < 0.5;

  const handleSave = () => {
    if (!employeeName || totalAmount <= 0 || months <= 0 || monthlyDeduction <= 0) {
      toast({ title: "Missing fields", description: "Please fill all fields with valid values.", variant: "destructive" });
      return;
    }
    if (!sumMatches) {
      toast({ title: "Invalid totals", description: "Sum of installments must equal total advance.", variant: "destructive" });
      return;
    }

    if (editing) {
      // preserve already paid installments
      const paidIdx = editing.paidInstallments ?? [];
      const preservedPaid = paidIdx.filter((i) => i < months);
      updateAdvance({
        ...editing,
        employeeName,
        totalAmount,
        months,
        monthlyDeduction,
        startDate,
        paidInstallments: preservedPaid,
      });
      toast({ title: "Advance updated" });
    } else {
      addAdvance({ employeeName, totalAmount, months, monthlyDeduction, startDate, paidInstallments: [] });
      toast({ title: "Advance created" });
    }
    navigate("/dashboard/advances");
  };

  const handleDelete = () => {
    if (!editing) return;
    deleteAdvance(editing.id);
    toast({ title: "Advance deleted" });
    navigate("/dashboard/advances");
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard/advances")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{editing ? "Edit Advance" : "New Advance"}</h1>
          <p className="text-muted-foreground">Configure salary advance and repayment schedule</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Advance Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Employee</Label>
              <Select value={employeeName} onValueChange={setEmployeeName}>
                <SelectTrigger>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {mockUsers.map((u) => (
                    <SelectItem key={u.id} value={u.name}>
                      {u.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Total Advance Amount ($)</Label>
              <Input
                type="number"
                min={0}
                value={totalAmount || ""}
                onChange={(e) => setTotalAmount(Number(e.target.value))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Number of Months</Label>
                <Input
                  type="number"
                  min={1}
                  max={60}
                  value={months || ""}
                  onChange={(e) => setMonths(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center justify-between">
                  Monthly Deduction ($)
                  {manualOverride && <span className="text-xs text-amber-600">manual</span>}
                </Label>
                <Input
                  type="number"
                  min={0}
                  value={monthlyDeduction || ""}
                  onChange={(e) => {
                    setManualOverride(true);
                    setMonthlyDeduction(Number(e.target.value));
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Deduction Start Date</Label>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>

            {!sumMatches && totalAmount > 0 && (
              <div className="text-sm p-3 rounded-md bg-destructive/10 text-destructive">
                Installments sum (${preview.reduce((s, p) => s + p.amount, 0).toFixed(2)}) must equal total ($
                {totalAmount.toFixed(2)}).
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave} className="flex-1">
                <Save className="w-4 h-4" /> {editing ? "Save Changes" : "Create Advance"}
              </Button>
              {editing && (
                <Button variant="destructive" onClick={handleDelete}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Repayment Preview</CardTitle>
            <Badge variant={sumMatches ? "default" : "destructive"}>
              {sumMatches ? "Balanced" : "Unbalanced"}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="max-h-[420px] overflow-auto">
              <table className="w-full text-sm">
                <thead className="text-muted-foreground border-b sticky top-0 bg-card">
                  <tr>
                    <th className="text-left py-2">#</th>
                    <th className="text-left py-2">Month</th>
                    <th className="text-right py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.map((p) => (
                    <tr key={p.index} className="border-b last:border-0">
                      <td className="py-2 text-muted-foreground">{p.index + 1}</td>
                      <td className="py-2">
                        {new Date(addMonthsISO(startDate, p.index)).toLocaleDateString(undefined, {
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-2 text-right font-medium">${p.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
