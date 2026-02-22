import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ScrollReveal, AnimatedCounter } from "@/components/ScrollAnimations";

import liveEventsVideo from "@/assets/live-events-video.mp4";
import videoProductionVideo from "@/assets/video-production-video.mp4";
import hybridEventsVideo from "@/assets/hybrid-events-video.mp4";
import meetingProsVideo from "@/assets/meeting-pros-video.mp4";

const videos = [
  liveEventsVideo,
  videoProductionVideo,
  hybridEventsVideo,
  meetingProsVideo,
];

const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const playNext = useCallback(() => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  }, []);

  // Start playing when a new video mounts
  useEffect(() => {
    const t = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }, 100);
    return () => clearTimeout(t);
  }, [currentVideo]);

  return (
    <section ref={sectionRef} className="py-32 lg:py-44 bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 md:gap-20 items-center">
          {/* Video carousel */}
          <ScrollReveal direction="left" className="w-full md:w-1/2">
            <div className="rounded-3xl overflow-hidden relative aspect-[4/3]">
              <AnimatePresence mode="wait">
                <motion.video
                  key={currentVideo}
                  ref={videoRef}
                  src={videos[currentVideo]}
                  muted
                  playsInline
                  onEnded={playNext}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2 }}
                />
              </AnimatePresence>
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal direction="right" className="w-full md:w-1/2 space-y-8">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-primary font-display text-xs uppercase tracking-[0.3em] font-medium"
            >
              Why Us
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight text-foreground"
            >
              Experience the best in{" "}
              <span className="text-muted-foreground">event production.</span>
            </motion.h2>
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
