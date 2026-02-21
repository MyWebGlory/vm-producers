import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.webp";

const stats = [
  { value: "2000+", label: "Successful Events" },
  { value: "100%", label: "Success Rate" },
  { value: "+350K", label: "Global Attendees" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Fireworks event with crowd" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content — white text on dark image */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
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
          <span style={{ background: "linear-gradient(135deg, hsl(200, 70%, 75%), hsl(215, 50%, 90%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
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
          <a href="#contact" className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-base hover:bg-primary/90 transition-all duration-300 glow-shadow hover:scale-105">
            Get Your Free Consultation
          </a>
          <a href="#services" className="px-8 py-4 rounded-lg glass-dark font-display font-semibold text-base transition-all duration-300"
            style={{ color: "white" }}>
            Our Services
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 grid grid-cols-3 gap-6 max-w-2xl mx-auto"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-5xl font-display font-bold" style={{ color: "white" }}>
                {stat.value}
              </p>
              <p className="text-xs md:text-sm mt-2 font-medium" style={{ color: "hsl(220, 15%, 65%)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
