import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Globe, Monitor, Video, Users, Mic } from "lucide-react";
import { ScrollReveal, AnimatedCounter } from "@/components/ScrollAnimations";
import virtualEventsImg from "@/assets/virtual-events.webp";
import videoProductionImg from "@/assets/video-production.webp";
import hybridEventsImg from "@/assets/hybrid-events.webp";
import meetingProsImg from "@/assets/meeting-pros.webp";
import liveEventsImg from "@/assets/live-events.webp";

const services = [
  {
    title: "Live Events",
    icon: Mic,
    description: "In-person events are the bread and butter of building community. We ensure seamless and unforgettable experiences with expert planning and execution.",
    features: ["Full Service Management", "Venue Sourcing", "Registration & Check-in", "Staging & AV", "Catering & Hospitality"],
    image: liveEventsImg,
    stat: { value: 500, suffix: "+", label: "Live events delivered" },
  },
  {
    title: "Virtual Events",
    icon: Monitor,
    description: "Our all-inclusive virtual event production manages everything from intimate webinars to expansive online conferences with up to 100,000 attendees.",
    features: ["Multi-session Conferences", "Premium Livestreams", "Expo Booths", "Polls & Networking", "Multi-language Support"],
    image: virtualEventsImg,
    stat: { value: 100, suffix: "K", label: "Max attendees per event" },
  },
  {
    title: "Hybrid Events",
    icon: Globe,
    description: "We connect in-person and virtual attendees, ensuring both groups feel equally involved through smooth online integration and shared experiences.",
    features: ["Multi-camera Livestream", "Branded Interfaces", "Shared Mobile App", "Live Q&A", "Engagement Tracking"],
    image: hybridEventsImg,
    stat: { value: 95, suffix: "%", label: "Client retention rate" },
  },
  {
    title: "Video Production",
    icon: Video,
    description: "We produce captivating video content that boosts your event marketing and enriches the overall experience, from teasers to highlight reels.",
    features: ["Promo Videos", "Explainer Animations", "Highlight Reels", "Testimonials", "Social Content"],
    image: videoProductionImg,
    stat: { value: 2000, suffix: "+", label: "Videos produced" },
  },
  {
    title: "Meeting Pros",
    icon: Users,
    description: "A worldwide network of skilled event professionals with adaptable staffing solutions across 50 states and 70 countries, matched within 48 hours.",
    features: ["48h Talent Matching", "Verified Professionals", "99.9% Success Rate", "Global Coverage", "Scalable Teams"],
    image: meetingProsImg,
    stat: { value: 70, suffix: "+", label: "Countries covered" },
  },
];

const ServiceRow = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = service.icon;
  const imageOnRight = index % 2 === 0;

  const imageBlock = (
    <motion.div
      initial={{ opacity: 0, x: imageOnRight ? 40 : -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative w-full max-w-[280px] lg:max-w-[320px] flex-shrink-0"
    >
      <div className="rounded-2xl overflow-hidden elevated border border-border/40">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-auto object-contain"
        />
      </div>
      {/* Floating stat */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.5, ease: "backOut" }}
        className={`absolute -bottom-3 ${imageOnRight ? '-left-3' : '-right-3'} z-10 glass-dark rounded-xl px-4 py-2`}
      >
        <p className="text-xl font-display font-bold" style={{ color: "white" }}>
          <AnimatedCounter value={service.stat.value} suffix={service.stat.suffix} />
        </p>
        <p className="text-[10px]" style={{ color: "hsl(220,15%,70%)" }}>{service.stat.label}</p>
      </motion.div>
    </motion.div>
  );

  const contentBlock = (
    <div className="flex-1 space-y-4">
      <motion.div
        initial={{ opacity: 0, x: imageOnRight ? -30 : 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.15, duration: 0.7 }}
        className="flex items-center gap-3"
      >
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/15"
        >
          <Icon size={18} className="text-primary" />
        </motion.div>
        <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">
          {service.title}
        </h3>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-muted-foreground text-base leading-relaxed"
      >
        {service.description}
      </motion.p>

      <div className="flex flex-wrap gap-2">
        {service.features.map((f, fi) => (
          <motion.span
            key={f}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.35 + fi * 0.06, duration: 0.4, ease: "backOut" }}
            className="rounded-full px-3 py-1.5 bg-secondary border border-border/60 text-xs text-secondary-foreground font-medium flex items-center gap-1"
          >
            <Sparkles size={8} className="text-primary/50" />
            {f}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <a
          href="#contact"
          className="inline-flex px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm hover:bg-primary/90 transition-all duration-300 glow-shadow hover:scale-105 hover:-translate-y-0.5"
        >
          Learn More →
        </a>
      </motion.div>
    </div>
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`flex flex-col ${imageOnRight ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-14 items-center`}
    >
      {contentBlock}
      {imageBlock}
    </motion.div>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal className="text-center mb-20">
          <p className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-4 font-medium">
            Our Services
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground">
            Everything You Need
            <br />
            <span className="glow-text">In One Place</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-24 lg:space-y-28">
          {services.map((service, i) => (
            <ServiceRow key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
