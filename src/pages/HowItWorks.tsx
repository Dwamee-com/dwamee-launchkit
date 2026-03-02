import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  UserPlus, GitBranch, Users, UserCheck, CalendarDays,
  ClipboardCheck, Scale, Wallet, ArrowRight, ArrowDown, ArrowUp, CornerRightDown, CornerLeftUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  { id: 1, title: "Create Account", icon: UserPlus, color: "from-primary to-dwamee-blue-light" },
  { id: 2, title: "Add Branches", icon: GitBranch, color: "from-accent to-accent/80" },
  { id: 3, title: "Add Groups", icon: Users, color: "from-primary to-dwamee-blue-light" },
  { id: 4, title: "Add Employees", icon: UserCheck, color: "from-accent to-accent/80" },
  { id: 5, title: "Calendar Setup", icon: CalendarDays, color: "from-primary to-dwamee-blue-light" },
  { id: 6, title: "Attendance", icon: ClipboardCheck, color: "from-accent to-accent/80" },
  { id: 7, title: "Payroll Rules", icon: Scale, color: "from-primary to-dwamee-blue-light" },
  { id: 8, title: "Salaries", icon: Wallet, color: "from-accent to-accent/80" },
];

/* ---- Arrow components ---- */
const HArrow = () => (
  <div className="hidden lg:flex items-center justify-center w-12 shrink-0">
    <svg width="40" height="24" viewBox="0 0 40 24" className="text-primary/30">
      <path d="M2 12 Q10 4, 20 12 Q30 20, 38 12" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" className="animate-dash-flow" />
      <polygon points="34,8 40,12 34,16" fill="currentColor" />
    </svg>
  </div>
);

const VArrowDown = () => (
  <div className="hidden lg:flex justify-end pr-16 py-2">
    <svg width="24" height="48" viewBox="0 0 24 48" className="text-primary/30">
      <path d="M12 2 Q4 12, 12 24 Q20 36, 12 46" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" className="animate-dash-flow" />
      <polygon points="8,42 12,48 16,42" fill="currentColor" />
    </svg>
  </div>
);

const LoopArrow = () => (
  <div className="hidden lg:block mt-4 mb-2">
    <svg width="100%" height="80" viewBox="0 0 900 80" preserveAspectRatio="xMidYMid meet" className="text-primary/25">
      <path
        d="M820 10 C860 10, 880 40, 880 50 C880 65, 860 75, 820 75 L80 75 C40 75, 20 65, 20 50 C20 40, 40 10, 80 10"
        fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" className="animate-dash-flow"
      />
      <polygon points="75,5 85,5 80,15" fill="currentColor" />
    </svg>
  </div>
);

/* Mobile arrow */
const MobileArrow = () => (
  <div className="flex lg:hidden justify-center py-1">
    <svg width="24" height="28" viewBox="0 0 24 28" className="text-primary/30">
      <path d="M12 2 Q6 10, 12 14 Q18 18, 12 26" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" className="animate-dash-flow" />
      <polygon points="8,23 12,28 16,23" fill="currentColor" />
    </svg>
  </div>
);

function StepBlock({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group"
    >
      <div className="relative bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center w-full min-h-[160px] flex flex-col items-center justify-center gap-3">
        {/* Step number */}
        <span className="absolute top-2 left-3 text-xs font-bold text-muted-foreground/50">
          {String(step.id).padStart(2, "0")}
        </span>

        <motion.div
          whileHover={{ rotate: 8, scale: 1.1 }}
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-md`}
        >
          <Icon className="w-7 h-7 text-primary-foreground" />
        </motion.div>

        <h3 className="text-sm font-bold text-foreground leading-tight">{step.title}</h3>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const navigate = useNavigate();
  const row1 = steps.slice(0, 4); // items 1-4
  const row2 = steps.slice(4);     // items 5-8 (displayed reversed for right-to-left flow visually, but logically 5→8)

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 sm:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3 bg-primary/10 px-4 py-1.5 rounded-full">
            The Process
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4">
            How It <span className="gradient-text">Works</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto text-lg">
            A continuous lifecycle — from account setup to automated payroll, every month.
          </p>
        </motion.div>

        {/* Desktop: 2-row horizontal grid */}
        <div className="hidden lg:block">
          {/* Row 1: items 1 → 2 → 3 → 4 */}
          <div className="flex items-center justify-center">
            {row1.map((step, i) => (
              <div key={step.id} className="flex items-center">
                <div className="w-[180px]">
                  <StepBlock step={step} index={i} />
                </div>
                {i < row1.length - 1 && <HArrow />}
              </div>
            ))}
          </div>

          {/* Down arrow from item 4 to row 2 */}
          <VArrowDown />

          {/* Row 2: items 5 → 6 → 7 → 8 (displayed right-to-left so 5 is under 4) */}
          <div className="flex items-center justify-center flex-row-reverse">
            {row2.map((step, i) => (
              <div key={step.id} className="flex items-center flex-row-reverse">
                <div className="w-[180px]">
                  <StepBlock step={step} index={i + 4} />
                </div>
                {i < row2.length - 1 && <HArrow />}
              </div>
            ))}
          </div>

          {/* Loop arrow from 8 (bottom-left) back to 1 (top-left) */}
          <LoopArrow />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-muted-foreground mt-1 mb-10"
          >
            The cycle continues every month ↺
          </motion.p>
        </div>

        {/* Mobile: vertical stacked */}
        <div className="lg:hidden space-y-0">
          {steps.map((step, i) => (
            <div key={step.id}>
              <StepBlock step={step} index={i} />
              {i < steps.length - 1 && <MobileArrow />}
            </div>
          ))}
          <MobileArrow />
          <p className="text-center text-xs text-muted-foreground mt-1">
            ↺ Repeats every month
          </p>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <Button className="btn-primary text-base px-10 py-5" onClick={() => navigate("/register")}>
            Get Started Free <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-xs text-muted-foreground mt-3">No credit card required · 7-day free trial</p>
        </motion.div>
      </div>
    </div>
  );
}
