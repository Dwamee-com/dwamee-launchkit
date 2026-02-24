import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Lock, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FloatingShape = ({ delay, x, y, size, rotate }: { delay: number; x: string; y: string; size: number; rotate: number }) => (
  <motion.div
    className="absolute border border-primary-foreground/20 rounded-lg"
    style={{ left: x, top: y, width: size, height: size }}
    initial={{ opacity: 0, rotate: 0, scale: 0.5 }}
    animate={{
      opacity: [0.15, 0.35, 0.15],
      rotate: [rotate, rotate + 90, rotate],
      scale: [0.8, 1, 0.8],
      y: [0, -15, 0],
    }}
    transition={{ duration: 8, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const CornerDots = ({ position }: { position: string }) => {
  const posClasses: Record<string, string> = {
    "top-left": "top-6 left-6",
    "top-right": "top-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "bottom-right": "bottom-6 right-6",
  };
  return (
    <div className={`absolute ${posClasses[position]} grid grid-cols-3 gap-2`}>
      {Array.from({ length: 9 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-primary-foreground/30"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 3, delay: i * 0.15, repeat: Infinity }}
        />
      ))}
    </div>
  );
};

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard/branches");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left decorative panel */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "var(--gradient-primary)" }} />

        {/* Rectangle grid pattern */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary-foreground)) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Floating rectangles with dots at corners */}
        <FloatingShape delay={0} x="10%" y="15%" size={60} rotate={12} />
        <FloatingShape delay={1.5} x="70%" y="10%" size={40} rotate={-8} />
        <FloatingShape delay={0.8} x="80%" y="60%" size={55} rotate={20} />
        <FloatingShape delay={2} x="15%" y="70%" size={45} rotate={-15} />
        <FloatingShape delay={1.2} x="50%" y="80%" size={35} rotate={30} />
        <FloatingShape delay={0.5} x="60%" y="35%" size={50} rotate={-25} />

        {/* Corner dot patterns */}
        <CornerDots position="top-left" />
        <CornerDots position="top-right" />
        <CornerDots position="bottom-left" />
        <CornerDots position="bottom-right" />

        {/* Sparkle accents */}
        <motion.div className="absolute top-[20%] right-[20%]"
          animate={{ rotate: [0, 180, 360], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 6, repeat: Infinity }}>
          <Sparkles className="w-5 h-5 text-primary-foreground/30" />
        </motion.div>
        <motion.div className="absolute bottom-[30%] left-[25%]"
          animate={{ rotate: [0, -180, -360], scale: [1, 0.7, 1] }}
          transition={{ duration: 7, delay: 1, repeat: Infinity }}>
          <Sparkles className="w-4 h-4 text-primary-foreground/25" />
        </motion.div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full p-12 text-center">
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-bold text-primary-foreground mb-4">Dwamee</motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
            className="text-primary-foreground/80 text-xl max-w-md leading-relaxed">
            Precision attendance & workforce management for modern teams.
          </motion.p>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
            className="mt-12 grid grid-cols-3 gap-6 text-primary-foreground/70">
            {[
              { num: "10K+", label: "Users" },
              { num: "99.9%", label: "Uptime" },
              { num: "50+", label: "Countries" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-primary-foreground">{s.num}</p>
                <p className="text-sm">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right login form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-background relative overflow-hidden">
        {/* Subtle background pattern on form side */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground mt-2">Sign in to your Dwamee account</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative mt-1.5">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="phone" placeholder="+20 1XX XXX XXXX" value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-10" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button type="button" className="text-xs text-primary hover:underline">Forgot password?</button>
              </div>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" />
              </div>
            </div>
            <Button type="submit" className="w-full btn-primary">
              Sign In <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <button onClick={() => navigate("/register")} className="text-primary font-medium hover:underline">Create one</button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
