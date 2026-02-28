import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { RevealLine } from "@/components/ScrollAnimations";

const faqs = [
  {
    question: "What types of events does VM Producers handle?",
    answer:
      "We manage the full spectrum - live in-person conferences, virtual summits, hybrid events, product launches, corporate galas, and more. Whether you have 50 attendees or 50,000+, we scale to fit. Our team has executed events across entertainment, tech, healthcare, finance, and non-profit sectors.",
  },
  {
    question: "Do you operate internationally?",
    answer:
      "Yes. Our network spans 70+ countries with verified, on-the-ground professionals in every major market. You get a dedicated producer who coordinates globally while you focus on the bigger picture.",
  },
  {
    question: "How quickly can you get started?",
    answer:
      "Most clients are matched with a producer within 48 hours of their first call. For urgent needs, we have an accelerated onboarding track. We've gone from first contact to live event execution in under 2 weeks.",
  },
  {
    question: "What does 'full-service' actually mean?",
    answer:
      "It means we handle everything - concept design, venue sourcing, AV & technical production, speaker management, live streaming, registration & attendee experience, post-event video editing, and reporting. You make the key decisions; we execute every detail.",
  },
  {
    question: "What's your guarantee if something goes wrong?",
    answer:
      "We maintain a 100% success rate across 2,000+ events. Every production has redundancy built in - backup tech, backup crew, contingency plans. But if an issue arises, our on-site producer owns it and resolves it in real time. You'll never be left scrambling.",
  },
  {
    question: "Do you work with virtual-only or hybrid formats?",
    answer:
      "Virtual and hybrid production is a core strength. We've run events with 100,000+ virtual attendees, multi-language translation into 5+ languages, broadcast-quality streaming, and interactive features. Remote attendees get the same premium experience as those on-site.",
  },
];

const FAQSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={ref} className="relative py-24 md:py-36 bg-background overflow-hidden">
      {/* Subtle ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 90% 60%, hsl(43 80% 55% / 0.05), transparent 55%)",
        }}
      />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="relative overflow-hidden text-center mb-16">
          {/* Watermark icon */}
          <HelpCircle
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
            style={{ width: 260, height: 260, opacity: 0.045, color: "hsl(var(--primary))" }}
          />
          {/* Section icon badge */}
          <div className="relative flex justify-center mb-4">
            <span
              className="flex items-center justify-center w-14 h-14 rounded-2xl"
              style={{ background: "hsl(var(--primary) / 0.10)", border: "1.5px solid hsl(var(--primary) / 0.24)" }}
            >
              <HelpCircle size={26} style={{ color: "hsl(var(--primary))" }} />
            </span>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-display text-xs uppercase tracking-[0.3em] mb-4 font-medium"
            style={{ color: "hsl(var(--primary))" }}
          >
            Got Questions
          </motion.p>
          <RevealLine delay={0.05} className="mb-6 max-w-[80px] mx-auto" />
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl md:text-5xl font-display font-bold text-foreground leading-tight"
          >
            Frequently asked{" "}
            <span style={{ color: "hsl(var(--primary))" }}>questions</span>
          </motion.h2>
          {/* Title divider */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.45))" }} />
            <span className="flex items-center justify-center w-8 h-8 rounded-xl" style={{ background: "hsl(var(--primary) / 0.10)", border: "1px solid hsl(var(--primary) / 0.28)" }}>
              <HelpCircle size={14} style={{ color: "hsl(var(--primary))" }} />
            </span>
            <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, hsl(var(--primary) / 0.45))" }} />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-muted-foreground text-base max-w-xl mx-auto"
          >
            Everything you need to know before we start working together.
          </motion.p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.55 }}
                className="rounded-xl border overflow-hidden"
                style={{
                  borderColor: isOpen
                    ? "hsl(var(--primary) / 0.35)"
                    : "hsl(var(--border))",
                  background: isOpen
                    ? "hsl(var(--primary) / 0.04)"
                    : "hsl(var(--card))",
                  transition: "border-color 0.3s, background 0.3s",
                }}
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 group"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-semibold text-base md:text-lg text-foreground group-hover:text-primary transition-colors">
                    {faq.question}
                  </span>
                  <span
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                    style={{
                      background: isOpen
                        ? "hsl(var(--primary))"
                        : "hsl(var(--muted))",
                    }}
                  >
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5 text-primary-foreground" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 text-muted-foreground" />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-muted-foreground text-sm md:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom nudge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground text-sm">
            Still have questions?{" "}
            <a
              href="#contact"
              className="font-semibold text-primary hover:underline underline-offset-4"
            >
              Talk to our team →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
