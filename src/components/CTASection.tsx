import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Rocket } from "lucide-react";
import { MagneticHover, SplitTextReveal, RevealLine } from "@/components/ScrollAnimations";
import { ConstellationBG } from "@/components/ConstellationBG";
import heroBg from "@/assets/hero-bg.webp";
import { useCalendly } from "@/components/CalendlyModal";

const CTASection = () => {
  const { openCalendly } = useCalendly();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      ref={ref}
      className="relative py-20 md:py-36 lg:py-52 overflow-hidden"
    >
      {/* Parallax background image */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src={heroBg}
          alt=""
          className="w-full h-[130%] object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
      </motion.div>

      {/* Constellation network background */}
      <ConstellationBG variant="dark" className="z-[1] opacity-70" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        {/* Section icon badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <span
            className="flex items-center justify-center w-14 h-14 rounded-2xl"
            style={{ background: "hsl(var(--primary) / 0.15)", border: "1.5px solid hsl(var(--primary) / 0.35)" }}
          >
            <Rocket size={26} style={{ color: "hsl(var(--primary))" }} />
          </span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-xs uppercase tracking-[0.3em] mb-6 font-medium"
          style={{ color: "hsl(var(--primary))" }}
        >
          Let's Talk
        </motion.p>
        <RevealLine delay={0.05} className="mb-8 max-w-[120px] mx-auto" />
        <h2 id="cta-heading" className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-4 md:mb-8 leading-tight" style={{ color: "white" }}>
          <SplitTextReveal text="Let's make your next event" delay={0.1} stagger={0.04} className="justify-center" />{" "}
          <SplitTextReveal text="one they'll never forget." delay={0.45} stagger={0.06} className="justify-center" style={{ color: "hsl(var(--primary))" }} />
        </h2>
        {/* Title divider */}
        <div className="flex items-center justify-center gap-3 mt-2 mb-6">
          <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.5))" }} />
          <span className="flex items-center justify-center w-8 h-8 rounded-xl" style={{ background: "hsl(var(--primary) / 0.15)", border: "1px solid hsl(var(--primary) / 0.35)" }}>
            <Rocket size={14} style={{ color: "hsl(var(--primary))" }} />
          </span>
          <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, hsl(var(--primary) / 0.5))" }} />
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-10 md:mb-12 leading-relaxed"
          style={{ color: "hsl(0 0% 100% / 0.7)" }}
        >
          You've got the dream. We've got the team, the gear, and the experience to pull it off. All you have to do is say the word.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.6 }}
        >
          <MagneticHover>
            <button
              type="button"
              onClick={openCalendly}
              className="inline-flex px-10 py-4 rounded-full font-display font-semibold text-base transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                background: "white",
                color: "hsl(220 25% 10%)",
              }}
            >
              Get in Touch
            </button>
          </MagneticHover>
        </motion.div>


      </div>
    </section>
  );
};

export default CTASection;
