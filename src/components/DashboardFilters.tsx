import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

interface DashboardFiltersProps {
  searchValue: string;
  onSearchChange: (v: string) => void;
  startDate: string;
  onStartDateChange: (v: string) => void;
  endDate: string;
  onEndDateChange: (v: string) => void;
}

export default function DashboardFilters({
  searchValue, onSearchChange, startDate, onStartDateChange, endDate, onEndDateChange,
}: DashboardFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <div className="relative flex-1 min-w-[200px] max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search by name..." value={searchValue} onChange={(e) => onSearchChange(e.target.value)} className="pl-9" />
      </div>
      <Input type="date" value={startDate} onChange={(e) => onStartDateChange(e.target.value)} className="w-[160px]" />
      <Input type="date" value={endDate} onChange={(e) => onEndDateChange(e.target.value)} className="w-[160px]" />
      <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-1" /> Filter</Button>
    </div>
  );
}
