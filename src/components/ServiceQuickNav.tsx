import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Mic, Monitor, Globe, Video, Users, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const services = [
  {
    icon: Mic,
    title: "Live Events",
    subtitle: "50 to 50,000 attendees",
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
    subtitle: "Before, during & after",
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

interface ServiceCardProps {
  s: (typeof services)[number];
  suffix: string;
  className?: string;
}

const ServiceCard = ({ s, suffix, className = "" }: ServiceCardProps) => {
  const Icon = s.icon;
  return (
    <div key={s.href + suffix} className={`flex-shrink-0 ${className}`}>
      <Link
        to={s.href}
        draggable={false}
        className="group relative flex flex-col gap-5 rounded-2xl p-6 lg:p-8 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 h-full select-none"
        style={{
          background: `hsl(${s.accent} / 0.04)`,
          borderColor: `hsl(${s.accent} / 0.18)`,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = `hsl(${s.accent} / 0.09)`;
          (e.currentTarget as HTMLElement).style.borderColor = `hsl(${s.accent} / 0.40)`;
          (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px hsl(${s.accent} / 0.15)`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = `hsl(${s.accent} / 0.04)`;
          (e.currentTarget as HTMLElement).style.borderColor = `hsl(${s.accent} / 0.18)`;
          (e.currentTarget as HTMLElement).style.boxShadow = "";
        }}
      >
        <span
          className="flex items-center justify-center w-14 h-14 rounded-2xl shrink-0"
          style={{ background: `hsl(${s.accent} / 0.12)`, border: `1.5px solid hsl(${s.accent} / 0.28)` }}
        >
          <Icon size={24} style={{ color: `hsl(${s.accent})` }} />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <p className="font-display font-bold text-lg leading-tight" style={{ color: "hsl(var(--foreground))" }}>
              {s.title}
            </p>
            <ArrowRight
              size={16}
              className="shrink-0 mt-1 transition-transform duration-300 group-hover:translate-x-1"
              style={{ color: `hsl(${s.accent})` }}
            />
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: `hsl(${s.accent} / 0.85)` }}>
            {s.subtitle}
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--foreground) / 0.60)" }}>
            {s.description}
          </p>
        </div>
      </Link>
    </div>
  );
};

const ServiceQuickNav = () => {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isMobile = useIsMobile();

  const [current, setCurrent] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isHovered, setIsHovered] = useState(false);

  // Touch state
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const isDragging = useRef(false);

  const maxIndex = Math.max(0, services.length - itemsPerView);

  const updateItemsPerView = useCallback(() => {
    const w = window.innerWidth;
    if (w < 640) setItemsPerView(1);
    else if (w < 1024) setItemsPerView(2);
    else setItemsPerView(3);
  }, []);

  useEffect(() => {
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, [updateItemsPerView]);

  // Clamp current when itemsPerView changes
  useEffect(() => {
    setCurrent((c) => Math.min(c, Math.max(0, services.length - itemsPerView)));
  }, [itemsPerView]);

  const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 2)), []);
  const next = useCallback(() => setCurrent((c) => Math.min(maxIndex, c + 2)), [maxIndex]);

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    isDragging.current = true;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (touchDeltaX.current < -50) next();
    else if (touchDeltaX.current > 50) prev();
    touchDeltaX.current = 0;
  };

  const cardWidthPercent = 100 / itemsPerView;

  return (
    <section
      ref={ref}
      className="relative py-10 lg:py-14 overflow-hidden"
      aria-label="Service navigation"
    >
      {/* Separator line top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-px"
        style={{ background: "linear-gradient(to right, transparent, hsl(216 90% 58% / 0.25), transparent)" }}
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
            style={{ color: "hsl(216 90% 58% / 0.75)" }}
          >
            Find your service
          </p>
          <h2 className="text-xl sm:text-2xl font-display font-bold tracking-tight" style={{ color: "hsl(var(--foreground))" }}>
            What type of event are you planning?
          </h2>
        </motion.div>

        {/* Carousel wrapper */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left arrow */}
          <motion.button
            onClick={prev}
            aria-label="Précédent"
            animate={{ opacity: current > 0 && isHovered && !isMobile ? 1 : 0, pointerEvents: current > 0 ? "auto" : "none" }}
            transition={{ duration: 0.2 }}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full shadow-lg"
            style={{
              background: "hsl(var(--background))",
              border: "1.5px solid hsl(216 90% 58% / 0.35)",
              color: "hsl(216 90% 58%)",
            }}
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
          </motion.button>

          {/* Right arrow */}
          <motion.button
            onClick={next}
            aria-label="Suivant"
            animate={{ opacity: current < maxIndex && isHovered && !isMobile ? 1 : 0, pointerEvents: current < maxIndex ? "auto" : "none" }}
            transition={{ duration: 0.2 }}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full shadow-lg"
            style={{
              background: "hsl(var(--background))",
              border: "1.5px solid hsl(216 90% 58% / 0.35)",
              color: "hsl(216 90% 58%)",
            }}
          >
            <ChevronRight size={18} strokeWidth={2.5} />
          </motion.button>

          {/* Track */}
          <div
            className="overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <motion.div
              ref={trackRef}
              className="flex"
              animate={{ x: `-${current * cardWidthPercent}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 35, mass: 0.8 }}
              style={{ gap: 0 }}
            >
              {services.map((s) => (
                <div
                  key={s.href}
                  style={{ minWidth: `${cardWidthPercent}%`, paddingLeft: "0.625rem", paddingRight: "0.625rem" }}
                >
                  <ServiceCard s={s} suffix="-carousel" className="h-full" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Aller à la slide ${i + 1}`}
              className="transition-all duration-300 rounded-full"
              style={{
                width: current === i ? "1.5rem" : "0.5rem",
                height: "0.5rem",
                background: current === i ? "hsl(216 90% 58%)" : "hsl(216 90% 58% / 0.28)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Separator line bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-px"
        style={{ background: "linear-gradient(to right, transparent, hsl(216 90% 58% / 0.2), transparent)" }}
      />
    </section>
  );
};

export default ServiceQuickNav;
