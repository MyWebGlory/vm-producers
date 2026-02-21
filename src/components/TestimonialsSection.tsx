import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollAnimations";

const testimonials = [
  {
    text: "Virtual Producers was amazing. We needed last-minute support for a large webinar including more than 10 high level speakers, translation into 5 languages, and thousands of participants. Highly recommend.",
    author: "Jeanette McCullough",
    company: "BirthSwell",
  },
  {
    text: "Their team was incredibly professional and made our hybrid conference seamless. The production quality was outstanding and our attendees loved every moment.",
    author: "Event Director",
    company: "Fortune 500 Client",
  },
  {
    text: "From concept to execution, VM Producers delivered an exceptional virtual summit with thousands of attendees. Their attention to detail is unmatched.",
    author: "Program Manager",
    company: "Tech Industry Leader",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-32 lg:py-44">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal className="text-center mb-20">
          <p className="text-primary font-display text-xs uppercase tracking-[0.3em] mb-5 font-medium">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            What they say.
          </h2>
        </ScrollReveal>

        <div className="space-y-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.15,
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-center max-w-3xl mx-auto"
            >
              <p className="text-xl md:text-2xl text-foreground leading-relaxed font-light italic mb-6">
                "{t.text}"
              </p>
              <div>
                <p className="font-display font-semibold text-foreground text-sm">{t.author}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t.company}</p>
              </div>
              {i < testimonials.length - 1 && (
                <div className="w-12 h-px bg-border mx-auto mt-12" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;