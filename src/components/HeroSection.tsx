import { motion } from "framer-motion";
import {
  Wifi, WifiOff, DollarSign, Award, ListTodo,
  Star, Trophy, MapPin
} from "lucide-react";
import PhoneMockup from "./PhoneMockup";
import FloatingBadge from "./FloatingBadge";

const badges = [
  { icon: Wifi, label: "Online Attendance", delay: 0.3, x: "-8%", y: "18%", color: "primary" as const },
  { icon: WifiOff, label: "Offline Attendance", delay: 0.5, x: "-5%", y: "48%", color: "primary" as const },
  { icon: DollarSign, label: "Payroll Auto-Calc", delay: 0.7, x: "-2%", y: "75%", color: "accent" as const },
  { icon: Award, label: "Bonuses & Deductions", delay: 0.4, x: "72%", y: "15%", color: "accent" as const },
  { icon: ListTodo, label: "Employee Tasks", delay: 0.6, x: "75%", y: "42%", color: "primary" as const },
  { icon: Star, label: "Performance Rating", delay: 0.8, x: "70%", y: "65%", color: "primary" as const },
  { icon: Trophy, label: "Top Performer", delay: 0.9, x: "8%", y: "90%", color: "accent" as const },
  { icon: MapPin, label: "Real-Time Location", delay: 1.0, x: "62%", y: "88%", color: "primary" as const },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pb-20 pt-12 sm:pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 -z-10 opacity-30"
        style={{ backgroundImage: "radial-gradient(circle at 50% 0%, hsl(211 65% 47% / 0.06) 0%, transparent 60%)" }}
      />

      <div className="container mx-auto max-w-6xl px-4">
        {/* Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-2xl text-center sm:mb-16"
        >
          <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-primary sm:text-5xl lg:text-6xl">
            Dwamee: Precision Attendance & Workforce Management
          </h1>
          <p className="mb-8 text-base text-muted-foreground sm:text-lg">
            Accurate tracking online or offline – with unmatched security and smart payroll.
          </p>
          <motion.a
            href="#features"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary text-base"
          >
            Get Started Free
          </motion.a>
        </motion.div>

        {/* Phone + Floating badges */}
        <div className="relative mx-auto max-w-3xl">
          {badges.map((b, i) => (
            <FloatingBadge key={i} {...b} />
          ))}
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
