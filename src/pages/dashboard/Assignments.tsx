import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Layers, Phone } from "lucide-react";
import DashboardFilters from "@/components/DashboardFilters";

const mockAssignments = [
  { id: 1, name: "Ahmed Hassan", phone: "+20 112 345 6789", fields: ["Construction Site Alpha", "Logistics Hub"] },
  { id: 2, name: "Sara Mohamed", phone: "+20 100 987 6543", fields: ["Downtown Office Block"] },
  { id: 3, name: "Omar Ali", phone: "+20 115 222 3344", fields: ["Construction Site Alpha"] },
  { id: 4, name: "Nour Ibrahim", phone: "+20 101 555 7788", fields: ["Logistics Hub", "Downtown Office Block"] },
  { id: 5, name: "Youssef Kamal", phone: "+20 112 444 9900", fields: ["Construction Site Alpha", "Downtown Office Block", "Logistics Hub"] },
];

export default function Assignments() {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filtered = mockAssignments.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Assignments</h1>
        <p className="text-muted-foreground text-sm">View employee field assignments</p>
      </div>

      <DashboardFilters searchValue={search} onSearchChange={setSearch} startDate={startDate} onStartDateChange={setStartDate} endDate={endDate} onEndDateChange={setEndDate} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((person) => (
          <Card key={person.id} className="group hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground">{person.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Phone className="w-3 h-3" /> {person.phone}
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1"><Layers className="w-3 h-3" /> Assigned Fields</p>
                <div className="flex flex-wrap gap-1.5">
                  {person.fields.map((f) => (
                    <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
