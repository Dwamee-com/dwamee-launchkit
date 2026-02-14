import { motion } from "framer-motion";
import { Calendar, Users, Clock, Sun, Moon, Coffee } from "lucide-react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface ShiftEvent {
  day: number;
  type: "morning" | "evening" | "night" | "off";
  label: string;
  employees: number;
}

const shifts: ShiftEvent[] = [
  { day: 1, type: "morning", label: "Morning", employees: 12 },
  { day: 2, type: "morning", label: "Morning", employees: 14 },
  { day: 3, type: "evening", label: "Evening", employees: 10 },
  { day: 4, type: "morning", label: "Morning", employees: 13 },
  { day: 5, type: "night", label: "Night", employees: 6 },
  { day: 6, type: "off", label: "Off Day", employees: 0 },
  { day: 7, type: "off", label: "Off Day", employees: 0 },
  { day: 8, type: "morning", label: "Morning", employees: 15 },
  { day: 9, type: "evening", label: "Evening", employees: 11 },
  { day: 10, type: "morning", label: "Morning", employees: 14 },
  { day: 11, type: "morning", label: "Morning", employees: 13 },
  { day: 12, type: "night", label: "Night", employees: 7 },
  { day: 13, type: "evening", label: "Evening", employees: 9 },
  { day: 14, type: "morning", label: "Morning", employees: 12 },
  { day: 15, type: "morning", label: "Morning", employees: 16 },
  { day: 16, type: "evening", label: "Evening", employees: 10 },
  { day: 17, type: "morning", label: "Morning", employees: 14 },
  { day: 18, type: "night", label: "Night", employees: 5 },
  { day: 19, type: "morning", label: "Morning", employees: 13 },
  { day: 20, type: "off", label: "Off Day", employees: 0 },
  { day: 21, type: "off", label: "Off Day", employees: 0 },
  { day: 22, type: "morning", label: "Morning", employees: 15 },
  { day: 23, type: "morning", label: "Morning", employees: 14 },
  { day: 24, type: "evening", label: "Evening", employees: 11 },
  { day: 25, type: "morning", label: "Morning", employees: 12 },
  { day: 26, type: "night", label: "Night", employees: 6 },
  { day: 27, type: "morning", label: "Morning", employees: 13 },
  { day: 28, type: "evening", label: "Evening", employees: 10 },
];

const shiftConfig = {
  morning: { icon: Sun, color: "bg-primary/10 text-primary border-primary/20", dot: "bg-primary" },
  evening: { icon: Coffee, color: "bg-accent/10 text-accent border-accent/20", dot: "bg-accent" },
  night: { icon: Moon, color: "bg-muted text-muted-foreground border-border", dot: "bg-muted-foreground" },
  off: { icon: Clock, color: "bg-muted/50 text-muted-foreground/50 border-transparent", dot: "bg-muted-foreground/30" },
};

// Fill leading empty cells (Feb starts on Saturday = index 6)
const startDayOffset = 6;

const stats = [
  { label: "Total Shifts", value: "84", icon: Calendar },
  { label: "Employees", value: "48", icon: Users },
  { label: "Avg Hours/Week", value: "42h", icon: Clock },
];

const ShiftCalendarSection = () => {
  return (
    <section className="section-gray relative py-20 sm:py-28">
      <div className="container mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <h2 className="mb-3 text-2xl font-extrabold text-primary sm:text-4xl">
            Smart Shift Management
          </h2>
          <p className="text-muted-foreground">Visual shift planning with real-time coverage insights</p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-feature text-center"
            >
              <s.icon size={20} className="mx-auto mb-2 text-primary" />
              <p className="text-xl font-extrabold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-border bg-card p-4 sm:p-6"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-foreground">February 2026</h3>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-primary" /> Morning</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-accent" /> Evening</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-muted-foreground" /> Night</span>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
            {daysOfWeek.map((d) => (
              <div key={d} className="text-center text-xs font-semibold text-muted-foreground py-2">{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {/* Empty cells for offset */}
            {Array.from({ length: startDayOffset }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {/* Day cells */}
            {shifts.map((shift, i) => {
              const config = shiftConfig[shift.type];
              const Icon = config.icon;
              return (
                <motion.div
                  key={shift.day}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.02, duration: 0.3 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className={`relative rounded-xl border p-2 sm:p-3 cursor-default transition-colors ${config.color}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold">{shift.day}</span>
                    <span className={`h-2 w-2 rounded-full ${config.dot}`} />
                  </div>
                  <Icon size={14} className="mb-1" />
                  <p className="text-[9px] sm:text-[10px] font-medium leading-tight">{shift.label}</p>
                  {shift.employees > 0 && (
                    <p className="text-[8px] sm:text-[9px] opacity-70 mt-0.5">{shift.employees} staff</p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShiftCalendarSection;
