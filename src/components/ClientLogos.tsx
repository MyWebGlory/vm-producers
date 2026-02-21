import { motion } from "framer-motion";

import nikeLogo from "@/assets/logos/nike.webp";
import samsungLogo from "@/assets/logos/samsung.png";
import hpLogo from "@/assets/logos/hp.webp";
import chevroletLogo from "@/assets/logos/chevrolet.png";
import angryOrchardLogo from "@/assets/logos/angry-orchard.png";
import nokiaLogo from "@/assets/logos/nokia.png";
import oracleLogo from "@/assets/logos/oracle.png";
import secureworksLogo from "@/assets/logos/secureworks.png";
import adidasLogo from "@/assets/logos/adidas.webp";
import atlantaUnitedLogo from "@/assets/logos/atlanta-united.png";

const clients = [
  { name: "Nike", logo: nikeLogo },
  { name: "Samsung", logo: samsungLogo },
  { name: "HP", logo: hpLogo },
  { name: "Chevrolet", logo: chevroletLogo },
  { name: "Angry Orchard", logo: angryOrchardLogo },
  { name: "Nokia", logo: nokiaLogo },
  { name: "Oracle", logo: oracleLogo },
  { name: "Secureworks", logo: secureworksLogo },
  { name: "Adidas", logo: adidasLogo },
  { name: "Atlanta United", logo: atlantaUnitedLogo },
];

const ClientLogos = () => {
  return (
    <section className="relative py-20 lg:py-28 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-4 font-medium">
            Trusted Partners
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground">
            They Trusted Us With Their{" "}
            <span className="glow-text">Biggest Events</span>
          </h2>
        </motion.div>

        {/* Logo grid — large, clear, prominent */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="elevated rounded-3xl border border-border/50 p-8 md:p-12"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-10 items-center justify-items-center">
            {clients.map((client, i) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
                className="flex items-center justify-center w-full py-4 px-2 group"
              >
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className="max-h-10 md:max-h-12 max-w-[140px] object-contain opacity-60 group-hover:opacity-100 transition-all duration-400 grayscale group-hover:grayscale-0"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogos;
