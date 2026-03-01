import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PhoneCall, ClipboardList, Zap, Film, ArrowRight } from "lucide-react";
import { RevealLine } from "@/components/ScrollAnimations";

const steps = [
  {
    number: "01",
    icon: PhoneCall,
    title: "Consult",
    subtitle: "Tell us your vision",
    description:
      "Share your goals, timeline, and budget. We ask the right questions and give you a clear, honest plan. Most clients have a full proposal within 48 hours.",
    accent: "216 90% 58%",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Plan",
    subtitle: "We build the blueprint",
    description:
      "Your dedicated producer builds the complete event plan: venues, AV & tech stack, speaker management, registration flow, run-of-show, staffing, and contingency plans. You approve. We execute.",
    accent: "190 70% 48%",
  },
  {
    number: "03",
    icon: Zap,
    title: "Execute",
    subtitle: "We handle every detail",
    description:
      "On the day, our team owns the room: on-site staff, live tech support, real-time problem-solving. You host. We make it flawless.",
    accent: "250 55% 60%",
  },
  {
    number: "04",
    icon: Film,
    title: "Deliver",
    subtitle: "Content that lives on",
    description:
      "Highlight reels, post-event recaps, full reporting and analytics, delivered within days of wrap.",
    accent: "340 60% 55%",
  },
];

const ProcessSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-40 overflow-hidden"
      style={{ background: "hsl(220 20% 98%)" }}
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(216 90% 58% / 0.10) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 10% 50%, hsl(216 90% 65% / 0.06) 0%, transparent 60%)," +
            "radial-gradient(ellipse 50% 40% at 90% 50%, hsl(250 55% 65% / 0.05) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          {/* Icon badge */}
          <div className="flex justify-center mb-4">
            <span
              className="flex items-center justify-center w-14 h-14 rounded-2xl"
              style={{
                background: "hsl(var(--primary) / 0.10)",
                border: "1.5px solid hsl(var(--primary) / 0.24)",
              }}
            >
              <Zap size={26} style={{ color: "hsl(var(--primary))" }} />
            </span>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-display text-xs uppercase tracking-[0.3em] mb-4 font-medium"
            style={{ color: "hsl(var(--primary))" }}
          >
            How we work
          </motion.p>
          <RevealLine delay={0.05} className="mb-6 max-w-[80px] mx-auto" />
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight"
          >
            From first call to{" "}
            <span style={{ color: "hsl(var(--primary))" }}>final applause.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-5 text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
            style={{ color: "hsl(var(--foreground) / 0.55)" }}
          >
            A simple, proven process. You make the decisions. We execute every detail.
          </motion.p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex flex-col gap-5 rounded-2xl p-7 group hover:-translate-y-1 transition-transform duration-300"
                style={{
                  background: "hsl(var(--background))",
                  border: `1.5px solid hsl(${step.accent} / 0.18)`,
                  boxShadow: `0 2px 24px hsl(${step.accent} / 0.05)`,
                }}
              >
                {/* Step number watermark */}
                <span
                  className="absolute top-4 right-5 font-display font-black text-5xl leading-none select-none pointer-events-none"
                  style={{ color: `hsl(${step.accent} / 0.07)` }}
                >
                  {step.number}
                </span>

                {/* Icon */}
                <span
                  className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
                  style={{
                    background: `hsl(${step.accent} / 0.10)`,
                    border: `1px solid hsl(${step.accent} / 0.25)`,
                  }}
                >
                  <Icon size={22} style={{ color: `hsl(${step.accent})` }} />
                </span>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <p
                    className="text-[10px] uppercase tracking-[0.2em] font-semibold"
                    style={{ color: `hsl(${step.accent} / 0.75)` }}
                  >
                    {step.subtitle}
                  </p>
                  <h3
                    className="font-display font-bold text-xl leading-tight"
                    style={{ color: "hsl(var(--foreground))" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "hsl(var(--foreground) / 0.55)" }}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Connector arrow (hidden on last item) */}
                {i < steps.length - 1 && (
                  <span
                    className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-7 h-7 rounded-full"
                    style={{
                      background: "hsl(var(--background))",
                      border: `1.5px solid hsl(${step.accent} / 0.22)`,
                    }}
                  >
                    <ArrowRight size={12} style={{ color: `hsl(${step.accent})` }} />
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
