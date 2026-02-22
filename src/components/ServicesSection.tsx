import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Globe, Monitor, Video, Users, Mic } from "lucide-react";
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
    description: "Seamless and unforgettable in-person experiences, from intimate gatherings to large-scale productions.",
    image: liveEventsImg,
    video: liveEventsVideo,
    href: "/live-events",
    stat: "500+ Events",
    accent: "215 60% 35%",
  },
  {
    title: "Virtual Events",
    icon: Monitor,
    description: "All-inclusive virtual production for webinars to conferences with up to 100,000 attendees.",
    image: virtualEventsImg,
    href: "/virtual-events",
    stat: "100K Attendees",
    accent: "190 70% 35%",
  },
  {
    title: "Hybrid Events",
    icon: Globe,
    description: "Bridging in-person and virtual audiences into one cohesive, engaging experience.",
    image: hybridEventsImg,
    href: "/hybrid-events",
    stat: "95% Retention",
    accent: "250 50% 40%",
  },
  {
    title: "Video Production",
    icon: Video,
    description: "Captivating video content from teasers to highlight reels that elevate your brand.",
    image: videoProductionImg,
    href: "/video-production",
    stat: "2000+ Videos",
    accent: "340 60% 45%",
  },
  {
    title: "Meeting Pros",
    icon: Users,
    description: "A worldwide network of verified event professionals, matched within 48 hours across 70+ countries.",
    image: meetingProsImg,
    href: "/meeting-pros",
    stat: "70+ Countries",
    accent: "160 50% 35%",
  },
];

const SLIDE_COUNT = services.length;

/* ── Single full-screen slide ── */
const ServiceSlide = ({
  service,
  index,
  scrollYProgress,
}: {
  service: (typeof services)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const Icon = service.icon;
  const slideStart = index / SLIDE_COUNT;
  const slideEnd = (index + 1) / SLIDE_COUNT;

  // Each slide occupies 1/SLIDE_COUNT of the scroll range
  const scale = useTransform(scrollYProgress, [slideStart, slideStart + 0.5 / SLIDE_COUNT, slideEnd - 0.5 / SLIDE_COUNT, slideEnd], [0.6, 1, 1, 0.6]);
  const rotateY = useTransform(scrollYProgress, [slideStart, slideStart + 0.5 / SLIDE_COUNT, slideEnd - 0.5 / SLIDE_COUNT, slideEnd], [45, 0, 0, -45]);
  const opacity = useTransform(scrollYProgress, [slideStart, slideStart + 0.15 / SLIDE_COUNT, slideStart + 0.5 / SLIDE_COUNT, slideEnd - 0.15 / SLIDE_COUNT, slideEnd], [0, 1, 1, 1, 0]);

  const contentY = useTransform(scrollYProgress, [slideStart, slideStart + 0.4 / SLIDE_COUNT, slideEnd - 0.4 / SLIDE_COUNT, slideEnd], [80, 0, 0, -80]);
  const titleX = useTransform(scrollYProgress, [slideStart, slideStart + 0.45 / SLIDE_COUNT, slideEnd - 0.45 / SLIDE_COUNT, slideEnd], [120, 0, 0, -120]);
  const descX = useTransform(scrollYProgress, [slideStart + 0.05 / SLIDE_COUNT, slideStart + 0.5 / SLIDE_COUNT, slideEnd - 0.5 / SLIDE_COUNT, slideEnd - 0.05 / SLIDE_COUNT], [80, 0, 0, -80]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        scale,
        rotateY,
        opacity,
      }}
    >
      {/* Background image/video */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl mx-6 my-6 md:mx-12 md:my-10">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(ellipse at 30% 80%, hsl(${service.accent} / 0.4), transparent 60%)`,
          }}
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 max-w-5xl mx-auto px-10 md:px-20 w-full">
        <motion.div style={{ y: contentY }}>
          {/* Stat badge */}
          <motion.div
            style={{ x: titleX }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 mb-8 backdrop-blur-sm bg-white/5"
          >
            <Icon size={14} style={{ color: "hsl(0 0% 100% / 0.8)" }} />
            <span
              className="font-display text-xs uppercase tracking-[0.2em] font-medium"
              style={{ color: "hsl(0 0% 100% / 0.8)" }}
            >
              {service.stat}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h3
            style={{ x: titleX }}
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold leading-[0.9] mb-6"
          >
            <span style={{ color: "white" }}>{service.title}</span>
          </motion.h3>

          {/* Description */}
          <motion.p
            style={{ x: descX }}
            className="text-lg md:text-xl max-w-lg leading-relaxed mb-10"
          >
            <span style={{ color: "hsl(0 0% 100% / 0.7)" }}>{service.description}</span>
          </motion.p>

          {/* CTA */}
          <motion.div style={{ x: descX }}>
            <Link
              to={service.href}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-display font-semibold text-base transition-all duration-500 hover:scale-105"
              style={{
                background: `hsl(${service.accent})`,
                color: "white",
                boxShadow: `0 8px 30px hsl(${service.accent} / 0.4)`,
              }}
            >
              Explore
              <span className="text-lg group-hover:translate-x-2 transition-transform duration-300">
                →
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-10 right-10 md:bottom-14 md:right-16 z-10">
        <span
          className="font-display text-7xl md:text-8xl font-bold"
          style={{ color: "hsl(0 0% 100% / 0.08)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </motion.div>
  );
};

/* ── Progress dot ── */
const ProgressDot = ({
  index,
  scrollYProgress,
}: {
  index: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const start = index / SLIDE_COUNT;
  const end = (index + 1) / SLIDE_COUNT;
  const mid = (start + end) / 2;
  const dotScale = useTransform(scrollYProgress, [start, mid, end], [1, 1.8, 1]);
  const dotOpacity = useTransform(scrollYProgress, [start, start + 0.02, end - 0.02, end], [0.3, 1, 1, 0.3]);

  return (
    <motion.div
      style={{ scale: dotScale, opacity: dotOpacity }}
      className="w-2.5 h-2.5 rounded-full bg-white"
    />
  );
};

/* ── Main section ── */
const ServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section id="services">
      {/* Section header */}
      <div className="py-28 lg:py-40">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-6 font-medium"
          >
            Our Services
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-foreground leading-[1.05]"
          >
            Crafted to impress.
            <br />
            <span className="text-muted-foreground">Built to perform.</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-px bg-border mt-16 max-w-md mx-auto origin-center"
          />
        </div>
      </div>

      {/* Scroll-driven slides */}
      <div
        ref={containerRef}
        style={{ height: `${SLIDE_COUNT * 100}vh` }}
        className="relative"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ perspective: "1200px" }}>
          <div className="absolute inset-0 bg-foreground" />

          {services.map((service, i) => (
            <ServiceSlide
              key={service.title}
              service={service}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}

          {/* Progress dots */}
          <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
            {services.map((service, i) => (
              <ProgressDot key={service.title} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            style={{ opacity: scrollHintOpacity }}
          >
            <span
              className="font-display text-xs uppercase tracking-[0.2em]"
              style={{ color: "hsl(0 0% 100% / 0.5)" }}
            >
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-5 h-8 rounded-full border-2 flex items-start justify-center p-1"
              style={{ borderColor: "hsl(0 0% 100% / 0.3)" }}
            >
              <motion.div
                className="w-1 h-1 rounded-full"
                style={{ background: "hsl(0 0% 100% / 0.6)" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
