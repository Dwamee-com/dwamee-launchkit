import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Mail, Phone } from "lucide-react";
import { useAttributes } from "@/contexts/AttributesContext";

interface UserRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  branch: string;
  filledFieldIds: string[]; // ids of custom fields with data
}

const mockRows: UserRow[] = [
  { id: "u1", name: "Ahmed Hassan", email: "ahmed@dwamee.com", phone: "+20 100 111 2233", role: "Manager", branch: "Cairo HQ", filledFieldIds: ["f1", "f2", "f3", "f4", "f5"] },
  { id: "u2", name: "Sara Ali", email: "sara@dwamee.com", phone: "+20 100 222 3344", role: "Sales", branch: "Alexandria", filledFieldIds: ["f1", "f2", "f3"] },
  { id: "u3", name: "Omar Khalid", email: "omar@dwamee.com", phone: "+20 100 333 4455", role: "Engineer", branch: "Cairo HQ", filledFieldIds: ["f1"] },
  { id: "u4", name: "Lina Farouk", email: "lina@dwamee.com", phone: "+20 100 444 5566", role: "HR", branch: "Giza", filledFieldIds: ["f1", "f2", "f3", "f4"] },
  { id: "u5", name: "Youssef Nader", email: "youssef@dwamee.com", phone: "+20 100 555 6677", role: "Sales", branch: "Alexandria", filledFieldIds: [] },
  { id: "u6", name: "Mona Adel", email: "mona@dwamee.com", phone: "+20 100 666 7788", role: "Support", branch: "Cairo HQ", filledFieldIds: ["f1", "f2"] },
];

const progressColor = (pct: number) =>
  pct >= 80 ? "bg-accent" : pct >= 50 ? "bg-primary" : pct >= 25 ? "bg-yellow-500" : "bg-destructive";

export default function Users() {
  const { sections, totalFieldCount } = useAttributes();
  const [search, setSearch] = useState("");

  const rows = useMemo(() => {
    const allFieldIds = sections.flatMap(s => s.fields.map(f => f.id));
    return mockRows.map(u => {
      const filled = u.filledFieldIds.filter(id => allFieldIds.includes(id)).length;
      const pct = totalFieldCount === 0 ? 0 : Math.round((filled / totalFieldCount) * 100);
      return { ...u, filled, pct };
    });
  }, [sections, totalFieldCount]);

  const filtered = rows.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase()) ||
    r.role.toLowerCase().includes(search.toLowerCase())
  );

  const avg = rows.length ? Math.round(rows.reduce((s, r) => s + r.pct, 0) / rows.length) : 0;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-sm text-muted-foreground">Profile completion is calculated from custom attributes</p>
        </div>
        <div className="flex items-center gap-3">
          <Card className="px-4 py-2 flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Avg. completion</span>
            <span className="text-lg font-bold text-primary">{avg}%</span>
          </Card>
          <Card className="px-4 py-2 flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Custom fields</span>
            <span className="text-lg font-bold">{totalFieldCount}</span>
          </Card>
        </div>
      </div>

      <Card className="p-4">
        <div className="relative mb-4 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="text-left p-3 font-medium">User</th>
                <th className="text-left p-3 font-medium hidden md:table-cell">Contact</th>
                <th className="text-left p-3 font-medium">Role</th>
                <th className="text-left p-3 font-medium hidden lg:table-cell">Branch</th>
                <th className="text-left p-3 font-medium min-w-[220px]">Profile Completion</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/60 text-primary-foreground flex items-center justify-center text-xs font-semibold">
                        {u.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-medium">{u.name}</p>
                        <p className="text-xs text-muted-foreground md:hidden">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 hidden md:table-cell">
                    <div className="flex flex-col text-xs text-muted-foreground gap-0.5">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{u.email}</span>
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{u.phone}</span>
                    </div>
                  </td>
                  <td className="p-3"><Badge variant="secondary">{u.role}</Badge></td>
                  <td className="p-3 hidden lg:table-cell text-muted-foreground">{u.branch}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full ${progressColor(u.pct)} transition-all`} style={{ width: `${u.pct}%` }} />
                      </div>
                      <span className="text-xs font-semibold w-10 text-right">{u.pct}%</span>
                      <span className="text-[10px] text-muted-foreground hidden xl:inline">{u.filled}/{totalFieldCount}</span>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-sm text-muted-foreground">No users found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
