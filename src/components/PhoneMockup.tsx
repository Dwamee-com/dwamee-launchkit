import { motion } from "framer-motion";
import { Clock, MapPin, Shield, Wifi } from "lucide-react";

const PhoneMockup = () => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mx-auto w-[260px] sm:w-[280px]"
    >
      {/* Phone frame */}
      <div className="rounded-[2.5rem] border-[6px] border-foreground/10 bg-card p-3 shadow-xl"
        style={{ boxShadow: "var(--shadow-card-hover), 0 20px 60px -15px hsl(211 65% 47% / 0.18)" }}
      >
        {/* Notch */}
        <div className="mx-auto mb-3 h-5 w-24 rounded-full bg-foreground/10" />
        {/* Screen */}
        <div className="rounded-2xl bg-muted p-4 space-y-4">
          {/* Status bar */}
          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
            <span>9:41 AM</span>
            <div className="flex gap-1 items-center">
              <Wifi size={10} />
              <div className="w-5 h-2 rounded-sm bg-accent" />
            </div>
          </div>
          {/* App header */}
          <div className="text-center">
            <p className="text-xs font-bold text-primary">Dwamee</p>
            <p className="text-[10px] text-muted-foreground">Clock In</p>
          </div>
          {/* Clock circle */}
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 border-primary/20 bg-card"
            style={{ boxShadow: "var(--shadow-neu)" }}
          >
            <div className="text-center">
              <Clock className="mx-auto h-6 w-6 text-primary" />
              <p className="mt-1 text-lg font-bold text-primary">09:00</p>
              <p className="text-[9px] text-muted-foreground">Tap to Clock In</p>
            </div>
          </div>
          {/* Location */}
          <div className="flex items-center gap-1.5 rounded-xl bg-card p-2 text-[10px]"
            style={{ boxShadow: "var(--shadow-neu)" }}
          >
            <MapPin size={12} className="text-accent" />
            <span className="text-muted-foreground">HQ Office · Verified</span>
            <Shield size={10} className="ml-auto text-accent" />
          </div>
          {/* Stats row */}
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-card p-2 text-center text-[10px]" style={{ boxShadow: "var(--shadow-neu)" }}>
              <p className="font-semibold text-foreground">176h</p>
              <p className="text-muted-foreground">This Month</p>
            </div>
            <div className="rounded-lg bg-card p-2 text-center text-[10px]" style={{ boxShadow: "var(--shadow-neu)" }}>
              <p className="font-semibold text-accent">98%</p>
              <p className="text-muted-foreground">On Time</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PhoneMockup;
