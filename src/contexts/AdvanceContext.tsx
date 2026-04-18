import { createContext, useContext, useState, ReactNode } from "react";
import { Advance } from "@/lib/advance";

const seed: Advance[] = [
  {
    id: "adv-1",
    employeeName: "Sarah Johnson",
    totalAmount: 6000,
    months: 6,
    monthlyDeduction: 1000,
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString().slice(0, 10),
    paidInstallments: [0, 1],
  },
  {
    id: "adv-2",
    employeeName: "Michael Chen",
    totalAmount: 12000,
    months: 12,
    monthlyDeduction: 1000,
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 4)).toISOString().slice(0, 10),
    paidInstallments: [0, 1, 2, 3],
  },
  {
    id: "adv-3",
    employeeName: "Emma Davis",
    totalAmount: 3000,
    months: 3,
    monthlyDeduction: 1000,
    startDate: new Date().toISOString().slice(0, 10),
    paidInstallments: [],
  },
];

interface AdvanceCtx {
  advances: Advance[];
  addAdvance: (a: Omit<Advance, "id" | "createdAt">) => void;
  updateAdvance: (a: Advance) => void;
  deleteAdvance: (id: string) => void;
  togglePaid: (id: string, index: number) => void;
}

const Ctx = createContext<AdvanceCtx | null>(null);

export function AdvanceProvider({ children }: { children: ReactNode }) {
  const [advances, setAdvances] = useState<Advance[]>(seed);

  const addAdvance: AdvanceCtx["addAdvance"] = (a) =>
    setAdvances((prev) => [{ ...a, id: `adv-${Date.now()}`, createdAt: new Date().toISOString() }, ...prev]);

  const updateAdvance: AdvanceCtx["updateAdvance"] = (a) =>
    setAdvances((prev) => prev.map((x) => (x.id === a.id ? a : x)));

  const deleteAdvance: AdvanceCtx["deleteAdvance"] = (id) =>
    setAdvances((prev) => prev.filter((x) => x.id !== id));

  const togglePaid: AdvanceCtx["togglePaid"] = (id, index) =>
    setAdvances((prev) =>
      prev.map((x) => {
        if (x.id !== id) return x;
        const set = new Set(x.paidInstallments);
        if (set.has(index)) set.delete(index);
        else set.add(index);
        return { ...x, paidInstallments: Array.from(set).sort((a, b) => a - b) };
      })
    );

  return (
    <Ctx.Provider value={{ advances, addAdvance, updateAdvance, deleteAdvance, togglePaid }}>{children}</Ctx.Provider>
  );
}

export function useAdvances() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAdvances must be used within AdvanceProvider");
  return ctx;
}
