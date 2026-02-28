import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { SplitTextReveal, RevealLine } from "@/components/ScrollAnimations";

const testimonials = [
  {
    text: "VM Producers was amazing. We needed last-minute support for a large webinar with 10+ high-level speakers, translation into 5 languages, and thousands of participants. They saved the day multiple times. Highly recommend.",
    author: "Jeanette McCullough",
    role: "Executive Director",
    company: "BirthSwell",
    initials: "JM",
    rating: 5,
    platform: "google",
  },
  {
    text: "Their team ran our hybrid conference without a single hitch. The production held up under pressure, and attendees on both sides felt it. Best team we have ever worked with.",
    author: "Sarah Chen",
    role: "Events Director",
    company: "Fortune 500 Company",
    initials: "SC",
    rating: 5,
    platform: "google",
  },
  {
    text: "We have worked with many production agencies. VM Producers is in a league of their own - startup agility with enterprise-level quality. Zero missed deadlines across 4 events.",
    author: "Diana Foster",
    role: "Head of Marketing",
    company: "Global Pharma Corp",
    initials: "DF",
    rating: 5,
    platform: "capterra",
  },
  {
    text: "We came back for our 5th event with VM Producers. That says it all. 100% success rate every time, zero stress, zero surprises. They are our permanent production partner.",
    author: "Kelly Nguyen",
    role: "Event Coordinator",
    company: "Atlanta Business Council",
    initials: "KN",
    rating: 5,
    platform: "trustpilot",
  },
];

const PlatformBadge = ({ platform }: { platform: string }) => {
  if (platform === "google") {
    return (
      <div className="flex items-center gap-1.5">
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        <span className="text-[11px] font-semibold text-muted-foreground">Google</span>
      </div>
    );
  }
  if (platform === "trustpilot") {
    return (
      <div className="flex items-center gap-1.5">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#00b67a" />
        </svg>
        <span className="text-[11px] font-semibold text-muted-foreground">Trustpilot</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5">
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path d="M5 2l7 4 7-4v8l-7 4-7-4V2z" fill="hsl(var(--primary))" opacity="0.8" />
        <path d="M5 10l7 4 7-4v8l-7 4-7-4v-8z" fill="hsl(var(--primary))" opacity="0.4" />
      </svg>
      <span className="text-[11px] font-semibold text-muted-foreground">Capterra</span>
    </div>
  );
};

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const dragStartX = useRef(0);

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
    setExpanded(false);
  }, []);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 120 : -120, opacity: 0, scale: 0.97 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -120 : 120, opacity: 0, scale: 0.97 }),
  };

  const t = testimonials[index];

  return (
    <section ref={sectionRef} className="py-28 lg:py-40 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="relative overflow-hidden text-center mb-14 lg:mb-18"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          {/* Watermark icon */}
          <Quote
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
            style={{ width: 260, height: 260, opacity: 0.045, color: "hsl(var(--primary))" }}
          />
          {/* Section icon badge */}
          <div className="relative flex justify-center mb-4">
            <span
              className="flex items-center justify-center w-14 h-14 rounded-2xl"
              style={{ background: "hsl(var(--primary) / 0.10)", border: "1.5px solid hsl(var(--primary) / 0.24)" }}
            >
              <Star size={26} style={{ color: "hsl(var(--primary))" }} />
            </span>
          </div>
          <p className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-4 font-medium">
            Client Reviews
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-6 text-center">
            <SplitTextReveal text="Trusted by 200+" delay={0.1} className="justify-center" />
            <br />
            <SplitTextReveal text="event teams worldwide." delay={0.25} className="justify-center glow-text" />
          </h2>
          {/* Title divider */}
          <div className="flex items-center justify-center gap-3 mt-6 mb-8">
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.45))" }} />
            <span className="flex items-center justify-center w-8 h-8 rounded-xl" style={{ background: "hsl(var(--primary) / 0.10)", border: "1px solid hsl(var(--primary) / 0.28)" }}>
              <Star size={14} style={{ color: "hsl(var(--primary))" }} />
            </span>
            <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, hsl(var(--primary) / 0.45))" }} />
          </div>

          {/* Aggregate ratings */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 md:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {[
              { label: "Google", score: "5.0", platform: "google" },
              { label: "Trustpilot", score: "4.9", platform: "trustpilot" },
              { label: "Capterra", score: "5.0", platform: "capterra" },
            ].map((p) => (
              <div key={p.label} className="flex items-center gap-2.5 bg-card border border-border/60 rounded-full px-4 py-2 shadow-sm">
                <PlatformBadge platform={p.platform} />
                <div className="w-px h-3.5 bg-border" />
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xs font-bold text-foreground ml-0.5">{p.score}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {/* Card + flanking arrows */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Left arrow */}
            <button
              onClick={() => go(-1)}
              className="shrink-0 w-10 h-10 rounded-full border border-border/70 bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-200"
              aria-label="Previous review"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Card area */}
            <div
              className="relative flex-1 overflow-hidden rounded-3xl"
              onMouseDown={(e) => { dragStartX.current = e.clientX; }}
              onMouseUp={(e) => {
                const diff = e.clientX - dragStartX.current;
                if (Math.abs(diff) > 40) go(diff < 0 ? 1 : -1);
              }}
              onTouchStart={(e) => { dragStartX.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                const diff = e.changedTouches[0].clientX - dragStartX.current;
                if (Math.abs(diff) > 40) go(diff < 0 ? 1 : -1);
              }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-card border border-border/60 rounded-3xl p-8 md:p-10 flex flex-col gap-5 shadow-sm select-none"
                >
                  {/* Top row */}
                  <div className="flex items-center justify-between">
                    <PlatformBadge platform={t.platform} />
                    <div className="flex items-center gap-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  <Quote size={20} className="text-primary/25" style={{ transform: "scaleX(-1)" }} />

                  {/* Text — clamped on mobile with read more */}
                  <div className="flex-1">
                    <p
                      className="text-base md:text-lg leading-relaxed text-foreground/80 font-medium"
                      style={!expanded ? { display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" } : undefined}
                    >
                      "{t.text}"
                    </p>
                    <button
                      onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v); }}
                      className="md:hidden mt-2 text-xs font-semibold font-display"
                      style={{ color: "hsl(var(--primary))" }}
                    >
                      {expanded ? "Show less ↑" : "Read more ↓"}
                    </button>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold font-display bg-primary/10 text-primary">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold font-display text-foreground">{t.author}</p>
                      <p className="text-xs mt-0.5 text-muted-foreground">{t.role} · {t.company}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right arrow */}
            <button
              onClick={() => go(1)}
              className="shrink-0 w-10 h-10 rounded-full border border-border/70 bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-200"
              aria-label="Next review"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Dots - centered */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === index ? "24px" : "8px",
                  height: "8px",
                  background: i === index ? "hsl(var(--primary))" : "hsl(var(--border))",
                }}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="flex justify-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-display font-semibold text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ background: "hsl(var(--primary))", boxShadow: "0 0 24px hsl(var(--primary) / 0.25)" }}
          >
            Get your free consultation
            <span aria-hidden>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;