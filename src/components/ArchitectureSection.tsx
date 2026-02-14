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

const AnimatedConnector = ({ side }: { side: "left" | "right" }) => {
  const isLeft = side === "left";
  return (
    <svg
      className="absolute top-0 hidden h-full lg:block"
      style={{
        [isLeft ? "right" : "left"]: "-50px",
        width: "100px",
      }}
      viewBox="0 0 100 500"
      preserveAspectRatio="none"
      fill="none"
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const y = 50 + i * 100;
        const startX = isLeft ? 0 : 100;
        const endX = isLeft ? 100 : 0;
        const midX = 50;
        const path = `M ${startX} ${y} Q ${midX} ${y} ${endX} 250`;
        return (
          <g key={i}>
            {/* Thick background line */}
            <path
              d={path}
              stroke="hsl(var(--primary) / 0.12)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            {/* Animated dashed line on top */}
            <path
              d={path}
              stroke="hsl(var(--primary) / 0.35)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="8 12"
              strokeLinecap="round"
              className="animate-dash-flow"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
            {/* Animated dot traveling along path */}
            <circle r="4" fill="hsl(var(--primary))">
              <animateMotion
                dur={`${2.5 + i * 0.3}s`}
                repeatCount="indefinite"
                begin={`${i * 0.5}s`}
              >
                <mpath href={`#connector-${side}-${i}`} />
              </animateMotion>
            </circle>
            <path id={`connector-${side}-${i}`} d={path} fill="none" />
            {/* Static dots at endpoints */}
            <circle cx={startX} cy={y} r="5" fill="hsl(var(--primary) / 0.2)" />
            <circle cx={startX} cy={y} r="3" fill="hsl(var(--primary))" />
            {/* Glow dot at center */}
            <circle cx={endX} cy={250} r="6" fill="hsl(var(--primary) / 0.15)" />
          </g>
        );
      })}
      {/* Center endpoint big dot */}
      <circle cx={isLeft ? 100 : 0} cy={250} r="5" fill="hsl(var(--primary))" />
    </svg>
  );
};

const ArchitectureSection = () => {
  return (
    <section id="features" className="section-gray relative py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--primary) / 0.04) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-3 text-2xl font-extrabold text-primary sm:text-4xl">Platform Architecture</h2>
          <p className="text-muted-foreground">Everything connects through Dwamee's intelligent workforce hub</p>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
          <div className="relative space-y-4">
            {leftFeatures.map((f, i) => (
              <FeatureCard key={i} feature={f} index={i} side="left" />
            ))}
            <AnimatedConnector side="left" />
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-6 rounded-full animate-pulse-glow"
                style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)" }}
              />
              <div className="absolute -inset-12 rounded-full"
                style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.04) 0%, transparent 70%)" }}
              />
              <div className="glow-circle relative z-10 flex h-32 w-32 items-center justify-center rounded-full bg-card border-2 border-primary/20 sm:h-40 sm:w-40">
                <div className="text-center">
                  <p className="text-2xl font-extrabold gradient-text sm:text-3xl">D</p>
                  <p className="text-sm font-bold text-primary sm:text-base">Dwamee</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="relative space-y-4">
            <AnimatedConnector side="right" />
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
