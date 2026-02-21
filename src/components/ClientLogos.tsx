import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollAnimations";

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

// Duplicate for seamless infinite scroll
const duplicatedClients = [...clients, ...clients];

const ClientLogos = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-background overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Bold header */}
        <ScrollReveal className="text-center mb-16">
          <motion.p
            className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-4 font-medium"
          >
            They Trust Us
          </motion.p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight">
            Backed by the{" "}
            <span className="glow-text">World's Best</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">
            From Fortune 500 giants to iconic brands — they chose us for their biggest moments.
          </p>
        </ScrollReveal>
      </div>

      {/* Infinite scrolling logos — row 1 (left to right) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative mb-6"
      >
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee-left">
          {duplicatedClients.map((client, i) => (
            <div
              key={`row1-${i}`}
              className="flex-shrink-0 mx-6 md:mx-10 group"
            >
              <div className="flex items-center justify-center h-24 md:h-28 w-44 md:w-52 rounded-2xl elevated border border-border/40 px-6 py-4 transition-all duration-500 group-hover:border-primary/20 group-hover:shadow-lg group-hover:shadow-primary/5">
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className="max-h-14 md:max-h-16 max-w-[160px] object-contain opacity-70 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Infinite scrolling logos — row 2 (right to left, offset) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative"
      >
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee-right">
          {[...duplicatedClients].reverse().map((client, i) => (
            <div
              key={`row2-${i}`}
              className="flex-shrink-0 mx-6 md:mx-10 group"
            >
              <div className="flex items-center justify-center h-24 md:h-28 w-44 md:w-52 rounded-2xl elevated border border-border/40 px-6 py-4 transition-all duration-500 group-hover:border-primary/20 group-hover:shadow-lg group-hover:shadow-primary/5">
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className="max-h-14 md:max-h-16 max-w-[160px] object-contain opacity-70 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ClientLogos;
