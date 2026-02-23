import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, MoreHorizontal, MapPin, GitBranch } from "lucide-react";
import DashboardFilters from "@/components/DashboardFilters";

const mockGroups = [
  { id: 1, name: "Engineering Team", places: ["Main Office", "Factory Floor"], branch: "Cairo HQ" },
  { id: 2, name: "Sales Team", places: ["Main Office"], branch: "Alexandria Branch" },
  { id: 3, name: "Warehouse Staff", places: ["Warehouse A", "Remote Site B"], branch: "Giza Office" },
  { id: 4, name: "Management", places: ["Main Office"], branch: "Cairo HQ" },
];

export default function Groups() {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filtered = mockGroups.filter((g) => g.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Groups</h1>
          <p className="text-muted-foreground text-sm">Organize employees into groups</p>
        </div>
        <Button className="btn-primary"><Plus className="w-4 h-4 mr-2" /> Add Group</Button>
      </div>

      <DashboardFilters searchValue={search} onSearchChange={setSearch} startDate={startDate} onStartDateChange={setStartDate} endDate={endDate} onEndDateChange={setEndDate} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((group) => (
          <Card key={group.id} className="group hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              <h3 className="font-semibold text-foreground text-lg">{group.name}</h3>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-2">
                <GitBranch className="w-3.5 h-3.5" /> {group.branch}
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {group.places.map((p) => (
                  <Badge key={p} variant="secondary" className="flex items-center gap-1 text-xs">
                    <MapPin className="w-3 h-3" /> {p}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
