import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollReveal, SplitTextReveal, VelocityScrollBand, RevealLine } from "@/components/ScrollAnimations";

import nikeLogo from "@/assets/logos/nike.png";
import samsungLogo from "@/assets/logos/samsung-hd.png";
import hpLogo from "@/assets/logos/hp.png";
import chevroletLogo from "@/assets/logos/chevrolet-hd.png";
import angryOrchardLogo from "@/assets/logos/angry-orchard-hd.svg";
import nokiaLogo from "@/assets/logos/nokia-hd.png";
import oracleLogo from "@/assets/logos/oracle-hd.png";
import secureworksLogo from "@/assets/logos/secureworks.png";
import adidasLogo from "@/assets/logos/adidas.png";
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

// Triple for truly seamless infinite scroll
const scrollClients = [...clients, ...clients, ...clients];

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
        <ScrollReveal className="text-center mb-24 lg:mb-32">
          <motion.p
            className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-4 font-medium"
          >
            They Trust Us
          </motion.p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight">
            <SplitTextReveal text="Backed by the" delay={0.1} />{" "}
            <SplitTextReveal text="World's Best" delay={0.3} className="glow-text" />
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">
            From Fortune 500 giants to iconic brands, they chose us for their biggest moments.
          </p>
        </ScrollReveal>
      </div>

      {/* Infinite scrolling logos - row 1 (left to right) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative mb-10"
      >
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex items-center w-max animate-marquee-left">
          {scrollClients.map((client, i) => (
            <div
              key={`row1-${i}`}
              className="flex-shrink-0 mx-10 md:mx-16 flex items-center justify-center group"
            >
              <img
                src={client.logo}
                alt={`${client.name} logo`}
                loading="lazy"
                decoding="async"
                className="h-8 md:h-12 w-auto object-contain opacity-75 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0 [image-rendering:crisp-edges]"
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Infinite scrolling logos - row 2 (right to left, offset) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative"
      >
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex items-center w-max animate-marquee-right">
          {[...scrollClients].reverse().map((client, i) => (
            <div
              key={`row2-${i}`}
              className="flex-shrink-0 mx-10 md:mx-16 flex items-center justify-center group"
            >
              <img
                src={client.logo}
                alt={`${client.name} logo`}
                loading="lazy"
                decoding="async"
                className="h-8 md:h-12 w-auto object-contain opacity-75 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0 [image-rendering:crisp-edges]"
              />
            </div>
          ))}
        </div>
      </motion.div>
      {/* Velocity-reactive marquee band */}
      <div className="relative z-10 mt-16 border-t border-b border-border/30">
        <VelocityScrollBand
          items={["Live Events", "Virtual Events", "Hybrid Events", "Video Production", "Meeting Pros", "Fortune 500", "2000+ Events", "70+ Countries"]}
          baseSpeed={60}
          separator="◆"
        />
      </div>
    </section>
  );
};

export default ClientLogos;
