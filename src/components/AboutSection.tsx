import { motion } from "framer-motion";
import aboutImg from "@/assets/about-event.webp";

const AboutSection = () => {
  return (
    <section className="py-24 lg:py-32 section-gradient">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-primary/5 blur-3xl" />
              <img
                src={aboutImg}
                alt="Virtual event production"
                className="relative rounded-2xl w-full h-[500px] lg:h-[600px] object-cover glow-border"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <p className="text-primary font-display text-sm uppercase tracking-[0.3em] font-medium">
              Why Us
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
              Experience the Best in{" "}
              <span className="glow-text">Event Production</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We make events effortless. From global conferences to intimate webinars,
              we blend technical excellence with a personal touch.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              With startup agility and enterprise expertise, we specialize in complex
              productions, and seamless hybrid experiences — earning a{" "}
              <span className="text-primary font-semibold">95% client retention rate</span>.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Whether for 10 attendees or 10,000, we handle the complexity so you can
              focus on what you do best.
            </p>
            <a
              href="#contact"
              className="inline-flex px-8 py-4 rounded-lg bg-primary text-primary-foreground font-display font-semibold hover:bg-primary/90 transition-all duration-300 glow-shadow hover:scale-105"
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
