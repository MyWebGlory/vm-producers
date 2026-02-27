import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { UserX, WifiOff, MonitorOff, Flame, Archive, Trophy, MessageCircle, MapPin, Clock, Camera, Ticket, Heart, X, Check } from "lucide-react";

const painPoints = [
  { Icon: UserX,       title: "You trusted the wrong person with too much." },
  { Icon: WifiOff,     title: "The tech failed at the worst possible moment." },
  { Icon: MonitorOff,  title: "Online attendees felt like an afterthought." },
  { Icon: Flame,       title: "You scrambled instead of hosted." },
  { Icon: Archive,     title: "Nothing lived on after day one." },
];

const benefits = [
  { Icon: Trophy,        title: "100% Success Rate - Guaranteed." },
  { Icon: MessageCircle, title: "White-Glove Communication." },
  { Icon: MapPin,        title: "Global Reach in 70+ Countries." },
  { Icon: Clock,         title: "Matched Within 48 Hours." },
  { Icon: Camera,        title: "Broadcast-Quality Production." },
  { Icon: Ticket,        title: "Up to 100,000 Attendees." },
  { Icon: Heart,         title: "95% Client Retention Rate." },
];

const ComparisonSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-36 overflow-hidden bg-white">
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(220 15% 85% / 0.55) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[50vw] h-[50vw]" style={{ background: "radial-gradient(circle, hsl(0 65% 60% / 0.05) 0%, transparent 65%)", transform: "translate(-20%, -20%)" }} />
        <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw]" style={{ background: "radial-gradient(circle, hsl(152 55% 45% / 0.06) 0%, transparent 65%)", transform: "translate(20%, 20%)" }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="font-display text-xs uppercase tracking-[0.28em] font-semibold mb-5"
            style={{ color: "hsl(43 80% 48%)" }}
          >
            The difference
          </motion.p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-[1.1]">
            {[
              { text: "Two outcomes.", dark: true },
              { text: "One choice.", gold: true },
            ].map((line, li) => (
              <span key={li} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={isHeaderInView ? { y: "0%" } : {}}
                  transition={{ duration: 0.9, delay: 0.08 + li * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  style={{ color: line.gold ? "hsl(43 80% 48%)" : "hsl(var(--foreground))" }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h2>
        </div>

        {/* Comparison columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* LEFT - Without */}
          <Column
            side="pain"
            label="Without VM Producers"
            icon={<X size={14} className="shrink-0" />}
            headerBg="hsl(0 65% 55% / 0.08)"
            headerBorder="hsl(0 60% 50% / 0.22)"
            headerColor="hsl(0 55% 45%)"
            sectionBg="hsl(0 60% 98%)"
            sectionBorder="hsl(0 55% 88%)"
            items={painPoints}
            palette={{ bg: "hsl(0 65% 55% / 0.05)", border: "hsl(0 55% 50% / 0.16)", icon: "hsl(0 50% 48%)" }}
          />

          {/* RIGHT - With */}
          <Column
            side="benefit"
            label="With VM Producers"
            icon={<Check size={14} className="shrink-0" />}
            headerBg="hsl(152 55% 42% / 0.08)"
            headerBorder="hsl(152 50% 38% / 0.22)"
            headerColor="hsl(152 45% 35%)"
            sectionBg="hsl(152 50% 98%)"
            sectionBorder="hsl(152 45% 85%)"
            items={benefits}
            palette={{ bg: "hsl(152 55% 42% / 0.05)", border: "hsl(152 48% 38% / 0.16)", icon: "hsl(152 42% 34%)" }}
          />
        </div>
      </div>
    </section>
  );
};

type ColumnProps = {
  side: string;
  label: string;
  icon: React.ReactNode;
  headerBg: string;
  headerBorder: string;
  headerColor: string;
  sectionBg: string;
  sectionBorder: string;
  items: { Icon: React.ElementType; title: string }[];
  palette: { bg: string; border: string; icon: string };
};

const Column = ({ label, icon, headerBg, headerBorder, headerColor, sectionBg, sectionBorder, items, palette }: ColumnProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-3xl overflow-hidden"
      style={{ background: sectionBg, border: `1.5px solid ${sectionBorder}` }}
    >
      {/* Column header */}
      <div
        className="flex items-center gap-2.5 px-6 py-4"
        style={{ background: headerBg, borderBottom: `1px solid ${headerBorder}` }}
      >
        <span
          className="flex items-center justify-center w-5 h-5 rounded-full"
          style={{ background: headerColor, color: "white" }}
        >
          {icon}
        </span>
        <span className="font-display font-bold text-sm tracking-wide" style={{ color: headerColor }}>
          {label}
        </span>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-2 p-4">
        {items.map(({ Icon, title }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, x: -12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 rounded-xl px-4 py-3"
            style={{ background: palette.bg, border: `1px solid ${palette.border}` }}
          >
            <Icon size={15} style={{ color: palette.icon }} strokeWidth={1.6} className="shrink-0" />
            <span className="font-display font-bold text-sm text-foreground leading-snug">{title}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ComparisonSection;
