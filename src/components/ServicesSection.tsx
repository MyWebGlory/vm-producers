import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Monitor, Video, Users, Mic, Sparkles } from "lucide-react";
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

const ServiceCard = ({ service, index }: { service: (typeof services)[number]; index: number }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = service.icon;

  return (
    <motion.a
      ref={ref}
      href={`/${service.title.toLowerCase().replace(/\s+/g, "-")}`}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-1"
      style={{ border: `1px solid hsl(${service.accent} / 0.22)`, background: "hsl(var(--background))" }}
    >
      {/* Image */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(160deg, hsl(${service.accent} / 0.25) 0%, transparent 60%)` }}
        />
        <div
          className="absolute bottom-3 left-3 flex items-baseline gap-1 px-2.5 py-1 rounded-full"
          style={{ background: "hsl(0 0% 0% / 0.60)", border: "1px solid hsl(0 0% 100% / 0.12)" }}
        >
          <span className="font-display text-base font-bold text-white leading-none">{service.stat}</span>
          <span className="text-[10px] uppercase tracking-widest" style={{ color: "hsl(0 0% 100% / 0.55)" }}>{service.statLabel}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-2.5">
          <span
            className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
            style={{ background: `hsl(${service.accent} / 0.12)`, border: `1px solid hsl(${service.accent} / 0.28)` }}
          >
            <Icon size={15} style={{ color: `hsl(${service.accent})` }} />
          </span>
          <h3 className="font-display text-base font-bold text-foreground leading-tight">{service.title}</h3>
        </div>
        <p className="text-[11px] font-medium" style={{ color: `hsl(${service.accent})` }}>{service.tag}</p>
      </div>
    </motion.a>
  );
};

const ServicesSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="services" className="pb-12 lg:pb-16 pt-8 lg:pt-10 relative overflow-hidden">
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
      <div ref={headerRef} className="max-w-7xl mx-auto px-6 mb-6 lg:mb-8 text-center relative z-10 overflow-hidden">
        <Sparkles
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          style={{ width: 300, height: 300, opacity: 0.04, color: "hsl(var(--primary))" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-6 font-medium"
        >
          What you get
        </motion.p>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground">
          <SplitTextReveal text="Turn your vision" delay={0.1} stagger={0.06} className="justify-center" />
          <br />
          <SplitTextReveal text="into a standing ovation." delay={0.35} stagger={0.06} className="justify-center" style={{ color: "hsl(var(--primary))" }} />
        </h2>

      </div>

      {/* Velocity scroll band */}
      <div className="border-t border-b border-border/25 mb-6 lg:mb-8 relative z-10">
        <VelocityScrollBand
          items={["Live Events", "Virtual Events", "Hybrid", "Video Production", "Meeting Pros", "Fortune 500", "10K+ Attendees", "70+ Countries", "2000+ Events", "95% Retention"]}
          baseSpeed={55}
          separator="?"
        />
      </div>

      {/* 5 service cards */}
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
