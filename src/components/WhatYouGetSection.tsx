import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  Trophy,
  MessageCircle,
  MapPin,
  Clock,
  Camera,
  Ticket,
  Heart,
  ArrowRight,
} from "lucide-react";
import { MagneticHover, FloatingOrbs, RevealLine } from "@/components/ScrollAnimations";

const items = [
  {
    icon: Trophy,
    title: "100% Success Rate",
    description: "Every project we take on crosses the finish line. We deliver flawless execution, every single time, without exception.",
    tag: "Guaranteed",
    accent: { bg: "hsl(152 60% 42% / 0.06)", border: "hsl(152 55% 38% / 0.20)", glow: "hsl(152 55% 42% / 0.07)", icon: "hsl(152 45% 38%)", deco: "hsl(152 55% 55% / 0.09)", num: "01" },
  },
  {
    icon: MessageCircle,
    title: "White-Glove Communication",
    description: "A dedicated producer is with you from kickoff to wrap. Real people, real answers, no ticket queues, no generic responses.",
    tag: "Dedicated Team",
    accent: { bg: "hsl(140 56% 40% / 0.06)", border: "hsl(140 50% 36% / 0.20)", glow: "hsl(140 50% 40% / 0.07)", icon: "hsl(140 42% 37%)", deco: "hsl(140 52% 52% / 0.09)", num: "02" },
  },
  {
    icon: MapPin,
    title: "Global Reach in 70+ Countries",
    description: "Our verified network of event professionals spans six continents. Wherever your event is, we have boots on the ground.",
    tag: "Worldwide",
    accent: { bg: "hsl(163 58% 40% / 0.06)", border: "hsl(163 52% 36% / 0.20)", glow: "hsl(163 52% 40% / 0.07)", icon: "hsl(163 44% 37%)", deco: "hsl(163 54% 52% / 0.09)", num: "03" },
  },
  {
    icon: Clock,
    title: "Matched Within 48 Hours",
    description: "Need a professional fast? Our platform matches you with the right talent in under two business days, with zero compromise on quality.",
    tag: "Speed",
    accent: { bg: "hsl(130 52% 42% / 0.06)", border: "hsl(130 46% 37% / 0.20)", glow: "hsl(130 46% 42% / 0.07)", icon: "hsl(130 40% 38%)", deco: "hsl(130 50% 54% / 0.09)", num: "04" },
  },
  {
    icon: Camera,
    title: "Broadcast-Quality Production",
    description: "From live streams to studio-shot highlight reels, every frame is produced to the highest broadcast standard your brand deserves.",
    tag: "Premium",
    accent: { bg: "hsl(168 60% 38% / 0.06)", border: "hsl(168 54% 34% / 0.20)", glow: "hsl(168 54% 38% / 0.07)", icon: "hsl(168 46% 34%)", deco: "hsl(168 56% 50% / 0.09)", num: "05" },
  },
  {
    icon: Ticket,
    title: "Up to 100,000 Attendees",
    description: "Whether you are running an intimate executive retreat or a global virtual summit, our infrastructure scales with zero compromise.",
    tag: "Scalable",
    accent: { bg: "hsl(145 54% 40% / 0.06)", border: "hsl(145 48% 36% / 0.20)", glow: "hsl(145 48% 40% / 0.07)", icon: "hsl(145 42% 36%)", deco: "hsl(145 52% 52% / 0.09)", num: "06" },
  },
  {
    icon: Heart,
    title: "95% Client Retention Rate",
    description: "Our clients do not just return, they bring friends. That number speaks louder than any marketing claim we could ever make.",
    tag: "Proven",
    accent: { bg: "hsl(158 57% 38% / 0.06)", border: "hsl(158 50% 34% / 0.20)", glow: "hsl(158 50% 38% / 0.07)", icon: "hsl(158 44% 34%)", deco: "hsl(158 54% 50% / 0.09)", num: "07" },
  },
];

const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotX = useSpring(rawX, { stiffness: 200, damping: 25 });
  const rotY = useSpring(rawY, { stiffness: 200, damping: 25 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawX.set(((e.clientY - cy) / (rect.height / 2)) * -7);
    rawY.set(((e.clientX - cx) / (rect.width / 2)) * 7);
  };
  const handleLeave = () => { rawX.set(0); rawY.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const ItemCard = ({ item, index }: { item: (typeof items)[number]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;
  const a = item.accent;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.85, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <TiltCard>
        <motion.div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative p-6 md:p-7 lg:p-8 rounded-3xl h-full flex flex-col gap-4 overflow-hidden cursor-default"
          style={{ background: a.bg, border: `1.5px solid ${a.border}` }}
          animate={{ boxShadow: hovered ? `0 16px 50px ${a.glow}, 0 4px 16px hsl(0 0% 0% / 0.06)` : "0 2px 12px hsl(0 0% 0% / 0.04)" }}
          transition={{ duration: 0.35 }}
        >
          {/* Large background number */}
          <span
            className="absolute top-3 right-4 font-display font-black text-7xl leading-none select-none pointer-events-none"
            style={{ color: a.deco, letterSpacing: "-0.04em" }}
          >
            {a.num}
          </span>

          {/* Decorative blobs */}
          <div
            className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${a.deco} 0%, transparent 70%)` }}
          />
          <div
            className="absolute -top-6 -left-6 w-20 h-20 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${a.deco} 0%, transparent 70%)` }}
          />

          {/* Hover top glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{ background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${a.glow}, transparent 70%)` }}
          />

          {/* Icon */}
          <motion.div
            animate={{ scale: hovered ? 1.12 : 1, rotate: hovered ? 6 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="relative z-10 w-11 h-11 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: `${a.bg} `, border: `1.5px solid ${a.border}`, backgroundColor: "hsl(0 0% 100% / 0.7)" }}
          >
            <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: a.icon }} />
          </motion.div>

          {/* Tag */}
          <span
            className="relative z-10 self-start text-[10px] uppercase tracking-[0.22em] font-semibold font-display px-3 py-1 rounded-full"
            style={{ background: `${a.bg}`, color: a.icon, border: `1px solid ${a.border}`, backgroundColor: "hsl(0 0% 100% / 0.6)" }}
          >
            {item.tag}
          </span>

          {/* Title */}
          <h3
            className="relative z-10 text-base md:text-xl lg:text-2xl font-display font-black leading-tight"
            style={{ color: a.icon }}
          >
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.7, delay: index * 0.1 + 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {item.title}
              </motion.span>
            </span>
          </h3>

          {/* Description */}
          <motion.p
            className="relative z-10 text-sm leading-relaxed flex-1"
            style={{ color: "hsl(var(--foreground) / 0.6)" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.35 }}
          >
            {item.description}
          </motion.p>

          {/* Bottom accent bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 rounded-b-full"
            animate={{ width: hovered ? "100%" : "0%", opacity: hovered ? 1 : 0 }}
            style={{ background: `linear-gradient(to right, transparent, ${a.border}, transparent)` }}
            transition={{ duration: 0.45 }}
          />
        </motion.div>
      </TiltCard>
    </motion.div>
  );
};

const WhatYouGetSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ background: "hsl(220 20% 98%)" }}>
      {/* Rich ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] rounded-full" style={{ background: "radial-gradient(circle, hsl(152 55% 45% / 0.07) 0%, transparent 65%)", transform: "translate(20%, -20%)" }} />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] rounded-full" style={{ background: "radial-gradient(circle, hsl(140 50% 40% / 0.05) 0%, transparent 65%)", transform: "translate(-20%, 20%)" }} />
        <div className="absolute top-1/2 left-1/2 w-[40vw] h-[40vw] rounded-full -translate-x-1/2 -translate-y-1/2" style={{ background: "radial-gradient(circle, hsl(168 55% 40% / 0.04) 0%, transparent 65%)" }} />
      </div>
      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(152 50% 38% / 0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Large arc ring - right side */}
      <svg className="absolute -right-32 top-1/4 w-[580px] h-[580px] pointer-events-none opacity-[0.05]" viewBox="0 0 580 580" fill="none">
        <circle cx="580" cy="290" r="480" stroke="hsl(152 50% 40%)" strokeWidth="100" />
        <circle cx="580" cy="290" r="330" stroke="hsl(152 50% 40%)" strokeWidth="45" />
      </svg>
      {/* Smaller arcs - bottom-left */}
      <svg className="absolute -bottom-20 -left-20 w-[400px] h-[400px] pointer-events-none opacity-[0.045]" viewBox="0 0 400 400" fill="none">
        <circle cx="0" cy="400" r="310" stroke="hsl(163 50% 40%)" strokeWidth="75" />
        <circle cx="0" cy="400" r="200" stroke="hsl(163 50% 40%)" strokeWidth="38" />
      </svg>
      {/* Horizontal ruled lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.025 }}>
        <defs>
          <pattern id="greenRules" width="1" height="56" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="10000" y2="0" stroke="hsl(152 50% 38%)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#greenRules)" />
      </svg>
      <FloatingOrbs count={3} />

      <div className="max-w-6xl mx-auto px-6 py-28 lg:py-44">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-20 lg:mb-28 space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-display text-xs uppercase tracking-[0.3em] font-semibold"
            style={{ color: "hsl(var(--primary))" }}
          >
            Why Virtual Producers
          </motion.p>
          <RevealLine delay={0.2} color="from-transparent via-primary/30 to-transparent" className="max-w-[60px] mx-auto" />
          <h2 className="text-[2.4rem] leading-[1.1] sm:text-5xl md:text-5xl lg:text-6xl font-display font-bold" style={{ color: "hsl(var(--foreground))" }}>
            {["What you get", "with Virtual", "Producers."].map((line, li) => (
              <span key={li} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={isHeaderInView ? { y: "0%" } : {}}
                  transition={{ duration: 0.8, delay: 0.1 + li * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  {li === 2 ? <span style={{ color: "hsl(var(--primary))" }}>{line}</span> : line}
                </motion.span>
              </span>
            ))}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-base leading-relaxed text-muted-foreground"
          >
            No vague promises. Here is exactly what you get when you partner with us, from day one to final delivery.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex justify-center"
          >
            <MagneticHover>
              <a
                href="https://www.vmproducers.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-display font-semibold text-sm transition-all duration-300 hover:scale-105"
                style={{ background: "hsl(var(--primary))", color: "white", boxShadow: "0 0 30px hsl(var(--primary) / 0.3)" }}
              >
                Get started today
                <ArrowRight className="w-4 h-4" />
              </a>
            </MagneticHover>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          {items.slice(0, 6).map((item, i) => (
            <ItemCard key={item.title} item={item} index={i} />
          ))}
        </div>
        {items[6] && (
          <div className="mt-4 md:mt-5 lg:mt-6 flex justify-center">
            <div className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.833rem)]">
              <ItemCard item={items[6]} index={6} />
            </div>
          </div>
        )}

        {/* Bottom stats strip */}
        <div className="mt-20 lg:mt-28 pt-12 border-t border-black/[0.08]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "100%", label: "Success rate" },
              { value: "48h",  label: "Professional match" },
              { value: "70+",  label: "Countries covered" },
              { value: "2K+",  label: "Events delivered" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="space-y-1"
                initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-3xl md:text-4xl font-display font-bold" style={{ color: "hsl(var(--primary))" }}>{stat.value}</p>
                <p className="text-xs uppercase tracking-[0.2em] font-medium text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatYouGetSection;
