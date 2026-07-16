import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Gauge, MapPin, Timer, Search, Paperclip, FileText, Image as ImageIcon, Download, Route } from "lucide-react";

type VisitStatus = "completed" | "in_progress" | "cancelled" | "scheduled";

interface Visit {
  id: string;
  name: string;
  client: string;
  employee: string;
  start: string;
  end: string;
  status: VisitStatus;
  km: number;
  avgSpeed: number;
  durationMin: number;
  notes: string;
  attachments: { id: string; name: string; type: "image" | "doc"; size: string }[];
}

const mockVisits: Visit[] = [
  { id: "v1", name: "Client Site Inspection - Cairo Tower", client: "Cairo Tower Ltd", employee: "Ahmed Hassan", start: "2026-07-16 09:20", end: "2026-07-16 11:05", status: "completed", km: 24.6, avgSpeed: 42, durationMin: 105, notes: "Inspected the site perimeter. All safety protocols in place. Discussed the upcoming renovation phase with the on-site manager.", attachments: [{ id: "a1", name: "site_photo_01.jpg", type: "image", size: "2.4 MB" }, { id: "a2", name: "checklist.pdf", type: "doc", size: "180 KB" }, { id: "a3", name: "site_photo_02.jpg", type: "image", size: "1.9 MB" }] },
  { id: "v2", name: "Delivery Route - Nasr City", client: "Nile Logistics", employee: "Sara Ali", start: "2026-07-16 08:00", end: "2026-07-16 10:15", status: "completed", km: 38.2, avgSpeed: 51, durationMin: 135, notes: "Completed 8 deliveries. Two customers were not available - rescheduled for tomorrow.", attachments: [{ id: "a4", name: "delivery_manifest.pdf", type: "doc", size: "320 KB" }] },
  { id: "v3", name: "Sales Meeting - Alexandria", client: "Mediterranean Corp", employee: "Omar Khalid", start: "2026-07-16 13:00", end: "-", status: "in_progress", km: 12.8, avgSpeed: 38, durationMin: 62, notes: "Meeting with procurement team.", attachments: [] },
  { id: "v4", name: "Maintenance Visit - Giza Branch", client: "Giza Retail", employee: "Lina Farouk", start: "2026-07-15 14:30", end: "2026-07-15 16:00", status: "completed", km: 18.4, avgSpeed: 35, durationMin: 90, notes: "Replaced faulty POS unit. System back online at 15:45.", attachments: [{ id: "a5", name: "invoice.pdf", type: "doc", size: "95 KB" }, { id: "a6", name: "pos_before.jpg", type: "image", size: "1.2 MB" }] },
  { id: "v5", name: "Prospect Visit - Heliopolis", client: "Heliopolis Group", employee: "Youssef Nader", start: "2026-07-17 10:00", end: "-", status: "scheduled", km: 0, avgSpeed: 0, durationMin: 0, notes: "Initial pitch scheduled with the CFO.", attachments: [] },
  { id: "v6", name: "Cancelled - Maadi Follow-up", client: "Maadi Traders", employee: "Ahmed Hassan", start: "2026-07-15 11:00", end: "-", status: "cancelled", km: 0, avgSpeed: 0, durationMin: 0, notes: "Client rescheduled to next week.", attachments: [] },
];

const statusStyle: Record<VisitStatus, string> = {
  completed: "bg-accent/10 text-accent border-accent/30",
  in_progress: "bg-primary/10 text-primary border-primary/30",
  scheduled: "bg-muted text-muted-foreground border-border",
  cancelled: "bg-destructive/10 text-destructive border-destructive/30",
};

const statusLabel: Record<VisitStatus, string> = {
  completed: "Completed",
  in_progress: "In Progress",
  scheduled: "Scheduled",
  cancelled: "Cancelled",
};

export default function Visits() {
  const [selectedId, setSelectedId] = useState("v1");
  const [search, setSearch] = useState("");
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({});

  const filtered = mockVisits.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.client.toLowerCase().includes(search.toLowerCase()) ||
    v.employee.toLowerCase().includes(search.toLowerCase())
  );
  const selected = mockVisits.find(v => v.id === selectedId) ?? mockVisits[0];
  const notes = notesDraft[selected.id] ?? selected.notes;

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Visits</h1>
        <p className="text-sm text-muted-foreground">Track and review field visits, routes and attachments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-4 flex-1 min-h-0">
        {/* Left list */}
        <Card className="flex flex-col min-h-0 overflow-hidden">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search visits..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <ul className="divide-y divide-border">
              {filtered.map(v => (
                <li key={v.id}>
                  <button
                    onClick={() => setSelectedId(v.id)}
                    className={`w-full text-left p-4 hover:bg-muted/50 transition-colors ${selectedId === v.id ? "bg-primary/5 border-l-4 border-primary" : "border-l-4 border-transparent"}`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-medium text-sm truncate">{v.name}</p>
                      <Badge variant="outline" className={`shrink-0 text-[10px] ${statusStyle[v.status]}`}>{statusLabel[v.status]}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{v.client} · {v.employee}</p>
                    <p className="text-xs text-muted-foreground mt-1">{v.start} → {v.end}</p>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && <li className="p-6 text-center text-sm text-muted-foreground">No visits found</li>}
            </ul>
          </ScrollArea>
        </Card>

        {/* Right detail */}
        <div className="flex flex-col gap-4 min-h-0 overflow-auto">
          <Card className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div>
                <h2 className="text-xl font-bold">{selected.name}</h2>
                <p className="text-sm text-muted-foreground">{selected.client} · Assigned to {selected.employee}</p>
                <p className="text-xs text-muted-foreground mt-1">{selected.start} → {selected.end}</p>
              </div>
              <Badge variant="outline" className={statusStyle[selected.status]}>{statusLabel[selected.status]}</Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1"><Route className="w-4 h-4" /> Distance</div>
                <p className="text-2xl font-bold">{selected.km} <span className="text-sm font-normal text-muted-foreground">km</span></p>
              </div>
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1"><Gauge className="w-4 h-4" /> Avg. Speed</div>
                <p className="text-2xl font-bold">{selected.avgSpeed} <span className="text-sm font-normal text-muted-foreground">km/h</span></p>
              </div>
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1"><Timer className="w-4 h-4" /> Duration</div>
                <p className="text-2xl font-bold">{Math.floor(selected.durationMin / 60)}h {selected.durationMin % 60}m</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-primary" />
              <h3 className="font-semibold">Notes</h3>
            </div>
            <Textarea
              value={notes}
              onChange={e => setNotesDraft(d => ({ ...d, [selected.id]: e.target.value }))}
              className="min-h-[120px]"
              placeholder="Add notes about this visit..."
            />
            <div className="flex justify-end mt-3">
              <Button size="sm">Save Notes</Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-primary" />
                <h3 className="font-semibold">File Attachments</h3>
                <Badge variant="secondary">{selected.attachments.length}</Badge>
              </div>
              <Button size="sm" variant="outline">Upload</Button>
            </div>
            {selected.attachments.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No attachments yet</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                {selected.attachments.map(a => (
                  <div key={a.id} className="rounded-xl border border-border bg-muted/20 p-3 hover:bg-muted/40 transition-colors group">
                    <div className="aspect-video rounded-lg bg-background flex items-center justify-center mb-2 border border-border">
                      {a.type === "image" ? <ImageIcon className="w-8 h-8 text-muted-foreground" /> : <FileText className="w-8 h-8 text-muted-foreground" />}
                    </div>
                    <p className="text-xs font-medium truncate">{a.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-[10px] text-muted-foreground">{a.size}</p>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity"><Download className="w-3 h-3" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
