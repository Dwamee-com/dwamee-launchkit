import { motion } from "framer-motion";
import {
  Wifi, MapPin, Fingerprint, ShieldAlert, BarChart3,
  DollarSign, Clock, Building2, Trophy, ListTodo
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const leftFeatures: Feature[] = [
  { icon: Wifi, title: "Flexible Online/Offline Clock-in", desc: "Seamless attendance even without internet" },
  { icon: MapPin, title: "Real-Time Movement & Geofencing", desc: "Track locations within defined zones" },
  { icon: Fingerprint, title: "Biometric + Device Binding", desc: "Multi-layer identity verification" },
  { icon: ShieldAlert, title: "Anti-Fraud Detection", desc: "No mock location, VPN, or idle spoofing" },
  { icon: BarChart3, title: "Hours & Performance Analytics", desc: "Comprehensive workforce insights" },
];

const rightFeatures: Feature[] = [
  { icon: DollarSign, title: "Auto Payroll & Salary Calc", desc: "Instant salary computation each period" },
  { icon: Clock, title: "Smart Deductions & Bonuses", desc: "Late/early deductions, overtime bonuses" },
  { icon: Building2, title: "Multi-Site Support", desc: "Manage multiple offices effortlessly" },
  { icon: Trophy, title: "Top Performer Ranking", desc: "Gamified leaderboards & recognition" },
  { icon: ListTodo, title: "Employee Tasks & Ratings", desc: "Assign, track, and rate task completion" },
];

const FeatureCard = ({ feature, index, side }: { feature: Feature; index: number; side: "left" | "right" }) => (
  <motion.div
    initial={{ opacity: 0, x: side === "left" ? -40 : 40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="card-feature flex items-start gap-3"
  >
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
      <feature.icon size={18} className="text-primary" />
    </div>
    <div>
      <h4 className="text-sm font-semibold text-foreground">{feature.title}</h4>
      <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
    </div>
  </motion.div>
);

const ConnectorLines = ({ side }: { side: "left" | "right" }) => {
  const isLeft = side === "left";
  return (
    <svg
      className="absolute top-0 hidden h-full lg:block"
      style={{
        [isLeft ? "right" : "left"]: "-30px",
        width: "60px",
      }}
      viewBox="0 0 60 500"
      preserveAspectRatio="none"
      fill="none"
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const y = 50 + i * 100;
        return (
          <line
            key={i}
            x1={isLeft ? 0 : 60}
            y1={y}
            x2={isLeft ? 60 : 0}
            y2={250}
            stroke="hsl(211 65% 47% / 0.2)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            className="animate-dash-flow"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        );
      })}
    </svg>
  );
};

const ArchitectureSection = () => {
  return (
    <section id="features" className="section-gray relative py-20 sm:py-28">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(211 65% 47% / 0.04) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container mx-auto max-w-6xl px-4">
        {/* Section header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-3 text-2xl font-extrabold text-primary sm:text-4xl">Platform Architecture</h2>
          <p className="text-muted-foreground">Everything connects through Dwamee's intelligent workforce hub</p>
        </motion.div>

        {/* Hub layout */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
          {/* Left features */}
          <div className="relative space-y-4">
            {leftFeatures.map((f, i) => (
              <FeatureCard key={i} feature={f} index={i} side="left" />
            ))}
            <ConnectorLines side="left" />
          </div>

          {/* Center hub */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Glow rings */}
              <div className="absolute -inset-6 rounded-full animate-pulse-glow"
                style={{ background: "radial-gradient(circle, hsl(211 65% 47% / 0.1) 0%, transparent 70%)" }}
              />
              <div className="absolute -inset-12 rounded-full"
                style={{ background: "radial-gradient(circle, hsl(211 65% 47% / 0.04) 0%, transparent 70%)" }}
              />
              {/* Logo circle */}
              <div className="glow-circle relative z-10 flex h-32 w-32 items-center justify-center rounded-full bg-card border-2 border-primary/20 sm:h-40 sm:w-40">
                <div className="text-center">
                  <p className="text-2xl font-extrabold gradient-text sm:text-3xl">D</p>
                  <p className="text-sm font-bold text-primary sm:text-base">Dwamee</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right features */}
          <div className="relative space-y-4">
            <ConnectorLines side="right" />
            {rightFeatures.map((f, i) => (
              <FeatureCard key={i} feature={f} index={i} side="right" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
