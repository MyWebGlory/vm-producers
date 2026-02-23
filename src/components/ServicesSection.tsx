import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Globe, Monitor, Video, Users, Mic, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useDeferredVideo } from "@/hooks/useDeferredVideo";
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
    description: "Seamless, unforgettable in-person experiences, from intimate gatherings to large-scale productions.",
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
    description: "All-inclusive virtual production for webinars to conferences with up to 100,000 attendees.",
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
    description: "Bridging in-person and virtual audiences into one cohesive, engaging experience.",
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
    description: "Captivating video content from teasers to highlight reels that elevate your brand.",
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
    description: "A worldwide network of verified event professionals, matched within 48 hours across 70+ countries.",
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

/* ── Volatile entry presets per card ── */
const volatilePresets = [
  { y: 120, x: -40, rotate: -2.5, scale: 0.88 },
  { y: 160, x: 50, rotate: 3, scale: 0.85 },
  { y: 140, x: -30, rotate: 1.5, scale: 0.9 },
  { y: 180, x: 40, rotate: -2, scale: 0.86 },
  { y: 100, x: 0, rotate: 1, scale: 0.92 },
];

/* ── Single Bento Card ── */
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
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hovered, setHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const Icon = service.icon;
  const preset = volatilePresets[index % volatilePresets.length];

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
      initial={{
        opacity: 0,
        y: preset.y,
        x: preset.x,
        rotate: preset.rotate,
        scale: preset.scale,
      }}
      animate={
        inView
          ? { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }
          : {}
      }
      transition={{
        duration: 1,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative group rounded-2xl overflow-hidden cursor-pointer ${className}`}
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
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"
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
      <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
        {/* Stat badge */}
        <motion.div
          className="absolute top-5 right-5 flex flex-col items-end"
          animate={{ y: hovered ? -4 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <span
            className="font-display text-3xl md:text-4xl font-bold leading-none"
            style={{ color: `hsl(${service.accent})` }}
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
            background: `hsl(${service.accent} / 0.15)`,
            border: `1px solid hsl(${service.accent} / 0.25)`,
          }}
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Icon size={18} style={{ color: `hsl(${service.accent})` }} />
        </motion.div>

        {/* Title */}
        <motion.h3
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3"
          style={{ color: "white" }}
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {service.title}
        </motion.h3>

        {/* Description */}
        <p
          className="text-sm md:text-base leading-relaxed mb-4 max-w-md"
          style={{ color: "hsl(0 0% 100% / 0.65)" }}
        >
          {service.description}
        </p>

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

/* ── Main Section ── */
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
    <section id="services" className="pb-28 lg:pb-40 pt-10 lg:pt-16 relative">
      {/* Section header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-6 mb-16 lg:mb-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-6 font-medium"
        >
          Our Services
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={headerInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground leading-[1.05]"
        >
          Crafted to impress.
          <br />
          <span className="text-muted-foreground">Built to perform.</span>
        </motion.h2>
      </div>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 lg:gap-8 auto-rows-[380px] md:auto-rows-[420px] lg:auto-rows-[440px]">
          <BentoCard service={services[0]} index={0} className="md:col-span-2 lg:col-span-3" isVideoActive={activeVideos.has(0)} onVideoEnded={() => handleVideoEnded(0)} />
          <BentoCard service={services[2]} index={2} className="md:col-span-1 lg:col-span-2" isVideoActive={activeVideos.has(2)} onVideoEnded={() => handleVideoEnded(2)} />
          <BentoCard service={services[1]} index={1} className="md:col-span-1 lg:col-span-1" isVideoActive={activeVideos.has(1)} onVideoEnded={() => handleVideoEnded(1)} />
          <BentoCard service={services[3]} index={3} className="md:col-span-1 lg:col-span-1" isVideoActive={activeVideos.has(3)} onVideoEnded={() => handleVideoEnded(3)} />
          <BentoCard service={services[4]} index={4} className="md:col-span-1 lg:col-span-2" isVideoActive={activeVideos.has(4)} onVideoEnded={() => handleVideoEnded(4)} />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
