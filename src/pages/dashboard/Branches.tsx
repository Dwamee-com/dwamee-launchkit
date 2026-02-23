import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GitBranch, Plus, Calendar, MoreHorizontal } from "lucide-react";
import DashboardFilters from "@/components/DashboardFilters";

const mockBranches = [
  { id: 1, name: "Cairo HQ", createdAt: "2025-01-15" },
  { id: 2, name: "Alexandria Branch", createdAt: "2025-03-22" },
  { id: 3, name: "Giza Office", createdAt: "2025-06-10" },
  { id: 4, name: "Mansoura Branch", createdAt: "2025-09-01" },
];

export default function Branches() {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filtered = mockBranches.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Branches</h1>
          <p className="text-muted-foreground text-sm">Manage your organization branches</p>
        </div>
        <Button className="btn-primary"><Plus className="w-4 h-4 mr-2" /> Add Branch</Button>
      </div>

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
