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
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[110vh] overflow-hidden">
      {/* Parallax background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Fireworks event with crowd" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content with parallax */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center px-6"
        style={{ y: textY, opacity }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display font-medium text-sm uppercase tracking-[0.3em] mb-6"
            style={{ color: "hsl(200, 70%, 75%)" }}
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
            <span style={{ background: "linear-gradient(135deg, hsl(200,70%,75%), hsl(215,50%,90%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Event Experience
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "hsl(220, 15%, 75%)" }}
          >
            Turn your vision into reality with expert event production, seamless logistics,
            and unforgettable experiences that captivate.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#contact" className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-base hover:bg-primary/90 transition-all duration-300 glow-shadow">
              Get Your Free Consultation
            </a>
            <a href="#services" className="px-8 py-4 rounded-lg glass-dark font-display font-semibold text-base transition-all duration-300" style={{ color: "white" }}>
              Our Services
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats bar — pinned at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="max-w-5xl mx-auto px-6 pb-8">
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.15, duration: 0.6 }}
                className="glass-dark rounded-xl p-5 text-center"
              >
                <p className="text-3xl md:text-4xl lg:text-5xl font-display font-bold" style={{ color: "white" }}>
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm mt-1 font-medium" style={{ color: "hsl(220,15%,65%)" }}>
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
