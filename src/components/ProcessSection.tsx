import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { PhoneCall, ClipboardList, Zap, Film } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: PhoneCall,
    title: "Consult",
    subtitle: "You share your vision",
    description:
      "Share your goals, timeline, and budget. We ask the right questions and give you a clear, honest plan. Most clients have a full proposal within 48 hours.",
    accent: "216 90% 58%",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Plan",
    subtitle: "Your complete blueprint",
    description:
      "Your dedicated producer builds the complete event plan: venues, AV & tech stack, speaker management, registration flow, run-of-show, staffing, and contingency plans. You approve. We execute.",
    accent: "199 80% 50%",
  },
  {
    number: "03",
    icon: Zap,
    title: "Execute",
    subtitle: "You host. We handle the rest.",
    description:
      "On the day, our team owns the room: on-site staff, live tech support, real-time problem-solving. You host. We make it flawless.",
    accent: "230 65% 62%",
  },
  {
    number: "04",
    icon: Film,
    title: "Deliver",
    subtitle: "Content that lives on",
    description:
      "Highlight reels, post-event recaps, full reporting and analytics, all delivered to you within days of wrap.",
    accent: "212 88% 52%",
  },
];

/* Build a smooth cubic-bezier SVG path through N points */
function smoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1];
    const c = pts[i];
    // Control points: horizontal tension first, then vertical
    const cp1x = p.x + (c.x - p.x) * 0.55;
    const cp1y = p.y;
    const cp2x = c.x - (c.x - p.x) * 0.55;
    const cp2y = c.y;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${c.x} ${c.y}`;
  }
  return d;
}

/* Step card, accepts isActive + onReveal */
const StepCard = ({
  step,
  index,
  isActive,
  cardRef,
  onReveal,
}: {
  step: (typeof steps)[number];
  index: number;
  isActive: boolean;
  cardRef: (el: HTMLDivElement | null) => void;
  onReveal: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const revealedRef = useRef(false);
  const Icon = step.icon;
  const lit = (revealed && isActive) || hovered;

  return (
    <motion.div
      ref={(el) => {
        // @ts-ignore
        ref.current = el;
        cardRef(el);
      }}
      initial={{ opacity: 0.08, y: 24, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.08, y: 24, scale: 0.97 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => {
        if (inView && !revealedRef.current) {
          revealedRef.current = true;
          setRevealed(true);
          onReveal();
        }
      }}
      className="relative flex flex-col gap-5 rounded-2xl p-7 cursor-default overflow-hidden"
      style={{
        background: revealed
          ? (lit ? `hsl(${step.accent} / 0.06)` : "hsl(220 20% 98%)")
          : `hsl(220 20% 97% / 0.55)`,
        border: `1.5px solid hsl(${step.accent} / ${revealed ? (lit ? "0.60" : "0.18") : "0.30"})`,
        boxShadow: lit
          ? `0 0 0 1px hsl(${step.accent} / 0.18), 0 8px 48px hsl(${step.accent} / 0.22), inset 0 1px 0 hsl(${step.accent} / 0.12)`
          : `0 4px 24px hsl(${step.accent} / 0.06)`,
        transition: "background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse 90% 80% at 15% 10%, hsl(${step.accent} / 0.14), transparent 60%)`,
          opacity: lit ? 1 : 0,
        }}
      />

      {/* Sweep shimmer on activation */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            key="shimmer"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(110deg, transparent 15%, hsl(${step.accent} / 0.18) 50%, transparent 85%)`,
            }}
            initial={{ x: "-100%" }}
            animate={{ x: "120%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Corner glow blob */}
      <div
        className="absolute -top-10 -right-10 w-28 h-28 rounded-full pointer-events-none transition-all duration-500"
        style={{
          background: `hsl(${step.accent} / 0.20)`,
          filter: "blur(22px)",
          opacity: lit ? 1 : 0,
          transform: lit ? "scale(1.2)" : "scale(0.7)",
        }}
      />

      {/* Step number watermark */}
      <motion.span
        className="absolute top-4 right-5 font-display font-black text-5xl leading-none select-none pointer-events-none transition-all duration-500"
        style={{
          color: `hsl(${step.accent} / ${lit ? "0.60" : "0.35"})`,
        }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.12 + 0.25, ease: "backOut" }}
      >
        {step.number}
      </motion.span>

      {/* Icon with pulse ring */}
      <div className="relative w-fit z-10">
        <motion.span
          className="absolute inset-0 rounded-xl"
          style={{ background: `hsl(${step.accent} / 0.18)` }}
          animate={{ scale: [1, 1.9, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.5, ease: "easeInOut" }}
        />
        <span
          className="relative flex items-center justify-center w-12 h-12 rounded-xl shrink-0 transition-all duration-400"
          style={{
            background: `hsl(${step.accent} / ${lit ? "0.18" : "0.10"})`,
            border: `1.5px solid hsl(${step.accent} / ${lit ? "0.65" : "0.30"})`,
            boxShadow: lit ? `0 0 22px hsl(${step.accent} / 0.40)` : "none",
          }}
        >
          <Icon size={22} style={{ color: `hsl(${step.accent})` }} />
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 relative z-10">
        <p
          className="text-[10px] uppercase tracking-[0.2em] font-semibold transition-all duration-400"
          style={{ color: `hsl(${step.accent} / ${lit ? "1" : "0.75"})` }}
        >
          {step.subtitle}
        </p>
        <h3 className="font-display font-bold text-2xl lg:text-3xl leading-tight" style={{ color: "hsl(var(--foreground))" }}>
          {step.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--foreground) / 0.55)" }}>
          {step.description}
        </p>
      </div>
    </motion.div>
  );
};

/* SVG thread that draws itself between measured card centers */
const Thread = ({
  pts,
  svgW,
  svgH,
  progress,
}: {
  pts: { x: number; y: number }[];
  svgW: number;
  svgH: number;
  progress: ReturnType<typeof useSpring>;
}) => {
  if (pts.length < 2) return null;
  const d = smoothPath(pts);
  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{ width: svgW, height: svgH, zIndex: 5, overflow: "visible" }}
    >
      <defs>
        <linearGradient id="tlGrad" gradientUnits="userSpaceOnUse"
          x1={pts[0].x} y1={pts[0].y}
          x2={pts[pts.length - 1].x} y2={pts[pts.length - 1].y}
        >
          <stop offset="0%" stopColor="hsl(216, 90%, 58%)" />
          <stop offset="33%" stopColor="hsl(199, 80%, 50%)" />
          <stop offset="66%" stopColor="hsl(230, 65%, 62%)" />
          <stop offset="100%" stopColor="hsl(212, 88%, 52%)" />
        </linearGradient>
        <filter id="tlGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="tlGlowStrong" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
        </filter>
      </defs>

      {/* Guide track, dashed rail always fully visible */}
      <path d={d} fill="none" stroke="hsl(216 90% 65% / 0.35)" strokeWidth="1.5" strokeDasharray="5 8" strokeLinecap="round" />

      {/* Glow duplicate (blurred) */}
      <motion.path
        d={d}
        fill="none"
        stroke="url(#tlGrad)"
        strokeWidth="5"
        strokeLinecap="round"
        filter="url(#tlGlowStrong)"
        style={{ pathLength: progress, opacity: 0.40 }}
        initial={{ pathLength: 0 }}
      />

      {/* Main thread */}
      <motion.path
        d={d}
        fill="none"
        stroke="url(#tlGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        filter="url(#tlGlow)"
        style={{ pathLength: progress }}
        initial={{ pathLength: 0 }}
      />

      {/* Node dots at each card center */}
      {pts.map((pt, i) => (
        <motion.circle
          key={i}
          cx={pt.x}
          cy={pt.y}
          r={6}
          fill={`hsl(${steps[i].accent})`}
          stroke="hsl(var(--background))"
          strokeWidth={2.5}
          style={{
            filter: `drop-shadow(0 0 6px hsl(${steps[i].accent}))`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 + 0.3, duration: 0.4, ease: "backOut" }}
        />
      ))}
    </svg>
  );
};

const ProcessSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);

  const [pts, setPts] = useState<{ x: number; y: number }[]>([]);
  const [svgDims, setSvgDims] = useState({ w: 0, h: 0 });
  const [activeCard, setActiveCard] = useState(-1);
  const [revealedCards, setRevealedCards] = useState([false, false, false, false]);

  const handleReveal = useCallback((i: number) => {
    setRevealedCards((prev) => {
      const next = [...prev];
      next[i] = true;
      return next;
    });
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 95%", "end 75%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 45, damping: 22 });

  // Update active card based on scroll
  useMotionValueEvent(progress, "change", (val) => {
    if (val >= 0.82) setActiveCard(3);
    else if (val >= 0.52) setActiveCard(2);
    else if (val >= 0.22) setActiveCard(1);
    else if (val >= 0.04) setActiveCard(0);
    else setActiveCard(-1);
  });

  // Measure card centers relative to container
  const measure = useCallback(() => {
    if (!containerRef.current) return;
    const cRect = containerRef.current.getBoundingClientRect();
    const points = cardRefs.current
      .map((el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2 - cRect.left, y: r.top + r.height / 2 - cRect.top };
      })
      .filter(Boolean) as { x: number; y: number }[];
    if (points.length === 4) {
      setPts(points);
      setSvgDims({ w: cRect.width, h: cRect.height });
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(measure, 150);
    window.addEventListener("resize", measure);
    return () => { clearTimeout(t); window.removeEventListener("resize", measure); };
  }, [measure]);

  // Zigzag offsets: 01 top-left, 02 shifted down-right, 03 shifted down-left, 04 bottom-right
  const zigzagOffsets = [
    "lg:mt-0",
    "lg:mt-20",
    "lg:mt-8",
    "lg:mt-28",
  ];

  return (
    <section
      className="relative py-24 lg:py-40 overflow-hidden"
      style={{ background: "hsl(220 20% 98%)" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(216 90% 58% / 0.10) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Ambient glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 10% 50%, hsl(216 90% 65% / 0.07) 0%, transparent 60%)," +
            "radial-gradient(ellipse 50% 40% at 90% 50%, hsl(250 55% 65% / 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-24">
          <motion.div
            className="flex justify-center mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: "backOut" }}
          >
            <span
              className="relative flex items-center justify-center w-14 h-14 rounded-2xl"
              style={{ background: "hsl(var(--primary) / 0.10)", border: "1.5px solid hsl(var(--primary) / 0.30)" }}
            >
              <motion.span
                className="absolute inset-0 rounded-2xl"
                style={{ background: "hsl(var(--primary) / 0.12)" }}
                animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <Zap size={26} style={{ color: "hsl(var(--primary))" }} />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-xs uppercase tracking-[0.3em] mb-4 font-medium"
            style={{ color: "hsl(var(--primary))" }}
          >
            Your path to a perfect event
          </motion.p>

          <div className="overflow-hidden mb-5">
            <motion.h2
              initial={{ y: "110%" }}
              animate={headerInView ? { y: "0%" } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight"
            >
              From first call to{" "}
              <span style={{ color: "hsl(var(--primary))" }}>final applause.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
            style={{ color: "hsl(var(--foreground) / 0.55)" }}
          >
            A simple, proven process. You make the decisions. We execute every detail.
          </motion.p>
        </div>

        {/* Zigzag grid with SVG thread */}
        <div ref={containerRef} className="relative">
          {pts.length === 4 && (
            <Thread pts={pts} svgW={svgDims.w} svgH={svgDims.h} progress={progress} />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pb-10">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={zigzagOffsets[i]}
                style={{ position: "relative", zIndex: 10 }}
              >
                <StepCard
                  step={step}
                  index={i}
                  isActive={activeCard >= i}
                  cardRef={(el) => { cardRefs.current[i] = el; }}
                  onReveal={() => handleReveal(i)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
