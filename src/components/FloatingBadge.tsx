import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface FloatingBadgeProps {
  icon: LucideIcon;
  label: string;
  delay: number;
  x: string;
  y: string;
  color?: "primary" | "accent";
}

const FloatingBadge = ({ icon: Icon, label, delay, x, y, color = "primary" }: FloatingBadgeProps) => {
  const isAccent = color === "accent";

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 200 }}
      className="absolute z-10 hidden sm:block"
      style={{ left: x, top: y }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3 + delay, repeat: Infinity, ease: "easeInOut" }}
        className="card-feature flex items-center gap-2 px-3 py-2 whitespace-nowrap"
        style={{ boxShadow: "var(--shadow-card), 0 0 16px hsl(211 65% 47% / 0.08)" }}
      >
        <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${isAccent ? 'bg-accent/10' : 'bg-primary/10'}`}>
          <Icon size={14} className={isAccent ? 'text-accent' : 'text-primary'} />
        </div>
        <span className="text-xs font-medium text-foreground">{label}</span>
      </motion.div>
    </motion.div>
  );
};

export default FloatingBadge;
