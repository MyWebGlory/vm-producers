import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.webp";
import vmLogoWhite from "@/assets/vp-logo-white.png";
import { AnimatedCounter, FloatingOrbs, RevealLine } from "@/components/ScrollAnimations";
import { MagneticHover } from "@/components/ScrollAnimations";
import { Globe, Video, Users, CheckCircle } from "lucide-react";

const stats = [
  { value: 2000, suffix: "+", label: "Successful Events" },
  { value: 100, suffix: "%", label: "Success Rate" },
  { value: 350, prefix: "+", suffix: "K", label: "Global Attendees" },
];

// Ellipse formula: x = rx*sin(θ), y = ry*(1-cos(θ))  at 8 equal steps → smooth closed orbit
const floatingCards = [
  {
    id: "countries",
    icon: Globe,
    iconColor: "#60a5fa",
    iconBg: "rgba(37,99,235,0.18)",
    title: "70+ Countries",
    sub: "Global reach",
    position: "top-[22%] left-[4%]",
    delay: 0.8,
    duration: 10,
    kx: [0, 7.8, 11, 7.8, 0, -7.8, -11, -7.8, 0],
    ky: [0, 1.5, 5,  8.5, 10, 8.5,  5,   1.5,  0],
  },
  {
    id: "live",
    icon: Video,
    iconColor: "#f97316",
    iconBg: "rgba(234,88,12,0.18)",
    title: "Live Production",
    sub: "Broadcast quality",
    position: "top-[18%] right-[5%]",
    delay: 1.0,
    duration: 13,
    kx: [0, -7.1, -10, -7.1, 0, 7.1, 10, 7.1, 0],
    ky: [0,  1.2,   4,   6.8, 8, 6.8,  4,  1.2, 0],
  },
  {
    id: "attendees",
    icon: Users,
    iconColor: "#34d399",
    iconBg: "rgba(5,150,105,0.18)",
    title: "100K+ Attendees",
    sub: "Per virtual event",
    position: "bottom-[26%] right-[4%]",
    delay: 1.1,
    duration: 11,
    kx: [0, -6.4, -9, -6.4, 0, 6.4, 9, 6.4, 0],
    ky: [0,  1.5,  5,   8.5, 10, 8.5, 5, 1.5, 0],
  },
  {
    id: "guarantee",
    icon: CheckCircle,
    iconColor: "#fbbf24",
    iconBg: "rgba(217,119,6,0.18)",
    title: "100% Success Rate",
    sub: "Guaranteed delivery",
    position: "bottom-[28%] left-[4%]",
    delay: 1.3,
    duration: 9,
    kx: [0, 7.1, 10, 7.1, 0, -7.1, -10, -7.1, 0],
    ky: [0, 1.2,  4,  6.8, 8,  6.8,  4,   1.2, 0],
  },
];

const ORBIT_TIMES = [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1];

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
            decoding="async"
          />
          <div className="absolute inset-0 hero-gradient" />
        </motion.div>

        {/* Ambient floating light orbs over hero */}
        <FloatingOrbs count={4} className="z-[2] opacity-50" />

        {/* ── Floating cards ── */}
        {floatingCards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.id}
              className={`absolute ${card.position} z-[8] hidden md:flex items-center gap-2 px-3 py-2 rounded-xl`}
              style={{
                background: "rgba(8,8,10,0.35)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                opacity: 0,
              }}
              initial={{ opacity: 0, x: 0, y: 18, scale: 0.9 }}
              animate={{
                opacity: 0.7,
                scale: 1,
                x: card.kx,
                y: card.ky,
              }}
              transition={{
                opacity: { delay: card.delay, duration: 0.8 },
                scale:   { delay: card.delay, duration: 0.8 },
                x: {
                  delay: card.delay + 0.8,
                  duration: card.duration,
                  repeat: Infinity,
                  ease: "linear",
                  times: ORBIT_TIMES,
                },
                y: {
                  delay: card.delay + 0.8,
                  duration: card.duration,
                  repeat: Infinity,
                  ease: "linear",
                  times: ORBIT_TIMES,
                },
              }}
            >
              <span
                className="flex items-center justify-center w-7 h-7 rounded-lg shrink-0"
                style={{ background: card.iconBg }}
              >
                <Icon size={14} style={{ color: card.iconColor }} strokeWidth={2} />
              </span>
              <div className="leading-tight">
                <p className="text-white/80 text-xs font-semibold whitespace-nowrap">{card.title}</p>
                <p className="text-white/35 text-[10px] whitespace-nowrap">{card.sub}</p>
              </div>
            </motion.div>
          );
        })}

        {/* Content with scroll fade */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative z-10 h-full flex flex-col items-center justify-center px-6"
        >
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-center gap-5 md:gap-7 mb-6 md:mb-8"
            >
              <img
                src={vmLogoWhite}
                alt="VM Producers"
                className="h-12 md:h-16 lg:h-20 w-auto object-contain"
                style={{ filter: "drop-shadow(0 2px 16px rgba(0,0,0,0.7)) drop-shadow(0 0 24px hsl(43 80% 55% / 0.4))" }}
              />
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[0.95]"
                style={{ color: "white", textShadow: "0 2px 20px rgba(0,0,0,0.8), 0 4px 40px rgba(0,0,0,0.5)" }}
              >
                Events that make sense.
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-base md:text-xl max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed"
              style={{ color: "hsl(0, 0%, 100%, 0.85)", textShadow: "0 1px 12px rgba(0,0,0,0.9), 0 2px 24px rgba(0,0,0,0.6)" }}
            >
              We produce events that run on time, look great,
              and keep people talking.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.6, ease: "backOut" }}
            >
              <MagneticHover>
                <a
                  href="#contact"
                  className="relative inline-flex px-10 py-4 rounded-full bg-primary text-primary-foreground font-display font-semibold text-base hover:bg-primary/90 transition-all duration-300 glow-shadow hover:scale-105 overflow-hidden"
                >
                  Get Your Free Consultation
                  <motion.span
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ background: "linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.22) 50%, transparent 100%)" }}
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
                  />
                </a>
              </MagneticHover>
            </motion.div>

            {/* ── Stats inside hero ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-8 flex items-center justify-center divide-x divide-white/20"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center px-6 md:px-10"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + i * 0.12, duration: 0.6 }}
                >
                  <p className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white" style={{ textShadow: "0 2px 16px rgba(0,0,0,0.8)" }}>
                    <AnimatedCounter value={stat.value} prefix={stat.prefix || ""} suffix={stat.suffix || ""} />
                  </p>
                  <p className="text-[11px] sm:text-xs mt-1 font-medium" style={{ color: "hsl(0 0% 100% / 0.65)", textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* ── Social Proof Strip ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-7 flex flex-wrap items-center justify-center gap-3"
            >
              {/* Google rating pill */}
              <div className="flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur-sm rounded-full px-3.5 py-1.5">
                <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-white font-bold text-xs">5.0</span>
              </div>
              {/* Separator */}
              <div className="w-px h-4 bg-white/20 hidden sm:block" />
              {/* Count pill */}
              <div className="flex items-center gap-1.5 bg-white/10 border border-white/15 backdrop-blur-sm rounded-full px-3.5 py-1.5">
                <svg className="w-3.5 h-3.5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-white text-xs font-semibold">200+ event teams worldwide</span>
              </div>
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

      {/* Review platform badges - standalone centered strip */}
      <motion.div
        className="relative z-20 bg-card pt-12 md:pt-16 pb-10 md:pb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-center gap-4 md:gap-8 lg:gap-14 flex-wrap">
          {/* Stars */}
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          {/* Capterra */}
          <span className="text-muted-foreground font-bold text-base md:text-xl tracking-wide flex items-center gap-2">
            <svg className="w-7 h-7 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none">
              <path d="M5 2l7 4 7-4v8l-7 4-7-4V2z" fill="hsl(var(--primary))" opacity="0.7" />
              <path d="M5 10l7 4 7-4v8l-7 4-7-4v-8z" fill="hsl(var(--primary))" opacity="0.4" />
            </svg>
            Capterra
          </span>
          {/* Trustpilot */}
          <span className="text-muted-foreground font-bold text-base md:text-xl tracking-wide flex items-center gap-2">
            <svg className="w-7 h-7 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#00b67a" />
            </svg>
            Trustpilot
          </span>
          {/* Google */}
          <span className="text-muted-foreground font-bold text-base md:text-xl tracking-wide flex items-center gap-2">
            <svg className="w-7 h-7 md:w-8 md:h-8" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </span>
        </div>

        {/* Stats row below logos */}
        <div className="max-w-3xl mx-auto px-6 pt-10 md:pt-14 pb-6 md:pb-8">
          <div className="grid grid-cols-3 divide-x divide-border/60">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center px-2 md:px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-foreground">
                  <AnimatedCounter value={stat.value} prefix={stat.prefix || ""} suffix={stat.suffix || ""} />
                </p>
                <p className="text-xs sm:text-sm mt-1.5 text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
