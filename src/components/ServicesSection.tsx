import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Monitor, Video, Users, Mic } from "lucide-react";
import { ScrollReveal, AnimatedCounter } from "@/components/ScrollAnimations";
import virtualEventsImg from "@/assets/virtual-events-conference.webp";
import videoProductionImg from "@/assets/video-production.webp";
import hybridEventsImg from "@/assets/hybrid-summit-stage.webp";
import meetingProsImg from "@/assets/meeting-pros.webp";
import liveEventsImg from "@/assets/live-events.webp";
import liveEventsVideo from "@/assets/live-events-video.mp4";

const services = [
  {
    title: "Live Events",
    icon: Mic,
    description: "Seamless and unforgettable in-person experiences — from intimate gatherings to large-scale productions.",
    image: liveEventsImg,
    video: liveEventsVideo,
    stat: { value: 500, suffix: "+", label: "Events delivered" },
  },
  {
    title: "Virtual Events",
    icon: Monitor,
    description: "All-inclusive virtual production for webinars to conferences with up to 100,000 attendees.",
    image: virtualEventsImg,
    stat: { value: 100, suffix: "K", label: "Max attendees" },
  },
  {
    title: "Hybrid Events",
    icon: Globe,
    description: "Bridging in-person and virtual audiences into one cohesive, engaging experience.",
    image: hybridEventsImg,
    stat: { value: 95, suffix: "%", label: "Retention rate" },
    imageSize: "max-w-[480px] md:max-w-[560px]",
  },
  {
    title: "Video Production",
    icon: Video,
    description: "Captivating video content from teasers to highlight reels that elevate your brand.",
    image: videoProductionImg,
    stat: { value: 2000, suffix: "+", label: "Videos produced" },
  },
  {
    title: "Meeting Pros",
    icon: Users,
    description: "A worldwide network of verified event professionals, matched within 48 hours across 70+ countries.",
    image: meetingProsImg,
    stat: { value: 70, suffix: "+", label: "Countries" },
  },
];

const ServiceRow = ({ service, index }: { service: (typeof services)[number]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = service.icon;
  const imageOnRight = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`flex flex-col ${imageOnRight ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-20 items-center`}
    >
      {/* Content */}
      <div className="flex-1 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-primary/8 flex items-center justify-center">
            <Icon size={18} className="text-primary" />
          </div>
          <p className="text-primary font-display text-xs uppercase tracking-[0.2em] font-medium">
            {service.stat.value}{service.stat.suffix} {service.stat.label}
          </p>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight"
        >
          {service.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-muted-foreground text-lg leading-relaxed max-w-md"
        >
          {service.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-primary font-display font-semibold text-sm hover:gap-3 transition-all duration-300"
          >
            Learn more
            <span className="text-lg">→</span>
          </a>
        </motion.div>
      </div>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`w-full ${service.imageSize || 'max-w-[420px] md:max-w-[480px]'} flex-shrink-0`}
      >
        <div className="rounded-3xl overflow-hidden">
          {service.video ? (
            <video
              src={service.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-contain"
            />
          ) : (
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-auto object-contain"
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-32 lg:py-44">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal className="text-center mb-24 lg:mb-32">
          <p className="text-primary font-display text-xs uppercase tracking-[0.3em] mb-5 font-medium">
            Our Services
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight">
            Everything you need.
            <br />
            <span className="text-muted-foreground">Nothing you don't.</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-32 lg:space-y-44">
          {services.map((service, i) => (
            <ServiceRow key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;