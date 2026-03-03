import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import useCountUp from "@/hooks/useCountUp";
import { SplitTextReveal } from "@/components/ScrollAnimations";

const stats = [
  { end: 2000, prefix: "", suffix: "+", label: "Events Delivered", sub: "Across 70+ countries worldwide" },
  { end: 100,  prefix: "", suffix: "%", label: "Success Rate",      sub: "Zero failed events. Ever."       },
  { end: 95,   prefix: "", suffix: "%", label: "Client Retention",  sub: "They keep coming back"           },
  { end: 350,  prefix: "", suffix: "K+",label: "Global Attendees",  sub: "Live, virtual and hybrid"        },
];

function StatRow({ stat, index }: { stat: typeof stats[number]; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { once: true, margin: "-60px" });
  const { ref: countRef, displayValue } = useCountUp({ end: stat.end, duration: 1800, suffix: stat.suffix, prefix: stat.prefix });

  return (
    <div ref={rowRef} className="relative">
      {/* Top divider — animated width */}
      <motion.div
        className="w-full h-px mb-0"
        style={{ background: "hsl(216 90% 58% / 0.15)" }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="flex items-center py-8 md:py-10 gap-6 md:gap-12">
        {/* Index number */}
        <motion.span
          className="hidden md:block text-xs font-mono tabular-nums select-none flex-shrink-0 w-6 text-right"
          style={{ color: "hsl(216 90% 65% / 0.45)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 + index * 0.08 }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>

        {/* Big stat number */}
        <motion.p
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-none flex-shrink-0 w-44 md:w-56 lg:w-64 tabular-nums"
          style={{ color: "hsl(216 90% 58%)" }}
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <span ref={countRef as React.RefObject<HTMLSpanElement>}>{displayValue}</span>
        </motion.p>

        {/* Thin vertical separator */}
        <motion.div
          className="hidden md:block self-stretch w-px flex-shrink-0"
          style={{ background: "hsl(216 90% 58% / 0.18)" }}
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.25 + index * 0.08 }}
        />

        {/* Label + sub */}
        <motion.div
          className="flex flex-col gap-1"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-lg md:text-2xl lg:text-3xl font-display font-semibold text-foreground leading-tight">
            {stat.label}
          </p>
          <p className="text-sm md:text-base" style={{ color: "hsl(var(--foreground) / 0.45)" }}>
            {stat.sub}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

const ResultsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-28 lg:py-40"
    >
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(ellipse, hsl(216 90% 58%) 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p
            className="font-display text-sm uppercase tracking-[0.3em] mb-5 font-medium"
            style={{ color: "hsl(216 90% 65%)" }}
          >
            Numbers you can trust
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight">
            <SplitTextReveal text="Results you can" delay={0.1} className="justify-start" />
            <br />
            <SplitTextReveal text="count on, every time." delay={0.3} className="justify-start" />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-5 text-sm md:text-base leading-relaxed max-w-xl"
            style={{ color: "hsl(var(--foreground) / 0.50)" }}
          >
            Technical excellence, a personal touch, and a proven track record you can count on.
          </motion.p>
        </motion.div>

        {/* Stats rows */}
        <div>
          {stats.map((stat, i) => (
            <StatRow key={i} stat={stat} index={i} />
          ))}
          {/* Bottom divider */}
          <motion.div
            className="w-full h-px"
            style={{ background: "hsl(216 90% 58% / 0.15)" }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: stats.length * 0.08, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Bottom callout — inline, no card */}
        <motion.div
          className="mt-16 flex flex-col md:flex-row md:items-end gap-4 md:gap-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <p
            className="font-display text-xs uppercase tracking-[0.25em] font-medium flex-shrink-0 md:mb-1"
            style={{ color: "hsl(216 90% 65%)" }}
          >
            Featured Result
          </p>
          <div className="hidden md:block h-px flex-1 self-center" style={{ background: "hsl(216 90% 58% / 0.15)" }} />
          <p className="text-foreground text-lg md:text-xl font-display font-semibold leading-snug md:text-right max-w-lg">
            "10 speakers. 5 languages. Thousands of attendees.{" "}
            <span style={{ color: "hsl(216 90% 65%)" }}>Zero issues.</span>"
          </p>
        </motion.div>
        <motion.p
          className="mt-3 text-sm md:text-right"
          style={{ color: "hsl(var(--foreground) / 0.40)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.85 }}
        >
          BirthSwell — Non-profit organization &nbsp;·&nbsp; 5/5 client rating
        </motion.p>
      </div>
    </section>
  );
};

export default ResultsSection;
