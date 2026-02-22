import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Globe, Monitor, Video, Users, Mic, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import virtualEventsImg from "@/assets/virtual-events-conference.webp";
import videoProductionImg from "@/assets/video-production.webp";
import hybridEventsImg from "@/assets/hybrid-summit-stage.webp";
import meetingProsImg from "@/assets/meeting-pros.webp";
import liveEventsImg from "@/assets/live-events.webp";
import liveEventsVideo from "@/assets/live-events-video.mp4";
import videoProductionVideo from "@/assets/video-production-video.mp4";

const services = [
  {
    title: "Live Events",
    icon: Mic,
    description: "Seamless, unforgettable in-person experiences, from intimate gatherings to large-scale productions.",
    image: liveEventsImg,
    video: liveEventsVideo,
    href: "/live-events",
    stat: "500+",
    statLabel: "Events",
    accent: "215 60% 35%",
  },
  {
    title: "Virtual Events",
    icon: Monitor,
    description: "All-inclusive virtual production for webinars to conferences with up to 100,000 attendees.",
    image: virtualEventsImg,
    href: "/virtual-events",
    stat: "100K",
    statLabel: "Attendees",
    accent: "190 70% 35%",
  },
  {
    title: "Hybrid Events",
    icon: Globe,
    description: "Bridging in-person and virtual audiences into one cohesive, engaging experience.",
    image: hybridEventsImg,
    href: "/hybrid-events",
    stat: "95%",
    statLabel: "Retention",
    accent: "250 50% 40%",
  },
  {
    title: "Video Production",
    icon: Video,
    description: "Captivating video content from teasers to highlight reels that elevate your brand.",
    image: videoProductionImg,
    video: videoProductionVideo,
    href: "/video-production",
    stat: "2000+",
    statLabel: "Videos",
    accent: "340 60% 45%",
  },
  {
    title: "Meeting Pros",
    icon: Users,
    description: "A worldwide network of verified event professionals, matched within 48 hours across 70+ countries.",
    image: meetingProsImg,
    href: "/meeting-pros",
    stat: "70+",
    statLabel: "Countries",
    accent: "160 50% 35%",
  },
];

/* ── Single Bento Card ── */
const BentoCard = ({
  service,
  index,
  className,
}: {
  service: (typeof services)[number];
  index: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative group rounded-2xl overflow-hidden cursor-pointer ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={service.href} className="absolute inset-0 z-20" aria-label={service.title} />

      {/* Media background */}
      <div className="absolute inset-0">
        {service.video ? (
          <video
            src={service.video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}

        {/* Dark overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"
          animate={{ opacity: hovered ? 1 : 0.85 }}
          transition={{ duration: 0.4 }}
        />

        {/* Accent glow on hover */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: hovered ? 0.15 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: `radial-gradient(ellipse at 50% 80%, hsl(${service.accent}), transparent 70%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
        {/* Stat badge */}
        <motion.div
          className="absolute top-5 right-5 flex flex-col items-end"
          animate={{ y: hovered ? -4 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <span
            className="font-display text-3xl md:text-4xl font-bold leading-none"
            style={{ color: `hsl(${service.accent})` }}
          >
            {service.stat}
          </span>
          <span className="text-xs uppercase tracking-[0.15em] mt-1" style={{ color: "hsl(0 0% 100% / 0.5)" }}>
            {service.statLabel}
          </span>
        </motion.div>

        {/* Icon */}
        <motion.div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm"
          style={{
            background: `hsl(${service.accent} / 0.15)`,
            border: `1px solid hsl(${service.accent} / 0.25)`,
          }}
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Icon size={18} style={{ color: `hsl(${service.accent})` }} />
        </motion.div>

        {/* Title */}
        <motion.h3
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3"
          style={{ color: "white" }}
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {service.title}
        </motion.h3>

        {/* Description - always visible */}
        <p
          className="text-sm md:text-base leading-relaxed mb-4 max-w-md"
          style={{ color: "hsl(0 0% 100% / 0.65)" }}
        >
          {service.description}
        </p>

        {/* CTA arrow */}
        <motion.div
          className="flex items-center gap-2 font-display text-sm font-medium"
          style={{ color: `hsl(${service.accent})` }}
          animate={{ x: hovered ? 8 : 0, opacity: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.3 }}
        >
          Explore
          <ArrowRight size={14} />
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ── Main Section ── */
const ServicesSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-28 lg:py-40 relative">
      {/* Section header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-6 mb-16 lg:mb-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-6 font-medium"
        >
          Our Services
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={headerInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground leading-[1.05]"
        >
          Crafted to impress.
          <br />
          <span className="text-muted-foreground">Built to perform.</span>
        </motion.h2>
      </div>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 lg:gap-8 auto-rows-[400px] md:auto-rows-[460px] lg:auto-rows-[440px]">
          {/* Live Events - large, spans 2 cols */}
          <BentoCard
            service={services[0]}
            index={0}
            className="md:col-span-2 md:row-span-1"
          />

          {/* Virtual Events - tall, spans 2 rows */}
          <BentoCard
            service={services[1]}
            index={1}
            className="lg:row-span-2"
          />

          {/* Hybrid Events - standard */}
          <BentoCard
            service={services[2]}
            index={2}
            className=""
          />

          {/* Video Production - standard */}
          <BentoCard
            service={services[3]}
            index={3}
            className=""
          />

          {/* Meeting Pros - large, spans 3 cols on lg */}
          <BentoCard
            service={services[4]}
            index={4}
            className="md:col-span-2 lg:col-span-3"
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
