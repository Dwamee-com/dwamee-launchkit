export interface Advance {
  id: string;
  employeeName: string;
  totalAmount: number;
  months: number;
  monthlyDeduction: number;
  startDate: string; // ISO date
  paidInstallments: number[]; // indices that are paid
  createdAt?: string;
}

export type InstallmentStatus = "paid" | "pending" | "future" | "overdue";

export interface ScheduleItem {
  index: number;
  amount: number;
  dueDate: string;
  status: InstallmentStatus;
}

export function addMonthsISO(iso: string, months: number) {
  const d = new Date(iso);
  d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0, 10);
}

export function buildPreviewSchedule(total: number, months: number, monthly: number, startDate: string) {
  if (months <= 0) return [];
  const items: { index: number; amount: number }[] = [];
  let remaining = total;
  for (let i = 0; i < months; i++) {
    const isLast = i === months - 1;
    const amount = isLast ? Math.max(0, Math.round(remaining * 100) / 100) : Math.min(monthly, remaining);
    items.push({ index: i, amount });
    remaining -= amount;
  }
  return items;
}

export function computeAdvanceStats(advance: Advance) {
  const today = new Date();
  const previewItems = buildPreviewSchedule(
    advance.totalAmount,
    advance.months,
    advance.monthlyDeduction,
    advance.startDate
  );
  const paidSet = new Set(advance.paidInstallments);

  const schedule: ScheduleItem[] = previewItems.map((p) => {
    const dueDate = addMonthsISO(advance.startDate, p.index);
    const due = new Date(dueDate);
    let status: InstallmentStatus;
    if (paidSet.has(p.index)) status = "paid";
    else if (due < today) status = "overdue";
    else if (due.getMonth() === today.getMonth() && due.getFullYear() === today.getFullYear()) status = "pending";
    else status = "future";
    return { ...p, dueDate, status };
  });

  const paidAmount = schedule.filter((s) => s.status === "paid").reduce((s, x) => s + x.amount, 0);
  const total = advance.totalAmount;
  const remaining = Math.max(0, Math.round((total - paidAmount) * 100) / 100);
  const paidCount = schedule.filter((s) => s.status === "paid").length;
  const progressPct = Math.round((paidCount / advance.months) * 100);

  return { schedule, paidAmount, remaining, paidCount, progressPct, total };
}
