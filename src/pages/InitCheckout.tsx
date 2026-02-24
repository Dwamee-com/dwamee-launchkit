import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  User, Building2, CreditCard, Package, Tag, Check, ArrowLeft,
  Shield, Sparkles, MapPin, BarChart3, Bell, FileText, Zap
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const FloatingShape = ({ delay, x, y, size, rotate }: { delay: number; x: string; y: string; size: number; rotate: number }) => (
  <motion.div
    className="absolute border border-primary/10 rounded-lg"
    style={{ left: x, top: y, width: size, height: size }}
    initial={{ opacity: 0 }}
    animate={{
      opacity: [0.1, 0.25, 0.1],
      rotate: [rotate, rotate + 90, rotate],
      y: [0, -15, 0],
    }}
    transition={{ duration: 8, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const CornerDots = ({ className }: { className: string }) => (
  <div className={`absolute ${className} grid grid-cols-3 gap-1.5`}>
    {Array.from({ length: 9 }).map((_, i) => (
      <motion.div key={i} className="w-1 h-1 rounded-full bg-primary/15"
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 3, delay: i * 0.12, repeat: Infinity }} />
    ))}
  </div>
);

interface AddonService {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  icon: React.ElementType;
}

const addonServices: AddonService[] = [
  { id: "geofencing", name: "Advanced Geofencing", description: "GPS-based attendance with polygon zones", price: 15, discountPrice: 10, icon: MapPin },
  { id: "analytics", name: "Advanced Analytics", description: "Detailed reports & workforce insights", price: 20, icon: BarChart3 },
  { id: "notifications", name: "Smart Notifications", description: "Automated alerts for managers & employees", price: 8, icon: Bell },
  { id: "payroll", name: "Payroll Integration", description: "Auto-calculate salaries & overtime", price: 25, discountPrice: 18, icon: FileText },
  { id: "api", name: "API Access", description: "Connect with your existing systems", price: 30, icon: Zap },
];

const packages: Record<string, { name: string; price: number; yearlyPrice: number; employees: number }> = {
  starter: { name: "Starter", price: 0, yearlyPrice: 0, employees: 10 },
  professional: { name: "Professional", price: 49, yearlyPrice: 39, employees: 50 },
  enterprise: { name: "Enterprise", price: 149, yearlyPrice: 119, employees: 500 },
};

export default function InitCheckout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get data from registration (mock defaults for demo)
  const regData = (location.state as any) || {
    personal: { username: "Ahmed Mohamed", phone: "+20 123 456 7890", nationality: "Egyptian" },
    org: { name: "TechCorp Egypt", location: "Cairo, Egypt" },
    selectedPackage: "professional",
    billingCycle: "monthly",
  };

  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const pkg = packages[regData.selectedPackage] || packages.starter;
  const isYearly = regData.billingCycle === "yearly";
  const basePrice = isYearly ? pkg.yearlyPrice : pkg.price;

  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const svc = addonServices.find(s => s.id === id);
    return sum + (svc?.discountPrice ?? svc?.price ?? 0);
  }, 0);

  const subtotal = basePrice + addonsTotal;
  const discount = couponApplied ? Math.round(subtotal * couponDiscount / 100) : 0;
  const total = subtotal - discount;

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const applyCoupon = () => {
    if (coupon.toLowerCase() === "dwamee20") {
      setCouponApplied(true);
      setCouponDiscount(20);
    } else if (coupon.toLowerCase() === "welcome10") {
      setCouponApplied(true);
      setCouponDiscount(10);
    } else {
      setCouponApplied(false);
      setCouponDiscount(0);
    }
  };

  const handleConfirm = () => {
    navigate("/dashboard/branches");
  };

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

      <FloatingShape delay={0} x="5%" y="10%" size={50} rotate={12} />
      <FloatingShape delay={1.5} x="85%" y="15%" size={40} rotate={-8} />
      <FloatingShape delay={0.8} x="90%" y="60%" size={55} rotate={20} />
      <FloatingShape delay={2} x="8%" y="75%" size={45} rotate={-15} />

      <CornerDots className="top-6 left-6" />
      <CornerDots className="top-6 right-6" />
      <CornerDots className="bottom-6 left-6" />
      <CornerDots className="bottom-6 right-6" />

      <motion.div className="absolute top-[15%] right-[12%]"
        animate={{ rotate: [0, 180, 360], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 6, repeat: Infinity }}>
        <Sparkles className="w-5 h-5 text-primary/20" />
      </motion.div>
      <motion.div className="absolute bottom-[25%] left-[10%]"
        animate={{ rotate: [0, -180, -360], scale: [1, 0.7, 1] }}
        transition={{ duration: 7, delay: 1, repeat: Infinity }}>
        <Sparkles className="w-4 h-4 text-primary/15" />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Dwamee</h1>
          <p className="text-muted-foreground text-sm mt-1">Review & Confirm Your Order</p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Left: Info & Services */}
          <div className="md:col-span-3 space-y-5">
            {/* Personal & Org Info Preview */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="border-border shadow-sm">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
                    <User className="w-4 h-4 text-primary" /> Account Summary
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Personal</p>
                      <div className="space-y-1 text-sm">
                        <p><span className="text-muted-foreground">Name:</span> <span className="font-medium text-foreground">{regData.personal.username}</span></p>
                        <p><span className="text-muted-foreground">Phone:</span> <span className="font-medium text-foreground">{regData.personal.phone}</span></p>
                        <p><span className="text-muted-foreground">Nationality:</span> <span className="font-medium text-foreground">{regData.personal.nationality}</span></p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Organization</p>
                      <div className="space-y-1 text-sm">
                        <p><span className="text-muted-foreground">Name:</span> <span className="font-medium text-foreground">{regData.org.name}</span></p>
                        <p><span className="text-muted-foreground">Location:</span> <span className="font-medium text-foreground">{regData.org.location}</span></p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground">{pkg.name} Plan</span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-foreground">${basePrice}</span>
                        <span className="text-xs text-muted-foreground">/{isYearly ? "mo (yearly)" : "mo"}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Up to {pkg.employees} employees</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Add-on Services */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="border-border shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <Zap className="w-4 h-4 text-primary" /> Add-on Services
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 mb-4 rounded-lg bg-accent/10 p-2">
                    <Shield className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span className="text-xs font-medium text-accent">All add-ons include a 7-day free trial!</span>
                  </div>
                  <div className="space-y-2.5">
                    {addonServices.map((svc) => {
                      const Icon = svc.icon;
                      const isSelected = selectedAddons.includes(svc.id);
                      return (
                        <motion.div
                          key={svc.id}
                          whileHover={{ scale: 1.01 }}
                          className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                            isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                          }`}
                          onClick={() => toggleAddon(svc.id)}
                        >
                          <Checkbox checked={isSelected} className="pointer-events-none" />
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected ? "bg-primary/10" : "bg-muted"
                          }`}>
                            <Icon className={`w-4 h-4 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{svc.name}</p>
                            <p className="text-xs text-muted-foreground">{svc.description}</p>
                          </div>
                          <div className="text-right shrink-0">
                            {svc.discountPrice ? (
                              <>
                                <p className="text-xs text-muted-foreground line-through">${svc.price}/mo</p>
                                <p className="text-sm font-bold text-primary">${svc.discountPrice}/mo</p>
                              </>
                            ) : (
                              <p className="text-sm font-bold text-foreground">${svc.price}/mo</p>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right: Order Summary */}
          <div className="md:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="sticky top-6">
              <Card className="border-border shadow-lg">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
                    <CreditCard className="w-4 h-4 text-primary" /> Order Summary
                  </h3>

                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{pkg.name} Plan</span>
                      <span className="font-medium text-foreground">${basePrice}/mo</span>
                    </div>

                    {selectedAddons.map(id => {
                      const svc = addonServices.find(s => s.id === id)!;
                      return (
                        <div key={id} className="flex justify-between">
                          <span className="text-muted-foreground">{svc.name}</span>
                          <span className="font-medium text-foreground">${svc.discountPrice ?? svc.price}/mo</span>
                        </div>
                      );
                    })}

                    <div className="border-t border-border pt-2.5 mt-2.5">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium text-foreground">${subtotal}/mo</span>
                      </div>
                    </div>

                    {couponApplied && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                        className="flex justify-between text-accent">
                        <span>Coupon ({couponDiscount}% off)</span>
                        <span className="font-medium">-${discount}</span>
                      </motion.div>
                    )}

                    <div className="border-t border-border pt-2.5">
                      <div className="flex justify-between items-baseline">
                        <span className="font-semibold text-foreground">Total</span>
                        <div>
                          {couponApplied && <span className="text-xs text-muted-foreground line-through mr-2">${subtotal}</span>}
                          <span className="text-xl font-bold text-primary">${total}</span>
                          <span className="text-xs text-muted-foreground">/mo</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Coupon */}
                  <div className="mt-5">
                    <p className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1">
                      <Tag className="w-3 h-3" /> Have a coupon?
                    </p>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter code"
                        value={coupon}
                        onChange={(e) => { setCoupon(e.target.value); setCouponApplied(false); }}
                        className="text-sm h-9"
                      />
                      <Button variant="outline" size="sm" onClick={applyCoupon} className="shrink-0 h-9">
                        Apply
                      </Button>
                    </div>
                    {couponApplied && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-xs text-accent mt-1.5 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Coupon applied! {couponDiscount}% off
                      </motion.p>
                    )}
                  </div>

                  {/* Trial message */}
                  <div className="mt-4 rounded-lg bg-accent/10 p-3 text-center">
                    <Shield className="w-5 h-5 text-accent mx-auto mb-1" />
                    <p className="text-xs font-semibold text-accent">7-Day Free Trial</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">No credit card required. Cancel anytime.</p>
                  </div>

                  <Button className="w-full mt-4 btn-primary" onClick={handleConfirm}>
                    Start Free Trial
                  </Button>

                  <button onClick={() => navigate("/register")}
                    className="w-full text-center text-xs text-muted-foreground mt-3 hover:text-primary transition-colors flex items-center justify-center gap-1">
                    <ArrowLeft className="w-3 h-3" /> Back to registration
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
