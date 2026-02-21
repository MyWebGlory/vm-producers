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
        <img
          src={heroBg}
          alt="Fireworks event with crowd"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-background/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-primary font-display font-medium text-sm uppercase tracking-[0.3em] mb-6"
        >
          Event Production & Management
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] mb-8"
        >
          Your Ultimate
          <br />
          <span className="glow-text">Event Experience</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
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
          <a
            href="#contact"
            className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-base hover:bg-primary/90 transition-all duration-300 glow-shadow hover:scale-105"
          >
            Get Your Free Consultation
          </a>
          <a
            href="#services"
            className="px-8 py-4 rounded-lg glass text-foreground font-display font-semibold text-base hover:bg-secondary/80 transition-all duration-300"
          >
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
              <p className="text-3xl md:text-5xl font-display font-bold glow-text">
                {stat.value}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground mt-2 font-medium">
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
