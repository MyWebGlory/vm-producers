import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { MagneticHover } from "@/components/ScrollAnimations";
import heroBg from "@/assets/hero-bg.webp";

const CTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-36 lg:py-52 overflow-hidden"
    >
      {/* Parallax background image */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src={heroBg}
          alt=""
          className="w-full h-[130%] object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-xs uppercase tracking-[0.3em] mb-6 font-medium"
          style={{ color: "hsl(var(--primary))" }}
        >
          Let's Talk
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ delay: 0.15, duration: 0.9 }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-tight"
          style={{ color: "white" }}
        >
          Ready to create something{" "}
          <span style={{ color: "hsl(0 0% 100% / 0.5)" }}>extraordinary?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg max-w-xl mx-auto mb-12 leading-relaxed"
          style={{ color: "hsl(0 0% 100% / 0.7)" }}
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
              className="inline-flex px-10 py-4 rounded-full font-display font-semibold text-base transition-all duration-300 hover:scale-105"
              style={{
                background: "white",
                color: "hsl(220 25% 10%)",
              }}
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
