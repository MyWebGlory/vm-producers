import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
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
import { MagneticHover } from "@/components/ScrollAnimations";

const items = [
  {
    icon: Trophy,
    title: "100% Success Rate",
    description:
      "Every project we take on crosses the finish line. We deliver flawless execution, every single time, without exception.",
    tag: "Guaranteed",
  },
  {
    icon: MessageCircle,
    title: "White-Glove Communication",
    description:
      "A dedicated producer is with you from kickoff to wrap. Real people, real answers, no ticket queues, no generic responses.",
    tag: "Dedicated Team",
  },
  {
    icon: MapPin,
    title: "Global Reach in 70+ Countries",
    description:
      "Our verified network of event professionals spans six continents. Wherever your event is, we have boots on the ground.",
    tag: "Worldwide",
  },
  {
    icon: Clock,
    title: "Matched Within 48 Hours",
    description:
      "Need a professional fast? Our platform matches you with the right talent in under two business days, with zero compromise on quality.",
    tag: "Speed",
  },
  {
    icon: Camera,
    title: "Broadcast-Quality Production",
    description:
      "From live streams to studio-shot highlight reels, every frame is produced to the highest broadcast standard your brand deserves.",
    tag: "Premium",
  },
  {
    icon: Ticket,
    title: "Up to 100,000 Attendees",
    description:
      "Whether you are running an intimate executive retreat or a global virtual summit, our infrastructure scales with zero compromise on experience.",
    tag: "Scalable",
  },
  {
    icon: Heart,
    title: "95% Client Retention Rate",
    description:
      "Our clients don't just return, they bring friends. That number speaks louder than any marketing claim we could ever make.",
    tag: "Proven",
  },
];

/* Tilt card wrapper */
const TiltCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
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
    rawX.set(((e.clientY - cy) / (rect.height / 2)) * -9);
    rawY.set(((e.clientX - cx) / (rect.width / 2)) * 9);
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

/* Single card */
const ItemCard = ({
  item,
  index,
}: {
  item: (typeof items)[number];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, scale: 0.88, rotateX: 8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <TiltCard>
        <motion.div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          animate={{
            borderColor: hovered
              ? "hsl(var(--primary) / 0.45)"
              : "hsl(0 0% 0% / 0.1)",
          }}
          transition={{ duration: 0.35 }}
          className="relative p-5 md:p-7 lg:p-9 rounded-3xl h-full flex flex-col items-center text-center gap-4 md:gap-5 overflow-hidden"
          style={{
            background: "hsl(142 45% 97%)",
            border: "1.5px solid hsl(142 45% 40% / 0.55)",
          }}
        >
          {/* Hover glow sweep */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 0%, hsl(var(--primary) / 0.12), transparent 70%)",
            }}
          />

          {/* Icon */}
          <motion.div
            animate={{
              scale: hovered ? 1.18 : 1,
              rotate: hovered ? 8 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="relative z-10 w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shrink-0"
            style={{
              background: hovered
                ? "hsl(var(--primary) / 0.22)"
                : "hsl(var(--primary) / 0.1)",
              border: "1px solid hsl(var(--primary) / 0.25)",
              transition: "background 0.35s",
            }}
          >
            <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: "hsl(var(--primary))" }} />
          </motion.div>

          {/* Tag */}
          <motion.span
            className="relative z-10 text-[10px] uppercase tracking-[0.25em] font-semibold font-display px-3 py-1 rounded-full"
            animate={{
              background: hovered
                ? "hsl(var(--primary) / 0.25)"
                : "hsl(var(--primary) / 0.1)",
            }}
            transition={{ duration: 0.3 }}
            style={{
              color: "hsl(var(--primary))",
              border: "1px solid hsl(var(--primary) / 0.2)",
            }}
          >
            {item.tag}
          </motion.span>

          {/* Title masked slide-up */}
          <h3
            className="relative z-10 text-base md:text-xl lg:text-2xl font-display font-bold leading-tight overflow-hidden"
            style={{ color: "hsl(var(--foreground))" }}
          >
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{
                duration: 0.75,
                delay: index * 0.12 + 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {item.title}
            </motion.span>
          </h3>

          {/* Description */}
          <motion.p
            className="relative z-10 text-sm leading-relaxed"
            style={{ color: "hsl(0 0% 0% / 0.55)" }}
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.12 + 0.35 }}
          >
            {item.description}
          </motion.p>

          {/* Bottom accent line on hover */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full"
            animate={{
              width: hovered ? "65%" : "0%",
              opacity: hovered ? 0.9 : 0,
            }}
            style={{ background: "hsl(var(--primary))" }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </TiltCard>
    </motion.div>
  );
};

/* Main section */
const WhatYouGetSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white"
    >
      {/* Background glows */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at 70% 25%, hsl(var(--primary) / 0.07), transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at 30% 75%, hsl(var(--primary) / 0.05), transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 py-28 lg:py-44">

        {/* Header fully centered */}
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

          <h2
            className="text-[2.4rem] leading-[1.1] sm:text-5xl md:text-5xl lg:text-6xl font-display font-bold"
            style={{ color: "hsl(var(--foreground))" }}
          >
            {["What you get", "with Virtual", "Producers."].map((line, li) => (
              <span key={li} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={isHeaderInView ? { y: "0%" } : {}}
                  transition={{ duration: 0.8, delay: 0.1 + li * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  {li === 2
                    ? <span style={{ color: "hsl(var(--primary))" }}>{line}</span>
                    : line}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-base leading-relaxed"
            style={{ color: "hsl(0 0% 0% / 0.55)" }}
          >
            No vague promises. Here is exactly what you get when you partner with
            us, from day one to final delivery.
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
                style={{
                  background: "hsl(var(--primary))",
                  color: "white",
                  boxShadow: "0 0 30px hsl(var(--primary) / 0.3)",
                }}
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
        {/* Last card centered */}
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
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.65 }}
              >
                <p
                  className="text-3xl md:text-4xl font-display font-bold"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-xs uppercase tracking-[0.2em] font-medium"
                  style={{ color: "hsl(0 0% 0% / 0.4)" }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatYouGetSection;
