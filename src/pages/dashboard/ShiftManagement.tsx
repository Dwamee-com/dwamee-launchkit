import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Clock, Upload, Download, ChevronDown, MapPin, User, FileSpreadsheet, Plus, Trash2, Settings2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const mockUsers = [
  { id: "1", name: "Ahmed Hassan", avatar: "AH" },
  { id: "2", name: "Sara Ali", avatar: "SA" },
  { id: "3", name: "Mohamed Khalil", avatar: "MK" },
  { id: "4", name: "Fatma Nour", avatar: "FN" },
  { id: "5", name: "Omar Youssef", avatar: "OY" },
];

const mockPlaces = [
  { id: "p1", name: "Main Office" },
  { id: "p2", name: "Branch A" },
  { id: "p3", name: "Branch B" },
  { id: "p4", name: "Remote Site" },
];

const days = [
  { key: "sat", label: "Saturday" },
  { key: "sun", label: "Sunday" },
  { key: "mon", label: "Monday" },
  { key: "tue", label: "Tuesday" },
  { key: "wed", label: "Wednesday" },
  { key: "thu", label: "Thursday" },
  { key: "fri", label: "Friday" },
];

interface DayShift {
  enabled: boolean;
  startTime: string;
  endTime: string;
  place: string;
  lateAllowance: number;
  autoCloseAfter: number;
  trackingEnabled: boolean;
}

const defaultDayShift: DayShift = {
  enabled: false,
  startTime: "09:00",
  endTime: "17:00",
  place: "",
  lateAllowance: 15,
  autoCloseAfter: 30,
  trackingEnabled: true,
};

export default function ShiftManagement() {
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [shifts, setShifts] = useState<Record<string, DayShift>>(
    Object.fromEntries(days.map((d) => [d.key, { ...defaultDayShift }]))
  );
  const [openDetails, setOpenDetails] = useState<Record<string, boolean>>({});

  const toggleDay = (day: string) => {
    setShifts((prev) => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled },
    }));
  };

  const updateShift = (day: string, field: keyof DayShift, value: any) => {
    setShifts((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const enabledCount = Object.values(shifts).filter((s) => s.enabled).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Shift Management</h1>
          <p className="text-muted-foreground">Configure employee work shifts and schedules</p>
        </div>
      </div>

      <Tabs defaultValue="single" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="single" className="gap-2">
            <User className="h-4 w-4" /> Per User
          </TabsTrigger>
          <TabsTrigger value="bulk" className="gap-2">
            <FileSpreadsheet className="h-4 w-4" /> Bulk Upload
          </TabsTrigger>
        </TabsList>

        {/* === TAB 1: Per User === */}
        <TabsContent value="single" className="mt-6 space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Select Employee</CardTitle>
              <CardDescription>Choose an employee to configure their weekly shift</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger className="max-w-sm">
                  <SelectValue placeholder="Select an employee..." />
                </SelectTrigger>
                <SelectContent>
                  {mockUsers.map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                          {u.avatar}
                        </div>
                        {u.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <AnimatePresence>
            {selectedUser && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Weekly Schedule</h2>
                  <Badge variant="secondary" className="gap-1">
                    <Clock className="h-3 w-3" />
                    {enabledCount} days active
                  </Badge>
                </div>

                <div className="grid gap-3">
                  {days.map((day, i) => {
                    const shift = shifts[day.key];
                    const isOpen = openDetails[day.key] || false;
                    return (
                      <motion.div
                        key={day.key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Card className={`transition-all ${shift.enabled ? "border-primary/30 shadow-sm" : "opacity-70"}`}>
                          <CardContent className="p-4 space-y-4">
                            {/* Day header */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Switch
                                  checked={shift.enabled}
                                  onCheckedChange={() => toggleDay(day.key)}
                                />
                                <span className={`font-medium ${shift.enabled ? "text-foreground" : "text-muted-foreground"}`}>
                                  {day.label}
                                </span>
                                {shift.enabled && shift.place && (
                                  <Badge variant="outline" className="gap-1 text-xs">
                                    <MapPin className="h-3 w-3" />
                                    {mockPlaces.find((p) => p.id === shift.place)?.name}
                                  </Badge>
                                )}
                              </div>
                              {shift.enabled && (
                                <span className="text-sm text-muted-foreground">
                                  {shift.startTime} – {shift.endTime}
                                </span>
                              )}
                            </div>

                            {/* Day config */}
                            {shift.enabled && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                className="space-y-4"
                              >
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground">Start Time</Label>
                                    <Input
                                      type="time"
                                      value={shift.startTime}
                                      onChange={(e) => updateShift(day.key, "startTime", e.target.value)}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground">End Time</Label>
                                    <Input
                                      type="time"
                                      value={shift.endTime}
                                      onChange={(e) => updateShift(day.key, "endTime", e.target.value)}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground">Place</Label>
                                    <Select
                                      value={shift.place}
                                      onValueChange={(v) => updateShift(day.key, "place", v)}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select place" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {mockPlaces.map((p) => (
                                          <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>

                                {/* More Details */}
                                <Collapsible open={isOpen} onOpenChange={(o) => setOpenDetails((p) => ({ ...p, [day.key]: o }))}>
                                  <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
                                      <Settings2 className="h-3.5 w-3.5" />
                                      More Details
                                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                                    </Button>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent>
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      className="mt-3 p-4 rounded-lg bg-muted/50 border border-border space-y-4"
                                    >
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label className="text-xs text-muted-foreground">
                                            Late Allowance (minutes after start)
                                          </Label>
                                          <Input
                                            type="number"
                                            min={0}
                                            max={120}
                                            value={shift.lateAllowance}
                                            onChange={(e) => updateShift(day.key, "lateAllowance", parseInt(e.target.value) || 0)}
                                          />
                                          <p className="text-xs text-muted-foreground">
                                            Employee can be late up to {shift.lateAllowance} min without deduction
                                          </p>
                                        </div>
                                        <div className="space-y-2">
                                          <Label className="text-xs text-muted-foreground">
                                            Auto-close shift after (minutes)
                                          </Label>
                                          <Input
                                            type="number"
                                            min={0}
                                            max={240}
                                            value={shift.autoCloseAfter}
                                            onChange={(e) => updateShift(day.key, "autoCloseAfter", parseInt(e.target.value) || 0)}
                                          />
                                          <p className="text-xs text-muted-foreground">
                                            System auto-closes {shift.autoCloseAfter} min after shift end
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-background">
                                        <div>
                                          <p className="text-sm font-medium text-foreground">Location Tracking</p>
                                          <p className="text-xs text-muted-foreground">Track employee location during shift</p>
                                        </div>
                                        <Switch
                                          checked={shift.trackingEnabled}
                                          onCheckedChange={(v) => updateShift(day.key, "trackingEnabled", v)}
                                        />
                                      </div>
                                    </motion.div>
                                  </CollapsibleContent>
                                </Collapsible>
                              </motion.div>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline">Cancel</Button>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" /> Save Shift
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>

        {/* === TAB 2: Bulk Upload === */}
        <TabsContent value="bulk" className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Download className="h-5 w-5 text-primary" /> Download Template
                </CardTitle>
                <CardDescription>
                  Download the Excel template, fill in employee shifts, then upload it back.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-6 rounded-lg border-2 border-dashed border-border bg-muted/30 text-center space-y-3">
                  <FileSpreadsheet className="h-10 w-10 mx-auto text-primary/60" />
                  <p className="text-sm text-muted-foreground">
                    Template includes columns for employee, days, times, places, and settings
                  </p>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" /> Download .xlsx Template
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Upload className="h-5 w-5 text-accent" /> Upload Shifts
                </CardTitle>
                <CardDescription>
                  Upload a filled template to bulk-assign shifts to employees.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <label className="block p-6 rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 text-center cursor-pointer hover:bg-primary/10 transition-colors space-y-3">
                  <Upload className="h-10 w-10 mx-auto text-primary/60" />
                  <p className="text-sm font-medium text-foreground">
                    Click to upload or drag & drop
                  </p>
                  <p className="text-xs text-muted-foreground">.xlsx, .xls files only</p>
                  <input type="file" accept=".xlsx,.xls" className="hidden" />
                </label>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upload History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <FileSpreadsheet className="h-8 w-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">No uploads yet</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
