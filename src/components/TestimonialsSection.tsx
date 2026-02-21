import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollAnimations";

const testimonials = [
  {
    text: "Virtual Producers was amazing. We needed last-minute support for a large webinar including more than 10 high level speakers, translation into 5 languages, and thousands of participants. He went above and beyond to ensure the project ran smoothly. Highly recommend.",
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
    <section ref={ref} className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <p className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-4 font-medium">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Some of Our <span className="glow-text">Shout-Outs</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, rotateY: 5 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{
                delay: i * 0.15,
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="elevated rounded-2xl p-8 border border-border/40 relative overflow-hidden group hover:shadow-xl transition-shadow duration-500"
              style={{ perspective: 800 }}
            >
              {/* Animated gradient background on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              <Quote size={40} className="absolute top-6 right-6 text-primary/8" />
              <div className="flex gap-0.5 mb-5 relative z-10">
                {[...Array(5)].map((_, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: i * 0.15 + 0.3 + j * 0.06, duration: 0.3, ease: "backOut" }}
                  >
                    <Star size={14} className="fill-primary/70 text-primary/70" />
                  </motion.div>
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6 text-sm relative z-10">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 relative z-10">
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary text-sm"
                >
                  {t.author[0]}
                </motion.div>
                <div>
                  <p className="font-display font-semibold text-foreground text-sm">{t.author}</p>
                  <p className="text-xs text-muted-foreground">{t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
