import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LucideIcon, Mic, Monitor, Globe, Video, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ALL_SERVICES: { icon: LucideIcon; title: string; subtitle: string; href: string; accent: string }[] = [
  { icon: Mic,     title: "Live Events",       subtitle: "50 to 50K attendees",   href: "/live-events",      accent: "216 85% 42%" },
  { icon: Monitor, title: "Virtual Events",    subtitle: "Up to 100K attendees",  href: "/virtual-events",   accent: "216 85% 42%" },
  { icon: Globe,   title: "Hybrid Events",     subtitle: "In-person + virtual",   href: "/hybrid-events",    accent: "216 85% 42%" },
  { icon: Video,   title: "Video Production",  subtitle: "Teasers & brand films", href: "/video-production", accent: "216 85% 42%" },
  { icon: Users,   title: "Meeting Pros",      subtitle: "70+ countries",         href: "/meeting-pros",     accent: "216 85% 42%" },
];

interface ExploreServicesSectionProps {
  /** Pass the current page path to exclude it from the list. Omit on homepage to show all 5. */
  currentPath?: string;
}

const ExploreServicesSection = ({ currentPath = "" }: ExploreServicesSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const services = currentPath
    ? ALL_SERVICES.filter((s) => s.href !== currentPath)
    : ALL_SERVICES;

  const gridCols = services.length === 5
    ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
    : "grid-cols-2 md:grid-cols-4";

  return (
    <section ref={ref} className="relative py-16 md:py-20 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, hsl(var(--primary) / 0.04) 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] max-w-3xl h-px"
        style={{ background: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.2), transparent)" }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-8 lg:mb-10 text-center"
        >
          <p className="font-display text-[10px] uppercase tracking-[0.3em] font-semibold mb-1" style={{ color: "hsl(var(--primary) / 0.70)" }}>
            Keep exploring
          </p>
          <h2 className="text-xl sm:text-2xl font-display font-bold tracking-tight" style={{ color: "hsl(var(--foreground))" }}>
            Other services you might need
          </h2>
        </motion.div>

        <div className={`grid ${gridCols} gap-3 md:gap-4`}>
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.href}
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={s.href}
                  className="group flex flex-col gap-3 rounded-2xl p-4 border h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                  style={{ background: `hsl(${s.accent} / 0.04)`, borderColor: `hsl(${s.accent} / 0.18)` }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = `hsl(${s.accent} / 0.09)`;
                    (e.currentTarget as HTMLElement).style.borderColor = `hsl(${s.accent} / 0.35)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = `hsl(${s.accent} / 0.04)`;
                    (e.currentTarget as HTMLElement).style.borderColor = `hsl(${s.accent} / 0.18)`;
                  }}
                >
                  <span
                    className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                    style={{ background: `hsl(${s.accent} / 0.12)`, border: `1.5px solid hsl(${s.accent} / 0.25)` }}
                  >
                    <Icon size={17} style={{ color: `hsl(${s.accent})` }} />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <p className="font-display font-bold text-sm" style={{ color: "hsl(var(--foreground))" }}>{s.title}</p>
                      <ArrowRight size={12} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" style={{ color: `hsl(${s.accent})` }} />
                    </div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: `hsl(${s.accent} / 0.75)` }}>{s.subtitle}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] max-w-3xl h-px"
        style={{ background: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.15), transparent)" }}
      />
    </section>
  );
};

export default ExploreServicesSection;
