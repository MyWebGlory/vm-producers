import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Award } from "lucide-react";
import { SplitTextReveal, RevealLine, FloatingOrbs } from "@/components/ScrollAnimations";
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
    <section ref={sectionRef} aria-labelledby="about-heading" className="py-24 md:py-32 lg:py-40 bg-card relative overflow-hidden">
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        {/* flex-col on mobile → flex-row on sm+ */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 md:gap-16 lg:gap-20 sm:items-center">

          {/* ── [MOBILE ONLY] Header block: badge + title + divider - order-1, hidden on sm+ ── */}
          <div className="flex flex-col gap-5 items-center text-center sm:hidden order-1">
            <div className="flex flex-col items-center gap-2">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0" style={{ background: "hsl(var(--primary) / 0.10)", border: "1.5px solid hsl(var(--primary) / 0.24)" }}>
                <Award size={20} style={{ color: "hsl(var(--primary))" }} />
              </span>
              <p className="text-primary font-display text-xs uppercase tracking-[0.3em] font-medium">Why you'll never look back</p>
            </div>
            <h2 className="text-3xl font-display font-bold leading-tight text-foreground">
              <SplitTextReveal text="You've got the vision." delay={0.2} className="justify-center" />{" "}
              <SplitTextReveal text="We make it real." delay={0.45} className="justify-center" style={{ color: "hsl(var(--primary))" }} />
            </h2>
            {/* Divider - mobile only */}
            <div className="flex items-center justify-center gap-3 w-full">
              <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.45))" }} />
              <span className="flex items-center justify-center w-8 h-8 rounded-xl shrink-0" style={{ background: "hsl(var(--primary) / 0.10)", border: "1px solid hsl(var(--primary) / 0.28)" }}>
                <Award size={14} style={{ color: "hsl(var(--primary))" }} />
              </span>
              <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, hsl(var(--primary) / 0.45))" }} />
            </div>
          </div>

          {/* ── Image / Video col - order-2 on mobile (after title), order-1 on sm+ (left) ── */}
          <motion.div
            className="relative rounded-3xl overflow-hidden w-full sm:w-1/2 shrink-0 aspect-[16/9] sm:aspect-[4/3] bg-muted order-2 sm:order-2"
            initial={{ opacity: 0, x: 48 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
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
          </motion.div>

          {/* ── Right col: full text on sm+, only body+CTA on mobile ── */}
          <motion.div
            className="flex flex-col gap-6 w-full sm:w-1/2 min-w-0 order-3 sm:order-1 items-center sm:items-start text-center sm:text-left"
            initial={{ opacity: 0, x: -48 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge + Title - desktop only (mobile version is in block above) */}
            <div className="hidden sm:flex flex-col gap-5 items-start text-left w-full">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0" style={{ background: "hsl(var(--primary) / 0.10)", border: "1.5px solid hsl(var(--primary) / 0.24)" }}>
                  <Award size={20} style={{ color: "hsl(var(--primary))" }} />
                </span>
                <p className="text-primary font-display text-xs uppercase tracking-[0.3em] font-medium">Why you'll never look back</p>
              </div>
              <h2 id="about-heading" className="text-4xl lg:text-5xl font-display font-bold leading-tight text-foreground">
                <SplitTextReveal text="You've got the vision." delay={0.2} className="justify-start" />{" "}
                <SplitTextReveal text="We make it real." delay={0.45} className="justify-start" style={{ color: "hsl(var(--primary))" }} />
              </h2>
            </div>

            {/* Divider - desktop only */}
            <div className="hidden sm:flex items-center justify-start gap-3 w-full">
              <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.45))" }} />
              <span className="flex items-center justify-center w-8 h-8 rounded-xl shrink-0" style={{ background: "hsl(var(--primary) / 0.10)", border: "1px solid hsl(var(--primary) / 0.28)" }}>
                <Award size={14} style={{ color: "hsl(var(--primary))" }} />
              </span>
              <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, hsl(var(--primary) / 0.45))" }} />
            </div>

            {/* Body text */}
            <p className="text-muted-foreground text-base leading-relaxed">
              Think of us as the production team you always wished you had. We handle everything behind the scenes (staging, tech, logistics, people) so you can walk out on stage, breathe, and actually enjoy the moment. Fortune 500 or fast-growing startup, every client gets the same dedicated team.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              In-person show? We handle the stage, AV, venue, and every logistical detail. Virtual or hybrid? Your audience gets a broadcast-quality experience. Need a promo or recap video? Done. A verified professional anywhere in the world within 72 hours? Also us. One call, and it's all sorted.
            </p>

            <RevealLine delay={0.55} className="mb-2 w-full" />

            {/* CTA */}
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
    </section>
  );
};

export default AboutSection;
