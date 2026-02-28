import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Award } from "lucide-react";
import { ScrollReveal, AnimatedCounter, SplitTextReveal, ImageReveal, RevealLine, FloatingOrbs } from "@/components/ScrollAnimations";
import aboutEventImg from "@/assets/about-event.webp";

// Dynamic imports - videos loaded only when section is visible
const videoImports = [
  () => import("@/assets/live-events-video.mp4"),
  () => import("@/assets/video-production-video.mp4"),
  () => import("@/assets/hybrid-events-video.mp4"),
  () => import("@/assets/meeting-pros-video.mp4"),
];

const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [currentVideo, setCurrentVideo] = useState(0);
  const [videoSrcs, setVideoSrcs] = useState<string[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Load videos only when section comes into view
  useEffect(() => {
    if (!isInView || videoSrcs.length > 0) return;
    // Load first video immediately, rest after a delay
    videoImports[0]().then((mod) => {
      setVideoSrcs([mod.default]);
      // Load remaining videos in background
      Promise.all(videoImports.slice(1).map((imp) => imp())).then((mods) => {
        setVideoSrcs((prev) => [...prev, ...mods.map((m) => m.default)]);
      });
    });
  }, [isInView, videoSrcs.length]);

  const playNext = useCallback(() => {
    setCurrentVideo((prev) => (prev + 1) % videoImports.length);
  }, []);

  // Play the new video when it becomes active
  useEffect(() => {
    const video = videoRefs.current[currentVideo];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }, [currentVideo, videoSrcs]);

  return (
    <section ref={sectionRef} className="py-32 lg:py-44 bg-card relative overflow-hidden">
      {/* Ambient floating light orbs */}
      <FloatingOrbs count={4} />
      {/* About section content */}}
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 md:gap-20 items-center">
          {/* Video carousel */}
          <div className="w-full md:w-1/2">
          <ImageReveal className="rounded-3xl" delay={0.1}>
            <div className="rounded-3xl overflow-hidden relative aspect-[4/3] bg-muted">
              {/* Static image shown immediately as placeholder */}
              <img
                src={aboutEventImg}
                alt="Event production"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {videoSrcs.map((src, i) => (
                <motion.video
                  key={i}
                  ref={(el) => { videoRefs.current[i] = el; }}
                  src={src}
                  muted
                  playsInline
                  preload="none"
                  onEnded={playNext}
                  className="absolute inset-0 w-full h-full object-cover"
                  animate={{ opacity: i === currentVideo ? 1 : 0 }}
                  transition={{ duration: 1.2 }}
                />
              ))}
            </div>
          </ImageReveal>
          </div>

          {/* Content */}
          <ScrollReveal direction="right" className="w-full md:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <span
                className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                style={{ background: "hsl(var(--primary) / 0.10)", border: "1.5px solid hsl(var(--primary) / 0.24)" }}
              >
                <Award size={20} style={{ color: "hsl(var(--primary))" }} />
              </span>
              <p className="text-primary font-display text-xs uppercase tracking-[0.3em] font-medium">
                Why Us
              </p>
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight text-foreground">
              <SplitTextReveal text="Experience the best in" delay={0.2} />{" "}
              <SplitTextReveal text="event production." delay={0.45} style={{ color: "hsl(var(--primary))" }} />
            </h2>
            {/* Title divider */}
            <div className="flex items-center gap-3">
              <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.45))" }} />
              <span className="flex items-center justify-center w-8 h-8 rounded-xl shrink-0" style={{ background: "hsl(var(--primary) / 0.10)", border: "1px solid hsl(var(--primary) / 0.28)" }}>
                <Award size={14} style={{ color: "hsl(var(--primary))" }} />
              </span>
              <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, hsl(var(--primary) / 0.45))" }} />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              From global conferences to intimate webinars,
              we blend technical excellence with a personal touch.
              Whether for 10 or 10,000 attendees, we handle the complexity.
            </motion.p>

            {/* Minimal stat */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-baseline gap-2"
            >
              <span className="text-5xl font-display font-bold text-foreground">
                <AnimatedCounter value={95} suffix="%" />
              </span>
              <span className="text-muted-foreground text-sm">client retention rate</span>
            </motion.div>

            <RevealLine delay={0.55} className="mb-2" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <a
                href="https://www.vmproducers.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-display font-semibold text-sm hover:gap-3 transition-all duration-300"
              >
                Get in touch
                <span className="text-lg">→</span>
              </a>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
