import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Plus, MoreHorizontal, Navigation, Hexagon, Circle } from "lucide-react";
import DashboardFilters from "@/components/DashboardFilters";

const mockPlaces = [
  { id: 1, name: "Main Office", locationType: "point", attendanceType: "check-in-out", lat: 30.0444, lng: 31.2357, width: 50 },
  { id: 2, name: "Warehouse A", locationType: "polygon", attendanceType: "check-in", lat: 30.0131, lng: 31.2089, points: 5 },
  { id: 3, name: "Factory Floor", locationType: "area", attendanceType: "check-in-out", lat: 30.0561, lng: 31.2394, width: 200 },
  { id: 4, name: "Remote Site B", locationType: "polygon", attendanceType: "check-in", lat: 31.2001, lng: 29.9187, points: 8 },
];

export default function Places() {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filtered = mockPlaces.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const locationIcon = (type: string) => {
    if (type === "polygon") return <Hexagon className="w-3.5 h-3.5" />;
    if (type === "area") return <Circle className="w-3.5 h-3.5" />;
    return <Navigation className="w-3.5 h-3.5" />;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Places</h1>
          <p className="text-muted-foreground text-sm">Manage work locations and geofences</p>
        </div>
        <Button className="btn-primary"><Plus className="w-4 h-4 mr-2" /> Add Place</Button>
      </div>

      <DashboardFilters searchValue={search} onSearchChange={setSearch} startDate={startDate} onStartDateChange={setStartDate} endDate={endDate} onEndDateChange={setEndDate} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((place) => (
          <Card key={place.id} className="group hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              <h3 className="font-semibold text-foreground text-lg">{place.name}</h3>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                  {locationIcon(place.locationType)} {place.locationType}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {place.attendanceType === "check-in-out" ? "Check In/Out" : "Check In"}
                </Badge>
              </div>
              <div className="mt-3 text-xs text-muted-foreground space-y-0.5">
                <p>Lat: {place.lat} · Lng: {place.lng}</p>
                {place.locationType === "point" && <p>Radius: {place.width}m</p>}
                {place.locationType === "polygon" && <p>Points: {place.points}</p>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
