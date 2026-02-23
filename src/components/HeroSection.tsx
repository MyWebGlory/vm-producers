import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.webp";
import { AnimatedCounter } from "@/components/ScrollAnimations";
import { MagneticHover } from "@/components/ScrollAnimations";

const stats = [
  { value: 2000, suffix: "+", label: "Successful Events" },
  { value: 100, suffix: "%", label: "Success Rate" },
  { value: 350, prefix: "+", suffix: "K", label: "Global Attendees" },
];

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="relative h-screen min-h-[700px]">
        {/* Parallax background with scale */}
        <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
          <img
            src={heroBg}
            alt="Fireworks event with crowd"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 hero-gradient" />
        </motion.div>

        {/* Content with scroll fade */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative z-10 h-full flex flex-col items-center justify-center px-6"
        >
          <div className="max-w-5xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-display font-medium text-sm uppercase tracking-[0.3em] mb-6"
              style={{ color: "hsl(0, 0%, 100%, 0.7)" }}
            >
              Event Production & Management
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] mb-8"
              style={{ color: "white" }}
            >
              Your Ultimate
              <br />
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                Event Experience
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
              style={{ color: "hsl(0, 0%, 100%, 0.75)" }}
            >
              Turn your vision into reality with expert event production, seamless logistics,
              and unforgettable experiences that captivate.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.6, ease: "backOut" }}
            >
              <MagneticHover>
                <a
                  href="#contact"
                  className="inline-flex px-10 py-4 rounded-full bg-primary text-primary-foreground font-display font-semibold text-base hover:bg-primary/90 transition-all duration-300 glow-shadow hover:scale-105"
                >
                  Get Your Free Consultation
                </a>
              </MagneticHover>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 14, 0], opacity: [0.8, 0.2, 0.8] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-0.5 h-8 rounded-full bg-white/60"
          />
        </motion.div>
      </div>

      {/* Stats row with counting animation */}
      <div className="relative z-20 bg-card border-t border-border/40">
        <div className="max-w-5xl mx-auto px-6 py-10 md:py-14">
          <div className="grid grid-cols-3 divide-x divide-border/60">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center px-4">
                <p className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix || ""}
                    suffix={stat.suffix || ""}
                  />
                </p>
                <p className="text-sm md:text-base mt-2 text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
