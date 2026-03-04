import { useRef, ReactNode, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { LucideIcon, ArrowRight } from "lucide-react";
import { AnimatedCounter, RevealLine } from "@/components/ScrollAnimations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ExploreServicesSection from "@/components/ExploreServicesSection";
import { SEO } from "@/components/SEO";
import { useCalendly } from "@/components/CalendlyModal";



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
  dateModified?: string;
  ogImage?: string;
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
  featuresBefore?: string;
  featuresAccent?: string;
}

/* Deferred Hero Video */
const DeferredHeroVideo = ({ src }: { src: string }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
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
          <div className="absolute inset-0 bg-black/30" />
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
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
      transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
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
  featuresBefore = "Built for ",
  featuresAccent = "done right.",
}: ServicePageLayoutProps) => {
  const { openCalendly } = useCalendly();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.55], [0, -50]);

  return (
    <div className="min-h-screen bg-background">
      {seo && (
        <SEO
          title={seo.title}
          description={seo.description}
          canonical={seo.canonical}
          jsonLd={seo.jsonLd}
          dateModified={seo.dateModified}
          ogImage={seo.ogImage}
        />
      )}
      <Navbar />
      <main id="main-content">

      {/* --- Hero --- */}
      <section ref={heroRef} aria-label={`${title} hero`} className="relative h-screen min-h-[600px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <img
            src={heroImage}
            alt={`${title} production by VM Producers - professional event management`}
            className="w-full h-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
          {heroVideo && <DeferredHeroVideo src={heroVideo} />}
          <div className="absolute inset-0 hero-gradient" />
        </motion.div>

        {/* Breadcrumb navigation - visible to users and search engines */}
        <nav
          aria-label="Breadcrumb"
          className="absolute top-20 left-6 z-20"
        >
          <ol
            className="flex items-center gap-1.5 text-xs font-medium"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <Link
                to="/"
                itemProp="item"
                className="transition-colors duration-200 hover:text-white"
                style={{ color: "hsl(0 0% 100% / 0.60)" }}
              >
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li aria-hidden="true" style={{ color: "hsl(0 0% 100% / 0.40)" }}>›</li>
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <span itemProp="name" style={{ color: "hsl(0 0% 100% / 0.90)" }}>{title}</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative z-10 h-full flex flex-col items-center justify-center px-6"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="font-display font-medium text-sm uppercase tracking-[0.3em] mb-6"
              style={{ color: "hsl(0, 0%, 100%, 0.7)" }}
            >
              {subtitle}
            </motion.p>
            {/*
              LCP FIX: opacity starts at 1 so pre-rendered text is indexable.
              The y-axis slide still provides visual entrance animation.
              data-speakable marks this for SGE speakable spec.
            */}
            <motion.h1
              initial={{ opacity: 1, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-display font-bold leading-[1.05] md:leading-[0.95] mb-4 md:mb-8"
              style={{ color: "white" }}
              data-speakable
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 1, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-2 service-summary"
              style={{ color: "hsl(0, 0%, 100%, 0.75)" }}
              data-speakable
            >
              {description}
            </motion.p>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
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
      <section
        aria-labelledby="features-heading"
        className="py-16 md:py-24 lg:py-32"
      >
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
              id="features-heading"
              className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {featuresBefore}
              <span style={{ color: "hsl(var(--primary))" }}>{featuresAccent}</span>
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
      <ExploreServicesSection currentPath={seo?.canonical ?? ""} />

      {/* --- Shared CTA Section --- */}
      <CTASection />

      </main>
      <Footer />
    </div>
  );
};

export default ServicePageLayout;
