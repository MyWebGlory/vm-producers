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
import merckLogo from "@/assets/logos/merck logo-converti-depuis-png.webp";
import tevaLogo from "@/assets/logos/teva logo.webp";
import rapid7Logo from "@/assets/logos/rapid 7 logo-converti-depuis-png.webp";
import boehringerLogo from "@/assets/logos/Boehringer_Ingelheim_Logo-converti-depuis-png.webp";
import bankOfAmericaLogo from "@/assets/logos/bank of america logo-converti-depuis-png.webp";
import pncBankLogo from "@/assets/logos/pnc-bank logo.webp";
import pfizerLogo from "@/assets/logos/pfizer logo-converti-depuis-png.webp";
import gileadLogo from "@/assets/logos/Gilead-logo-converti-depuis-png.webp";
import amgenLogo from "@/assets/logos/Amgen logo-converti-depuis-png.webp";
import veevaLogo from "@/assets/logos/Veeva_Systems_Logo.webp";
import evolutionHealthLogo from "@/assets/logos/ehg logo-converti-depuis-png.webp";
import alkermesLogo from "@/assets/logos/Alkermes_plc_Logo-converti-depuis-png.webp";
import novoNordiskLogo from "@/assets/logos/Novo_Nordisk_-_Logo.svg.webp";
import astrazenecaLogo from "@/assets/logos/astra-zeneca-logo-converti-depuis-png.webp";
import designForGoodLogo from "@/assets/logos/design-for-good-logo-converti-depuis-png.webp";
import headNeckAllianceLogo from "@/assets/logos/head and neck logo-converti-depuis-png.webp";
import oncologyCollegeLogo from "@/assets/logos/oncology college logo-converti-depuis-png.webp";
import oncareLogo from "@/assets/logos/oncare-logo.webp";
import lsuHealthLogo from "@/assets/logos/lsu health logo.webp";
import boomChikaPopLogo from "@/assets/logos/boomchika pop logo-converti-depuis-png.webp";
import exigentLogo from "@/assets/logos/logo exigent.webp";

// Row 1 - left-to-right scroll (15 logos)
const row1Clients = [
  { name: "Nike", logo: nikeLogo },
  { name: "Merck", logo: merckLogo },
  { name: "Amgen", logo: amgenLogo },
  { name: "Adidas", logo: adidasLogo },
  { name: "Pfizer", logo: pfizerLogo },
  { name: "Secureworks", logo: secureworksLogo },
  { name: "Gilead", logo: gileadLogo },
  { name: "Atlanta United", logo: atlantaUnitedLogo },
  { name: "AstraZeneca", logo: astrazenecaLogo },
  { name: "Rapid7", logo: rapid7Logo },
  { name: "Bank of America", logo: bankOfAmericaLogo },
  { name: "LSU Health", logo: lsuHealthLogo },
  { name: "TEVA", logo: tevaLogo },
  { name: "Evolution Health Group", logo: evolutionHealthLogo },
  { name: "Boom Chicka Pop", logo: boomChikaPopLogo },
];

// Row 2 - right-to-left scroll (15 different logos)
const row2Clients = [
  { name: "Samsung", logo: samsungLogo },
  { name: "Boehringer Ingelheim", logo: boehringerLogo },
  { name: "HP", logo: hpLogo },
  { name: "Alkermes", logo: alkermesLogo },
  { name: "Chevrolet", logo: chevroletLogo },
  { name: "Novo Nordisk", logo: novoNordiskLogo },
  { name: "Angry Orchard", logo: angryOrchardLogo },
  { name: "PNC Bank", logo: pncBankLogo },
  { name: "Nokia", logo: nokiaLogo },
  { name: "Veeva", logo: veevaLogo },
  { name: "Oracle", logo: oracleLogo },
  { name: "Design for Good", logo: designForGoodLogo },
  { name: "Oncology College", logo: oncologyCollegeLogo },
  { name: "ONCare", logo: oncareLogo },
  { name: "Head & Neck Cancer Alliance", logo: headNeckAllianceLogo },
  { name: "Exigent", logo: exigentLogo },
];

// Triple each row for seamless infinite scroll
const scrollRow1 = [...row1Clients, ...row1Clients, ...row1Clients];
const scrollRow2 = [...row2Clients, ...row2Clients, ...row2Clients];

const ClientLogos = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 lg:py-40 bg-background overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.05) 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.05) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Bold header */}
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <motion.p
            className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-4 font-medium"
          >
            They Trust Us, you should too
          </motion.p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight text-center">
            <SplitTextReveal text="We've been working with" delay={0.1} className="justify-center" />{" "}
            <SplitTextReveal text="the world's best." delay={0.3} className="justify-center glow-text" />
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">
            From Fortune 500 giants to fast-growing startups: when the stakes are high, this is who they call.
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
          {scrollRow1.map((client, i) => (
            <div
              key={`row1-${i}`}
              className="flex-shrink-0 mx-10 md:mx-16 flex items-center justify-center group"
            >
              <img
                src={client.logo}
                alt={`${client.name} logo`}
                height={40}
                width="auto"
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
          {scrollRow2.map((client, i) => (
            <div
              key={`row2-${i}`}
              className="flex-shrink-0 mx-10 md:mx-16 flex items-center justify-center group"
            >
              <img
                src={client.logo}
                alt={`${client.name} logo`}
                height={40}
                width="auto"
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
          separator="|"
        />
      </div>
    </section>
  );
};

export default ClientLogos;
