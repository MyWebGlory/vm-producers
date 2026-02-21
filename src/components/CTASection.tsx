import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MagneticHover } from "@/components/ScrollAnimations";

const CTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32 lg:py-44 bg-card">
      <div className="max-w-3xl mx-auto px-6 text-center" ref={ref}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-primary font-display text-xs uppercase tracking-[0.3em] mb-6 font-medium"
        >
          Let's Talk
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 text-foreground leading-tight"
        >
          Ready to create something{" "}
          <span className="text-muted-foreground">extraordinary?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-muted-foreground text-lg max-w-xl mx-auto mb-12 leading-relaxed"
        >
          We fit seamlessly within any organization. Don't tackle it on your own.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.6 }}
        >
          <MagneticHover>
            <a
              href="https://www.vmproducers.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-10 py-4 rounded-full bg-foreground text-background font-display font-semibold text-base hover:opacity-90 transition-all duration-300"
            >
              Get in Touch
            </a>
          </MagneticHover>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;