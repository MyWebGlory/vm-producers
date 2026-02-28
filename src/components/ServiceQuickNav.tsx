import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Mic, Monitor, Globe, Video, Users, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Mic,
    title: "Live Events",
    subtitle: "50 – 50,000 attendees",
    description: "In-person experiences run tight, on budget, on time.",
    href: "/live-events",
    accent: "215 60% 35%",
  },
  {
    icon: Monitor,
    title: "Virtual Events",
    subtitle: "Up to 100K attendees",
    description: "Broadcast-quality virtual production for any scale.",
    href: "/virtual-events",
    accent: "190 70% 35%",
  },
  {
    icon: Globe,
    title: "Hybrid Events",
    subtitle: "In-person + virtual",
    description: "One seamless experience for every audience.",
    href: "/hybrid-events",
    accent: "250 50% 40%",
  },
  {
    icon: Video,
    title: "Video Production",
    subtitle: "Teasers & brand films",
    description: "Shot and delivered fast. Broadcast-ready.",
    href: "/video-production",
    accent: "340 60% 45%",
  },
  {
    icon: Users,
    title: "Meeting Pros",
    subtitle: "70+ countries",
    description: "Verified professionals matched within 48 hours.",
    href: "/meeting-pros",
    accent: "160 50% 35%",
  },
];

// Speed in px per frame (~60fps => ~22px/sec)
const SPEED = 0.36;

interface ServiceCardProps {
  s: (typeof services)[number];
  suffix: string;
}

const ServiceCard = ({ s, suffix }: ServiceCardProps) => {
  const Icon = s.icon;
  return (
    <div key={s.href + suffix} className="min-w-[200px] sm:min-w-[230px] lg:min-w-0 flex-shrink-0 lg:flex-shrink">
      <Link
        to={s.href}
        draggable={false}
        className="group relative flex flex-col gap-3 rounded-2xl p-4 lg:p-5 border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full select-none"
        style={{
          background: `hsl(${s.accent} / 0.04)`,
          borderColor: `hsl(${s.accent} / 0.18)`,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = `hsl(${s.accent} / 0.09)`;
          (e.currentTarget as HTMLElement).style.borderColor = `hsl(${s.accent} / 0.38)`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = `hsl(${s.accent} / 0.04)`;
          (e.currentTarget as HTMLElement).style.borderColor = `hsl(${s.accent} / 0.18)`;
        }}
      >
        <span
          className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
          style={{ background: `hsl(${s.accent} / 0.12)`, border: `1.5px solid hsl(${s.accent} / 0.25)` }}
        >
          <Icon size={18} style={{ color: `hsl(${s.accent})` }} />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1">
            <p className="font-display font-bold text-sm leading-tight" style={{ color: "hsl(var(--foreground))" }}>
              {s.title}
            </p>
            <ArrowRight
              size={13}
              className="shrink-0 mt-0.5 transition-transform duration-300 group-hover:translate-x-1"
              style={{ color: `hsl(${s.accent})` }}
            />
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] mt-0.5 mb-1.5" style={{ color: `hsl(${s.accent} / 0.80)` }}>
            {s.subtitle}
          </p>
          <p className="text-xs leading-relaxed" style={{ color: "hsl(var(--foreground) / 0.58)" }}>
            {s.description}
          </p>
        </div>
      </Link>
    </div>
  );
};

const ServiceQuickNav = () => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const pausedRef = useRef(false);
  const rafRef = useRef<number>(0);
  const manualPauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
  }, []);

  // requestAnimationFrame infinite marquee — only on < lg
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (window.innerWidth >= 1024) return;

    const tick = () => {
      if (!pausedRef.current && el) {
        const half = el.scrollWidth / 2;
        el.scrollLeft += SPEED;
        if (el.scrollLeft >= half) {
          el.scrollLeft -= half;
        }
        updateArrows();
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [updateArrows]);

  const pause = useCallback(() => {
    pausedRef.current = true;
    if (manualPauseTimerRef.current) clearTimeout(manualPauseTimerRef.current);
  }, []);

  const resume = useCallback(() => {
    pausedRef.current = false;
  }, []);

  const scrollManual = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    pausedRef.current = true;
    if (manualPauseTimerRef.current) clearTimeout(manualPauseTimerRef.current);
    const amount = el.clientWidth * 0.65;
    el.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
    manualPauseTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, 3000);
  };

  return (
    <section
      ref={ref}
      className="relative py-10 lg:py-14 overflow-hidden"
      aria-label="Service navigation"
    >
      {/* Separator line top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-px"
        style={{ background: "linear-gradient(to right, transparent, hsl(43 80% 48% / 0.25), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-8 lg:mb-10"
        >
          <p
            className="font-display text-[10px] uppercase tracking-[0.3em] font-semibold mb-2"
            style={{ color: "hsl(43 80% 48% / 0.75)" }}
          >
            Find your service
          </p>
          <h2 className="text-xl sm:text-2xl font-display font-bold tracking-tight" style={{ color: "hsl(var(--foreground))" }}>
            What type of event are you planning?
          </h2>
        </motion.div>

        {/* Mobile / Tablet: infinite auto-scroll marquee */}
        <div
          className="relative lg:hidden"
          onMouseEnter={pause}
          onMouseLeave={resume}
          onTouchStart={pause}
          onTouchEnd={resume}
        >
          {/* Left arrow — visible on sm+ when scrolled */}
          <button
            onClick={() => scrollManual("left")}
            aria-label="Scroll left"
            className={`hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 items-center justify-center w-9 h-9 rounded-full shadow-md transition-all duration-200 ${canScrollLeft ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            style={{ background: "hsl(var(--background))", border: "1.5px solid hsl(43 80% 48% / 0.28)", color: "hsl(43 80% 48%)" }}
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
          </button>

          {/* Right arrow — always visible on sm+ */}
          <button
            onClick={() => scrollManual("right")}
            aria-label="Scroll right"
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 items-center justify-center w-9 h-9 rounded-full shadow-md transition-all duration-200"
            style={{ background: "hsl(var(--background))", border: "1.5px solid hsl(43 80% 48% / 0.28)", color: "hsl(43 80% 48%)" }}
          >
            <ChevronRight size={16} strokeWidth={2.5} />
          </button>

          {/* Fade edges */}
          <div className="absolute left-0 top-0 h-full w-12 pointer-events-none z-[1]" style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }} />
          <div className="absolute right-0 top-0 h-full w-12 pointer-events-none z-[1]" style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }} />

          {/* Strip with duplicated items for seamless loop */}
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto -mx-6 px-6 pb-2 scrollbar-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {services.map((s) => <ServiceCard key={s.href + "-a"} s={s} suffix="-a" />)}
            {services.map((s) => <ServiceCard key={s.href + "-b"} s={s} suffix="-b" />)}
          </div>
        </div>

        {/* Desktop: regular 5-col grid */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-4">
          {services.map((s) => <ServiceCard key={s.href + "-grid"} s={s} suffix="-grid" />)}
        </div>
      </div>

      {/* Separator line bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-px"
        style={{ background: "linear-gradient(to right, transparent, hsl(43 80% 48% / 0.2), transparent)" }}
      />
    </section>
  );
};

export default ServiceQuickNav;
