import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    text: "Virtual Producers was amazing. We needed last-minute support for a large webinar including more than 10 high level speakers, translation into 5 languages, and thousands of participants. He was knowledgeable, supportive, and went above and beyond to ensure the project ran smoothly despite lots of variables. He saved the day multiple times. Highly recommend.",
    author: "Jeanette McCullough",
    company: "BirthSwell",
  },
  {
    text: "Their team was incredibly professional and made our hybrid conference seamless. The production quality was outstanding and our attendees loved every moment. We'll definitely be working together again.",
    author: "Event Director",
    company: "Fortune 500 Client",
  },
  {
    text: "From concept to execution, VM Producers delivered an exceptional virtual summit with thousands of attendees. Their attention to detail and technical expertise is unmatched.",
    author: "Program Manager",
    company: "Tech Industry Leader",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 lg:py-32 section-gradient">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-4 font-medium">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Some of Our <span className="glow-text">Shout-Outs</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="glass rounded-2xl p-8 glow-border hover:bg-secondary/30 transition-all duration-500 group"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={16} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-8 text-sm">
                "{t.text}"
              </p>
              <div>
                <p className="font-display font-semibold text-foreground">{t.author}</p>
                <p className="text-sm text-muted-foreground">{t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
