import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Trophy,
  MessageCircle,
  MapPin,
  Clock,
  Camera,
  Ticket,
  Heart,
  ArrowRight,
} from "lucide-react";
import { MagneticHover, RevealLine, FloatingOrbs } from "@/components/ScrollAnimations";
import { useCalendly } from "@/components/CalendlyModal";
import liveEventsVideo from "@/assets/live-events-video.mp4";
import virtualEventsVideo from "@/assets/virtual-events-video.mp4";
import hybridEventsVideo from "@/assets/hybrid-events-video.mp4";
import videoProductionVideo from "@/assets/video-production-video.mp4";
import meetingProsVideo from "@/assets/meeting-pros-video.mp4";

const VIDEOS = [
  liveEventsVideo,
  virtualEventsVideo,
  hybridEventsVideo,
  videoProductionVideo,
  meetingProsVideo,
  liveEventsVideo,
  virtualEventsVideo,
];

const items = [
  {
    icon: Trophy,
    title: "100% Success Rate",
    tag: "Guaranteed",
    accent: { border: "hsl(152 55% 38% / 0.22)", icon: "hsl(152 45% 38%)", iconBg: "hsl(152 55% 42% / 0.10)" },
  },
  {
    icon: MessageCircle,
    title: "White-Glove Communication",
    tag: "Dedicated Team",
    accent: { border: "hsl(140 50% 36% / 0.22)", icon: "hsl(140 42% 37%)", iconBg: "hsl(140 50% 40% / 0.10)" },
  },
  {
    icon: MapPin,
    title: "70+ Countries",
    tag: "Worldwide",
    accent: { border: "hsl(163 52% 36% / 0.22)", icon: "hsl(163 44% 37%)", iconBg: "hsl(163 52% 40% / 0.10)" },
  },
  {
    icon: Clock,
    title: "Matched in 48h",
    tag: "Speed",
    accent: { border: "hsl(130 46% 37% / 0.22)", icon: "hsl(130 40% 38%)", iconBg: "hsl(130 46% 42% / 0.10)" },
  },
  {
    icon: Camera,
    title: "Broadcast-Quality",
    tag: "Premium",
    accent: { border: "hsl(168 54% 34% / 0.22)", icon: "hsl(168 46% 34%)", iconBg: "hsl(168 54% 38% / 0.10)" },
  },
  {
    icon: Ticket,
    title: "Up to 100K Attendees",
    tag: "Scalable",
    accent: { border: "hsl(145 48% 36% / 0.22)", icon: "hsl(145 42% 36%)", iconBg: "hsl(145 48% 40% / 0.10)" },
  },
  {
    icon: Heart,
    title: "95% Client Retention",
    tag: "Proven",
    accent: { border: "hsl(158 50% 34% / 0.22)", icon: "hsl(158 44% 34%)", iconBg: "hsl(158 50% 38% / 0.10)" },
  },
];

const TOTAL = items.length; // 7

interface ItemCardProps {
  item: (typeof items)[number];
  index: number;
  isPlaying: boolean;
  onEnded: (index: number) => void;
}

const ItemCard = ({ item, index, isPlaying, onEnded }: ItemCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = item.icon;
  const a = item.accent;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isPlaying]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col rounded-xl overflow-hidden"
      style={{ border: `1px solid ${isPlaying ? a.icon : a.border}`, background: "hsl(220 20% 96%)", transition: "border-color 0.4s" }}
    >
      {/* Video area */}
      <div className="relative w-full aspect-video overflow-hidden bg-black/10">
        <video
          ref={videoRef}
          src={VIDEOS[index]}
          muted
          playsInline
          preload="metadata"
          onEnded={() => onEnded(index)}
          className="w-full h-full object-cover"
          style={{ opacity: isPlaying ? 1 : 0, transition: "opacity 0.4s" }}
        />
        {/* Icon shown when not playing */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: isPlaying ? 0 : 1, transition: "opacity 0.4s" }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: a.iconBg, border: `1px solid ${a.border}` }}
          >
            <Icon size={14} style={{ color: a.icon }} />
          </div>
        </div>
        {/* Playing indicator */}
        {isPlaying && (
          <div className="absolute top-1.5 right-1.5 flex gap-0.5 items-end h-3">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-0.5 rounded-full"
                style={{
                  background: a.icon,
                  height: "100%",
                  animation: `barBounce 0.8s ease-in-out ${i * 0.15}s infinite alternate`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col items-center gap-1.5 p-3 text-center">
        <p className="font-display font-bold text-[11px] leading-tight text-foreground">{item.title}</p>
        <span
          className="text-[9px] font-semibold px-2 py-px rounded-full"
          style={{ background: a.iconBg, color: a.icon, border: `1px solid ${a.border}` }}
        >
          {item.tag}
        </span>
      </div>
    </motion.div>
  );
};

const WhatYouGetSection = () => {
  const { openCalendly } = useCalendly();
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });

  // Maintain exactly 2 playing slots; cycle through all cards
  const [playing, setPlaying] = useState<Set<number>>(new Set([0, 1]));
  const nextRef = useRef<number>(2);

  const handleEnded = (index: number) => {
    setPlaying((prev) => {
      const next = new Set(prev);
      next.delete(index);
      const nextIndex = nextRef.current % TOTAL;
      nextRef.current++;
      next.add(nextIndex);
      return next;
    });
  };

  return (
    <section className="relative overflow-hidden" style={{ background: "hsl(220 20% 98%)" }}>
      <style>{`
        @keyframes barBounce {
          from { transform: scaleY(0.3); }
          to   { transform: scaleY(1); }
        }
      `}</style>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(216 90% 58% / 0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, hsl(216 90% 58% / 0.06) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full" style={{ background: "radial-gradient(circle, hsl(216 90% 58% / 0.05) 0%, transparent 70%)" }} />
      </div>
      <FloatingOrbs count={4} className="opacity-80" />
      <div className="max-w-5xl mx-auto px-2 sm:px-6 py-12 lg:py-16">
        <div ref={headerRef} className="text-center max-w-xl mx-auto mb-8 space-y-3">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-display text-xs uppercase tracking-[0.3em] font-semibold"
            style={{ color: "hsl(var(--primary))" }}
          >
            What's in it for you
          </motion.p>
          <RevealLine delay={0.1} color="from-transparent via-primary/30 to-transparent" className="max-w-[60px] mx-auto" />
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight"
            style={{ color: "hsl(var(--foreground))" }}
          >
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={isHeaderInView ? { y: "0%" } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                Everything working{" "}
                <motion.span
                  initial={{ y: "110%" }}
                  animate={isHeaderInView ? { y: "0%" } : {}}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{ color: "hsl(var(--primary))" }}
                >
                  in your favour.
                </motion.span>
              </motion.span>
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {items.map((item, i) => (
            <ItemCard
              key={item.title}
              item={item}
              index={i}
              isPlaying={playing.has(i)}
              onEnded={handleEnded}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex justify-center mt-8"
        >
          <MagneticHover>
            <button
              type="button"
              onClick={openCalendly}
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-display font-semibold text-sm transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{ background: "hsl(var(--primary))", color: "white", boxShadow: "0 0 30px hsl(var(--primary) / 0.25)" }}
            >
              Get started today
              <ArrowRight className="w-4 h-4" />
            </button>
          </MagneticHover>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatYouGetSection;

