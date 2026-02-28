import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Shield, Globe, Users } from "lucide-react";
import { SplitTextReveal } from "@/components/ScrollAnimations";

const stats = [
  {
    icon: TrendingUp,
    value: "2,000+",
    label: "Events Delivered",
    sub: "Across 70+ countries worldwide",
  },
  {
    icon: Shield,
    value: "100%",
    label: "Success Rate",
    sub: "Zero failed events. Ever.",
  },
  {
    icon: Users,
    value: "95%",
    label: "Client Retention",
    sub: "They keep coming back",
  },
  {
    icon: Globe,
    value: "350K+",
    label: "Global Attendees",
    sub: "Live, virtual and hybrid",
  },
];

const statPalette = [
  { bg: "hsl(43 90% 52% / 0.10)",  border: "hsl(43 80% 48% / 0.30)",  icon: "hsl(43 75% 45%)",  iconBg: "hsl(43 80% 52% / 0.16)",  iconBorder: "hsl(43 80% 52% / 0.34)",  deco: "hsl(43 80% 60% / 0.13)" },
  { bg: "hsl(205 80% 72% / 0.09)", border: "hsl(205 70% 68% / 0.24)", icon: "hsl(205 60% 52%)", iconBg: "hsl(205 70% 72% / 0.14)", iconBorder: "hsl(205 70% 72% / 0.26)", deco: "hsl(205 68% 76% / 0.11)" },
  { bg: "hsl(32 85% 58% / 0.09)",  border: "hsl(32 78% 54% / 0.26)",  icon: "hsl(32 68% 44%)",  iconBg: "hsl(32 78% 58% / 0.15)",  iconBorder: "hsl(32 78% 58% / 0.30)",  deco: "hsl(32 80% 62% / 0.12)" },
  { bg: "hsl(340 70% 68% / 0.08)", border: "hsl(340 60% 64% / 0.22)", icon: "hsl(340 52% 54%)", iconBg: "hsl(340 62% 68% / 0.14)", iconBorder: "hsl(340 62% 68% / 0.26)", deco: "hsl(340 62% 72% / 0.11)" },
];

const ResultsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-28 lg:py-40"
    >
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(43 80% 48%) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, hsl(43 80% 48%) 0%, transparent 70%)" }}
        />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(hsl(43 80% 30%) 1px, transparent 1px), linear-gradient(90deg, hsl(43 80% 30%) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="relative overflow-hidden text-center mb-20 lg:mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          {/* Watermark icon */}
          <TrendingUp
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
            style={{ width: 300, height: 300, opacity: 0.04, color: "hsl(43 80% 48%)" }}
          />
          {/* Section icon badge */}
          <div className="relative flex justify-center mb-4">
            <span
              className="flex items-center justify-center w-14 h-14 rounded-2xl"
              style={{ background: "hsl(43 80% 48% / 0.10)", border: "1.5px solid hsl(43 80% 48% / 0.24)" }}
            >
              <TrendingUp size={26} style={{ color: "hsl(43 80% 48%)" }} />
            </span>
          </div>
          <p
            className="font-display text-sm uppercase tracking-[0.3em] mb-4 font-medium"
            style={{ color: "hsl(43 80% 55%)" }}
          >
            Enterprise Track Record
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight text-center">
            <SplitTextReveal text="Results our clients" delay={0.1} className="justify-center" />
            <br />
            <SplitTextReveal text="can count on." delay={0.3} className="justify-center" />
          </h2>
          {/* Title divider */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, hsl(43 80% 48% / 0.45))" }} />
            <span className="flex items-center justify-center w-8 h-8 rounded-xl" style={{ background: "hsl(43 80% 48% / 0.10)", border: "1px solid hsl(43 80% 48% / 0.28)" }}>
              <TrendingUp size={14} style={{ color: "hsl(43 80% 48%)" }} />
            </span>
            <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, hsl(43 80% 48% / 0.45))" }} />
          </div>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-24 lg:mb-32">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-2xl p-6 lg:p-8 text-center group hover:shadow-lg transition-all duration-300 overflow-hidden"
                style={{ background: statPalette[i].bg, border: `1.5px solid ${statPalette[i].border}` }}
              >
                {/* Decorative blobs */}
                <div
                  className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl pointer-events-none"
                  style={{ background: statPalette[i].deco }}
                />
                <div
                  className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full blur-xl pointer-events-none"
                  style={{ background: statPalette[i].deco }}
                />
                <div
                  className="relative w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: statPalette[i].iconBg, border: `1px solid ${statPalette[i].iconBorder}` }}
                >
                  <Icon size={18} style={{ color: statPalette[i].icon }} />
                </div>
                <p
                  className="relative text-3xl lg:text-5xl font-display font-bold mb-2 leading-none"
                  style={{ color: statPalette[i].icon }}
                >
                  {stat.value}
                </p>
                <p className="relative text-foreground font-semibold text-base mb-1.5">{stat.label}</p>
                <p className="relative text-muted-foreground text-xs leading-relaxed">{stat.sub}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Featured case study callout */}
        <motion.div
          className="mt-20 lg:mt-24 rounded-2xl border border-border/70 p-8 md:p-10 lg:p-12 bg-card"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-1">
              <p
                className="font-display text-xs uppercase tracking-[0.25em] font-medium mb-3"
                style={{ color: "hsl(43 80% 55%)" }}
              >
                Featured Result
              </p>
              <p className="text-foreground text-xl md:text-2xl font-display font-bold leading-snug mb-2">
                "10 speakers. 5 languages. Thousands of attendees. Zero issues."
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Last-minute large-scale webinar with multi-language translation, complex speaker logistics and global broadcast - delivered flawlessly under pressure.
              </p>
            </div>
            <div className="flex-shrink-0 flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-3">
              <div className="text-center md:text-right">
                <p className="text-2xl font-bold font-display" style={{ color: "hsl(43 90% 58%)" }}>5 / 5</p>
                <p className="text-muted-foreground text-xs mt-0.5">Client rating</p>
              </div>
              <div className="w-px md:w-auto md:h-px bg-border self-stretch md:self-auto" />
              <div className="text-center md:text-right">
                <p className="text-2xl font-bold font-display text-foreground">BirthSwell</p>
                <p className="text-muted-foreground text-xs mt-0.5">Non-profit organization</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsSection;
