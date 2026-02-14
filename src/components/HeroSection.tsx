import { motion } from "framer-motion";
import {
  Wifi, WifiOff, DollarSign, Award, ListTodo,
  Star, Trophy, MapPin
} from "lucide-react";
import PhoneMockup from "./PhoneMockup";
import type { LucideIcon } from "lucide-react";

interface FlyingFeature {
  icon: LucideIcon;
  label: string;
  delay: number;
  color: "primary" | "accent";
}

const features: FlyingFeature[] = [
  { icon: Wifi, label: "Online Attendance", delay: 0.2, color: "primary" },
  { icon: WifiOff, label: "Offline Attendance", delay: 0.4, color: "primary" },
  { icon: DollarSign, label: "Payroll Auto-Calc", delay: 0.6, color: "accent" },
  { icon: Award, label: "Bonuses & Deductions", delay: 0.3, color: "accent" },
  { icon: ListTodo, label: "Employee Tasks", delay: 0.5, color: "primary" },
  { icon: Star, label: "Performance Rating", delay: 0.7, color: "primary" },
  { icon: Trophy, label: "Top Performer", delay: 0.8, color: "accent" },
  { icon: MapPin, label: "Real-Time Location", delay: 0.9, color: "primary" },
];

const FlyingCard = ({ feature, index }: { feature: FlyingFeature; index: number }) => {
  const isAccent = feature.color === "accent";
  // Stagger grid layout: 2 columns, 4 rows
  const directions = [
    { x: -120, y: -60, rotate: -15 },
    { x: 120, y: -40, rotate: 12 },
    { x: -100, y: -20, rotate: -8 },
    { x: 140, y: 0, rotate: 18 },
    { x: -130, y: 30, rotate: -12 },
    { x: 110, y: 50, rotate: 10 },
    { x: -90, y: 70, rotate: -20 },
    { x: 130, y: 80, rotate: 15 },
  ];
  const dir = directions[index % directions.length];

  return (
    <motion.div
      initial={{ opacity: 0, x: dir.x, y: dir.y, rotate: dir.rotate, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
      transition={{
        delay: feature.delay,
        duration: 0.8,
        type: "spring",
        stiffness: 120,
        damping: 14,
      }}
      whileHover={{ scale: 1.08, y: -4 }}
      className="card-feature flex items-center gap-3 px-4 py-3 cursor-default"
    >
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: feature.delay }}
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${isAccent ? 'bg-accent/10' : 'bg-primary/10'}`}
      >
        <feature.icon size={18} className={isAccent ? 'text-accent' : 'text-primary'} />
      </motion.div>
      <span className="text-sm font-semibold text-foreground whitespace-nowrap">{feature.label}</span>
    </motion.div>
  );
};

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pb-20 pt-12 sm:pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 -z-10 opacity-30"
        style={{ backgroundImage: "radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.06) 0%, transparent 60%)" }}
      />

      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left: Text + flying feature cards */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-primary sm:text-5xl">
              Dwamee: Precision Attendance & Workforce Management
            </h1>
            <p className="mb-8 text-base text-muted-foreground sm:text-lg max-w-lg">
              Accurate tracking online or offline – with unmatched security and smart payroll.
            </p>
            <motion.a
              href="#features"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary text-base mb-10 inline-block"
            >
              Get Started Free
            </motion.a>

            {/* Flying feature cards grid */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {features.map((f, i) => (
                <FlyingCard key={i} feature={f} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Right: Phone mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
