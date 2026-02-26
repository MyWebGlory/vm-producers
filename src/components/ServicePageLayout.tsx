import { useRef, ReactNode, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { ScrollReveal, AnimatedCounter, MagneticHover, SplitTextReveal, RevealLine } from "@/components/ScrollAnimations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ServiceStat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

interface ServiceFeature {
  title: string;
  description: string;
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
const FeatureCard = ({
  feature,
  index,
  inView,
}: {
  feature: ServiceFeature;
  index: number;
  inView: boolean;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: 0.12 * index,
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative p-8 lg:p-10 rounded-3xl border border-border/50 bg-card overflow-hidden transition-all duration-500 hover:border-primary/25 hover:shadow-[0_8px_40px_hsl(var(--primary)/0.08)]"
    >
      {/* Accent glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, hsl(var(--primary) / 0.06), transparent 60%)",
        }}
      />

      {/* Large decorative number */}
      <motion.span
        className="absolute -top-4 -right-2 text-[8rem] lg:text-[10rem] font-display font-bold leading-none pointer-events-none select-none"
        style={{ color: "hsl(var(--primary) / 0.04)" }}
        animate={{ scale: hovered ? 1.08 : 1, x: hovered ? -8 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      <div className="relative z-10">
        {/* Small number badge */}
        <motion.div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 border border-primary/15"
          style={{
            background: "hsl(var(--primary) / 0.06)",
          }}
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-primary font-display font-bold text-sm">
            {String(index + 1).padStart(2, "0")}
          </span>
        </motion.div>

        <motion.h3
          className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-foreground mb-4"
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {feature.title}
        </motion.h3>

        <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
          {feature.description}
        </p>

        {/* Animated line */}
        <motion.div
          className="mt-6 h-0.5 rounded-full bg-primary/20"
          animate={{ scaleX: hovered ? 1 : 0.3 }}
          style={{ transformOrigin: "left" }}
          transition={{ duration: 0.5 }}
        />
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
}: ServicePageLayoutProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  
  const ctaRef = useRef<HTMLDivElement>(null);
  const featuresInView = useInView(featuresRef, { once: true, margin: "-80px" });
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
      <Navbar />

      {/* ═══ Hero ═══ */}
      <section ref={heroRef} className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
          <img
            src={heroImage}
            alt={title}
            className="w-full h-full object-cover"
            fetchPriority="high"
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
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] mb-8"
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
        <div className="max-w-5xl mx-auto px-6 py-10 md:py-14">
          <div className="grid grid-cols-3 divide-x divide-border/60">
            {stats.map((stat) => (
              <ScrollReveal key={stat.label} direction="up" distance={30}>
                <div className="text-center px-4">
                  <p className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground">
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
              </ScrollReveal>
            ))}
          </div>
        </div>
        <RevealLine delay={0.2} />
      </div>

      {/* ═══ Features ═══ */}
      <section ref={featuresRef} className="py-28 lg:py-40 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 lg:mb-28">
            <p className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-5 font-medium">
              What We Offer
            </p>
            <RevealLine delay={0.05} className="max-w-[100px] mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-foreground leading-tight">
              <SplitTextReveal text="Built for" delay={0.1} />{" "}
              <SplitTextReveal text="excellence." delay={0.3} className="text-muted-foreground" />
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {features.map((feature, i) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                index={i}
                inView={featuresInView}
              />
            ))}
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
            <span style={{ color: "hsl(0 0% 100% / 0.5)" }}>extraordinary?</span>
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
