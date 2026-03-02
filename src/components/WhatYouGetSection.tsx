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
    description: "Your event crosses the finish line - flawlessly executed, every single time, no exceptions.",
    tag: "Guaranteed",
    accent: { border: "hsl(152 55% 38% / 0.22)", icon: "hsl(152 45% 38%)", iconBg: "hsl(152 55% 42% / 0.10)" },
  },
  {
    icon: MessageCircle,
    title: "White-Glove Communication",
    description: "Your dedicated producer is with you from kickoff to wrap. Real people, real answers - no ticket queues, no generic replies.",
    tag: "Dedicated Team",
    accent: { border: "hsl(140 50% 36% / 0.22)", icon: "hsl(140 42% 37%)", iconBg: "hsl(140 50% 40% / 0.10)" },
  },
  {
    icon: MapPin,
    title: "Global Reach - 70+ Countries",
    description: "Wherever your event is, you have a verified professional on the ground - across every continent, ready to go.",
    tag: "Worldwide",
    accent: { border: "hsl(163 52% 36% / 0.22)", icon: "hsl(163 44% 37%)", iconBg: "hsl(163 52% 40% / 0.10)" },
  },
  {
    icon: Clock,
    title: "Matched Within 48 Hours",
    description: "Need a producer fast? You're matched with the right talent in under two business days - zero compromise on quality.",
    tag: "Speed",
    accent: { border: "hsl(130 46% 37% / 0.22)", icon: "hsl(130 40% 38%)", iconBg: "hsl(130 46% 42% / 0.10)" },
  },
  {
    icon: Camera,
    title: "Broadcast-Quality Production",
    description: "From live streams to studio highlight reels, every frame meets the broadcast standard your brand deserves.",
    tag: "Premium",
    accent: { border: "hsl(168 54% 34% / 0.22)", icon: "hsl(168 46% 34%)", iconBg: "hsl(168 54% 38% / 0.10)" },
  },
  {
    icon: Ticket,
    title: "Up to 100,000 Attendees",
    description: "Running an intimate retreat or a 100K-attendee summit? Your event scales seamlessly - zero compromise, zero stress.",
    tag: "Scalable",
    accent: { border: "hsl(145 48% 36% / 0.22)", icon: "hsl(145 42% 36%)", iconBg: "hsl(145 48% 40% / 0.10)" },
  },
  {
    icon: Heart,
    title: "95% Client Retention Rate",
    description: "You don't just come back - you bring your team. That number says more than any marketing claim ever could.",
    tag: "Proven",
    accent: { border: "hsl(158 50% 34% / 0.22)", icon: "hsl(158 44% 34%)", iconBg: "hsl(158 50% 38% / 0.10)" },
  },
];

const ItemCard = ({ item, index }: { item: (typeof items)[number]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = item.icon;
  const a = item.accent;
  const isLastInColumn = index === items.length - 1 || index === items.length - 2;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-start gap-4 py-5 ${isLastInColumn ? "" : "border-b"}`}
      style={{ borderColor: "hsl(152 50% 38% / 0.12)" }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
        style={{ background: a.iconBg, border: `1px solid ${a.border}` }}
      >
        <Icon size={18} style={{ color: a.icon }} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-display font-bold text-sm leading-snug text-foreground">{item.title}</p>
        <p className="text-xs leading-relaxed" style={{ color: "hsl(var(--foreground) / 0.55)" }}>{item.description}</p>
      </div>
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
      <div className="max-w-5xl mx-auto px-6 py-20 lg:py-28">
        <div ref={headerRef} className="text-center max-w-xl mx-auto mb-12 space-y-4">
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
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight"
            style={{ color: "hsl(var(--foreground))" }}
          >
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={isHeaderInView ? { y: "0%" } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                Everything working
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={isHeaderInView ? { y: "0%" } : {}}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ color: "hsl(var(--primary))" }}
              >
                in your favour.
              </motion.span>
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-sm leading-relaxed text-muted-foreground"
          >
            No vague promises. From the first call to the final applause - this is what you'll have on your side.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-0">
          {items.map((item, i) => (
            <ItemCard key={item.title} item={item} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex justify-center mt-10"
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
