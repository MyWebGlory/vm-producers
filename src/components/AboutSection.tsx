import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import aboutImg from "@/assets/about-event.webp";
import { ScrollReveal, AnimatedCounter } from "@/components/ScrollAnimations";

const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-card relative overflow-hidden">
      {/* Floating background orbs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent/5 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Image with reveal effect */}
          <ScrollReveal direction="left" className="w-full lg:w-1/2 relative">
            <div className="rounded-2xl overflow-hidden elevated h-[450px] lg:h-[550px] group">
              <motion.img
                src={aboutImg}
                alt="Virtual event production"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                initial={{ scale: 1.1 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </div>
            {/* Floating accent card with counter */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.7, ease: "backOut" }}
              className="absolute -bottom-6 -right-4 lg:-right-8 elevated rounded-2xl p-6 border border-border/40 max-w-[220px] bg-card"
            >
              <p className="text-4xl font-display font-bold text-primary">
                <AnimatedCounter value={95} suffix="%" />
              </p>
              <p className="text-sm text-muted-foreground mt-1">Client retention rate</p>
            </motion.div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal direction="right" className="w-full lg:w-1/2 space-y-6">
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-primary font-display text-sm uppercase tracking-[0.3em] font-medium"
            >
              Why Us
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-4xl md:text-5xl font-display font-bold leading-tight text-foreground"
            >
              Experience the Best in{" "}
              <span className="glow-text">Event Production</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              We make events effortless. From global conferences to intimate webinars,
              we blend technical excellence with a personal touch.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="elevated rounded-2xl p-6 space-y-4 border border-border/40"
            >
              <p className="text-muted-foreground leading-relaxed">
                With startup agility and enterprise expertise, we specialize in complex
                productions, and seamless hybrid experiences.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether for 10 attendees or 10,000, we handle the complexity so you can
                focus on what you do best.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.5, ease: "backOut" }}
            >
              <a
                href="#contact"
                className="inline-flex px-8 py-4 rounded-lg bg-primary text-primary-foreground font-display font-semibold hover:bg-primary/90 transition-all duration-300 glow-shadow hover:scale-105 hover:-translate-y-0.5"
              >
                Get In Touch
              </a>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
