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

          {/* Review platform badges */}
          <div className="flex items-center justify-center gap-6 md:gap-10 mt-10 pt-8 border-t border-border/30">
            {/* Stars */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            {/* Capterra */}
            <span className="text-muted-foreground font-medium text-sm tracking-wide flex items-center gap-1.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path d="M5 2l7 4 7-4v8l-7 4-7-4V2z" fill="hsl(var(--primary))" opacity="0.7" />
                <path d="M5 10l7 4 7-4v8l-7 4-7-4v-8z" fill="hsl(var(--primary))" opacity="0.4" />
              </svg>
              Capterra
            </span>
            {/* Trustpilot */}
            <span className="text-muted-foreground font-medium text-sm tracking-wide flex items-center gap-1.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#00b67a" />
              </svg>
              Trustpilot
            </span>
            {/* Google */}
            <span className="text-muted-foreground font-medium text-sm tracking-wide flex items-center gap-1.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
