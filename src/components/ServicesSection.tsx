import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Sparkles, Globe, Monitor, Video, Users, Mic } from "lucide-react";
import { ScrollReveal, AnimatedCounter } from "@/components/ScrollAnimations";
import virtualEventsImg from "@/assets/virtual-events.webp";
import videoProductionImg from "@/assets/video-production.webp";
import hybridEventsImg from "@/assets/hybrid-events.webp";
import meetingProsImg from "@/assets/meeting-pros.webp";
import liveEventsImg from "@/assets/live-events.webp";

type LayoutType = "left" | "right" | "center";

const services = [
  {
    title: "Live Events",
    icon: Mic,
    description: "In-person events are the bread and butter of building community. We ensure seamless and unforgettable experiences with expert planning and execution.",
    features: ["Full Service Management", "Venue Sourcing", "Registration & Check-in", "Staging & AV", "Catering & Hospitality"],
    image: liveEventsImg,
    stat: { value: 500, suffix: "+", label: "Live events delivered" },
    layout: "left" as LayoutType,
  },
  {
    title: "Virtual Events",
    icon: Monitor,
    description: "Our all-inclusive virtual event production manages everything from intimate webinars to expansive online conferences with up to 100,000 attendees.",
    features: ["Multi-session Conferences", "Premium Livestreams", "Expo Booths", "Polls & Networking", "Multi-language Support"],
    image: virtualEventsImg,
    stat: { value: 100, suffix: "K", label: "Max attendees per event" },
    layout: "right" as LayoutType,
  },
  {
    title: "Hybrid Events",
    icon: Globe,
    description: "We connect in-person and virtual attendees, ensuring both groups feel equally involved through smooth online integration and shared experiences.",
    features: ["Multi-camera Livestream", "Branded Interfaces", "Shared Mobile App", "Live Q&A", "Engagement Tracking"],
    image: hybridEventsImg,
    stat: { value: 95, suffix: "%", label: "Client retention rate" },
    layout: "center" as LayoutType,
  },
  {
    title: "Video Production",
    icon: Video,
    description: "We produce captivating video content that boosts your event marketing and enriches the overall experience, from teasers to highlight reels.",
    features: ["Promo Videos", "Explainer Animations", "Highlight Reels", "Testimonials", "Social Content"],
    image: videoProductionImg,
    stat: { value: 2000, suffix: "+", label: "Videos produced" },
    layout: "right" as LayoutType,
  },
  {
    title: "Meeting Pros",
    icon: Users,
    description: "A worldwide network of skilled event professionals with adaptable staffing solutions across 50 states and 70 countries, matched within 48 hours.",
    features: ["48h Talent Matching", "Verified Professionals", "99.9% Success Rate", "Global Coverage", "Scalable Teams"],
    image: meetingProsImg,
    stat: { value: 70, suffix: "+", label: "Countries covered" },
    layout: "left" as LayoutType,
  },
];

/* ─── Shared sub-components ─── */

const FeaturePills = ({ features, inView }: { features: string[]; inView: boolean }) => (
  <div className="flex flex-wrap gap-2">
    {features.map((f, fi) => (
      <motion.span
        key={f}
        initial={{ opacity: 0, y: 12, scale: 0.9 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ delay: 0.4 + fi * 0.07, duration: 0.4, ease: "backOut" }}
        className="rounded-full px-4 py-2 bg-secondary border border-border/60 text-sm text-secondary-foreground font-medium flex items-center gap-1.5"
      >
        <Sparkles size={10} className="text-primary/50" />
        {f}
      </motion.span>
    ))}
  </div>
);

const StatBadge = ({ stat, inView }: { stat: typeof services[0]["stat"]; inView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
    transition={{ delay: 0.5, duration: 0.6, ease: "backOut" }}
    className="glass-dark rounded-xl px-5 py-3 inline-block"
  >
    <p className="text-2xl md:text-3xl font-display font-bold" style={{ color: "white" }}>
      <AnimatedCounter value={stat.value} suffix={stat.suffix || ""} />
    </p>
    <p className="text-xs" style={{ color: "hsl(220,15%,70%)" }}>{stat.label}</p>
  </motion.div>
);

/* ─── Layout: image LEFT, content RIGHT ─── */
const LayoutLeft = ({ service }: { service: typeof services[0] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = service.icon;

  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center"
    >
      {/* Image — natural ratio, no crop, with parallax */}
      <div ref={parallaxRef} className="relative">
        <motion.div style={{ y: imgY }}>
          <div className="rounded-2xl overflow-hidden elevated border border-border/40">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-auto object-contain"
            />
          </div>
        </motion.div>
        {/* Floating stat badge */}
        <div className="absolute -bottom-4 -right-2 lg:-right-6 z-10">
          <StatBadge stat={service.stat} inView={isInView} />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex items-center gap-4"
        >
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/15"
          >
            <Icon size={22} className="text-primary" />
          </motion.div>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            {service.title}
          </h3>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-muted-foreground text-lg leading-relaxed"
        >
          {service.description}
        </motion.p>

        <FeaturePills features={service.features} inView={isInView} />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <a
            href="#contact"
            className="inline-flex px-7 py-3 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm hover:bg-primary/90 transition-all duration-300 glow-shadow hover:scale-105 hover:-translate-y-0.5"
          >
            Learn More →
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ─── Layout: content LEFT, image RIGHT ─── */
const LayoutRight = ({ service }: { service: typeof services[0] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = service.icon;

  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center"
    >
      {/* Content (on left on desktop) */}
      <div className="space-y-5 order-2 lg:order-1">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex items-center gap-4"
        >
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/15"
          >
            <Icon size={22} className="text-primary" />
          </motion.div>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            {service.title}
          </h3>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-muted-foreground text-lg leading-relaxed"
        >
          {service.description}
        </motion.p>

        <FeaturePills features={service.features} inView={isInView} />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <a
            href="#contact"
            className="inline-flex px-7 py-3 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm hover:bg-primary/90 transition-all duration-300 glow-shadow hover:scale-105 hover:-translate-y-0.5"
          >
            Learn More →
          </a>
        </motion.div>
      </div>

      {/* Image (on right on desktop) */}
      <div ref={parallaxRef} className="relative order-1 lg:order-2">
        <motion.div style={{ y: imgY }}>
          <div className="rounded-2xl overflow-hidden elevated border border-border/40">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-auto object-contain"
            />
          </div>
        </motion.div>
        <div className="absolute -bottom-4 -left-2 lg:-left-6 z-10">
          <StatBadge stat={service.stat} inView={isInView} />
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Layout: image CENTERED on top, content below ─── */
const LayoutCenter = ({ service }: { service: typeof services[0] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = service.icon;

  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="elevated rounded-3xl border border-border/40 overflow-hidden bg-card"
    >
      {/* Full-width image — natural ratio */}
      <div ref={parallaxRef} className="relative overflow-hidden">
        <motion.div style={{ y: imgY }}>
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-auto object-contain"
          />
        </motion.div>
        {/* Stat badge floating */}
        <div className="absolute bottom-5 left-5 z-10">
          <StatBadge stat={service.stat} inView={isInView} />
        </div>
        {/* Subtle bottom gradient for blending */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card to-transparent" />
      </div>

      {/* Content centered below */}
      <div className="px-8 lg:px-16 py-10 lg:py-14 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex items-center justify-center gap-4 mb-5"
        >
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/15"
          >
            <Icon size={22} className="text-primary" />
          </motion.div>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            {service.title}
          </h3>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-muted-foreground text-lg leading-relaxed mb-6"
        >
          {service.description}
        </motion.p>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {service.features.map((f, fi) => (
            <motion.span
              key={f}
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.4 + fi * 0.07, duration: 0.4, ease: "backOut" }}
              className="rounded-full px-4 py-2 bg-secondary border border-border/60 text-sm text-secondary-foreground font-medium flex items-center gap-1.5"
            >
              <Sparkles size={10} className="text-primary/50" />
              {f}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <a
            href="#contact"
            className="inline-flex px-7 py-3 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm hover:bg-primary/90 transition-all duration-300 glow-shadow hover:scale-105 hover:-translate-y-0.5"
          >
            Learn More →
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ─── Layout picker ─── */
const ServiceBlock = ({ service }: { service: typeof services[0] }) => {
  switch (service.layout) {
    case "left":
      return <LayoutLeft service={service} />;
    case "right":
      return <LayoutRight service={service} />;
    case "center":
      return <LayoutCenter service={service} />;
  }
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal className="text-center mb-20">
          <p className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-4 font-medium">
            Our Services
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground">
            Everything You Need
            <br />
            <span className="glow-text">In One Place</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-24 lg:space-y-32">
          {services.map((service) => (
            <ServiceBlock key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
