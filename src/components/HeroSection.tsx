import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.webp";
import { AnimatedCounter, FloatingOrbs } from "@/components/ScrollAnimations";
import { MagneticHover } from "@/components/ScrollAnimations";
import { ArrowRight } from "lucide-react";
import { useCalendly } from "@/components/CalendlyModal";
import logoCapterra from "@/assets/logo-capterra.png";
import logoTrustpilot from "@/assets/logo-trustpilot.png";

const stats = [
  { value: 2000, suffix: "+", label: "Events Delivered" },
  { value: 100, suffix: "%", label: "Success Rate" },
  { value: 350, suffix: "K+", label: "Attendees Reached" },
];

const HeroSection = () => {
  const { openCalendly } = useCalendly();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.45], [0, -50]);

  return (
    <section ref={ref} className="relative overflow-hidden h-screen">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src={heroBg}
          alt="VM Producers - professional live event production setup with staging and lighting"
          className="w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,12,24,0.65) 0%, rgba(8,12,24,0.78) 55%, rgba(8,12,24,0.97) 100%)",
          }}
        />
      </motion.div>

      <FloatingOrbs count={3} className="z-[2] opacity-25" />

      {/* Main content - centred, full height */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 h-full flex flex-col items-center justify-center px-2 sm:px-6 text-center"
      >
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-5">

          {/* Badge - small, subtle */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium border"
              style={{
                background: "hsl(216 90% 58% / 0.10)",
                borderColor: "hsl(216 90% 58% / 0.28)",
                color: "hsl(216 90% 78%)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
              #1 Event Production Agency · Est. 2018
            </span>
          </motion.div>

          {/* H1 - the star of the show - starts visible for LCP/prerender */}
          <motion.h1
            initial={{ opacity: 1, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-[2.4rem] sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.07] text-white"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.7)" }}
            data-speakable
          >
            Make your next event{" "}
            <br />
            <span style={{ color: "hsl(216 90% 65%)" }}>unforgettable.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 1, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="text-xs sm:text-sm md:text-base max-w-xl leading-relaxed service-summary"
            style={{ color: "hsl(0 0% 100% / 0.68)" }}
            data-speakable
          >
            Full-service production for live, virtual &amp; hybrid events.
            From 50-person workshops to global broadcasts of 100,000, every
            detail handled from first brief to final breakdown.
          </motion.p>



          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.48, duration: 0.45, ease: "backOut" }}
            className="flex flex-col items-center gap-1.5 mt-1"
          >
            <MagneticHover>
              <button
                type="button"
                onClick={openCalendly}
                className="inline-flex items-center gap-2 sm:gap-2.5 px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-display font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 relative overflow-hidden cursor-pointer"
                style={{
                  background: "hsl(216 90% 58%)",
                  color: "white",
                  boxShadow: "0 0 36px hsl(216 90% 58% / 0.4), 0 6px 24px rgba(0,0,0,0.28)",
                }}
              >
                Get a Dedicated Producer
                <ArrowRight size={16} />
                <motion.span
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
                  }}
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                />
              </button>
            </MagneticHover>

            {/* Sub-line */}
            <p className="text-xs" style={{ color: "hsl(0 0% 100% / 0.45)" }}>
              Free strategy call · No commitment · 15 min
            </p>
          </motion.div>

          {/* Scarcity - pill */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.58, duration: 0.4 }}
            className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-full"
            style={{
              color: "hsl(25 90% 68%)",
              border: "1px solid hsl(25 90% 58% / 0.45)",
              background: "hsl(25 90% 58% / 0.08)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "hsl(25 90% 58%)" }} />
            Only 4 new clients per month - spots are filling fast.
          </motion.p>

          {/* Stats row - inline, no separators */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.45 }}
            className="grid grid-cols-3 gap-3 sm:gap-6 mt-2 w-full max-w-xs sm:max-w-sm"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-0.5">
                <p className="text-lg sm:text-2xl lg:text-3xl font-display font-bold text-white">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[10px] lg:text-[11px] uppercase tracking-wider font-medium" style={{ color: "hsl(0 0% 100% / 0.45)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Trust platform logos */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.82, duration: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-8 mt-1"
            aria-label="Reviewed on"
          >
            {/* Capterra */}
            <div className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
              <img src={logoCapterra} alt="" className="h-5 sm:h-6 w-auto" />
              <span className="text-white font-semibold text-sm tracking-wide">Capterra</span>
            </div>

            <div className="w-px h-5 bg-white/20" />

            {/* Trustpilot */}
            <div className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
              <img src={logoTrustpilot} alt="" className="h-5 sm:h-6 w-auto" />
              <span className="text-white font-semibold text-sm tracking-wide">Trustpilot</span>
            </div>

            <div className="w-px h-5 bg-white/20" />

            {/* Google */}
            <div className="flex items-center gap-0 opacity-80 hover:opacity-100 transition-opacity">
              <span className="font-semibold text-xl" style={{color:"#4285F4"}}>G</span>
              <span className="font-semibold text-xl" style={{color:"#EA4335"}}>o</span>
              <span className="font-semibold text-xl" style={{color:"#FBBC05"}}>o</span>
              <span className="font-semibold text-xl" style={{color:"#4285F4"}}>g</span>
              <span className="font-semibold text-xl" style={{color:"#34A853"}}>l</span>
              <span className="font-semibold text-xl" style={{color:"#EA4335"}}>e</span>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* Scroll arrow - above stats bar */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 cursor-pointer bg-transparent border-none p-0"
        aria-label="Scroll down"
        onClick={() => {
          const next = document.getElementById("services");
          if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      >
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 22 22"
          fill="none"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <path d="M6 10l5 5 5-5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.button>
    </section>
  );
};

export default HeroSection;
