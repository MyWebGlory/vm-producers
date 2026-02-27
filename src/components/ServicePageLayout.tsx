import { useRef, ReactNode, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { LucideIcon } from "lucide-react";
import { ScrollReveal, AnimatedCounter, MagneticHover, SplitTextReveal, RevealLine, FloatingOrbs } from "@/components/ScrollAnimations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

interface ServiceStat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

interface ServiceFeature {
  icon?: LucideIcon;
  title: string;
  description: string;
}

interface ServiceSEO {
  title: string;
  description: string;
  canonical: string;
  jsonLd?: object;
}

interface ServicePageLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  heroVideo?: string;
  stats: ServiceStat[];
  features: ServiceFeature[];
  additionalContent?: ReactNode;
  seo?: ServiceSEO;
}

/* Deferred Hero Video */
const DeferredHeroVideo = ({ src }: { src: string }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="w-full h-full object-cover scale-110 blur-[2px]"
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* Feature Card */
const cardPalette = [
  { bg: "hsl(43 90% 52% / 0.09)",  border: "hsl(43 80% 48% / 0.30)",  glow: "hsl(43 80% 52% / 0.10)",  num: "hsl(43 80% 58% / 0.16)",  icon: "hsl(43 75% 45%)" },
  { bg: "hsl(205 80% 72% / 0.09)", border: "hsl(205 70% 68% / 0.28)", glow: "hsl(205 70% 72% / 0.09)", num: "hsl(205 70% 74% / 0.14)", icon: "hsl(205 60% 52%)" },
  { bg: "hsl(32 85% 58% / 0.09)",  border: "hsl(32 78% 54% / 0.28)",  glow: "hsl(32 78% 58% / 0.10)",  num: "hsl(32 80% 62% / 0.15)",  icon: "hsl(32 68% 46%)" },
  { bg: "hsl(340 70% 68% / 0.08)", border: "hsl(340 60% 64% / 0.26)", glow: "hsl(340 60% 68% / 0.09)", num: "hsl(340 62% 72% / 0.14)", icon: "hsl(340 52% 54%)" },
];

const FeatureCard = ({
  feature,
  index,
}: {
  feature: ServiceFeature;
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);
  const Icon = feature.icon;
  const pal = cardPalette[index % cardPalette.length];

  const col = index % 2;
  const xFrom = col === 0 ? -56 : 56;
  const rowDelay = Math.floor(index / 2) * 0.1;

  return (
    <motion.div
      initial={{ opacity: 0, x: xFrom, y: 48, filter: "blur(14px)", scale: 0.94 }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: true, amount: 0.15, margin: "-60px" }}
      transition={{ delay: rowDelay, duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformPerspective: 1000 }}
    >
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative p-6 md:p-8 lg:p-10 rounded-3xl overflow-hidden transition-all duration-500 h-full"
      style={{ background: pal.bg, border: `1.5px solid ${pal.border}`, boxShadow: hovered ? `0 16px 50px ${pal.glow}, 0 4px 20px hsl(0 0% 0% / 0.05)` : "0 2px 12px hsl(0 0% 0% / 0.03)" }}
    >
      {/* Decorative blobs */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${pal.num} 0%, transparent 65%)` }} />
      <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${pal.num} 0%, transparent 65%)` }} />

      {/* Corner number */}
      <span
        className="absolute top-5 right-6 font-display font-black text-4xl md:text-5xl select-none pointer-events-none"
        style={{ color: pal.num, letterSpacing: "-0.04em" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Shimmer sweep on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: "-100%", opacity: 0 }}
        animate={hovered ? { x: "220%", opacity: 1 } : { x: "-100%", opacity: 0 }}
        transition={{ duration: 0.75, ease: "easeInOut" }}
        style={{ background: `linear-gradient(105deg, transparent 30%, ${pal.glow} 50%, transparent 70%)`, width: "60%" }}
      />

      {/* Accent glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ background: `radial-gradient(ellipse at 20% 0%, ${pal.glow}, transparent 65%)` }}
      />

      <div className="relative z-10">
        {/* Icon badge */}
        {Icon && (
        <motion.div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
            style={{ background: `${pal.bg}`, border: `1.5px solid ${pal.border}`, backgroundColor: "hsl(0 0% 100% / 0.7)" }}
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.15, margin: "-60px" }}
            transition={{ delay: rowDelay + 0.3, duration: 0.65, type: "spring", stiffness: 240, damping: 17 }}
          >
            <motion.div
              animate={{ scale: hovered ? 1.18 : 1, rotate: hovered ? 8 : 0 }}
              transition={{ duration: 0.35 }}
            >
              <Icon strokeWidth={1.4} style={{ width: "1.35rem", height: "1.35rem", color: pal.icon }} />
            </motion.div>
          </motion.div>
        )}

        {/* Title */}
        <div className="mb-3 mt-1">
          <h3
            className="text-lg md:text-xl lg:text-2xl font-display font-black leading-tight"
            style={{ color: pal.icon }}
          >
            {feature.title}
          </h3>
        </div>

        <motion.p
          className="text-foreground/70 leading-relaxed text-sm lg:text-base"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15, margin: "-60px" }}
          transition={{
            delay: rowDelay + 0.38,
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {feature.description}
        </motion.p>

        {/* Animated reveal line */}
        <motion.div
          className="mt-6 h-px rounded-full"
          style={{
            background: "linear-gradient(90deg, hsl(var(--primary) / 0.6), hsl(var(--primary) / 0.1))",
            transformOrigin: "left",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 0.35 }}
          viewport={{ once: true, amount: 0.15, margin: "-60px" }}
          animate={hovered ? { scaleX: 1 } : undefined}
          transition={{ duration: hovered ? 0.4 : 1.0, delay: hovered ? 0 : rowDelay + 0.55, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
    </motion.div>
  );
};

/* Main Layout */
const ServicePageLayout = ({
  title,
  subtitle,
  description,
  heroImage,
  heroVideo,
  stats,
  features,
  additionalContent,
  seo,
}: ServicePageLayoutProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -60]);

  // CTA parallax
  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });
  const ctaBgY = useTransform(ctaProgress, [0, 1], ["0%", "20%"]);

  return (
    <div className="min-h-screen bg-background">
      {seo && (
        <SEO
          title={seo.title}
          description={seo.description}
          canonical={seo.canonical}
          jsonLd={seo.jsonLd}
        />
      )}
      <Navbar />

      {/* ═══ Hero ═══ */}
      <section ref={heroRef} className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
          <img
            src={heroImage}
            alt={title}
            className="w-full h-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
          {heroVideo && <DeferredHeroVideo src={heroVideo} />}
          <div className="absolute inset-0 hero-gradient" />
        </motion.div>

        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative z-10 h-full flex flex-col items-center justify-center px-6"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-display font-medium text-sm uppercase tracking-[0.3em] mb-6"
              style={{ color: "hsl(0, 0%, 100%, 0.7)" }}
            >
              {subtitle}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.5, duration: 0.9 }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-display font-bold leading-[1.05] md:leading-[0.95] mb-6 md:mb-8"
              style={{ color: "white" }}
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ color: "hsl(0, 0%, 100%, 0.75)" }}
            >
              {description}
            </motion.p>
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
      </section>

      {/* ═══ Stats ═══ */}
      <div className="relative z-20 bg-card border-t border-border/40">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-14">
          <div className="grid grid-cols-3 divide-x divide-border/60">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center px-4"
                initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.18, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                  <p className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground">
                    <AnimatedCounter
                      value={stat.value}
                      prefix={stat.prefix || ""}
                      suffix={stat.suffix || ""}
                    />
                  </p>
                  <p className="text-sm md:text-base mt-2 text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </motion.div>
            ))}
          </div>
        </div>
        <RevealLine delay={0.2} />
      </div>

      {/* ═══ Features ═══ */}
      <section className="py-16 md:py-28 lg:py-40 relative overflow-hidden">
        {/* Ambient orbs */}
        <FloatingOrbs count={4} className="opacity-60" />
        {/* Vertical thread */}
        <div className="absolute right-8 lg:right-16 top-0 bottom-0 w-px hidden lg:block overflow-hidden">
          <motion.div
            className="w-full"
            style={{ background: "linear-gradient(to bottom, transparent 0%, hsl(var(--primary) / 0.35) 30%, hsl(var(--primary) / 0.12) 70%, transparent 100%)" }}
            initial={{ height: "0%" }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-10 md:mb-20 lg:mb-28">
            <motion.p
              className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-5 font-medium"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              What We Offer
            </motion.p>
            <RevealLine delay={0.05} className="max-w-[100px] mx-auto mb-6" />
            <h2 className="text-[2.4rem] leading-[1.1] sm:text-5xl md:text-5xl lg:text-7xl font-display font-bold text-foreground">
              <SplitTextReveal text="Built for" delay={0.1} />{" "}
              <SplitTextReveal text="excellence." delay={0.3} style={{ color: "hsl(var(--primary))" }} />
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {features.map((feature, i) => {
              const isOrphan = features.length % 2 !== 0 && i === features.length - 1;
              return (
                <div
                  key={feature.title}
                  className={isOrphan ? "col-span-2 md:col-span-2 md:max-w-[calc(50%-0.75rem)] md:mx-auto w-full" : "col-span-1"}
                >
                  <FeatureCard
                    feature={feature}
                    index={i}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Content */}
      {additionalContent}

      {/* ═══ CTA with Parallax Background ═══ */}
      <section
        ref={ctaRef}
        className="relative py-36 lg:py-52 overflow-hidden"
      >
        {/* Parallax background */}
        <motion.div className="absolute inset-0" style={{ y: ctaBgY }}>
          <img
            src={heroImage}
            alt=""
            loading="lazy"
            className="w-full h-[130%] object-cover"
          />
          <div className="absolute inset-0 bg-black/65" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={ctaInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-display text-xs uppercase tracking-[0.3em] mb-6 font-medium"
            style={{ color: "hsl(var(--primary))" }}
          >
            Let's Talk
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={ctaInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ delay: 0.15, duration: 0.9 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-tight"
            style={{ color: "white" }}
          >
            Ready to create something{" "}
            <span style={{ color: "hsl(var(--primary))" }}>extraordinary?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg max-w-xl mx-auto mb-12 leading-relaxed"
            style={{ color: "hsl(0 0% 100% / 0.7)" }}
          >
            Your event deserves a team that's done it before. We're ready when you are.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            <MagneticHover>
              <a
                href="https://www.vmproducers.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex px-10 py-4 rounded-full font-display font-semibold text-base transition-all duration-300 hover:scale-105"
                style={{
                  background: "white",
                  color: "hsl(220 25% 10%)",
                }}
              >
                Get in Touch
              </a>
            </MagneticHover>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicePageLayout;
