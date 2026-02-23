import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Check, User, Building2, CreditCard, ArrowRight, ArrowLeft, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const nationalities = [
  "Egyptian", "Saudi", "Emirati", "Kuwaiti", "Qatari", "Bahraini", "Omani",
  "Jordanian", "Lebanese", "Iraqi", "Moroccan", "Tunisian", "Algerian",
  "American", "British", "Canadian", "German", "French", "Indian", "Other"
];

const packages = [
  {
    id: "starter",
    name: "Starter",
    price: 0,
    employees: 10,
    costPerEmployee: "Free",
    popular: false,
    features: ["Up to 10 employees", "Basic attendance", "1 branch", "Email support"],
  },
  {
    id: "professional",
    name: "Professional",
    price: 49,
    employees: 50,
    costPerEmployee: "~150 EGP",
    popular: true,
    features: ["Up to 50 employees", "Full attendance + payroll", "5 branches", "Priority support", "Geofencing"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 149,
    employees: 500,
    costPerEmployee: "~100 EGP",
    popular: false,
    features: ["Up to 500 employees", "Everything in Pro", "Unlimited branches", "Dedicated support", "Custom integrations", "API access"],
  },
];

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Organization", icon: Building2 },
  { id: 3, title: "Select Package", icon: CreditCard },
];

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [personal, setPersonal] = useState({ username: "", phone: "", nationality: "", password: "", confirmPassword: "" });
  const [org, setOrg] = useState({ name: "", location: "" });
  const [selectedPackage, setSelectedPackage] = useState("starter");

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = () => {
    navigate("/dashboard/branches");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-[420px] relative overflow-hidden items-center justify-center"
        style={{ backgroundImage: "var(--gradient-primary)" }}>
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 25% 25%, hsl(var(--primary-foreground)) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative z-10 p-10 text-center">
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">Dwamee</h1>
          <p className="text-primary-foreground/80 text-lg leading-relaxed">
            Start managing your workforce with precision attendance tracking and smart payroll.
          </p>
          <div className="mt-10 flex flex-col gap-3">
            {steps.map((s) => (
              <div key={s.id} className="flex items-center gap-3 text-primary-foreground/70">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  step >= s.id ? "bg-primary-foreground text-primary" : "border-2 border-primary-foreground/30"
                }`}>
                  {step > s.id ? <Check className="w-4 h-4" /> : s.id}
                </div>
                <span className={`font-medium transition-colors ${step >= s.id ? "text-primary-foreground" : ""}`}>{s.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form area */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-lg">
          {/* Mobile stepper */}
          <div className="flex lg:hidden items-center justify-center gap-2 mb-8">
            {steps.map((s) => (
              <div key={s.id} className={`h-2 rounded-full transition-all duration-300 ${step >= s.id ? "w-10 bg-primary" : "w-6 bg-muted"}`} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                <h2 className="text-2xl font-bold text-foreground mb-1">Create your account</h2>
                <p className="text-muted-foreground mb-8">Enter your personal information to get started</p>
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
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" value={personal.password} onChange={(e) => setPersonal({ ...personal, password: e.target.value })} className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="••••••••" value={personal.confirmPassword} onChange={(e) => setPersonal({ ...personal, confirmPassword: e.target.value })} className="mt-1.5" />
                  </div>
                </div>
                <Button className="w-full mt-8 btn-primary" onClick={nextStep}>
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Already have an account?{" "}
                  <button onClick={() => navigate("/login")} className="text-primary font-medium hover:underline">Sign in</button>
                </p>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                <h2 className="text-2xl font-bold text-foreground mb-1">Organization Details</h2>
                <p className="text-muted-foreground mb-8">Tell us about your company</p>
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
                <div className="flex gap-3 mt-8">
                  <Button variant="outline" onClick={prevStep} className="flex-1"><ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
                  <Button className="flex-1 btn-primary" onClick={nextStep}>Continue <ArrowRight className="w-4 h-4 ml-2" /></Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                <h2 className="text-2xl font-bold text-foreground mb-1">Choose Your Plan</h2>
                <p className="text-muted-foreground mb-2">All plans include a 7-day free trial</p>
                <div className="flex items-center gap-2 mb-6 rounded-lg bg-accent/10 p-3">
                  <Shield className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium text-accent">No credit card required — start free today!</span>
                </div>
                <div className="space-y-3">
                  {packages.map((pkg) => (
                    <Card
                      key={pkg.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedPackage === pkg.id ? "ring-2 ring-primary border-primary" : "border-border"
                      } ${pkg.popular ? "relative" : ""}`}
                      onClick={() => setSelectedPackage(pkg.id)}
                    >
                      {pkg.popular && (
                        <span className="absolute -top-2.5 left-4 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground">
                          Most Popular
                        </span>
                      )}
                      <CardContent className="p-4 flex items-start gap-4">
                        <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 ${
                          selectedPackage === pkg.id ? "border-primary bg-primary" : "border-muted-foreground/30"
                        }`}>
                          {selectedPackage === pkg.id && <Check className="w-3 h-3 text-primary-foreground" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between">
                            <h3 className="font-semibold text-foreground">{pkg.name}</h3>
                            <p className="text-lg font-bold text-foreground">{pkg.price === 0 ? "Free" : `$${pkg.price}`}<span className="text-xs text-muted-foreground font-normal">/mo</span></p>
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">Up to {pkg.employees} employees · {pkg.costPerEmployee}/emp</p>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {pkg.features.map((f) => (
                              <span key={f} className="text-xs bg-muted px-2 py-0.5 rounded-md text-muted-foreground">{f}</span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="flex gap-3 mt-8">
                  <Button variant="outline" onClick={prevStep} className="flex-1"><ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
                  <Button className="flex-1 btn-primary" onClick={handleSubmit}>Start Free Trial</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
