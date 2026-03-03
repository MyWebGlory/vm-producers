import { useRef, ReactNode, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { LucideIcon, Mic, Monitor, Globe, Video, Users, ArrowRight, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedCounter, RevealLine } from "@/components/ScrollAnimations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { SEO } from "@/components/SEO";
import { useCalendly } from "@/components/CalendlyModal";

const ALL_SERVICES = [
  { icon: Mic,     title: "Live Events",      subtitle: "50 to 50K attendees",    href: "/live-events",      accent: "215 60% 35%" },
  { icon: Monitor, title: "Virtual Events",   subtitle: "Up to 100K attendees", href: "/virtual-events",   accent: "190 70% 35%" },
  { icon: Globe,   title: "Hybrid Events",    subtitle: "In-person + virtual",  href: "/hybrid-events",    accent: "250 50% 40%" },
  { icon: Video,   title: "Video Production", subtitle: "Teasers & brand films", href: "/video-production", accent: "340 60% 45%" },
  { icon: Users,   title: "Meeting Pros",     subtitle: "70+ countries",        href: "/meeting-pros",     accent: "160 50% 35%" },
];

const RelatedServicesNav = ({ currentPath }: { currentPath: string }) => {
  const { openCalendly } = useCalendly();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const others = ALL_SERVICES.filter((s) => s.href !== currentPath);

  return (
    <section ref={ref} className="relative py-16 md:py-20 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, hsl(var(--primary) / 0.04) 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] max-w-3xl h-px"
        style={{ background: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.2), transparent)" }}
      />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-8 lg:mb-10 text-center"
        >
          <p className="font-display text-[10px] uppercase tracking-[0.3em] font-semibold mb-1" style={{ color: "hsl(var(--primary) / 0.70)" }}>
            Keep exploring
          </p>
          <h2 className="text-xl sm:text-2xl font-display font-bold tracking-tight" style={{ color: "hsl(var(--foreground))" }}>
            Other services you might need
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {others.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.href}
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={s.href}
                  className="group flex flex-col gap-3 rounded-2xl p-4 border h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                  style={{ background: `hsl(${s.accent} / 0.04)`, borderColor: `hsl(${s.accent} / 0.18)` }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = `hsl(${s.accent} / 0.09)`;
                    (e.currentTarget as HTMLElement).style.borderColor = `hsl(${s.accent} / 0.35)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = `hsl(${s.accent} / 0.04)`;
                    (e.currentTarget as HTMLElement).style.borderColor = `hsl(${s.accent} / 0.18)`;
                  }}
                >
                  <span
                    className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                    style={{ background: `hsl(${s.accent} / 0.12)`, border: `1.5px solid hsl(${s.accent} / 0.25)` }}
                  >
                    <Icon size={17} style={{ color: `hsl(${s.accent})` }} />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <p className="font-display font-bold text-sm" style={{ color: "hsl(var(--foreground))" }}>{s.title}</p>
                      <ArrowRight size={12} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" style={{ color: `hsl(${s.accent})` }} />
                    </div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: `hsl(${s.accent} / 0.75)` }}>{s.subtitle}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Contact button - centered below cards, all screen sizes */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.38, duration: 0.5 }}
          className="mt-8 flex justify-center"
        >
          <button
            type="button"
            onClick={openCalendly}
            className="group inline-flex items-center gap-2 px-7 py-3 rounded-full font-display font-semibold text-sm transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{ background: "hsl(var(--primary))", color: "white" }}
          >
            <PhoneCall size={13} />
            Talk to us
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] max-w-3xl h-px"
        style={{ background: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.15), transparent)" }}
      />
    </section>
  );
};

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
  image?: string;
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

/* Feature Row, alternating image + text */
const FeatureRow = ({
  feature,
  index,
  heroImage,
}: {
  feature: ServiceFeature;
  index: number;
  heroImage: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = feature.icon;
  const imageRight = index % 2 === 1;
  const img = feature.image || heroImage;

  const imageCol = (
    <motion.div
      className="relative rounded-2xl overflow-hidden w-full aspect-[16/9] sm:aspect-[4/3] md:aspect-[16/10] max-h-56 sm:max-h-none"
      initial={{ opacity: 0, x: imageRight ? 48 : -48 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <img src={img} alt={feature.title} loading="lazy" className="w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.10) 0%, transparent 60%)" }} />
    </motion.div>
  );

  const textCol = (
    <motion.div
      className="flex flex-col justify-center gap-4 sm:gap-5"
      initial={{ opacity: 0, x: imageRight ? -48 : 48 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      {Icon && (
        <span
          className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl shrink-0"
          style={{ background: "hsl(var(--primary) / 0.10)", border: "1.5px solid hsl(var(--primary) / 0.25)" }}
        >
          <Icon size={19} style={{ color: "hsl(var(--primary))" }} />
        </span>
      )}
      <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold leading-tight text-foreground">
        {feature.title}
      </h3>
      <p className="text-sm sm:text-base leading-relaxed" style={{ color: "hsl(var(--foreground) / 0.60)" }}>
        {feature.description}
      </p>
    </motion.div>
  );

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 md:gap-16 lg:gap-20 items-center"
    >
      {/* On mobile always show image first, on sm+ respect alternating order */}
      <div className="sm:hidden">{imageCol}</div>
      <div className="sm:hidden">{textCol}</div>
      <div className="hidden sm:contents">
        {imageRight ? <>{textCol}{imageCol}</> : <>{imageCol}{textCol}</>}
      </div>
    </div>
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
  const { openCalendly } = useCalendly();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -60]);

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

      {/* --- Hero --- */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
          <img
            src={heroImage}
            alt={title}
            className="w-full h-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
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

      {/* --- Stats --- */}
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

      {/* --- Features --- */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-20">
            <motion.p
              className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-4 font-medium"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              What You Get
            </motion.p>
            <motion.h2
              className="text-3xl md:text-5xl font-display font-bold text-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Built for{" "}
              <span style={{ color: "hsl(var(--primary))" }}>excellence.</span>
            </motion.h2>
          </div>

          <div className="flex flex-col gap-16 md:gap-24 lg:gap-32">
            {features.map((feature, i) => (
              <FeatureRow key={feature.title} feature={feature} index={i} heroImage={heroImage} />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Content */}
      {additionalContent}

      {/* --- Related Services Navigation --- */}
      <RelatedServicesNav currentPath={seo?.canonical ?? ""} />

      {/* --- Shared CTA Section --- */}
      <CTASection />

      <Footer />
    </div>
  );
};

export default ServicePageLayout;
