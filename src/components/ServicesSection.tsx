import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Globe, Monitor, Video, Users, Mic, ArrowRight, Sparkles, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { useDeferredVideo } from "@/hooks/useDeferredVideo";
import { SplitTextReveal, VelocityScrollBand, FloatingOrbs, RevealLine } from "@/components/ScrollAnimations";
import virtualEventsImg from "@/assets/virtual-events-control-room.webp";
import videoProductionImg from "@/assets/video-production.webp";
import hybridEventsImg from "@/assets/hybrid-summit-stage.webp";
import meetingProsImg from "@/assets/meeting-pros.webp";
import liveEventsImg from "@/assets/live-events.webp";

// Video paths as strings for deferred loading
const VIDEO_SRCS = {
  liveEvents: () => import("@/assets/live-events-video.mp4"),
  virtualEvents: () => import("@/assets/virtual-events-video.mp4"),
  videoProduction: () => import("@/assets/video-production-video.mp4"),
  hybridEvents: () => import("@/assets/hybrid-events-video.mp4"),
  meetingPros: () => import("@/assets/meeting-pros-video.mp4"),
};

const services = [
  {
    title: "Live Events",
    icon: Mic,
    description: "Your in-person event, from 50 to 50,000 - run tight, on budget, on time.",
    features: ["Full A-to-Z event management", "Venue, hotel & logistics sourcing", "Staging, lighting & AV production", "On-site staff & guest experience"],
    image: liveEventsImg,
    videoKey: "liveEvents" as const,
    href: "/live-events",
    stat: "500+",
    statLabel: "Events",
    accent: "215 60% 35%",
  },
  {
    title: "Virtual Events",
    icon: Monitor,
    description: "Your virtual event, fully produced - webinars to large-scale conferences for up to 100,000 attendees.",
    features: ["Conferences, summits & livestreams", "TV-quality broadcast production", "Multi-language translation (5+ languages)", "Up to 100,000 attendees online"],
    image: virtualEventsImg,
    videoKey: "virtualEvents" as const,
    href: "/virtual-events",
    stat: "100K",
    statLabel: "Attendees",
    accent: "190 70% 35%",
  },
  {
    title: "Hybrid Events",
    icon: Globe,
    description: "Your in-person and virtual audiences, brought together into one seamless, engaging experience.",
    features: ["In-person + virtual simultaneously", "Multi-camera branded livestream", "Live polls, real-time Q&A & audience app", "Unified experience for every attendee"],
    image: hybridEventsImg,
    videoKey: "hybridEvents" as const,
    href: "/hybrid-events",
    stat: "95%",
    statLabel: "Retention",
    accent: "250 50% 40%",
  },
  {
    title: "Video Production",
    icon: Video,
    description: "Teasers, recaps, brand films - shot and delivered exactly the way you need them.",
    features: ["Event highlight reels & recaps", "Promotional & marketing videos", "Whiteboard explainer videos", "Broadcast-ready, fast turnaround"],
    image: videoProductionImg,
    videoKey: "videoProduction" as const,
    href: "/video-production",
    stat: "2000+",
    statLabel: "Videos",
    accent: "340 60% 45%",
  },
  {
    title: "Meeting Pros",
    icon: Users,
    description: "Your event professional, matched within 48 hours - anywhere in the world, verified and ready.",
    features: ["55+ event specialties covered", "Matched & onboarded in 48 hours", "On-site & virtual producers available", "Active in 70+ countries worldwide"],
    image: meetingProsImg,
    videoKey: "meetingPros" as const,
    href: "/meeting-pros",
    stat: "70+",
    statLabel: "Countries",
    accent: "160 50% 35%",
  },
];

// Indices of services that have videos (all have videoKey)
const videoIndices = services
  .map((s, i) => (s.videoKey ? i : -1))
  .filter((i) => i !== -1);

/* Entry animation - y + scale only for smooth GPU compositing */
const cardEntryDelays = [0, 0.13, 0.26, 0.39, 0.52];

/* Single Bento Card */
const BentoCard = ({
  service,
  index,
  className,
  isVideoActive,
  onVideoEnded,
}: {
  service: (typeof services)[number];
  index: number;
  className?: string;
  isVideoActive: boolean;
  onVideoEnded: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const Icon = service.icon;
  const entryDelay = cardEntryDelays[index % cardEntryDelays.length];

  // Dynamically import video only when activated
  useEffect(() => {
    if (isVideoActive && service.videoKey && !videoSrc) {
      VIDEO_SRCS[service.videoKey]().then((mod) => {
        setVideoSrc(mod.default);
      });
    }
  }, [isVideoActive, service.videoKey, videoSrc]);

  // When isVideoActive and video is loaded, play it
  useEffect(() => {
    if (isVideoActive && videoSrc) {
      setShowVideo(true);
      const t = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {});
        }
      }, 100);
      return () => clearTimeout(t);
    } else if (!isVideoActive) {
      setShowVideo(false);
    }
  }, [isVideoActive, videoSrc]);

  const handleVideoEnded = () => {
    setShowVideo(false);
    onVideoEnded();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 72, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 1.0,
        delay: entryDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative group rounded-2xl overflow-hidden cursor-pointer${className ? ` ${className}` : ""}`}
      style={{ willChange: "transform, opacity" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={service.href} className="absolute inset-0 z-20" aria-label={service.title} />

      {/* Media background */}
      <div className="absolute inset-0">
        {/* Image always present as base */}
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Video overlay with fade */}
        {videoSrc && (
          <AnimatePresence>
            {showVideo && (
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
              >
                <video
                  ref={videoRef}
                  src={videoSrc}
                  muted
                  playsInline
                  preload="none"
                  onEnded={handleVideoEnded}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Dark overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10 md:from-black/80 md:via-black/40"
          animate={{ opacity: hovered ? 1 : 0.85 }}
          transition={{ duration: 0.4 }}
        />

        {/* Accent glow on hover */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: hovered ? 0.15 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: `radial-gradient(ellipse at 50% 80%, hsl(${service.accent}), transparent 70%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-4 sm:p-5">
        {/* Stat badge */}
        <motion.div
          className="absolute top-3 right-3 flex flex-col items-end"
          animate={{ y: hovered ? -4 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <span
            className="font-display text-2xl font-bold leading-none"
            style={{
              color: "white",
              textShadow: `0 0 20px hsl(${service.accent} / 0.8), 0 2px 6px rgba(0,0,0,0.6)`,
            }}
          >
            {service.stat}
          </span>
          <span className="text-xs uppercase tracking-[0.15em] mt-1" style={{ color: "hsl(0 0% 100% / 0.5)" }}>
            {service.statLabel}
          </span>
        </motion.div>

        {/* Icon */}
        <motion.div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm"
          style={{
            background: `hsl(${service.accent.split(' ')[0]} ${service.accent.split(' ')[1]} 75% / 0.15)`,
            border: `1px solid hsl(${service.accent.split(' ')[0]} ${service.accent.split(' ')[1]} 75% / 0.35)`,
          }}
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Icon size={18} style={{ color: `hsl(${service.accent.split(' ')[0]} ${service.accent.split(' ')[1]} 75%)` }} />
        </motion.div>

        {/* Title */}
        <motion.h3
          className="font-display text-xl sm:text-2xl font-bold mb-1.5"
          style={{ color: "white" }}
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {service.title}
        </motion.h3>

        {/* Description */}
        <p
          className="hidden sm:block text-xs leading-relaxed mb-3 max-w-xs"
          style={{ color: "hsl(0 0% 100% / 0.65)" }}
        >
          {service.description}
        </p>

        {/* Feature bullets */}
        <ul className="hidden lg:flex flex-col gap-1 mb-3">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-1.5">
              <span className="shrink-0 w-1 h-1 rounded-full" style={{ background: `hsl(${service.accent.split(' ')[0]} ${service.accent.split(' ')[1]} 75%)` }} />
              <span className="text-[10px] leading-snug" style={{ color: "hsl(0 0% 100% / 0.55)" }}>{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA arrow */}
        <motion.div
          className="flex items-center gap-2 font-display text-sm font-medium"
          style={{ color: `hsl(${service.accent})` }}
          animate={{ x: hovered ? 8 : 0, opacity: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.3 }}
        >
          Explore
          <ArrowRight size={14} />
        </motion.div>
      </div>
    </motion.div>
  );
};

/* Main Section */
const ServicesSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  // Track which service indices currently have active video (max 2)
  const [activeVideos, setActiveVideos] = useState<Set<number>>(new Set());
  const nextQueueIndexRef = useRef(0);

  const fillSlots = useCallback(() => {
    setActiveVideos((prev) => {
      if (prev.size >= 2) return prev;
      const next = new Set(prev);
      let idx = nextQueueIndexRef.current;
      let attempts = 0;
      while (next.size < 2 && attempts < videoIndices.length) {
        const candidate = videoIndices[idx % videoIndices.length];
        if (!next.has(candidate)) {
          next.add(candidate);
          nextQueueIndexRef.current = (idx + 1) % videoIndices.length;
        }
        idx++;
        attempts++;
      }
      return next;
    });
  }, []);

  const handleVideoEnded = useCallback(
    (serviceIndex: number) => {
      setActiveVideos((prev) => {
        const next = new Set(prev);
        next.delete(serviceIndex);
        return next;
      });
      // Immediately fill the open slot
      setTimeout(() => fillSlots(), 300);
    },
    [fillSlots]
  );

  // Kick off videos after images have loaded
  useEffect(() => {
    const t1 = setTimeout(() => fillSlots(), 4000);
    return () => clearTimeout(t1);
  }, [fillSlots]);

  return (
    <section id="services" className="pb-28 lg:pb-40 pt-10 lg:pt-16 relative overflow-hidden">
      {/* Subtle warm-to-cool background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 20% 0%, hsl(216 90% 58% / 0.05) 0%, transparent 60%)," +
            "radial-gradient(ellipse 60% 40% at 80% 100%, hsl(216 90% 58% / 0.04) 0%, transparent 55%)," +
            "radial-gradient(ellipse 50% 60% at 50% 50%, hsl(215 60% 40% / 0.025) 0%, transparent 70%)",
        }}
      />
      {/* Animated ambient orbs */}
      <FloatingOrbs count={3} className="opacity-70" />
      {/* Section header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-6 mb-10 lg:mb-16 text-center relative z-10 overflow-hidden">
          {/* Watermark icon */}
          <Sparkles
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
            style={{ width: 300, height: 300, opacity: 0.04, color: "hsl(var(--primary))" }}
          />
          {/* Section icon badge */}
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
          From 50-person workshops to 100,000-attendee conferences, we handle every detail so you can focus on what matters: your audience.
        </motion.p>
        {/* Title divider */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.45))" }} />
          <span className="flex items-center justify-center w-8 h-8 rounded-xl" style={{ background: "hsl(var(--primary) / 0.10)", border: "1px solid hsl(var(--primary) / 0.28)" }}>
            <Layers size={14} style={{ color: "hsl(var(--primary))" }} />
          </span>
          <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, hsl(var(--primary) / 0.45))" }} />
        </div>
      </div>

      {/* Velocity scroll band - reacts to scroll speed */}
      <div className="border-t border-b border-border/25 mb-14 lg:mb-20 relative z-10">
        <VelocityScrollBand
          items={["Live Events", "Virtual Events", "Hybrid", "Video Production", "Meeting Pros", "Fortune 500", "10K+ Attendees", "70+ Countries", "2000+ Events", "95% Retention"]}
          baseSpeed={55}
          separator="◆"
        />
      </div>

      {/* Services Grid - 5 equal portrait cards, all visible at once */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4 auto-rows-[340px] sm:auto-rows-[380px] lg:auto-rows-[420px]">
          <BentoCard service={services[0]} index={0} isVideoActive={activeVideos.has(0)} onVideoEnded={() => handleVideoEnded(0)} />
          <BentoCard service={services[2]} index={2} isVideoActive={activeVideos.has(2)} onVideoEnded={() => handleVideoEnded(2)} />
          <BentoCard service={services[1]} index={1} isVideoActive={activeVideos.has(1)} onVideoEnded={() => handleVideoEnded(1)} />
          <BentoCard service={services[3]} index={3} isVideoActive={activeVideos.has(3)} onVideoEnded={() => handleVideoEnded(3)} />
          <BentoCard service={services[4]} index={4} isVideoActive={activeVideos.has(4)} onVideoEnded={() => handleVideoEnded(4)} />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
