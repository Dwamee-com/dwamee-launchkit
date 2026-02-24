import { motion } from "framer-motion";

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

// Double the array for seamless infinite scroll
const scrollCompanies = [...companies, ...companies];

const TrustedSection = () => {
  return (
    <section className="relative py-20 sm:py-28 bg-background overflow-hidden">
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
      </div>

      {/* Infinite scrolling row */}
      <div className="relative">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

        <motion.div
          className="flex gap-5 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {scrollCompanies.map((company, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08, y: -6 }}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 w-[140px] shrink-0 cursor-default transition-all hover:border-primary/30 hover:shadow-md"
              style={{ boxShadow: "var(--shadow-neu)" }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/15">
                <span className="text-sm font-extrabold text-primary">{company.initials}</span>
              </div>
              <span className="text-xs font-semibold text-foreground text-center leading-tight">{company.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedSection;
