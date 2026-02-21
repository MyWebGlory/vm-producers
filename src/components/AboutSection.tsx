import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import aboutImg from "@/assets/about-event.webp";

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-card relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Image with parallax */}
          <motion.div className="w-full lg:w-1/2 relative">
            <div className="rounded-2xl overflow-hidden elevated h-[450px] lg:h-[550px]">
              <motion.img
                src={aboutImg}
                alt="Virtual event production"
                className="w-full h-[120%] object-cover"
                style={{ y: imgY }}
              />
            </div>
            {/* Floating accent card */}
            <div className="absolute -bottom-6 -right-4 lg:-right-8 elevated rounded-2xl p-6 border border-border/40 max-w-[220px]">
              <p className="text-4xl font-display font-bold text-primary">95%</p>
              <p className="text-sm text-muted-foreground mt-1">Client retention rate</p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <p className="text-primary font-display text-sm uppercase tracking-[0.3em] font-medium">
              Why Us
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight text-foreground">
              Experience the Best in{" "}
              <span className="glow-text">Event Production</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We make events effortless. From global conferences to intimate webinars,
              we blend technical excellence with a personal touch.
            </p>
            <div className="elevated rounded-2xl p-6 space-y-4 border border-border/40">
              <p className="text-muted-foreground leading-relaxed">
                With startup agility and enterprise expertise, we specialize in complex
                productions, and seamless hybrid experiences.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether for 10 attendees or 10,000, we handle the complexity so you can
                focus on what you do best.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex px-8 py-4 rounded-lg bg-primary text-primary-foreground font-display font-semibold hover:bg-primary/90 transition-all duration-300 glow-shadow"
            >
              Get In Touch
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
