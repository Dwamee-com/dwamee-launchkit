import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layers, Plus, MoreHorizontal, Calendar, FileText } from "lucide-react";
import DashboardFilters from "@/components/DashboardFilters";

const mockFields = [
  { id: 1, name: "Construction Site Alpha", groups: ["Engineering Team", "Warehouse Staff"], note: "Active site – safety gear required", createdAt: "2025-02-10" },
  { id: 2, name: "Downtown Office Block", groups: ["Sales Team", "Management"], note: "Standard hours apply", createdAt: "2025-04-18" },
  { id: 3, name: "Logistics Hub", groups: ["Warehouse Staff"], note: "24/7 shift rotation", createdAt: "2025-07-05" },
];

export default function Fields() {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filtered = mockFields.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Fields</h1>
          <p className="text-muted-foreground text-sm">Manage work fields and their group assignments</p>
        </div>
        <Button className="btn-primary"><Plus className="w-4 h-4 mr-2" /> Add Field</Button>
      </div>

      <DashboardFilters searchValue={search} onSearchChange={setSearch} startDate={startDate} onStartDateChange={setStartDate} endDate={endDate} onEndDateChange={setEndDate} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((field) => (
          <Card key={field.id} className="group hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Layers className="w-5 h-5 text-primary" />
                </div>
                <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              <h3 className="font-semibold text-foreground text-lg">{field.name}</h3>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-2">
                <FileText className="w-3.5 h-3.5" /> {field.note}
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {field.groups.map((g) => (
                  <Badge key={g} variant="secondary" className="text-xs">{g}</Badge>
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-3">
                <Calendar className="w-3 h-3" /> Created {field.createdAt}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
