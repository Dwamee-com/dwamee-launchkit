import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Check, User, Building2, CreditCard, ArrowRight, ArrowLeft, Shield, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const nationalities = [
  "Egyptian", "Saudi", "Emirati", "Kuwaiti", "Qatari", "Bahraini", "Omani",
  "Jordanian", "Lebanese", "Iraqi", "Moroccan", "Tunisian", "Algerian",
  "American", "British", "Canadian", "German", "French", "Indian", "Other"
];

const packages = [
  {
    id: "starter", name: "Starter", price: 0, employees: 10, costPerEmployee: "Free", popular: false,
    features: ["Up to 10 employees", "Basic attendance", "1 branch", "Email support"],
  },
  {
    id: "professional", name: "Professional", price: 49, employees: 50, costPerEmployee: "~150 EGP", popular: true,
    features: ["Up to 50 employees", "Full attendance + payroll", "5 branches", "Priority support", "Geofencing"],
  },
  {
    id: "enterprise", name: "Enterprise", price: 149, employees: 500, costPerEmployee: "~100 EGP", popular: false,
    features: ["Up to 500 employees", "Everything in Pro", "Unlimited branches", "Dedicated support", "Custom integrations", "API access"],
  },
];

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Organization", icon: Building2 },
  { id: 3, title: "Package", icon: CreditCard },
];

const FloatingRect = ({ delay, x, y, size, rotate }: { delay: number; x: string; y: string; size: number; rotate: number }) => (
  <motion.div
    className="absolute border border-primary-foreground/20 rounded-lg"
    style={{ left: x, top: y, width: size, height: size }}
    initial={{ opacity: 0 }}
    animate={{
      opacity: [0.1, 0.3, 0.1],
      rotate: [rotate, rotate + 60, rotate],
      y: [0, -12, 0],
    }}
    transition={{ duration: 7, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const CornerDots = ({ className }: { className: string }) => (
  <div className={`absolute ${className} grid grid-cols-3 gap-1.5`}>
    {Array.from({ length: 9 }).map((_, i) => (
      <motion.div key={i} className="w-1 h-1 rounded-full bg-primary-foreground/25"
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 3, delay: i * 0.12, repeat: Infinity }} />
    ))}
  </div>
);

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [personal, setPersonal] = useState({ username: "", phone: "", nationality: "", password: "", confirmPassword: "" });
  const [org, setOrg] = useState({ name: "", location: "" });
  const [selectedPackage, setSelectedPackage] = useState("starter");

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));
  const handleSubmit = () => navigate("/dashboard/branches");

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />

      {/* Decorative banner strip */}
      <div className="absolute top-0 left-0 right-0 h-2" style={{ backgroundImage: "var(--gradient-primary)" }} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-10">
        {/* Logo */}
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary">Dwamee</h1>
          <p className="text-muted-foreground text-sm mt-1">Create your account</p>
        </motion.div>

        {/* Top horizontal stepper */}
        <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
          className="flex items-center gap-0 mb-10 w-full max-w-md justify-center">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isActive = step === s.id;
            const isDone = step > s.id;
            return (
              <div key={s.id} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <motion.div
                    animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isDone ? "bg-primary text-primary-foreground" :
                      isActive ? "bg-primary text-primary-foreground ring-4 ring-primary/20" :
                      "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isDone ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </motion.div>
                  <span className={`text-xs font-medium transition-colors ${isActive || isDone ? "text-primary" : "text-muted-foreground"}`}>
                    {s.title}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`w-16 sm:w-24 h-0.5 mx-2 mb-5 rounded-full transition-colors duration-300 ${
                    step > s.id ? "bg-primary" : "bg-muted"
                  }`} />
                )}
              </div>
            );
          })}
        </motion.div>

        {/* Form card */}
        <div className="w-full max-w-lg">
          <Card className="border-border shadow-lg relative overflow-hidden">
            {/* Card corner decorations */}
            <div className="absolute top-3 right-3 grid grid-cols-2 gap-1">
              {[0,1,2,3].map(i => (
                <motion.div key={i} className="w-1 h-1 rounded-full bg-primary/20"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }} />
              ))}
            </div>

            <CardContent className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                    <h2 className="text-xl font-bold text-foreground mb-1">Personal Information</h2>
                    <p className="text-muted-foreground text-sm mb-6">Enter your details to get started</p>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" placeholder="Enter your username" value={personal.username} onChange={(e) => setPersonal({ ...personal, username: e.target.value })} className="mt-1.5" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="+20 1XX XXX XXXX" value={personal.phone} onChange={(e) => setPersonal({ ...personal, phone: e.target.value })} className="mt-1.5" />
                      </div>
                      <div>
                        <Label>Nationality</Label>
                        <Select value={personal.nationality} onValueChange={(v) => setPersonal({ ...personal, nationality: v })}>
                          <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select nationality" /></SelectTrigger>
                          <SelectContent>{nationalities.map((n) => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" type="password" placeholder="••••••••" value={personal.password} onChange={(e) => setPersonal({ ...personal, password: e.target.value })} className="mt-1.5" />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">Confirm</Label>
                          <Input id="confirmPassword" type="password" placeholder="••••••••" value={personal.confirmPassword} onChange={(e) => setPersonal({ ...personal, confirmPassword: e.target.value })} className="mt-1.5" />
                        </div>
                      </div>
                    </div>
                    <Button className="w-full mt-6 btn-primary" onClick={nextStep}>
                      Continue <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                    <h2 className="text-xl font-bold text-foreground mb-1">Organization Details</h2>
                    <p className="text-muted-foreground text-sm mb-6">Tell us about your company</p>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="orgName">Organization Name</Label>
                        <Input id="orgName" placeholder="Your company name" value={org.name} onChange={(e) => setOrg({ ...org, name: e.target.value })} className="mt-1.5" />
                      </div>
                      <div>
                        <Label htmlFor="orgLocation">Location</Label>
                        <Input id="orgLocation" placeholder="City, Country" value={org.location} onChange={(e) => setOrg({ ...org, location: e.target.value })} className="mt-1.5" />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <Button variant="outline" onClick={prevStep} className="flex-1"><ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
                      <Button className="flex-1 btn-primary" onClick={nextStep}>Continue <ArrowRight className="w-4 h-4 ml-2" /></Button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                    <h2 className="text-xl font-bold text-foreground mb-1">Choose Your Plan</h2>
                    <p className="text-muted-foreground text-sm mb-2">All plans include a 7-day free trial</p>
                    <div className="flex items-center gap-2 mb-5 rounded-lg bg-accent/10 p-2.5">
                      <Shield className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-xs font-medium text-accent">No credit card required — start free today!</span>
                    </div>
                    <div className="space-y-3">
                      {packages.map((pkg) => (
                        <Card key={pkg.id}
                          className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                            selectedPackage === pkg.id ? "ring-2 ring-primary border-primary" : "border-border"
                          } ${pkg.popular ? "relative" : ""}`}
                          onClick={() => setSelectedPackage(pkg.id)}>
                          {pkg.popular && (
                            <span className="absolute -top-2.5 left-4 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground">
                              Most Popular
                            </span>
                          )}
                          <CardContent className="p-3.5 flex items-start gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 ${
                              selectedPackage === pkg.id ? "border-primary bg-primary" : "border-muted-foreground/30"
                            }`}>
                              {selectedPackage === pkg.id && <Check className="w-3 h-3 text-primary-foreground" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-baseline justify-between">
                                <h3 className="font-semibold text-foreground text-sm">{pkg.name}</h3>
                                <p className="text-base font-bold text-foreground">{pkg.price === 0 ? "Free" : `$${pkg.price}`}<span className="text-xs text-muted-foreground font-normal">/mo</span></p>
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5">Up to {pkg.employees} employees · {pkg.costPerEmployee}/emp</p>
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                {pkg.features.map((f) => (
                                  <span key={f} className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{f}</span>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-6">
                      <Button variant="outline" onClick={prevStep} className="flex-1"><ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
                      <Button className="flex-1 btn-primary" onClick={handleSubmit}>Start Free Trial</Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-5">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")} className="text-primary font-medium hover:underline">Sign in</button>
          </p>
        </div>
      </div>
    </div>
  );
}
