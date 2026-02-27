import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";
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
    featured: false,
  },
  {
    text: "Their team ran our hybrid conference without a single hitch. The production held up under pressure, and attendees on both sides felt it. Best team we have ever worked with.",
    author: "Sarah Chen",
    role: "Events Director",
    company: "Fortune 500 Company",
    initials: "SC",
    rating: 5,
    platform: "google",
    featured: false,
  },
  {
    text: "From concept to execution, VM Producers delivered an exceptional virtual summit for thousands of attendees worldwide. Their attention to detail is truly unmatched.",
    author: "Marcus Williams",
    role: "VP of Operations",
    company: "Tech Industry Leader",
    initials: "MW",
    rating: 5,
    platform: "trustpilot",
    featured: false,
  },
  {
    text: "We have worked with many production agencies. VM Producers is in a league of their own — startup agility with enterprise-level quality. Zero missed deadlines across 4 events.",
    author: "Diana Foster",
    role: "Head of Marketing",
    company: "Global Pharma Corp",
    initials: "DF",
    rating: 5,
    platform: "capterra",
    featured: false,
  },
  {
    text: "Complex multi-timezone, multi-language event. Not a single issue. The team was proactive, responsive, and genuinely invested in our success from day one.",
    author: "Remi Lacroix",
    role: "Conference Manager",
    company: "European Trade Assoc.",
    initials: "RL",
    rating: 5,
    platform: "google",
    featured: false,
  },
  {
    text: "We came back for our 5th event with VM Producers. That says it all. 100% success rate every time, zero stress, zero surprises. They are our permanent production partner.",
    author: "Kelly Nguyen",
    role: "Event Coordinator",
    company: "Atlanta Business Council",
    initials: "KN",
    rating: 5,
    platform: "trustpilot",
    featured: false,
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

  return (
    <section ref={sectionRef} className="py-28 lg:py-40 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <p className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-4 font-medium">
            Client Reviews
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-6">
            <SplitTextReveal text="Trusted by 200+" delay={0.1} />
            <br />
            <SplitTextReveal text="event teams worldwide." delay={0.25} className="glow-text" />
          </h2>
          <RevealLine delay={0.4} className="max-w-[60px] mx-auto mb-8" />

          {/* Aggregate ratings row */}
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
              <div
                key={p.label}
                className="flex items-center gap-2.5 bg-card border border-border/60 rounded-full px-4 py-2 shadow-sm"
              >
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

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`relative rounded-2xl border p-7 flex flex-col gap-4 ${
                t.featured
                  ? "bg-foreground text-background border-foreground/80 shadow-xl shadow-foreground/10"
                  : "bg-card border-border/60 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
              }`}
            >
              {/* Top row: platform + stars */}
              <div className="flex items-center justify-between">
                <div className={t.featured ? "opacity-75" : ""}>
                  <PlatformBadge platform={t.platform} />
                </div>
                <div className="flex items-center gap-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Quote icon */}
              <Quote
                size={18}
                className={t.featured ? "text-background/30" : "text-primary/25"}
                style={{ transform: "scaleX(-1)" }}
              />

              {/* Quote text */}
              <p
                className={`text-[15px] leading-relaxed flex-1 font-medium ${
                  t.featured ? "text-background/85" : "text-foreground/75"
                }`}
              >
                "{t.text}"
              </p>

              {/* Author */}
              <div className={`flex items-center gap-3 pt-3 border-t ${t.featured ? "border-background/15" : "border-border/50"}`}>
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold font-display ${
                    t.featured
                      ? "bg-background/15 text-background"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {t.initials}
                </div>
                <div>
                  <p
                    className={`text-sm font-bold font-display ${
                      t.featured ? "text-background" : "text-foreground"
                    }`}
                  >
                    {t.author}
                  </p>
                  <p
                    className={`text-xs mt-0.5 ${
                      t.featured ? "text-background/55" : "text-muted-foreground"
                    }`}
                  >
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <p className="text-muted-foreground text-sm">
            Join 200+ event teams who trust VM Producers.{" "}
            <a href="/contact" className="text-primary font-semibold hover:underline underline-offset-2">
              Get your free consultation →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
