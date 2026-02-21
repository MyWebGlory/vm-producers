import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.webp";

const stats = [
  { value: "2000+", label: "Successful Events" },
  { value: "100%", label: "Success Rate" },
  { value: "+350K", label: "Global Attendees" },
];

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Hero image area */}
      <div className="relative h-screen min-h-[700px]">
        {/* Parallax background — no zoom */}
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <img
            src={heroBg}
            alt="Fireworks event with crowd"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-gradient" />
        </motion.div>

        {/* Content — fixed, no parallax */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-display font-medium text-sm uppercase tracking-[0.3em] mb-6"
              style={{ color: "hsl(0, 0%, 100%, 0.7)" }}
            >
              Event Production & Management
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] mb-8"
              style={{ color: "white" }}
            >
              Your Ultimate
              <br />
              Event Experience
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
              style={{ color: "hsl(0, 0%, 100%, 0.75)" }}
            >
              Turn your vision into reality with expert event production, seamless logistics,
              and unforgettable experiences that captivate.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <a
                href="#contact"
                className="inline-flex px-10 py-4 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-base hover:bg-primary/90 transition-all duration-300 glow-shadow"
              >
                Get Your Free Consultation
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats row — on solid background, visually prominent */}
      <div className="relative z-20 bg-card border-t border-border/40">
        <div className="max-w-5xl mx-auto px-6 py-10 md:py-14">
          <div className="grid grid-cols-3 divide-x divide-border/60">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + i * 0.15, duration: 0.6 }}
                className="text-center px-4"
              >
                <p className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm md:text-base mt-2 text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
