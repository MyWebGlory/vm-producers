import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { UserX, WifiOff, MonitorOff, Flame, Archive, Trophy, MessageCircle, MapPin, Clock, Camera, Ticket, Heart, X, Check, Scale, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useCalendly } from "@/components/CalendlyModal";
import { FloatingOrbs } from "@/components/ScrollAnimations";

const painPoints = [
  { Icon: UserX,       title: "You trusted the wrong person with too much." },
  { Icon: WifiOff,     title: "The tech failed at the worst possible moment." },
  { Icon: MonitorOff,  title: "Online attendees felt like an afterthought." },
  { Icon: Flame,       title: "You scrambled instead of hosted." },
  { Icon: Archive,     title: "Nothing lived on after day one." },
];

const benefits = [
  { Icon: Trophy,        title: "100% Success Rate - Guaranteed." },
  { Icon: MessageCircle, title: "White-Glove Communication." },
  { Icon: MapPin,        title: "Global Reach in 70+ Countries." },
  { Icon: Clock,         title: "Matched Within 72 Hours." },
  { Icon: Camera,        title: "Broadcast-Quality Production." },
  { Icon: Ticket,        title: "Up to 100,000 Attendees." },
  { Icon: Heart,         title: "95% Client Retention Rate." },
];

const ComparisonSection = () => {
  const { openCalendly } = useCalendly();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });
  const isSectionInView = useInView(sectionRef, { once: true, margin: "-120px" });
  const [activeCol, setActiveCol] = useState(0);
  const activeColRef = useRef(0);
  const isProgrammaticRef = useRef(false);

  const scrollToCol = (col: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const target = el.children[col] as HTMLElement;
    if (!target) return;
    isProgrammaticRef.current = true;
    el.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
    // Clear the flag after scroll animation finishes (~600ms)
    setTimeout(() => { isProgrammaticRef.current = false; }, 700);
  };

  // Auto-scroll carousel on mobile: start after 3s, then toggle every 2s
  useEffect(() => {
    if (!isSectionInView) return;
    if (window.innerWidth >= 1024) return;

    let interval: ReturnType<typeof setInterval>;
    // Use a simple local counter so the interval never depends on scroll events
    let col = 0;

    const initial = setTimeout(() => {
      col = 1;
      activeColRef.current = 1;
      setActiveCol(1);
      scrollToCol(1);

      interval = setInterval(() => {
        col = col === 0 ? 1 : 0;
        activeColRef.current = col;
        setActiveCol(col);
        scrollToCol(col);
      }, 3000);
    }, 3000);

    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, [isSectionInView]);

  // Track active dot based on manual scroll only (ignore programmatic)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      if (isProgrammaticRef.current) return;
      const mid = el.scrollLeft + el.clientWidth / 2;
      const second = el.children[1] as HTMLElement;
      const col = second && mid >= second.offsetLeft ? 1 : 0;
      activeColRef.current = col;
      setActiveCol(col);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 lg:py-40 overflow-hidden bg-background">
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(216 90% 58% / 0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[50vw] h-[50vw]" style={{ background: "radial-gradient(circle, hsl(0 65% 60% / 0.05) 0%, transparent 65%)", transform: "translate(-20%, -20%)" }} />
        <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw]" style={{ background: "radial-gradient(circle, hsl(216 90% 58% / 0.06) 0%, transparent 65%)", transform: "translate(20%, 20%)" }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70vw] h-[40vh]" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, hsl(216 90% 65% / 0.07) 0%, transparent 70%)" }} />
      </div>
      <FloatingOrbs count={4} className="opacity-80" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
          <div ref={headerRef} className="relative overflow-hidden text-center mb-12 md:mb-16">
          {/* Watermark icon */}
          <Scale
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
            style={{ width: 280, height: 280, opacity: 0.045, color: "hsl(216 90% 58%)" }}
          />
          {/* Section icon badge */}
          <div className="relative flex justify-center mb-5">
            <span
              className="flex items-center justify-center w-14 h-14 rounded-2xl"
              style={{ background: "hsl(216 90% 58% / 0.10)", border: "1.5px solid hsl(216 90% 58% / 0.24)" }}
            >
              <Scale size={26} style={{ color: "hsl(216 90% 58%)" }} />
            </span>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="section-kicker font-semibold mb-5"
            style={{ color: "hsl(216 90% 58%)" }}
          >
            The honest difference
          </motion.p>
          <h2 className="section-title tracking-tight">
            {[
              { text: "Two very different outcomes.", dark: true },
              { text: "Which one is yours?", gold: true },
            ].map((line, li) => (
              <span key={li} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={isHeaderInView ? { y: "0%" } : {}}
                  transition={{ duration: 0.9, delay: 0.08 + li * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  style={{ color: line.gold ? "hsl(216 90% 58%)" : "hsl(var(--foreground))" }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h2>
          {/* Title divider */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, hsl(216 90% 58% / 0.45))" }} />
            <span className="flex items-center justify-center w-8 h-8 rounded-xl" style={{ background: "hsl(216 90% 58% / 0.10)", border: "1px solid hsl(216 90% 58% / 0.28)" }}>
              <Scale size={14} style={{ color: "hsl(216 90% 58%)" }} />
            </span>
            <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, hsl(216 90% 58% / 0.45))" }} />
          </div>
        </div>

        {/* Scroll hint - mobile + tablet only */}
        <div className="flex lg:hidden items-center justify-center gap-3 mb-5">
          <motion.div
            animate={{ x: [-3, 0, -3] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            className="flex items-center gap-0.5"
            style={{ color: "hsl(216 90% 58%)" }}
          >
            <ChevronLeft size={14} strokeWidth={2.5} />
            <ChevronLeft size={14} strokeWidth={2.5} style={{ opacity: 0.5 }} />
          </motion.div>
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: "hsl(216 90% 58% / 0.75)" }}
          >
            swipe to compare
          </span>
          <motion.div
            animate={{ x: [3, 0, 3] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            className="flex items-center gap-0.5"
            style={{ color: "hsl(216 90% 58%)" }}
          >
            <ChevronRight size={14} strokeWidth={2.5} style={{ opacity: 0.5 }} />
            <ChevronRight size={14} strokeWidth={2.5} />
          </motion.div>
        </div>

        {/* Comparison columns - horizontal scroll on mobile+tablet, grid on desktop */}
        <div
          ref={scrollRef}
          className="flex items-start lg:grid lg:grid-cols-2 gap-5 lg:gap-8 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none pb-3 lg:pb-0 -mx-2 sm:-mx-6 px-2 sm:px-6 lg:mx-0 lg:px-0 scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        >
          {/* LEFT - Without */}
          <div className="min-w-[calc(100vw-2.5rem)] sm:min-w-[calc(100vw-3.5rem)] md:min-w-[calc(100vw-4rem)] lg:min-w-0 snap-center">
            <Column
              side="pain"
              label="Without VM Producers"
              icon={<X size={14} className="shrink-0" />}
              headerBg="hsl(0 65% 55% / 0.08)"
              headerBorder="hsl(0 60% 50% / 0.22)"
              headerColor="hsl(0 55% 45%)"
              sectionBg="hsl(0 60% 98%)"
              sectionBorder="hsl(0 55% 88%)"
              items={painPoints}
              palette={{ bg: "hsl(0 65% 55% / 0.05)", border: "hsl(0 55% 50% / 0.16)", icon: "hsl(0 50% 48%)" }}
            />
          </div>

          {/* RIGHT - With */}
          <div className="min-w-[calc(100vw-2.5rem)] sm:min-w-[calc(100vw-3.5rem)] md:min-w-[calc(100vw-4rem)] lg:min-w-0 snap-center">
            <Column
              side="benefit"
              label="With VM Producers"
              icon={<Check size={14} className="shrink-0" />}
              headerBg="hsl(152 55% 42% / 0.08)"
              headerBorder="hsl(152 50% 38% / 0.22)"
              headerColor="hsl(152 45% 35%)"
              sectionBg="hsl(152 50% 98%)"
              sectionBorder="hsl(152 45% 85%)"
              items={benefits}
              palette={{ bg: "hsl(152 55% 42% / 0.05)", border: "hsl(152 48% 38% / 0.16)", icon: "hsl(152 42% 34%)" }}
            />
          </div>
        </div>

        {/* Scroll hint dots - mobile + tablet */}
        <div className="flex lg:hidden justify-center gap-2 mt-4">
          <button
            onClick={() => scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" })}
            className="rounded-full transition-all duration-300"
            style={{ width: activeCol === 0 ? 16 : 6, height: 6, background: activeCol === 0 ? "hsl(0 55% 48%)" : "hsl(0 30% 80%)" }}
          />
          <button
            onClick={() => { const s = scrollRef.current; if (s) { const c = s.children[1] as HTMLElement; s.scrollTo({ left: c.offsetLeft, behavior: "smooth" }); } }}
            className="rounded-full transition-all duration-300"
            style={{ width: activeCol === 1 ? 16 : 6, height: 6, background: activeCol === 1 ? "hsl(152 45% 40%)" : "hsl(152 20% 80%)" }}
          />
        </div>

        {/* Post-comparison CTA */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 lg:mt-16 text-center relative"
        >
          {/* Blue glow backdrop */}
          <div className="absolute inset-0 pointer-events-none -z-10 hidden sm:block" style={{ filter: "blur(90px)" }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] rounded-full" style={{ background: "radial-gradient(ellipse, hsl(216 90% 58% / 0.28) 0%, hsl(216 90% 65% / 0.10) 55%, transparent 75%)" }} />
          </div>
          <div className="flex flex-col items-center gap-5">
            <span
              className="flex items-center justify-center w-12 h-12 rounded-2xl"
              style={{ background: "hsl(var(--primary) / 0.12)", border: "1.5px solid hsl(var(--primary) / 0.30)" }}
            >
              <Trophy size={20} style={{ color: "hsl(var(--primary))" }} />
            </span>
            <div>
              <p className="font-display font-bold text-xl sm:text-2xl tracking-tight mb-2" style={{ color: "hsl(var(--foreground))" }}>
                Ready to be on the right side of this list?
              </p>
              <p className="text-sm max-w-md mx-auto" style={{ color: "hsl(var(--foreground) / 0.55)" }}>
                Join 2,000+ successful events. You show up. We've got every detail covered.
              </p>
            </div>            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={openCalendly}
                className="group inline-flex items-center gap-2 px-7 py-3 rounded-full font-display font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                style={{ background: "hsl(var(--primary))", color: "white" }}
              >
                Get started, it's free
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("services");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-semibold text-sm transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{
                  background: "hsl(var(--primary) / 0.08)",
                  border: "1.5px solid hsl(var(--primary) / 0.30)",
                  color: "hsl(var(--primary))",
                }}
              >
                Explore our services
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

type ColumnProps = {
  side: string;
  label: string;
  icon: React.ReactNode;
  headerBg: string;
  headerBorder: string;
  headerColor: string;
  sectionBg: string;
  sectionBorder: string;
  items: { Icon: React.ElementType; title: string }[];
  palette: { bg: string; border: string; icon: string };
};

const Column = ({ label, icon, headerBg, headerBorder, headerColor, sectionBg, sectionBorder, items, palette }: ColumnProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-3xl overflow-hidden"
      style={{ background: sectionBg, border: `1.5px solid ${sectionBorder}` }}
    >
      {/* Column header */}
      <div
        className="flex items-center gap-2.5 px-6 py-4"
        style={{ background: headerBg, borderBottom: `1px solid ${headerBorder}` }}
      >
        <span
          className="flex items-center justify-center w-5 h-5 rounded-full"
          style={{ background: headerColor, color: "white" }}
        >
          {icon}
        </span>
        <span className="font-display font-bold text-sm tracking-wide" style={{ color: headerColor }}>
          {label}
        </span>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-2 p-4">
        {items.map(({ Icon, title }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, x: -12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 rounded-xl px-4 py-3"
            style={{ background: palette.bg, border: `1px solid ${palette.border}` }}
          >
            <Icon size={15} style={{ color: palette.icon }} strokeWidth={1.6} className="shrink-0" />
            <span className="font-display font-bold text-sm text-foreground leading-snug">{title}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ComparisonSection;
