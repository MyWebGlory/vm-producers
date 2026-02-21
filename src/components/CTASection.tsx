import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ScrollReveal, MagneticHover } from "@/components/ScrollAnimations";

const CTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const orbX = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const orbY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="contact" className="py-24 lg:py-32 bg-card">
      <div className="max-w-4xl mx-auto px-6 text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="elevated rounded-3xl p-12 md:p-20 border border-border/50 relative overflow-hidden"
        >
          {/* Animated floating orbs */}
          <motion.div
            style={{ x: orbX, y: orbY }}
            className="absolute -top-20 -right-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl"
          />
          <motion.div
            style={{ x: useTransform(scrollYProgress, [0, 1], [30, -30]), y: useTransform(scrollYProgress, [0, 1], [-30, 30]) }}
            className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl"
          />
          
          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-3xl md:text-5xl font-display font-bold mb-6 text-foreground"
            >
              Feeling overwhelmed?{" "}
              <span className="glow-text">We got you.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Managing your program, A/V services, event platforms, tight budgets,
              increasing costs, and various teams can be overwhelming. Don't tackle it on your own.
              We fit seamlessly within any organization to help as much as you need.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.6, ease: "backOut" }}
            >
              <MagneticHover>
                <a
                  href="https://www.vmproducers.com/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex px-10 py-4 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-lg hover:bg-primary/90 transition-all duration-300 glow-shadow hover:scale-105"
                >
                  Get in Touch
                </a>
              </MagneticHover>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
