import { motion } from "framer-motion";
import {
  Wifi, WifiOff, DollarSign, Award, ListTodo,
  Star, Trophy, MapPin
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface FlyingFeature {
  icon: LucideIcon;
  label: string;
  delay: number;
  color: "primary" | "accent";
  x: string;
  y: string;
}

const features: FlyingFeature[] = [
  { icon: Wifi, label: "Online Attendance", delay: 0.3, color: "primary", x: "5%", y: "20%" },
  { icon: WifiOff, label: "Offline Attendance", delay: 0.5, color: "primary", x: "75%", y: "15%" },
  { icon: DollarSign, label: "Payroll Auto-Calc", delay: 0.7, color: "accent", x: "2%", y: "55%" },
  { icon: Award, label: "Bonuses & Deductions", delay: 0.4, color: "accent", x: "78%", y: "50%" },
  { icon: ListTodo, label: "Employee Tasks", delay: 0.6, color: "primary", x: "10%", y: "80%" },
  { icon: Star, label: "Performance Rating", delay: 0.8, color: "primary", x: "72%", y: "78%" },
  { icon: Trophy, label: "Top Performer", delay: 0.9, color: "accent", x: "30%", y: "88%" },
  { icon: MapPin, label: "Real-Time Location", delay: 1.0, color: "primary", x: "58%", y: "90%" },
];

const PopupCard = ({ feature }: { feature: FlyingFeature }) => {
  const isAccent = feature.color === "accent";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: feature.delay,
        duration: 0.6,
        type: "spring",
        stiffness: 180,
        damping: 15,
      }}
      className="absolute z-10 hidden sm:block"
      style={{ left: feature.x, top: feature.y }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3 + feature.delay, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.1, rotate: 2 }}
        className="card-feature flex items-center gap-2.5 px-4 py-2.5 whitespace-nowrap cursor-default"
        style={{ boxShadow: "var(--shadow-card), 0 0 20px hsl(var(--primary) / 0.08)" }}
      >
        <motion.div
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: feature.delay }}
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${isAccent ? 'bg-accent/10' : 'bg-primary/10'}`}
        >
          <feature.icon size={16} className={isAccent ? 'text-accent' : 'text-primary'} />
        </motion.div>
        <span className="text-xs font-semibold text-foreground">{feature.label}</span>
      </motion.div>
    </motion.div>
  );
};

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-24 sm:py-36">
      {/* Rectangle pattern background */}
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.04) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      {/* Larger rectangles overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.06) 2px, transparent 2px),
            linear-gradient(90deg, hsl(var(--primary) / 0.06) 2px, transparent 2px)
          `,
          backgroundSize: "192px 192px",
        }}
      />

      <div className="container mx-auto max-w-5xl px-4 relative min-h-[420px] sm:min-h-[500px]">
        {/* Flying popup badges */}
        {features.map((f, i) => (
          <PopupCard key={i} feature={f} />
        ))}

        {/* Centered text */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-20 mx-auto max-w-2xl text-center"
        >
          <h1 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-primary sm:text-5xl lg:text-6xl">
            Dwamee: Precision Attendance & Workforce Management
          </h1>
          <p className="mb-8 text-base text-muted-foreground sm:text-lg">
            Accurate tracking online or offline – with unmatched security and smart payroll.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.a
              href="#features"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary text-base"
            >
              Get Started Free
            </motion.a>
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-semibold text-primary border-2 border-primary/20 bg-card transition-all duration-300 hover:border-primary/40"
              style={{ boxShadow: "var(--shadow-neu)" }}
            >
              View Pricing
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
