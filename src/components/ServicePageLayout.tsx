import { useRef, ReactNode, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { MagneticHover, AnimatedCounter } from "@/components/ScrollAnimations";
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

/** Shows image immediately, fades video in after 2s delay */
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
  const featuresInView = useInView(featuresRef, { once: true, margin: "-80px" });

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
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
          {/* Image always shown first */}
          <img
            src={heroImage}
            alt={title}
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          {/* Video fades in after loading */}
          {heroVideo && (
            <DeferredHeroVideo src={heroVideo} />
          )}
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
      </section>

      {/* Stats */}
      <div className="relative z-20 bg-card border-t border-border/40">
        <div className="max-w-5xl mx-auto px-6 py-10 md:py-14">
          <div className="grid grid-cols-3 divide-x divide-border/60">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center px-4">
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
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <section ref={featuresRef} className="py-28 lg:py-40">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <p className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-5 font-medium">
              What We Offer
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight">
              Built for{" "}
              <span className="text-muted-foreground">excellence.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 * i, duration: 0.7 }}
                className="group p-8 lg:p-10 rounded-2xl border border-border/50 bg-card hover:border-primary/20 transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-full bg-primary/8 flex items-center justify-center mb-6">
                  <span className="text-primary font-display font-bold text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Content */}
      {additionalContent}

      {/* CTA */}
      <section className="py-28 lg:py-40 bg-card">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-primary font-display text-xs uppercase tracking-[0.3em] mb-6 font-medium">
            Let's Talk
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 text-foreground leading-tight">
            Ready to create something{" "}
            <span className="text-muted-foreground">extraordinary?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-12 leading-relaxed">
            We fit seamlessly within any organization. Don't tackle it on your own.
          </p>
          <MagneticHover>
            <a
              href="https://www.vmproducers.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-10 py-4 rounded-full bg-foreground text-background font-display font-semibold text-base hover:opacity-90 transition-all duration-300"
            >
              Get in Touch
            </a>
          </MagneticHover>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicePageLayout;
