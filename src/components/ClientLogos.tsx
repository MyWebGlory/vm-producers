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
    <section className="py-20 overflow-hidden relative">
      {/* Subtle top/bottom glow lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-primary font-display text-sm uppercase tracking-[0.3em] font-medium mb-2">
          Trusted By Industry Leaders
        </p>
        <p className="text-muted-foreground text-base">
          Powering events for the world's most recognized brands
        </p>
      </motion.div>

      {/* Row 1 — scrolling left */}
      <div className="relative mb-6">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex animate-logo-scroll">
          {[...clients, ...clients].map((client, i) => (
            <div
              key={`r1-${i}`}
              className="flex-shrink-0 mx-4 group"
            >
              <div className="glass rounded-xl px-10 py-6 flex items-center justify-center min-w-[180px] h-[80px] border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all duration-500 hover:glow-border">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-10 max-w-[140px] object-contain brightness-0 invert opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolling right (reversed) */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex animate-logo-scroll-reverse">
          {[...clients.slice(5), ...clients.slice(0, 5), ...clients.slice(5), ...clients.slice(0, 5)].map((client, i) => (
            <div
              key={`r2-${i}`}
              className="flex-shrink-0 mx-4 group"
            >
              <div className="glass rounded-xl px-10 py-6 flex items-center justify-center min-w-[180px] h-[80px] border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all duration-500 hover:glow-border">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-10 max-w-[140px] object-contain brightness-0 invert opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
