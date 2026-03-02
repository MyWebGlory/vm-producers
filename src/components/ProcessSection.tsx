import { useRef } from "react";
import { motion, useInView, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
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
    accentRaw: "#3b82f6",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Plan",
    subtitle: "Your complete blueprint",
    description:
      "Your dedicated producer builds the complete event plan: venues, AV & tech stack, speaker management, registration flow, run-of-show, staffing, and contingency plans. You approve. We execute.",
    accent: "199 80% 50%",
    accentRaw: "#22aacc",
  },
  {
    number: "03",
    icon: Zap,
    title: "Execute",
    subtitle: "You host. We handle the rest.",
    description:
      "On the day, our team owns the room: on-site staff, live tech support, real-time problem-solving. You host. We make it flawless.",
    accent: "230 65% 62%",
    accentRaw: "#7c8fd4",
  },
  {
    number: "04",
    icon: Film,
    title: "Deliver",
    subtitle: "Content that lives on",
    description:
      "Highlight reels, post-event recaps, full reporting and analytics, all delivered to you within days of wrap.",
    accent: "212 88% 52%",
    accentRaw: "#1e8ef0",
  },
];

/* Individual step row — alternates left/right */
const StepRow = ({
  step,
  index,
  scrollProgress,
}: {
  step: (typeof steps)[number];
  index: number;
  total: number;
  scrollProgress: MotionValue<number>;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const isLeft = index % 2 === 0;
  const Icon = step.icon;

  // Each step lights up as the thread passes through it
  // step 0→0.05–0.22, step 1→0.28–0.48, step 2→0.52–0.72, step 3→0.76–0.96
  const lo = index * 0.25 + 0.03;
  const hi = lo + 0.18;
  const stepOpacity = useTransform(scrollProgress, [lo, hi], [0.45, 1]);
  const stepScale  = useTransform(scrollProgress, [lo, hi], [0.96, 1]);
  const stepBlur   = useTransform(scrollProgress, [lo, hi], [4, 0]);

  const cardVariants = {
    hidden: { x: isLeft ? -40 : 40 },
    visible: {
      x: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  const metaVariants = {
    hidden: { x: isLeft ? 20 : -20 },
    visible: {
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any, delay: 0.1 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-[1fr_56px_1fr] items-center gap-0 w-full"
      style={{ opacity: stepOpacity, scale: stepScale, filter: useTransform(stepBlur, v => `blur(${v}px)`) }}
    >
      {/* LEFT SLOT */}
      {isLeft ? (
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="pr-6"
        >
          <Card step={step} index={index} inView={inView} />
        </motion.div>
      ) : (
        <motion.div
          variants={metaVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex justify-end pr-8"
        >
          <StepMeta step={step} align="right" />
        </motion.div>
      )}

      {/* CENTER NODE */}
      <div className="flex flex-col items-center" style={{ zIndex: 2, position: "relative" }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: "backOut", delay: 0.2 }}
          className="relative flex items-center justify-center w-12 h-12 rounded-full"
          style={{
            background: `hsl(220 22% 97%)`,
            border: `2px solid hsl(${step.accent})`,
            boxShadow: inView
              ? `0 0 0 5px hsl(220 22% 97%), 0 0 0 6px hsl(${step.accent} / 0.25), 0 0 18px hsl(${step.accent} / 0.30)`
              : "none",
          }}
        >
          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: `2px solid hsl(${step.accent} / 0.5)` }}
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
          />
          <Icon size={20} style={{ color: `hsl(${step.accent})` }} />
        </motion.div>
      </div>

      {/* RIGHT SLOT */}
      {isLeft ? (
        <motion.div
          variants={metaVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="pl-8"
        >
          <StepMeta step={step} align="left" />
        </motion.div>
      ) : (
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="pl-6"
        >
          <Card step={step} index={index} inView={inView} />
        </motion.div>
      )}
    </motion.div>
  );
};

/* Step metadata shown on the opposite side of the card */
const StepMeta = ({
  step,
  align,
}: {
  step: (typeof steps)[number];
  align: "left" | "right";
}) => (
  <div className={`flex flex-col gap-1 ${align === "right" ? "items-end text-right" : "items-start text-left"}`}>
    <span
      className="font-display font-black text-6xl leading-none select-none"
      style={{ color: `hsl(${step.accent} / 0.18)` }}
    >
      {step.number}
    </span>
    <span
      className="text-xs uppercase tracking-[0.2em] font-semibold"
      style={{ color: `hsl(${step.accent})` }}
    >
      {step.title}
    </span>
  </div>
);

/* The card itself — solid opaque background so nothing can show through */
const Card = ({
  step,
  index,
  inView,
}: {
  step: (typeof steps)[number];
  index: number;
  inView: boolean;
}) => {
  const Icon = step.icon;
  return (
    <div
      className="relative rounded-2xl p-6 overflow-hidden"
      style={{
        background: "hsl(220 22% 97%)",
        border: `1.5px solid hsl(${step.accent} / 0.25)`,
        boxShadow: inView
          ? `0 4px 32px hsl(${step.accent} / 0.14), inset 0 1px 0 hsl(${step.accent} / 0.10)`
          : "none",
        transition: "box-shadow 0.5s ease",
      }}
    >
      {/* Top-left corner accent */}
      <div
        className="absolute top-0 left-0 w-24 h-24 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 0% 0%, hsl(${step.accent} / 0.18), transparent 70%)`,
        }}
      />

      {/* Shimmer on reveal */}
      {inView && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(105deg, transparent 20%, hsl(${step.accent} / 0.15) 50%, transparent 80%)`,
          }}
          initial={{ x: "-110%" }}
          animate={{ x: "120%" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        />
      )}

      {/* Icon */}
      <div className="relative w-fit mb-4">
        <motion.span
          className="absolute inset-0 rounded-xl"
          style={{ background: `hsl(${step.accent} / 0.2)` }}
          animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
        />
        <span
          className="relative flex items-center justify-center w-11 h-11 rounded-xl"
          style={{
            background: `hsl(${step.accent} / 0.12)`,
            border: `1.5px solid hsl(${step.accent} / 0.40)`,
          }}
        >
          <Icon size={20} style={{ color: `hsl(${step.accent})` }} />
        </span>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1.5 relative z-10">
        <p
          className="text-[10px] uppercase tracking-[0.22em] font-semibold"
          style={{ color: `hsl(${step.accent})` }}
        >
          {step.subtitle}
        </p>
        <h3
          className="font-display font-bold text-xl lg:text-2xl leading-tight"
          style={{ color: "hsl(var(--foreground))" }}
        >
          {step.title}
        </h3>
        <p className="text-sm leading-relaxed mt-1" style={{ color: "hsl(var(--foreground) / 0.58)" }}>
          {step.description}
        </p>
      </div>
    </div>
  );
};

/* Animated vertical thread in the center column */
const CenterThread = ({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 40%"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 25 });
  const scaleY = useTransform(smoothProgress, [0, 1], [0, 1]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.05, 1], [0, 1, 1]);

  return (
    <div
      className="absolute inset-0 flex justify-center pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Dashed guide rail — always visible */}
      <div
        className="absolute inset-y-0 w-px"
        style={{
          background: "repeating-linear-gradient(to bottom, hsl(216 90% 65% / 0.22) 0px, hsl(216 90% 65% / 0.22) 6px, transparent 6px, transparent 16px)",
        }}
      />

      {/* Colored fill — grows with scroll */}
      <div className="absolute inset-y-0 w-full flex justify-center">
        <motion.div
          className="w-[3px] h-full rounded-full origin-top"
          style={{
            scaleY,
            originY: 0,
            opacity: glowOpacity,
            background: "linear-gradient(to bottom, hsl(216, 90%, 58%), hsl(199, 80%, 50%), hsl(230, 65%, 62%), hsl(212, 88%, 52%))",
            boxShadow: "0 0 8px 2px hsl(216 90% 65% / 0.35), 0 0 20px 4px hsl(216 90% 65% / 0.15)",
            transformOrigin: "top",
          }}
        />
      </div>
    </div>
  );
};

/* Mobile card wrapper — hooks-safe */
const MobileCard = ({ step, index }: { step: (typeof steps)[number]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as any }}
    >
      <Card step={step} index={index} inView={inView} />
    </motion.div>
  );
};

const ProcessSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });
  const stepsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ["start 80%", "end 40%"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 25 });

  return (
    <section
      className="relative py-24 lg:py-40 overflow-hidden"
      style={{ background: "hsl(220 20% 98%)" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(216 90% 58% / 0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Ambient glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 10% 50%, hsl(216 90% 65% / 0.06) 0%, transparent 60%)," +
            "radial-gradient(ellipse 50% 40% at 90% 50%, hsl(250 55% 65% / 0.05) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20 lg:mb-28">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-display text-xs uppercase tracking-[0.3em] mb-4 font-semibold"
            style={{ color: "hsl(var(--primary))" }}
          >
            Your path to a perfect event
          </motion.p>

          <div className="overflow-hidden mb-5">
            <motion.h2
              initial={{ y: "110%" }}
              animate={headerInView ? { y: "0%" } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight"
            >
              From first call to{" "}
              <span style={{ color: "hsl(var(--primary))" }}>final applause.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
            style={{ color: "hsl(var(--foreground) / 0.55)" }}
          >
            A simple, proven process. You make the decisions. We execute every detail.
          </motion.p>

          {/* Step pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-center justify-center gap-2 mt-8 flex-wrap"
          >
            {steps.map((s, i) => (
              <span
                key={s.number}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  background: `hsl(${s.accent} / 0.10)`,
                  color: `hsl(${s.accent})`,
                  border: `1px solid hsl(${s.accent} / 0.25)`,
                }}
              >
                <span
                  className="w-4 h-4 flex items-center justify-center rounded-full text-[9px] font-black"
                  style={{ background: `hsl(${s.accent})`, color: "white" }}
                >
                  {i + 1}
                </span>
                {s.title}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Steps — vertical timeline centered */}
        <div ref={stepsRef} className="relative hidden md:block">
          <CenterThread containerRef={stepsRef as React.RefObject<HTMLDivElement>} />
          <div className="flex flex-col gap-16 relative" style={{ zIndex: 1 }}>
            {steps.map((step, i) => (
              <StepRow key={step.number} step={step} index={i} total={steps.length} scrollProgress={smoothProgress} />
            ))}
          </div>
        </div>

        {/* Mobile fallback — simple stacked cards */}
        <div className="flex flex-col gap-6 md:hidden">
          {steps.map((step, i) => (
            <MobileCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

