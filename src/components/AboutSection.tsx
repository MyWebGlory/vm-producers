import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import aboutImg from "@/assets/about-event.webp";
import { ScrollReveal, AnimatedCounter } from "@/components/ScrollAnimations";

const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-32 lg:py-44 bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 md:gap-20 items-center">
          {/* Image */}
          <ScrollReveal direction="left" className="w-full md:w-1/2">
            <div className="rounded-3xl overflow-hidden">
              <motion.img
                src={aboutImg}
                alt="Virtual event production"
                className="w-full h-auto object-contain"
                initial={{ scale: 1.05 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal direction="right" className="w-full md:w-1/2 space-y-8">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-primary font-display text-xs uppercase tracking-[0.3em] font-medium"
            >
              Why Us
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight text-foreground"
            >
              Experience the best in{" "}
              <span className="text-muted-foreground">event production.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              From global conferences to intimate webinars,
              we blend technical excellence with a personal touch.
              Whether for 10 or 10,000 attendees, we handle the complexity.
            </motion.p>

            {/* Minimal stat */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-baseline gap-2"
            >
              <span className="text-5xl font-display font-bold text-foreground">
                <AnimatedCounter value={95} suffix="%" />
              </span>
              <span className="text-muted-foreground text-sm">client retention rate</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-primary font-display font-semibold text-sm hover:gap-3 transition-all duration-300"
              >
                Get in touch
                <span className="text-lg">→</span>
              </a>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;