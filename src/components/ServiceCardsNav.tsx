import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Globe, Monitor, Video, Users, Mic, ArrowUpRight } from "lucide-react";
import virtualEventsImg from "@/assets/virtual events.webp";
import videoProductionImg from "@/assets/video production.webp";
import hybridEventsImg from "@/assets/hybrid events.webp";
import meetingProsImg from "@/assets/Executive & Team Meetings.webp";
import liveEventsImg from "@/assets/live-events.webp";
import liveEventsVid from "@/assets/live event video.mp4";
import virtualEventsVid from "@/assets/virtual events.mp4";
import hybridEventsVid from "@/assets/hybrid event.mp4";
import videoProductionVid from "@/assets/video production.mp4";
import meetingProsVid from "@/assets/Executive & Team Meetings.mp4";

const MotionLink = motion.create(Link);

interface ServiceNavItem {
  title: string;
  tag: string;
  icon: React.ElementType;
  description: string;
  image: string;
  video: string;
  stat: string;
  statLabel: string;
  href: string;
  accentH: number;
  accentS: number;
  accentL: number;
}

export const ALL_NAV_SERVICES: ServiceNavItem[] = [
  {
    title: "Live Events",
    tag: "50 to 50,000 attendees",
    icon: Mic,
    description: "End-to-end in-person production. You show up as the host.",
    image: liveEventsImg,
    video: liveEventsVid,
    stat: "500+",
    statLabel: "Events produced",
    href: "/live-events",
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
    href: "/virtual-events",
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
    href: "/hybrid-events",
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
    href: "/video-production",
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
    href: "/meeting-pros",
    accentH: 205, accentS: 75, accentL: 50,
  },
];

// ─── Single Card ─────────────────────────────────────────────────────────────

interface ServiceNavCardProps {
  service: ServiceNavItem;
  index: number;
  isPlaying: boolean;
  onVideoEnded: (index: number) => void;
}

const ServiceNavCard = ({ service, index, isPlaying, onVideoEnded }: ServiceNavCardProps) => {
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
      to={service.href}
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.25, ease: "easeOut" } }}
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
      <div className="relative w-full h-20 sm:h-32 md:h-40 lg:h-48 overflow-hidden shrink-0">
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
          className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20 hidden sm:flex items-baseline gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-sm"
          style={{ background: "hsl(0 0% 0% / 0.50)", border: "1px solid hsl(0 0% 100% / 0.14)" }}
        >
          <span className="font-display text-xs sm:text-base lg:text-lg font-bold text-white leading-none">{service.stat}</span>
          <span className="text-[10px] sm:text-xs uppercase tracking-widest" style={{ color: `hsl(${h} ${s}% ${l + 20}%)` }}>{service.statLabel}</span>
        </div>

        {/* Hover arrow */}
        <div
          className="absolute top-3 right-3 z-20 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0"
          style={{ background: `hsl(${h} ${s}% ${l}% / 0.90)` }}
        >
          <ArrowUpRight size={13} className="text-white" />
        </div>
      </div>

      {/* Row 2 - Icon + Title */}
      <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 lg:px-5 pt-3 sm:pt-4 self-start w-full">
        <span
          className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl shrink-0"
          style={{ background: `hsl(${h} ${s}% ${l}% / 0.15)`, border: `1px solid hsl(${h} ${s}% ${l}% / 0.30)` }}
        >
          <Icon className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: `hsl(${h} ${s}% ${l + 15}%)` }} />
        </span>
        <h3 className="font-display text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white leading-tight">{service.title}</h3>
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

// ─── Nav Section ─────────────────────────────────────────────────────────────

interface ServiceCardsNavProps {
  /**
   * Pass the current page href (e.g. "/live-events") to exclude it from the list.
   * Omit or leave empty to show all 5 cards (homepage).
   */
  currentPath?: string;
}

const ServiceCardsNav = ({ currentPath = "" }: ServiceCardsNavProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  const cards = currentPath
    ? ALL_NAV_SERVICES.filter((s) => s.href !== currentPath)
    : ALL_NAV_SERVICES;

  const gridCols = cards.length >= 5
    ? "grid-cols-2 lg:grid-cols-5"
    : "grid-cols-2 lg:grid-cols-4";

  const [playing, setPlaying] = useState<number[]>([0, 2]);

  const handleVideoEnded = useCallback((endedIndex: number) => {
    setPlaying((prev) => {
      const remaining = prev.filter((i) => i !== endedIndex);
      const idle = cards.map((_, i) => i).filter((i) => !prev.includes(i));
      if (idle.length === 0) return prev;
      const next = idle[Math.floor(Math.random() * idle.length)];
      return [...remaining, next];
    });
  }, [cards]);

  return (
    <section ref={sectionRef} className="relative py-14 md:py-20 overflow-hidden">
      {/* Top divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-px"
        style={{ background: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.18), transparent)" }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, hsl(var(--primary) / 0.04) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-2 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 lg:mb-10 text-center"
        >
          <p className="font-display text-sm uppercase tracking-[0.3em] font-medium mb-3 text-primary">
            Keep exploring
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-foreground">
            {currentPath ? "Other services you might need" : "Explore our services"}
          </h2>
        </motion.div>

        {/* Clickable hint */}
        <div className="flex items-center justify-center gap-1.5 mb-3 lg:mb-4">
          <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "hsl(var(--primary))" }} />
          <p className="text-[11px] sm:text-xs font-medium text-muted-foreground">
            Click any card to explore that service
          </p>
        </div>

        {/* Cards grid */}
        <div className={`grid ${gridCols} gap-3 lg:gap-x-5 lg:gap-y-0`}>
          {cards.map((s, i) => (
            <ServiceNavCard
              key={s.href}
              service={s}
              index={i}
              isPlaying={playing.includes(i)}
              onVideoEnded={handleVideoEnded}
            />
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-px"
        style={{ background: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.12), transparent)" }}
      />
    </section>
  );
};

export default ServiceCardsNav;
