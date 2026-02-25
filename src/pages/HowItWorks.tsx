import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  UserPlus, GitBranch, Users, UserCheck, CalendarDays,
  ClipboardCheck, Scale, Wallet, ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    id: 1,
    title: "Create Account",
    icon: UserPlus,
    color: "from-primary to-primary/80",
    items: ["Add your personal info", "Add organization", "Select package"],
  },
  {
    id: 2,
    title: "Add Branches",
    icon: GitBranch,
    color: "from-accent to-accent/80",
    items: ["Add branches you want in your system", "Define branch locations"],
  },
  {
    id: 3,
    title: "Add Groups",
    icon: Users,
    color: "from-primary to-dwamee-blue-light",
    items: ["Customize work based on group names", "Define which group belongs to which branch"],
  },
  {
    id: 4,
    title: "Add Employees",
    icon: UserCheck,
    color: "from-accent to-accent/80",
    items: ["Add employee information", "Assign employee to branch", "Assign employee to group"],
  },
  {
    id: 5,
    title: "Make Calendar Work",
    icon: CalendarDays,
    color: "from-primary to-primary/80",
    items: ["Select shift", "Define start time", "Define end time", "Select working location"],
  },
  {
    id: 6,
    title: "Monitor Attendance",
    icon: ClipboardCheck,
    color: "from-accent to-accent/80",
    items: ["View working hours", "See who arrived on time", "See absences", "See late arrivals", "See early leave"],
  },
  {
    id: 7,
    title: "Payroll Policy Rules",
    icon: Scale,
    color: "from-primary to-dwamee-blue-light",
    items: ["Define late deduction rules", "Define early leave deductions", "Percentage or fixed amount", "Create salary policy logic"],
  },
  {
    id: 8,
    title: "Monthly Salaries",
    icon: Wallet,
    color: "from-accent to-accent/80",
    items: ["View salaries monthly", "Show deductions", "Show bonuses", "Send salary to employees"],
  },
];

const WaveArrow = ({ flip, isLoop }: { flip?: boolean; isLoop?: boolean }) => (
  <div className={`flex justify-center py-4 md:py-0 ${isLoop ? "mt-8" : ""}`}>
    <svg
      width={isLoop ? "200" : "80"}
      height={isLoop ? "80" : "60"}
      viewBox={isLoop ? "0 0 200 80" : "0 0 80 60"}
      className={`text-primary/30 ${flip ? "scale-x-[-1]" : ""}`}
    >
      {isLoop ? (
        <>
          <path
            d="M100 10 C30 10, 10 40, 10 60 M10 60 C10 70, 30 75, 100 75 C170 75, 190 70, 190 60 M190 60 C190 40, 170 10, 100 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 4"
            className="animate-dash-flow"
          />
          <polygon points="95,5 105,5 100,15" fill="currentColor" />
        </>
      ) : (
        <>
          <path
            d="M40 5 Q50 5, 50 15 Q50 30, 40 35 Q30 40, 40 50 Q45 55, 40 55"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 4"
            className="animate-dash-flow"
          />
          <polygon points="35,52 45,52 40,60" fill="currentColor" />
        </>
      )}
    </svg>
  </div>
);

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -60 : 60, y: 20 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`flex ${isEven ? "md:justify-start" : "md:justify-end"} justify-center`}
    >
      <div className="group w-full max-w-lg">
        <div className="relative bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          {/* Step number watermark */}
          <span className="absolute top-3 right-4 text-6xl font-black text-primary/[0.04] select-none">
            {String(step.id).padStart(2, "0")}
          </span>

          <div className="flex items-start gap-4">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shrink-0 shadow-md`}
            >
              <Icon className="w-7 h-7 text-primary-foreground" />
            </motion.div>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <ul className="space-y-1.5">
                {step.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 sm:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3 bg-primary/10 px-4 py-1.5 rounded-full">
            Step by Step
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4">
            How It <span className="gradient-text">Works</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto text-lg">
            Get started with Dwamee in 8 simple steps — from account creation to automated payroll.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-0">
          {steps.map((step, i) => (
            <div key={step.id}>
              <StepCard step={step} index={i} />
              {i < steps.length - 1 && <WaveArrow flip={i % 2 === 0} />}
            </div>
          ))}
        </div>

        {/* Loop arrow back to step 1 */}
        <WaveArrow isLoop />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-2 mb-10"
        >
          And the cycle continues every month ↺
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
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
