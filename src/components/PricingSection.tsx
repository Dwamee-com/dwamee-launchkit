import { motion } from "framer-motion";
import { Check, Zap, Crown, Building2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface PricingTier {
  icon: LucideIcon;
  name: string;
  price: string;
  period: string;
  desc: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

const tiers: PricingTier[] = [
  {
    icon: Zap,
    name: "Starter",
    price: "Free",
    period: "",
    desc: "Perfect for small teams getting started",
    features: [
      "Up to 10 employees",
      "Online clock-in/out",
      "Basic attendance reports",
      "Single location",
      "Email support",
    ],
    cta: "Start Free",
  },
  {
    icon: Crown,
    name: "Professional",
    price: "$8",
    period: "/employee/mo",
    desc: "For growing teams that need more power",
    features: [
      "Unlimited employees",
      "Online & offline attendance",
      "GPS tracking & geofencing",
      "Auto payroll calculation",
      "Anti-fraud detection",
      "Performance analytics",
      "Multi-site support",
      "Priority support",
    ],
    popular: true,
    cta: "Get Started",
  },
  {
    icon: Building2,
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For large organizations with custom needs",
    features: [
      "Everything in Professional",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
      "On-premise option",
      "Custom reporting",
      "API access",
      "24/7 phone support",
    ],
    cta: "Contact Sales",
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="relative py-20 sm:py-28 bg-background">
      <div className="container mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <h2 className="mb-3 text-2xl font-extrabold text-primary sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground">Choose the plan that fits your workforce</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className={`relative flex flex-col rounded-3xl border p-6 sm:p-8 transition-all ${
                tier.popular
                  ? "border-primary/30 bg-card shadow-lg"
                  : "border-border bg-card"
              }`}
              style={{ boxShadow: tier.popular ? "var(--shadow-card-hover), 0 0 40px hsl(var(--primary) / 0.08)" : "var(--shadow-neu)" }}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="rounded-full px-4 py-1.5 text-xs font-bold text-primary-foreground"
                    style={{ backgroundImage: "var(--gradient-primary)" }}
                  >
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${tier.popular ? 'bg-primary/10' : 'bg-muted'}`}>
                  <tier.icon size={20} className={tier.popular ? 'text-primary' : 'text-muted-foreground'} />
                </div>
                <h3 className="text-lg font-bold text-foreground">{tier.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{tier.desc}</p>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-extrabold text-foreground">{tier.price}</span>
                <span className="text-sm text-muted-foreground">{tier.period}</span>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full rounded-xl py-3.5 text-sm font-semibold transition-all ${
                  tier.popular
                    ? "text-primary-foreground"
                    : "text-primary border-2 border-primary/20 bg-card hover:border-primary/40"
                }`}
                style={tier.popular ? { backgroundImage: "var(--gradient-primary)", boxShadow: "0 4px 16px hsl(var(--primary) / 0.3)" } : { boxShadow: "var(--shadow-neu)" }}
              >
                {tier.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
