import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Globe, Monitor, Video, Users, Mic } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollAnimations";
import { Link } from "react-router-dom";
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
    href: "/live-events",
    stat: "500+ Events",
  },
  {
    title: "Virtual Events",
    icon: Monitor,
    description: "All-inclusive virtual production for webinars to conferences with up to 100,000 attendees.",
    image: virtualEventsImg,
    href: "/virtual-events",
    stat: "100K Attendees",
  },
  {
    title: "Hybrid Events",
    icon: Globe,
    description: "Bridging in-person and virtual audiences into one cohesive, engaging experience.",
    image: hybridEventsImg,
    href: "/hybrid-events",
    stat: "95% Retention",
  },
  {
    title: "Video Production",
    icon: Video,
    description: "Captivating video content from teasers to highlight reels that elevate your brand.",
    image: videoProductionImg,
    href: "/video-production",
    stat: "2000+ Videos",
  },
  {
    title: "Meeting Pros",
    icon: Users,
    description: "A worldwide network of verified event professionals, matched within 48 hours across 70+ countries.",
    image: meetingProsImg,
    href: "/meeting-pros",
    stat: "70+ Countries",
  },
];

const ServiceBlock = ({ service, index }: { service: (typeof services)[number]; index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-100px" });
  const Icon = service.icon;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax on the background image
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.15]);

  // Content card slides up
  const cardY = useTransform(scrollYProgress, [0.1, 0.5], [80, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={containerRef}
      className="relative h-[90vh] min-h-[600px] overflow-hidden"
    >
      {/* Full-bleed parallax background */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: bgY, scale: bgScale }}
      >
        {service.video ? (
          <video
            src={service.video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
        )}
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
      </motion.div>

      {/* Glass content card */}
      <div className="relative z-10 h-full flex items-end pb-16 md:pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <motion.div
            ref={contentRef}
            style={{ y: cardY, opacity: cardOpacity }}
            className={`flex flex-col ${isEven ? 'md:items-start' : 'md:items-end'}`}
          >
            <Link
              to={service.href}
              className="group block max-w-lg w-full"
            >
              <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-2xl p-8 md:p-10 hover:bg-white/15 hover:border-white/25 transition-all duration-500">
                {/* Stat pill */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 mb-6"
                >
                  <Icon size={14} className="text-white/80" />
                  <span className="text-white/80 font-display text-xs uppercase tracking-[0.15em] font-medium">
                    {service.stat}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight mb-4"
                  style={{ color: "white" }}
                >
                  {service.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-white/70 text-base leading-relaxed mb-6"
                >
                  {service.description}
                </motion.p>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="inline-flex items-center gap-2 text-white font-display font-semibold text-sm group-hover:gap-3 transition-all duration-300"
                >
                  Explore
                  <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">→</span>
                </motion.div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section id="services">
      {/* Section header */}
      <div className="py-28 lg:py-40">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal className="text-center">
            <p className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-6 font-medium">
              Our Services
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-foreground leading-[1.05]">
              Everything you need.
              <br />
              <span className="text-muted-foreground">Nothing you don't.</span>
            </h2>
          </ScrollReveal>
        </div>
      </div>

      {/* Full-bleed service blocks */}
      {services.map((service, i) => (
        <ServiceBlock key={service.title} service={service} index={i} />
      ))}
    </section>
  );
};

export default ServicesSection;
