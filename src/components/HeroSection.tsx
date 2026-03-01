import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.webp";
import { AnimatedCounter, FloatingOrbs } from "@/components/ScrollAnimations";
import { MagneticHover } from "@/components/ScrollAnimations";
import { ArrowRight } from "lucide-react";
import avatar1 from "@/assets/testimonials/jeanette-mccullough.jpeg";
import avatar2 from "@/assets/testimonials/lesley-edwards.jpg";
import avatar3 from "@/assets/testimonials/tony-susa.jpg";
import avatar4 from "@/assets/testimonials/george-zisiadis.jpg";
import avatar5 from "@/assets/testimonials/john-winter.jpeg";

const stats = [
  { value: 2000, suffix: "+", label: "Events Produced" },
  { value: 100, suffix: "%", label: "Success Rate" },
  { value: 350, suffix: "K+", label: "Participants Served" },
];

const avatarPhotos = [avatar1, avatar2, avatar3, avatar4, avatar5];
const avatarNames = ["Jeanette", "Lesley", "Tony", "George", "John"];

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  return (
    <section ref={ref} className="relative overflow-hidden h-screen">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <img
          src={heroBg}
          alt="Event production"
          className="w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,12,24,0.65) 0%, rgba(8,12,24,0.78) 55%, rgba(8,12,24,0.97) 100%)",
          }}
        />
      </motion.div>

      <FloatingOrbs count={3} className="z-[2] opacity-25" />

      {/* Main content - centred, full height */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center"
      >
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-5">

          {/* Badge - small, subtle */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <span
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border"
              style={{
                background: "hsl(216 90% 58% / 0.10)",
                borderColor: "hsl(216 90% 58% / 0.28)",
                color: "hsl(216 90% 78%)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
              #1 Producer for Successful Corporate Events
            </span>
          </motion.div>

          {/* H1 - the star of the show */}
          <motion.h1
            initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.07] text-white"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.7)" }}
          >
            Make your next event{" "}
            <br className="hidden sm:block" />
            <span style={{ color: "hsl(216 90% 65%)" }}>unforgettable.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="text-sm sm:text-base md:text-lg max-w-xl leading-relaxed"
            style={{ color: "hsl(0 0% 100% / 0.68)" }}
          >
            Your event runs on time, looks incredible, and leaves your audience
            talking. We handle every detail - so you can actually enjoy the day.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.85, duration: 0.5, ease: "backOut" }}
            className="flex flex-col items-center gap-1.5 mt-1"
          >
            <MagneticHover>
              <a
                href="https://www.vmproducers.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-display font-semibold text-base transition-all duration-300 hover:scale-105 relative overflow-hidden"
                style={{
                  background: "hsl(216 90% 58%)",
                  color: "white",
                  boxShadow: "0 0 36px hsl(216 90% 58% / 0.4), 0 6px 24px rgba(0,0,0,0.28)",
                }}
              >
                Get a Dedicated Producer
                <ArrowRight size={16} />
                <motion.span
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
                  }}
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                />
              </a>
            </MagneticHover>

            {/* Sub-line */}
            <p className="text-xs" style={{ color: "hsl(0 0% 100% / 0.45)" }}>
              Free strategy call · No commitment · 15 min
            </p>
          </motion.div>

          {/* Scarcity - inline text, not a pill */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.5 }}
            className="flex items-center gap-1.5 text-xs"
            style={{ color: "hsl(25 90% 68%)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "hsl(25 90% 58%)" }} />
            Only 4 new clients per month - spots are filling fast.
          </motion.p>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.5 }}
            className="flex items-center gap-3 mt-1"
          >
            <div className="flex -space-x-2">
              {avatarPhotos.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={avatarNames[i]}
                  className="w-7 h-7 rounded-full object-cover border-2"
                  style={{
                    borderColor: "rgba(8,12,24,0.85)",
                    zIndex: 5 - i,
                  }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 fill-current text-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs" style={{ color: "hsl(0 0% 100% / 0.55)" }}>
                <span className="font-semibold text-white">200+</span> event teams trust us
              </p>
            </div>
          </motion.div>

          {/* Stats row - inline, no separators */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="grid grid-cols-3 gap-6 mt-2"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-0.5">
                <p className="text-xl sm:text-2xl font-display font-bold text-white">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[10px] uppercase tracking-wider font-medium" style={{ color: "hsl(0 0% 100% / 0.45)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

        </div>
      </motion.div>

      {/* Scroll arrow - above stats bar */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 cursor-pointer bg-transparent border-none p-0"
        aria-label="Scroll down"
        onClick={() => {
          const next = document.getElementById("services");
          if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      >
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 22 22"
          fill="none"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <path d="M6 10l5 5 5-5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.button>
    </section>
  );
};

export default HeroSection;
