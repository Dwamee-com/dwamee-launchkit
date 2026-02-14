import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

const companies = [
  { name: "Aramco", initials: "AR" },
  { name: "STC Group", initials: "STC" },
  { name: "SABIC", initials: "SB" },
  { name: "Al Rajhi Bank", initials: "ARB" },
  { name: "Mobily", initials: "MB" },
  { name: "Jarir Bookstore", initials: "JR" },
  { name: "Extra", initials: "EX" },
  { name: "Bin Dawood", initials: "BD" },
  { name: "Almarai", initials: "AM" },
  { name: "Panda Retail", initials: "PR" },
  { name: "SACO", initials: "SC" },
  { name: "Nahdi Medical", initials: "NM" },
];

const TrustedSection = () => {
  return (
    <section className="relative py-20 sm:py-28 bg-background">
      <div className="container mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <h2 className="mb-3 text-2xl font-extrabold text-primary sm:text-4xl">
            Trusted by Leading Companies
          </h2>
          <p className="text-muted-foreground">Organizations that rely on Dwamee for workforce management</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {companies.map((company, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 cursor-default transition-all hover:border-primary/30 hover:shadow-md"
              style={{ boxShadow: "var(--shadow-neu)" }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/8 border border-primary/15">
                <span className="text-sm font-extrabold text-primary">{company.initials}</span>
              </div>
              <span className="text-xs font-semibold text-foreground text-center leading-tight">{company.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedSection;
