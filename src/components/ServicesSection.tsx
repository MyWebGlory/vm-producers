import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Globe, Monitor, Video, Users, Mic, ArrowUpRight } from "lucide-react";
import { SplitTextReveal, VelocityScrollBand, FloatingOrbs } from "@/components/ScrollAnimations";
import virtualEventsImg from "@/assets/virtual-events-control-room.webp";
import videoProductionImg from "@/assets/video-production.webp";
import hybridEventsImg from "@/assets/hybrid-summit-stage.webp";
import meetingProsImg from "@/assets/meeting-pros.webp";
import liveEventsImg from "@/assets/live-events.webp";
import liveEventsVid from "@/assets/live-events-video.mp4";
import virtualEventsVid from "@/assets/virtual-events-video.mp4";
import hybridEventsVid from "@/assets/hybrid-events-video.mp4";
import videoProductionVid from "@/assets/video-production-video.mp4";
import meetingProsVid from "@/assets/meeting-pros-video.mp4";

const MotionLink = motion.create(Link);

interface Service {
  title: string;
  tag: string;
  icon: React.ElementType;
  description: string;
  image: string;
  video: string;
  stat: string;
  statLabel: string;
  accentH: number;
  accentS: number;
  accentL: number;
}

const services: Service[] = [
  {
    title: "Live Events",
    tag: "50 to 50,000 attendees",
    icon: Mic,
    description: "End-to-end in-person production. You show up as the host.",
    image: liveEventsImg,
    video: liveEventsVid,
    stat: "500+",
    statLabel: "Events produced",
    accentH: 216, accentS: 90, accentL: 58,
  },
  {
    title: "Virtual Events",
    tag: "Webinars · Conferences · Summits",
    icon: Monitor,
    description: "TV-quality broadcasts, up to 500K attendees, zero tech stress.",
    image: virtualEventsImg,
    video: virtualEventsVid,
    stat: "500K",
    statLabel: "Max attendees",
    accentH: 207, accentS: 82, accentL: 52,
  },
  {
    title: "Hybrid Events",
    tag: "One stage. Two audiences.",
    icon: Globe,
    description: "A first class experience for everyone. Every time.",
    image: hybridEventsImg,
    video: hybridEventsVid,
    stat: "95%",
    statLabel: "Audience retention",
    accentH: 222, accentS: 78, accentL: 62,
  },
  {
    title: "Video Production",
    tag: "Promos · Recaps · Explainers",
    icon: Video,
    description: "Promos, highlight reels & explainers. Broadcast quality, fast turnaround.",
    image: videoProductionImg,
    video: videoProductionVid,
    stat: "2000+",
    statLabel: "Videos delivered",
    accentH: 213, accentS: 88, accentL: 55,
  },
  {
    title: "Meeting Pros",
    tag: "Verified talent in 72 h or less",
    icon: Users,
    description: "Verified event professionals matched worldwide in 72 hours.",
    image: meetingProsImg,
    video: meetingProsVid,
    stat: "70+",
    statLabel: "Countries covered",
    accentH: 205, accentS: 75, accentL: 50,
  },
];

interface ServiceCardProps {
  service: Service;
  index: number;
  isPlaying: boolean;
  onVideoEnded: (index: number) => void;
}

const ServiceCard = ({ service, index, isPlaying, onVideoEnded }: ServiceCardProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = service.icon;
  const { accentH: h, accentS: s, accentL: l } = service;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isPlaying) {
      v.currentTime = 0;
      v.play().catch(() => {/* autoplay blocked */});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [isPlaying]);

  return (
    <MotionLink
      ref={ref}
      to={`/${service.title.toLowerCase().replace(/\s+/g, "-")}`}
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.28, ease: "easeOut" } }}
      className="group relative rounded-3xl overflow-hidden cursor-pointer flex flex-col lg:[display:grid] lg:[grid-template-rows:subgrid] lg:[grid-row:span_4]"
      style={{
        background: `linear-gradient(145deg, hsl(${h} ${s}% 8%) 0%, hsl(${h} ${s - 15}% 12%) 100%)`,
        border: `1px solid hsl(${h} ${s}% ${l}% / 0.20)`,
        boxShadow: `0 0 0 1px hsl(${h} ${s}% ${l}% / 0.06), 0 8px 32px hsl(${h} ${s}% 10% / 0.4)`,
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{ boxShadow: `inset 0 0 60px hsl(${h} ${s}% ${l}% / 0.10)` }}
      />

      {/* Row 1 - Media */}
      <div className="relative w-full h-40 sm:h-32 md:h-40 lg:h-52 overflow-hidden shrink-0">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
        <video
          ref={videoRef}
          src={service.video}
          muted
          playsInline
          preload="none"
          onEnded={() => onVideoEnded(index)}
          className="absolute inset-0 w-full h-full object-cover brightness-90 transition-opacity duration-700"
          style={{ opacity: isPlaying ? 1 : 0 }}
        />
        <div
          className="absolute inset-0 z-10"
          style={{ background: `linear-gradient(to bottom, transparent 40%, hsl(${h} ${s - 10}% 8% / 0.70) 100%)` }}
        />

        {/* Stat badge */}
        <div
          className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20 flex items-baseline gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-sm"
          style={{ background: "hsl(0 0% 0% / 0.50)", border: "1px solid hsl(0 0% 100% / 0.14)" }}
        >
          <span className="font-display text-xs sm:text-lg lg:text-xl font-bold text-white leading-none">{service.stat}</span>
          <span className="text-[10px] sm:text-xs uppercase tracking-widest" style={{ color: `hsl(${h} ${s}% ${l + 20}%)` }}>{service.statLabel}</span>
        </div>

        {/* Hover arrow */}
        <div
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0"
          style={{ background: `hsl(${h} ${s}% ${l}% / 0.90)` }}
        >
          <ArrowUpRight size={14} className="text-white" />
        </div>
      </div>

      {/* Row 2 - Icon + Title */}
      <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 lg:px-5 pt-3 sm:pt-4 lg:pt-5 self-start w-full">
        <span
          className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-lg sm:rounded-xl shrink-0"
          style={{ background: `hsl(${h} ${s}% ${l}% / 0.15)`, border: `1px solid hsl(${h} ${s}% ${l}% / 0.30)` }}
        >
          <Icon className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: `hsl(${h} ${s}% ${l + 15}%)` }} />
        </span>
        <h3 className="font-display text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white leading-tight">{service.title}</h3>
      </div>

      {/* Row 3 - Tag */}
      <p
        className="hidden sm:block px-3 sm:px-4 lg:px-5 pt-1 sm:pt-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider self-start"
        style={{ color: `hsl(${h} ${s}% ${l + 18}%)` }}
      >
        {service.tag}
      </p>

      {/* Row 4 - Description */}
      <p
        className="px-3 sm:px-4 lg:px-5 pt-1 sm:pt-1.5 pb-3 sm:pb-4 lg:pb-5 text-[11px] sm:text-xs md:text-sm leading-relaxed hidden sm:block self-start"
        style={{ color: "hsl(0 0% 100% / 0.55)" }}
      >
        {service.description}
      </p>
      {/* Mobile-only bottom spacer (description hidden on xs) */}
      <div className="pb-2.5 sm:hidden shrink-0" />
    </MotionLink>
  );
};

const ServicesSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  const [playing, setPlaying] = useState<number[]>([0, 2]);

  const handleVideoEnded = useCallback((endedIndex: number) => {
    setPlaying((prev) => {
      const remaining = prev.filter((i) => i !== endedIndex);
      const idle = services.map((_, i) => i).filter((i) => !prev.includes(i));
      if (idle.length === 0) return prev;
      const next = idle[Math.floor(Math.random() * idle.length)];
      return [...remaining, next];
    });
  }, []);

  return (
    <section id="services" aria-labelledby="services-heading" className="pb-16 lg:pb-24 pt-8 lg:pt-10 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(216 90% 58% / 0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
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
      <div ref={headerRef} className="max-w-7xl mx-auto px-2 sm:px-6 mb-6 lg:mb-10 text-center relative z-10 overflow-hidden">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-6 font-medium"
        >
          Our Services
        </motion.p>
        <h2 id="services-heading" className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground">
          <SplitTextReveal text="Five ways we" delay={0.1} stagger={0.06} className="justify-center" />
          <br />
          <SplitTextReveal text="produce your event." delay={0.35} stagger={0.06} className="justify-center" style={{ color: "hsl(var(--primary))" }} />
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.55 }}
          className="mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-muted-foreground text-balance"
        >
          <span className="block">Whatever you're building (in a room, online, or both), we handle production end to end.</span><span className="block">You just focus on showing up.</span>
        </motion.p>
      </div>

      {/* Velocity scroll band */}
      <div className="border-t border-b border-border/25 mb-8 lg:mb-12 relative z-10">
        <VelocityScrollBand
          items={["Live Events", "Virtual Events", "Hybrid Events", "Video Production", "Meeting Pros", "Full A-to-Z Production", "Up to 500K Attendees", "70+ Countries", "2000+ Events", "95% Retention Rate", "Fortune 500 Clients", "72h Talent Match"]}
          baseSpeed={55}
          separator="|"
        />
      </div>

      {/* 5 equal cards */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 relative z-10">
        {/* Clickable hint */}
        <div className="flex items-center justify-center gap-1.5 mb-3 lg:mb-4">
          <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "hsl(var(--primary))" }} />
          <p className="text-[11px] sm:text-xs font-medium text-muted-foreground">
            Click any card to explore that service
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-x-5 lg:gap-y-0">
          {services.map((s, i) => (
            <ServiceCard
              key={s.title}
              service={s}
              index={i}
              isPlaying={playing.includes(i)}
              onVideoEnded={handleVideoEnded}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
