import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
import { MagneticHover, RevealLine } from "@/components/ScrollAnimations";

const items = [
  {
    icon: Trophy,
    title: "100% Success Rate",
    tag: "Guaranteed",
    accent: { border: "hsl(152 55% 38% / 0.22)", icon: "hsl(152 45% 38%)", iconBg: "hsl(152 55% 42% / 0.10)" },
  },
  {
    icon: MessageCircle,
    title: "White-Glove Communication",
    tag: "Dedicated Team",
    accent: { border: "hsl(140 50% 36% / 0.22)", icon: "hsl(140 42% 37%)", iconBg: "hsl(140 50% 40% / 0.10)" },
  },
  {
    icon: MapPin,
    title: "70+ Countries",
    tag: "Worldwide",
    accent: { border: "hsl(163 52% 36% / 0.22)", icon: "hsl(163 44% 37%)", iconBg: "hsl(163 52% 40% / 0.10)" },
  },
  {
    icon: Clock,
    title: "Matched in 48h",
    tag: "Speed",
    accent: { border: "hsl(130 46% 37% / 0.22)", icon: "hsl(130 40% 38%)", iconBg: "hsl(130 46% 42% / 0.10)" },
  },
  {
    icon: Camera,
    title: "Broadcast-Quality",
    tag: "Premium",
    accent: { border: "hsl(168 54% 34% / 0.22)", icon: "hsl(168 46% 34%)", iconBg: "hsl(168 54% 38% / 0.10)" },
  },
  {
    icon: Ticket,
    title: "Up to 100K Attendees",
    tag: "Scalable",
    accent: { border: "hsl(145 48% 36% / 0.22)", icon: "hsl(145 42% 36%)", iconBg: "hsl(145 48% 40% / 0.10)" },
  },
  {
    icon: Heart,
    title: "95% Client Retention",
    tag: "Proven",
    accent: { border: "hsl(158 50% 34% / 0.22)", icon: "hsl(158 44% 34%)", iconBg: "hsl(158 50% 38% / 0.10)" },
  },
];

const ItemCard = ({ item, index }: { item: (typeof items)[number]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = item.icon;
  const a = item.accent;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-1.5 p-2.5 rounded-lg text-center"
      style={{ background: "hsl(220 20% 96%)", border: `1px solid ${a.border}` }}
    >
      <div
        className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
        style={{ background: a.iconBg, border: `1px solid ${a.border}` }}
      >
        <Icon size={11} style={{ color: a.icon }} />
      </div>
      <p className="font-display font-bold text-[10px] leading-tight text-foreground">{item.title}</p>
      <span
        className="text-[9px] font-semibold px-1.5 py-px rounded-full"
        style={{ background: a.iconBg, color: a.icon, border: `1px solid ${a.border}` }}
      >
        {item.tag}
      </span>
    </motion.div>
  );
};

const WhatYouGetSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section className="relative overflow-hidden" style={{ background: "hsl(220 20% 98%)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(152 50% 38% / 0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="max-w-5xl mx-auto px-6 py-12 lg:py-16">
        <div ref={headerRef} className="text-center max-w-xl mx-auto mb-8 space-y-3">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-display text-xs uppercase tracking-[0.3em] font-semibold"
            style={{ color: "hsl(var(--primary))" }}
          >
            What's in it for you
          </motion.p>
          <RevealLine delay={0.1} color="from-transparent via-primary/30 to-transparent" className="max-w-[60px] mx-auto" />
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold leading-tight"
            style={{ color: "hsl(var(--foreground))" }}
          >
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={isHeaderInView ? { y: "0%" } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                Everything working{" "}
                <motion.span
                  initial={{ y: "110%" }}
                  animate={isHeaderInView ? { y: "0%" } : {}}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{ color: "hsl(var(--primary))" }}
                >
                  in your favour.
                </motion.span>
              </motion.span>
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {items.map((item, i) => (
            <ItemCard key={item.title} item={item} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex justify-center mt-8"
        >
          <MagneticHover>
            <a
              href="https://www.vmproducers.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-display font-semibold text-sm transition-all duration-300 hover:scale-105"
              style={{ background: "hsl(var(--primary))", color: "white", boxShadow: "0 0 30px hsl(var(--primary) / 0.25)" }}
            >
              Get started today
              <ArrowRight className="w-4 h-4" />
            </a>
          </MagneticHover>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatYouGetSection;
