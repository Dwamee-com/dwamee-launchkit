import { motion } from "framer-motion";
import { Download, Smartphone, Apple, Play } from "lucide-react";

const DownloadSection = () => {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10"
        style={{ backgroundImage: "var(--gradient-primary)", opacity: 0.04 }}
      />
      <div className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.03) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-primary/15 bg-card p-8 sm:p-14 text-center"
          style={{ boxShadow: "var(--shadow-card-hover), 0 0 60px hsl(var(--primary) / 0.06)" }}
        >
          {/* Glow */}
          <div className="absolute -inset-1 rounded-3xl -z-10 opacity-50"
            style={{ background: "radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.06), transparent 70%)" }}
          />

          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10"
          >
            <Smartphone size={28} className="text-primary" />
          </motion.div>

          <h2 className="mb-3 text-2xl font-extrabold text-primary sm:text-4xl">
            Download Dwamee Today
          </h2>
          <p className="mb-8 text-muted-foreground max-w-lg mx-auto">
            Get the most powerful attendance and workforce management app on your phone. Available on iOS and Android.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 rounded-2xl border-2 border-foreground/80 bg-foreground px-6 py-3.5 text-background transition-all hover:opacity-90"
            >
              <Apple size={24} />
              <div className="text-left">
                <p className="text-[10px] font-medium opacity-80">Download on the</p>
                <p className="text-sm font-bold leading-tight">App Store</p>
              </div>
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 rounded-2xl border-2 border-foreground/80 bg-foreground px-6 py-3.5 text-background transition-all hover:opacity-90"
            >
              <Play size={24} />
              <div className="text-left">
                <p className="text-[10px] font-medium opacity-80">Get it on</p>
                <p className="text-sm font-bold leading-tight">Google Play</p>
              </div>
            </motion.a>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              { value: "50K+", label: "Downloads" },
              { value: "4.8★", label: "App Rating" },
              { value: "99.9%", label: "Uptime" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <p className="text-xl font-extrabold text-primary sm:text-2xl">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadSection;
