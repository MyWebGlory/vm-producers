import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Monitor, Video, Users, Mic, Sparkles, Layers } from "lucide-react";
import { SplitTextReveal, VelocityScrollBand, FloatingOrbs } from "@/components/ScrollAnimations";
import virtualEventsImg from "@/assets/virtual-events-control-room.webp";
import videoProductionImg from "@/assets/video-production.webp";
import hybridEventsImg from "@/assets/hybrid-summit-stage.webp";
import meetingProsImg from "@/assets/meeting-pros.webp";
import liveEventsImg from "@/assets/live-events.webp";

const services = [
  {
    title: "Live Events",
    tag: "50 to 50,000 attendees",
    icon: Mic,
    description: "Your in-person event, from 50 to 50,000, run tight, on budget, on time.",
    features: ["Full A-to-Z event management", "Venue, hotel & logistics sourcing", "Staging, lighting & AV production", "On-site staff & guest experience"],
    image: liveEventsImg,
    stat: "500+",
    statLabel: "Events",
    accent: "215 60% 35%",
  },
  {
    title: "Virtual Events",
    tag: "Up to 100,000 online",
    icon: Monitor,
    description: "Your virtual event, fully produced, webinars to large-scale conferences for up to 100,000 attendees.",
    features: ["Conferences, summits & livestreams", "TV-quality broadcast production", "Multi-language translation (5+ languages)", "Up to 100,000 attendees online"],
    image: virtualEventsImg,
    stat: "100K",
    statLabel: "Attendees",
    accent: "190 70% 35%",
  },
  {
    title: "Hybrid Events",
    tag: "One stage. Two audiences.",
    icon: Globe,
    description: "Your in-person and virtual audiences, brought together into one seamless experience.",
    features: ["In-person + virtual simultaneously", "Multi-camera branded livestream", "Live polls, real-time Q&A & audience app", "Unified experience for every attendee"],
    image: hybridEventsImg,
    stat: "95%",
    statLabel: "Retention",
    accent: "250 50% 40%",
  },
  {
    title: "Video Production",
    tag: "Teasers, recaps & brand films",
    icon: Video,
    description: "Shot and delivered exactly the way you need them, fast turnaround, broadcast quality.",
    features: ["Event highlight reels & recaps", "Promotional & marketing videos", "Whiteboard explainer videos", "Broadcast-ready, fast turnaround"],
    image: videoProductionImg,
    stat: "2000+",
    statLabel: "Videos",
    accent: "340 60% 45%",
  },
  {
    title: "Meeting Pros",
    tag: "Matched worldwide in 48 h",
    icon: Users,
    description: "Your event professional, matched within 48 hours, anywhere in the world, verified and ready.",
    features: ["55+ event specialties covered", "Matched & onboarded in 48 hours", "On-site & virtual producers available", "Active in 70+ countries worldwide"],
    image: meetingProsImg,
    stat: "70+",
    statLabel: "Countries",
    accent: "160 50% 35%",
  },
];

const ServiceRow = ({ service, index }: { service: (typeof services)[number]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = service.icon;
  const imageRight = index % 2 === 1;

  const imageCol = (
    <motion.div
      className="relative rounded-2xl overflow-hidden w-full aspect-[16/10]"
      initial={{ opacity: 0, x: imageRight ? 48 : -48 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <img src={service.image} alt={service.title} loading="lazy" className="w-full h-full object-cover" />
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(135deg, hsl(${service.accent} / 0.18) 0%, transparent 60%)` }}
      />
      <div
        className="absolute bottom-4 left-4 flex items-baseline gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm"
        style={{ background: "hsl(0 0% 0% / 0.55)", border: "1px solid hsl(0 0% 100% / 0.12)" }}
      >
        <span className="font-display text-xl font-bold text-white leading-none">{service.stat}</span>
        <span className="text-[10px] uppercase tracking-widest" style={{ color: "hsl(0 0% 100% / 0.55)" }}>{service.statLabel}</span>
      </div>
    </motion.div>
  );

  const textCol = (
    <motion.div
      className="flex flex-col justify-center gap-5"
      initial={{ opacity: 0, x: imageRight ? -48 : 48 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-3">
        <span
          className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0"
          style={{ background: `hsl(${service.accent} / 0.12)`, border: `1.5px solid hsl(${service.accent} / 0.30)` }}
        >
          <Icon size={20} style={{ color: `hsl(${service.accent})` }} />
        </span>
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] font-medium mb-0.5" style={{ color: `hsl(${service.accent})` }}>
            {service.tag}
          </p>
          <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground leading-tight">{service.title}</h3>
        </div>
      </div>

      <p className="text-base leading-relaxed" style={{ color: "hsl(var(--foreground) / 0.65)" }}>
        {service.description}
      </p>

      <ul className="flex flex-col gap-3">
        {service.features.map((f, fi) => (
          <motion.li
            key={f}
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.25 + fi * 0.07 }}
            className="flex items-start gap-3"
          >
            <span
              className="mt-1 shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
              style={{ background: `hsl(${service.accent} / 0.15)`, border: `1px solid hsl(${service.accent} / 0.35)` }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: `hsl(${service.accent})` }} />
            </span>
            <span className="text-sm leading-snug" style={{ color: "hsl(var(--foreground) / 0.75)" }}>{f}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      {imageRight ? <>{textCol}{imageCol}</> : <>{imageCol}{textCol}</>}
    </div>
  );
};

const ServicesSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="services" className="pb-28 lg:pb-40 pt-10 lg:pt-16 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 20% 0%, hsl(216 90% 58% / 0.05) 0%, transparent 60%)," +
            "radial-gradient(ellipse 60% 40% at 80% 100%, hsl(216 90% 58% / 0.04) 0%, transparent 55%)",
        }}
      />
      <FloatingOrbs count={3} className="opacity-70" />

      {/* Section header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-6 mb-10 lg:mb-16 text-center relative z-10 overflow-hidden">
        <Sparkles
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          style={{ width: 300, height: 300, opacity: 0.04, color: "hsl(var(--primary))" }}
        />
        <div className="relative flex justify-center mb-6">
          <span
            className="flex items-center justify-center w-14 h-14 rounded-2xl"
            style={{ background: "hsl(var(--primary) / 0.10)", border: "1.5px solid hsl(var(--primary) / 0.24)" }}
          >
            <Layers size={26} style={{ color: "hsl(var(--primary))" }} />
          </span>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-6 font-medium"
        >
          What you get
        </motion.p>
        <h2 className="text-[2.6rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground">
          <SplitTextReveal text="Turn your vision" delay={0.1} stagger={0.06} className="justify-center" />
          <br />
          <SplitTextReveal text="into a standing ovation." delay={0.35} stagger={0.06} className="justify-center" style={{ color: "hsl(var(--primary))" }} />
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-5 text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
          style={{ color: "hsl(var(--foreground) / 0.55)" }}
        >
          From 50-person workshops to 100,000-attendee conferences, every detail is handled for you so you can focus on what matters: your audience.
        </motion.p>
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.45))" }} />
          <span className="flex items-center justify-center w-8 h-8 rounded-xl" style={{ background: "hsl(var(--primary) / 0.10)", border: "1px solid hsl(var(--primary) / 0.28)" }}>
            <Layers size={14} style={{ color: "hsl(var(--primary))" }} />
          </span>
          <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, hsl(var(--primary) / 0.45))" }} />
        </div>
      </div>

      {/* Velocity scroll band */}
      <div className="border-t border-b border-border/25 mb-20 lg:mb-28 relative z-10">
        <VelocityScrollBand
          items={["Live Events", "Virtual Events", "Hybrid", "Video Production", "Meeting Pros", "Fortune 500", "10K+ Attendees", "70+ Countries", "2000+ Events", "95% Retention"]}
          baseSpeed={55}
          separator="?"
        />
      </div>

      {/* 5 service rows */}
      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col gap-20 lg:gap-28">
        {services.map((s, i) => (
          <ServiceRow key={s.title} service={s} index={i} />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
