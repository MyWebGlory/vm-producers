import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, MessageCircle, ArrowRight } from "lucide-react";
import { RevealLine } from "@/components/ScrollAnimations";

const faqs = [
  {
    question: "What kinds of events can you handle for me?",
    answer:
      "Everything you can think of - live conferences, virtual summits, hybrid events, product launches, corporate galas, and more. Whether you have 50 attendees or 50,000+, we scale to fit what you need. We've worked in entertainment, tech, healthcare, finance, and non-profit.",
  },
  {
    question: "Can you produce my event outside the US?",
    answer:
      "Yes. Your event gets a verified professional on the ground, wherever it is. Our network spans 70+ countries, and your dedicated producer coordinates everything globally while you stay focused on the bigger picture.",
  },
  {
    question: "How fast can you get started on my event?",
    answer:
      "You’re matched with a producer within 48 hours of your first call. For urgent needs, you get access to our accelerated onboarding track. We’ve gone from first contact to live event execution in under 2 weeks.",
  },
  {
    question: "What exactly is included when you say \u2018full-service\u2019?",
    answer:
      "It means you don't lift a finger on execution. We take care of concept design, venue sourcing, AV & technical production, speaker management, live streaming, registration & attendee experience, post-event video editing, and full reporting. You make the key decisions - we execute every single detail.",
  },
  {
    question: "What happens if something goes wrong on the day?",
    answer:
      "Short answer: you'll never be left scrambling. We hold a 100% success rate across 2,000+ events. Every production has redundancy built in - backup tech, backup crew, contingency plans. If an issue arises, your on-site producer owns it and resolves it in real time.",
  },
  {
    question: "Can you handle virtual-only or hybrid formats?",
    answer:
      "Virtual and hybrid is where you’ll get a truly premium experience. Your remote attendees get the exact same quality as those in the room, broadcast-quality streaming, multi-language translation into 5+ languages, interactive features, and audiences of up to 100,000.",
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
            "radial-gradient(ellipse 60% 40% at 90% 60%, hsl(216 90% 65% / 0.05), transparent 55%)",
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
            Before you say yes
          </motion.p>
          <RevealLine delay={0.05} className="mb-6 max-w-[80px] mx-auto" />
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl md:text-5xl font-display font-bold text-foreground leading-tight"
          >
            Your questions,{" "}
            <span style={{ color: "hsl(var(--primary))" }}>answered honestly.</span>
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
            Real answers to the questions you're probably already asking yourself.
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

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-14 flex flex-col items-center gap-4"
        >
          <p className="text-sm font-medium" style={{ color: "hsl(var(--foreground) / 0.45)" }}>
            Still have questions?
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-display font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              background: "hsl(var(--primary) / 0.10)",
              border: "1.5px solid hsl(var(--primary) / 0.30)",
              color: "hsl(var(--primary))",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "hsl(var(--primary))";
              (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--primary))";
              (e.currentTarget as HTMLElement).style.color = "white";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "hsl(var(--primary) / 0.10)";
              (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--primary) / 0.30)";
              (e.currentTarget as HTMLElement).style.color = "hsl(var(--primary))";
            }}
          >
            <MessageCircle size={16} className="shrink-0" />
            Talk to our team
            <ArrowRight size={14} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
