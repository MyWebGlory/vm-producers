import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, UserX, WifiOff, MonitorOff, Flame, Archive } from "lucide-react";

const painPalette = [
  { bg: "hsl(0 72% 54% / 0.05)",   border: "hsl(0 68% 50% / 0.18)",   glow: "hsl(0 68% 54% / 0.06)",   deco: "hsl(0 68% 64% / 0.09)",   icon: "hsl(0 55% 50%)" },
  { bg: "hsl(350 68% 52% / 0.05)", border: "hsl(350 62% 48% / 0.18)", glow: "hsl(350 62% 52% / 0.06)", deco: "hsl(350 62% 62% / 0.09)", icon: "hsl(350 50% 48%)" },
  { bg: "hsl(8 75% 56% / 0.05)",   border: "hsl(8 68% 50% / 0.18)",   glow: "hsl(8 68% 54% / 0.06)",   deco: "hsl(8 70% 66% / 0.09)",   icon: "hsl(8 55% 50%)" },
  { bg: "hsl(345 70% 53% / 0.05)", border: "hsl(345 64% 48% / 0.18)", glow: "hsl(345 64% 52% / 0.06)", deco: "hsl(345 65% 63% / 0.09)", icon: "hsl(345 52% 48%)" },
  { bg: "hsl(355 65% 50% / 0.05)", border: "hsl(355 58% 46% / 0.18)", glow: "hsl(355 58% 50% / 0.06)", deco: "hsl(355 60% 60% / 0.09)", icon: "hsl(355 48% 46%)" },
];

const painPoints = [
  {
    Icon: UserX,
    title: "You trusted the wrong person with too much.",
    aside: "Good reel. No live experience.",
  },
  {
    Icon: WifiOff,
    title: "The tech failed at the worst possible moment.",
    aside: "No backup. No plan.",
  },
  {
    Icon: MonitorOff,
    title: "Online attendees felt like an afterthought.",
    aside: "They left early.",
  },
  {
    Icon: Flame,
    title: "You scrambled instead of hosted.",
    aside: "The most stressed person in the room.",
  },
  {
    Icon: Archive,
    title: "Nothing lived on after day one.",
    aside: "Budget spent. Content: none.",
  },
];

const PainPointsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 20%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="relative bg-white overflow-hidden">
      {/* Atmospheric warm ambient gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 10% 20%, hsl(43 80% 55% / 0.06), transparent 55%)," +
            "radial-gradient(ellipse 60% 40% at 90% 80%, hsl(0 65% 60% / 0.05), transparent 55%)",
        }}
      />
      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(0 60% 48% / 0.18) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      {/* Large arc ring - top-right corner */}
      <svg className="absolute -top-24 -right-24 w-[520px] h-[520px] pointer-events-none opacity-[0.055]" viewBox="0 0 520 520" fill="none">
        <circle cx="520" cy="0" r="420" stroke="hsl(0 60% 48%)" strokeWidth="90" />
        <circle cx="520" cy="0" r="290" stroke="hsl(0 60% 48%)" strokeWidth="40" />
      </svg>
      {/* Smaller arcs - bottom-left corner */}
      <svg className="absolute -bottom-20 -left-20 w-[380px] h-[380px] pointer-events-none opacity-[0.045]" viewBox="0 0 380 380" fill="none">
        <circle cx="0" cy="380" r="300" stroke="hsl(350 60% 50%)" strokeWidth="70" />
        <circle cx="0" cy="380" r="190" stroke="hsl(350 60% 50%)" strokeWidth="35" />
      </svg>
      {/* Diagonal hatch overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.022 }}>
        <defs>
          <pattern id="painHatch" width="44" height="44" patternUnits="userSpaceOnUse" patternTransform="rotate(-45 0 0)">
            <line x1="0" y1="0" x2="0" y2="44" stroke="hsl(0 60% 45%)" strokeWidth="1.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#painHatch)" />
      </svg>
      {/* Animated vertical progress thread */}
      <div className="absolute left-5 lg:left-10 top-0 bottom-0 w-px hidden md:block overflow-hidden">
        <motion.div
          className="w-full origin-top"
          style={{
            height: lineHeight,
            background: "linear-gradient(to bottom, transparent 0%, hsl(43 80% 48% / 0.55) 30%, hsl(43 80% 48% / 0.25) 70%, transparent 100%)",
          }}
        />
      </div>
      {/* Pulse dots along the thread */}
      {[22, 44, 66, 85].map((pct, i) => (
        <motion.div
          key={i}
          className="absolute left-5 lg:left-10 w-2 h-2 rounded-full -translate-x-1/2 hidden md:block"
          style={{ top: `${pct}%` }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.25 + 0.3, duration: 0.5, ease: "backOut" }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{ background: "hsl(43 80% 48%)" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: "hsl(43 80% 48% / 0.3)" }}
            animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
          />
        </motion.div>
      ))}
<div className="max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-28 lg:py-44">

        {/* Header */}
        <div ref={headerRef} className="mb-10 md:mb-24 lg:mb-36 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="font-display text-xs uppercase tracking-[0.28em] font-semibold mb-6"
            style={{ color: "hsl(43 80% 48%)" }}
          >
            What we hear every week
          </motion.p>

          <h2 className="text-[2.4rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight">
            {[
              { text: "We've seen what happens", dark: true },
              { text: "when events go wrong.", dark: false },
            ].map((line, li) => (
              <span key={li} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={isHeaderInView ? { y: "0%" } : {}}
                  transition={{ duration: 0.9, delay: 0.08 + li * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    color: line.dark ? "hsl(var(--foreground))" : "hsl(43 80% 48%)",
                  }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h2>
        </div>

        {/* Bento card grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Row 1: wide + narrow */}
          <PainCard point={painPoints[0]} index={0} wide />
          <PainCard point={painPoints[1]} index={1} />
          {/* Row 2: narrow + wide */}
          <PainCard point={painPoints[2]} index={2} />
          <PainCard point={painPoints[3]} index={3} wide />
          {/* Row 3: full centered */}
          <PainCard point={painPoints[4]} index={4} full />
        </div>

        {/* Bottom callout */}
        <CalloutBox />
      </div>
    </section>
  );
};

const PainCard = ({
  point,
  index,
  wide = false,
  full = false,
}: {
  point: (typeof painPoints)[number];
  index: number;
  wide?: boolean;
  full?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { Icon } = point;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 70, scale: 0.93, rotateX: 6 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.13, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformPerspective: 900 }}
      className={`${wide ? "col-span-2 md:col-span-2" : "col-span-1"} ${full ? "col-span-2 md:col-span-3 flex justify-center" : ""}`}
    >
      <div
        className={`relative flex flex-col justify-between gap-5 md:gap-8 rounded-3xl p-5 md:p-8 lg:p-10 h-full overflow-hidden group ${full ? "w-full md:max-w-lg" : ""}`}
        style={{ background: painPalette[index].bg, border: `1.5px solid ${painPalette[index].border}` }}
      >
        {/* Decorative blobs */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${painPalette[index].deco} 0%, transparent 65%)` }} />
        <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${painPalette[index].deco} 0%, transparent 65%)` }} />

        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 80% 60% at 20% 10%, ${painPalette[index].glow}, transparent 70%)` }}
        />

        {/* Top row: icon + aside tag */}
        <div className="flex items-start justify-between gap-2 md:gap-4">
          <div
            className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-2xl shrink-0"
            style={{ background: `${painPalette[index].bg}`, border: `1px solid ${painPalette[index].border}`, backgroundColor: "hsl(0 0% 100% / 0.65)" }}
          >
            <Icon strokeWidth={1.4} style={{ width: "1.15rem", height: "1.15rem", color: painPalette[index].icon }} />
          </div>

        <span
            className="text-[9px] md:text-[10px] uppercase tracking-[0.18em] md:tracking-[0.22em] font-semibold font-display px-2 md:px-3 py-1 md:py-1.5 rounded-full shrink-0 text-right leading-tight"
            style={{ background: "hsl(0 0% 100% / 0.7)", color: "hsl(var(--foreground) / 0.7)", border: `1px solid ${painPalette[index].border}` }}
          >
            {point.aside}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-display font-black leading-snug relative z-10 text-base sm:text-lg md:text-xl lg:text-2xl"
          style={{
            color: painPalette[index].icon,
          }}
        >
          {point.title}
        </h3>
      </div>
    </motion.div>
  );
};

const CalloutBox = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="mt-20 lg:mt-28 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pt-12 border-t"
      style={{ borderColor: "hsl(43 72% 80%)" }}
    >
      <p
        className="font-display font-bold text-2xl md:text-3xl leading-snug max-w-md"
        style={{ color: "hsl(43 80% 36%)" }}
      >
        None of this has to happen to you.
      </p>

      <a
        href="#what-you-get"
        className="shrink-0 inline-flex items-center gap-3 font-display font-semibold text-sm tracking-wide group transition-all duration-300"
        style={{ color: "hsl(43 80% 48%)" }}
      >
        See how we prevent it
        <span
          className="inline-flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 group-hover:scale-110"
          style={{ background: "hsl(43 80% 48%)", color: "white" }}
        >
          <ArrowRight className="w-4 h-4" />
        </span>
      </a>
    </motion.div>
  );
};

export default PainPointsSection;
