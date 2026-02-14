import { motion } from "framer-motion";
import {
  CheckCircle2, XCircle, Clock, MapPin, DollarSign,
  Shield, BarChart3, ListTodo, Trophy, Building2
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ComparisonItem {
  icon: LucideIcon;
  feature: string;
  without: string;
  with_: string;
}

const comparisons: ComparisonItem[] = [
  { icon: Clock, feature: "Attendance Tracking", without: "Manual paper logs, errors & delays", with_: "Auto clock-in with GPS & biometrics" },
  { icon: MapPin, feature: "Location Verification", without: "No way to verify employee location", with_: "Real-time geofencing & movement tracking" },
  { icon: DollarSign, feature: "Payroll Calculation", without: "Excel sheets, manual math mistakes", with_: "Auto salary calc with deductions & bonuses" },
  { icon: Shield, feature: "Fraud Prevention", without: "Buddy punching, fake check-ins", with_: "Anti-spoof: no VPN, mock GPS, or idle tricks" },
  { icon: BarChart3, feature: "Performance Insights", without: "Guesswork & subjective reviews", with_: "Data-driven analytics & dashboards" },
  { icon: ListTodo, feature: "Task Management", without: "Scattered WhatsApp messages", with_: "Structured tasks with ratings & tracking" },
  { icon: Trophy, feature: "Employee Recognition", without: "Overlooked top performers", with_: "Gamified leaderboards & badges" },
  { icon: Building2, feature: "Multi-Site Ops", without: "Separate systems per location", with_: "Unified dashboard for all sites" },
];

const ComparisonSection = () => {
  return (
    <section className="relative py-20 sm:py-28 bg-background">
      <div className="container mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <h2 className="mb-3 text-2xl font-extrabold sm:text-4xl">
            <span className="text-muted-foreground">Without Dwamee</span>
            {" "}vs{" "}
            <span className="text-primary">With Dwamee</span>
          </h2>
          <p className="text-muted-foreground">See the difference smart workforce management makes</p>
        </motion.div>

        <div className="space-y-3">
          {comparisons.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-6"
            >
              {/* Without */}
              <div className="flex items-center gap-3 rounded-2xl border border-destructive/15 bg-destructive/5 p-4 transition-all hover:border-destructive/25">
                <XCircle size={18} className="shrink-0 text-destructive" />
                <span className="text-sm text-muted-foreground">{item.without}</span>
              </div>

              {/* Center icon */}
              <div className="hidden md:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <item.icon size={18} className="text-primary" />
              </div>

              {/* With */}
              <div className="flex items-center gap-3 rounded-2xl border border-accent/20 bg-accent/5 p-4 transition-all hover:border-accent/40">
                <CheckCircle2 size={18} className="shrink-0 text-accent" />
                <span className="text-sm font-medium text-foreground">{item.with_}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
