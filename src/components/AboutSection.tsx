import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Award } from "lucide-react";
import { ScrollReveal, SplitTextReveal, ImageReveal, RevealLine, FloatingOrbs } from "@/components/ScrollAnimations";
import aboutEventImg from "@/assets/about-event.webp";
import { useCalendly } from "@/components/CalendlyModal";

// Dynamic imports - videos loaded only when section is visible
const videoImports = [
  () => import("@/assets/live-events-video.mp4"),
  () => import("@/assets/video-production-video.mp4"),
  () => import("@/assets/hybrid-events-video.mp4"),
  () => import("@/assets/meeting-pros-video.mp4"),
];

const AboutSection = () => {
  const { openCalendly } = useCalendly();
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
    <section ref={sectionRef} aria-labelledby="about-heading" className="py-32 lg:py-44 bg-card relative overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(216 90% 58% / 0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Blue ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[45vw] h-[45vw] rounded-full" style={{ background: "radial-gradient(circle, hsl(216 90% 58% / 0.06) 0%, transparent 65%)", transform: "translate(20%, -20%)" }} />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] rounded-full" style={{ background: "radial-gradient(circle, hsl(216 90% 58% / 0.05) 0%, transparent 65%)", transform: "translate(-20%, 20%)" }} />
      </div>
      {/* Ambient floating light orbs */}
      <FloatingOrbs count={4} />
      {/* About section content */}
      <div className="max-w-3xl mx-auto px-2 sm:px-6 relative z-10">
        <div className="flex flex-col items-center gap-8">

          {/* 1. Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="flex items-center justify-center gap-3"
          >
            <span
              className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
              style={{ background: "hsl(var(--primary) / 0.10)", border: "1.5px solid hsl(var(--primary) / 0.24)" }}
            >
              <Award size={20} style={{ color: "hsl(var(--primary))" }} />
            </span>
            <p className="text-primary font-display text-xs uppercase tracking-[0.3em] font-medium">
              Why you'll never look back
            </p>
          </motion.div>

          {/* 2. Title */}
          <ScrollReveal direction="up" className="w-full text-center space-y-4">
            <h2 id="about-heading" className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight text-foreground">
              <SplitTextReveal text="You've got the vision." delay={0.2} />{" "}
              <SplitTextReveal text="We're about to make it real." delay={0.45} style={{ color: "hsl(var(--primary))" }} />
            </h2>
            {/* Title divider */}
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.45))" }} />
              <span className="flex items-center justify-center w-8 h-8 rounded-xl shrink-0" style={{ background: "hsl(var(--primary) / 0.10)", border: "1px solid hsl(var(--primary) / 0.28)" }}>
                <Award size={14} style={{ color: "hsl(var(--primary))" }} />
              </span>
              <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, hsl(var(--primary) / 0.45))" }} />
            </div>
          </ScrollReveal>

          {/* 3. Video – same size as service cards */}
          <ImageReveal className="rounded-3xl w-full" delay={0.1}>
            <div className="rounded-3xl overflow-hidden relative w-full h-40 sm:h-32 md:h-40 lg:h-52 bg-muted">
              <img
                src={aboutEventImg}
                alt="VM Producers team managing a full-service corporate event production"
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
                  transition={{ duration: 0.5 }}
                />
              ))}
            </div>
          </ImageReveal>

          {/* 4. Text paragraphs + CTA */}
          <div className="w-full space-y-5 text-center">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              Think of us as the production team you always wished you had. We handle everything behind the scenes (staging, tech, logistics, people) so you can walk out on stage, breathe, and actually enjoy the moment. Fortune 500 or fast-growing startup, every client gets the same dedicated team.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-muted-foreground text-base leading-relaxed"
            >
              In-person show? We handle the stage, AV, venue, and every logistical detail. Virtual or hybrid? Your audience gets a broadcast-quality experience. Need a promo or recap video? Done. A verified professional anywhere in the world within 48 hours? Also us. One call, and it's all sorted.
            </motion.p>

            <RevealLine delay={0.55} className="mb-2" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex justify-center"
            >
              <button
                type="button"
                onClick={openCalendly}
                className="inline-flex items-center gap-2 text-primary font-display font-semibold text-sm hover:gap-3 transition-all duration-300 cursor-pointer"
              >
                Get in touch
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
