import { motion } from "framer-motion";

const clients = [
  "Nike", "Samsung", "HP", "Chevrolet", "Angry Orchard",
  "Nokia", "Oracle", "Secureworks", "Adidas", "Atlanta United",
];

const ClientLogos = () => {
  return (
    <section className="py-16 border-y border-border/30 overflow-hidden">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-sm text-muted-foreground font-medium uppercase tracking-widest mb-10"
      >
        Trusted by industry leaders
      </motion.p>
      <div className="relative">
        <div className="flex animate-logo-scroll">
          {[...clients, ...clients].map((name, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-10 glass rounded-lg px-8 py-4 flex items-center justify-center min-w-[140px]"
            >
              <span className="text-muted-foreground font-display font-semibold text-sm whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
