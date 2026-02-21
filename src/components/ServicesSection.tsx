import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Globe, Monitor, Video, Users, Mic } from "lucide-react";
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
    stat: { value: "500+", label: "Live events delivered" },
  },
  {
    title: "Virtual Events",
    icon: Monitor,
    description: "Our all-inclusive virtual event production manages everything from intimate webinars to expansive online conferences with up to 100,000 attendees.",
    features: ["Multi-session Conferences", "Premium Livestreams", "Expo Booths", "Polls & Networking", "Multi-language Support"],
    image: virtualEventsImg,
    stat: { value: "100K", label: "Max attendees per event" },
  },
  {
    title: "Hybrid Events",
    icon: Globe,
    description: "We connect in-person and virtual attendees, ensuring both groups feel equally involved through smooth online integration and shared experiences.",
    features: ["Multi-camera Livestream", "Branded Interfaces", "Shared Mobile App", "Live Q&A", "Engagement Tracking"],
    image: hybridEventsImg,
    stat: { value: "95%", label: "Client retention rate" },
  },
  {
    title: "Video Production",
    icon: Video,
    description: "We produce captivating video content that boosts your event marketing and enriches the overall experience, from teasers to highlight reels.",
    features: ["Promo Videos", "Explainer Animations", "Highlight Reels", "Testimonials", "Social Content"],
    image: videoProductionImg,
    stat: { value: "2000+", label: "Videos produced" },
  },
  {
    title: "Meeting Pros",
    icon: Users,
    description: "A worldwide network of skilled event professionals with adaptable staffing solutions across 50 states and 70 countries, matched within 48 hours.",
    features: ["48h Talent Matching", "Verified Professionals", "99.9% Success Rate", "Global Coverage", "Scalable Teams"],
    image: meetingProsImg,
    stat: { value: "70+", label: "Countries covered" },
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const isEven = index % 2 === 0;
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="relative"
    >
      {/* Full-width card with image background on one side */}
      <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} rounded-3xl overflow-hidden elevated border border-border/40`}>
        {/* Image side — fixed aspect, no zoom */}
        <div className="relative w-full lg:w-[45%] h-[300px] lg:h-auto lg:min-h-[480px] overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent lg:bg-none" />
          <div className={`absolute inset-0 hidden lg:block ${isEven ? "bg-gradient-to-r" : "bg-gradient-to-l"} from-transparent via-transparent to-card/30`} />

          {/* Floating stat */}
          <div className="absolute bottom-5 left-5 glass-dark rounded-xl px-5 py-3">
            <p className="text-2xl md:text-3xl font-display font-bold" style={{ color: "white" }}>{service.stat.value}</p>
            <p className="text-xs" style={{ color: "hsl(220,15%,70%)" }}>{service.stat.label}</p>
          </div>
        </div>

        {/* Content side */}
        <div className="w-full lg:w-[55%] p-8 lg:p-12 flex flex-col justify-center bg-card">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/15">
              <Icon size={20} className="text-primary" />
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              {service.title}
            </h3>
          </div>

          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            {service.description}
          </p>

          {/* Feature pills in a grid-like layout */}
          <div className="flex flex-wrap gap-2 mb-8">
            {service.features.map((f) => (
              <span
                key={f}
                className="rounded-full px-4 py-2 bg-secondary border border-border/60 text-sm text-secondary-foreground font-medium flex items-center gap-1.5"
              >
                <Sparkles size={10} className="text-primary/50" />
                {f}
              </span>
            ))}
          </div>

          <a
            href="#contact"
            className="self-start px-7 py-3 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm hover:bg-primary/90 transition-all duration-300 glow-shadow"
          >
            Learn More →
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-4 font-medium">
            Our Services
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground">
            Everything You Need
            <br />
            <span className="glow-text">In One Place</span>
          </h2>
        </motion.div>

        <div className="space-y-12">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
