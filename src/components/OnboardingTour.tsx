import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X, ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";

interface Step {
  title: string;
  description: string;
  targetSelector?: string;
  position: "center" | "top" | "bottom" | "left" | "right";
  route?: string;
}

const steps: Step[] = [
  {
    title: "Welcome to Dwamee! 🎉",
    description: "Let's take a quick tour to help you get started. We'll show you how the system is organized and how to manage your projects effectively.",
    position: "center",
  },
  {
    title: "Dashboard Sidebar",
    description: "The sidebar is your main navigation hub. It contains links to all management sections including Branches, Places, Groups, Projects, and more.",
    targetSelector: "[data-sidebar]",
    position: "right",
    route: "/dashboard/projects",
  },
  {
    title: "Projects Overview",
    description: "Projects are the top-level containers for organizing work. Each project contains modules and tasks. You can create, edit, and delete projects here.",
    position: "center",
    route: "/dashboard/projects",
  },
  {
    title: "Creating a Project",
    description: "Click the 'New Project' button to create your first project. Give it a name, description, and image. You can also assign team members.",
    position: "center",
    route: "/dashboard/projects",
  },
  {
    title: "Modules & Tasks",
    description: "Inside each project, you'll find Modules that group related tasks. Think of modules as features or categories within a project.",
    position: "center",
  },
  {
    title: "Kanban Workflow Board",
    description: "The Kanban board lets you visualize task progress. Drag and drop tasks between columns: Pending → Planning → In Progress → Review → Finished.",
    position: "center",
    route: "/dashboard/kanban",
  },
  {
    title: "Task Tracker",
    description: "Track time spent on tasks with Start, Review, and Complete actions. The tracker automatically logs timestamps and calculates hours spent.",
    position: "center",
    route: "/dashboard/tracker",
  },
  {
    title: "Help Center",
    description: "Need help anytime? Click the help icon in the top-right corner to search FAQs, get context-aware assistance, or contact support.",
    position: "center",
  },
  {
    title: "You're All Set! 🚀",
    description: "You now know the basics. Start by creating your first project and adding modules and tasks. You can always revisit this tour from the Help Center.",
    position: "center",
    route: "/dashboard/projects",
  },
];

const ONBOARDING_KEY = "dwamee_onboarding_completed";

export default function OnboardingTour() {
  const [active, setActive] = useState(false);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const completed = localStorage.getItem(ONBOARDING_KEY);
    if (!completed) {
      const timer = setTimeout(() => setActive(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const complete = () => {
    localStorage.setItem(ONBOARDING_KEY, "true");
    setActive(false);
    setCurrent(0);
  };

  const goTo = (idx: number) => {
    if (idx >= steps.length) { complete(); return; }
    if (idx < 0) return;
    const step = steps[idx];
    if (step.route && location.pathname !== step.route) navigate(step.route);
    setCurrent(idx);
  };

  const step = steps[current];
  const progress = ((current + 1) / steps.length) * 100;

  if (!active) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={complete} />

        {/* Tooltip card */}
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md"
        >
          <div className="bg-background rounded-2xl border border-border shadow-2xl overflow-hidden">
            {/* Progress bar */}
            <Progress value={progress} className="h-1 rounded-none" />

            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Step {current + 1} of {steps.length}</p>
                    <h3 className="text-lg font-bold text-foreground leading-tight">{step.title}</h3>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={complete}><X className="w-4 h-4" /></Button>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>

              <div className="flex items-center justify-between pt-2">
                <Button variant="ghost" size="sm" onClick={complete} className="text-muted-foreground text-xs">Skip tour</Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => goTo(current - 1)} disabled={current === 0} className="gap-1">
                    <ArrowLeft className="w-3 h-3" /> Back
                  </Button>
                  <Button size="sm" onClick={() => goTo(current + 1)} className="gap-1">
                    {current === steps.length - 1 ? "Finish" : "Next"} <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function useResetOnboarding() {
  return () => {
    localStorage.removeItem(ONBOARDING_KEY);
    window.location.reload();
  };
}
