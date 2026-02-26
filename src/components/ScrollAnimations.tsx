import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, useSpring, useVelocity, useMotionValue, useAnimationFrame } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  distance?: number;
  duration?: number;
  once?: boolean;
}

export const ScrollReveal = ({
  children,
  className = "",
  direction = "up",
  delay = 0,
  distance = 60,
  duration = 0.8,
  once = true,
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  const directionMap = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directionMap[direction] }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

export const StaggerChildren = ({
  children,
  className = "",
  stagger = 0.1,
  delay = 0,
}: StaggerChildrenProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const staggerItem = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const Parallax = ({ children, speed = 0.5, className = "" }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
};

// Animated counter component
export const AnimatedCounter = ({
  value,
  suffix = "",
  prefix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <span ref={ref} className={className}>
      {isInView ? (
        <CountUpSpan end={value} prefix={prefix} suffix={suffix} />
      ) : (
        `${prefix}0${suffix}`
      )}
    </span>
  );
};

const CountUpSpan = ({ end, prefix, suffix }: { end: number; prefix: string; suffix: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2200;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(end);
    };

    requestAnimationFrame(step);
  }, [end]);

  return <>{`${prefix}${count.toLocaleString()}${suffix}`}</>;
};

// Magnetic hover effect wrapper
export const MagneticHover = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
    setPosition({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── PREMIUM SCROLL ANIMATIONS ───────────────────────────────────────────────

/**
 * SplitTextReveal — word-by-word masked slide-up reveal
 * Each word is wrapped in an overflow-hidden container;
 * the inner span slides up from below (cinema subtitle style).
 */
export const SplitTextReveal = ({
  text,
  className = "",
  delay = 0,
  duration = 0.65,
  stagger = 0.045,
  once = true,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
  as?: keyof JSX.IntrinsicElements;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px" });
  const words = text.split(" ");

  return (
    // @ts-ignore – dynamic tag
    <Tag ref={ref} className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "115%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : { y: "115%", opacity: 0 }}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

/**
 * RevealLine — a horizontal rule that expands from left on scroll
 */
export const RevealLine = ({
  className = "",
  delay = 0,
  color = "from-transparent via-primary/30 to-transparent",
}: {
  className?: string;
  delay?: number;
  color?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className={`w-full overflow-hidden ${className}`}>
      <motion.div
        className={`h-px bg-gradient-to-r ${color}`}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
};

/**
 * FloatingOrbs — decorative ambient glow orbs that float in the background
 */
export const FloatingOrbs = ({
  className = "",
  count = 4,
}: {
  className?: string;
  count?: number;
}) => {
  const configs = [
    { w: 420, h: 420, left: "10%", top: "5%", dx: 18, dy: -25, dur: 9 },
    { w: 320, h: 320, left: "65%", top: "15%", dx: -20, dy: 22, dur: 11 },
    { w: 260, h: 260, left: "35%", top: "60%", dx: 14, dy: -18, dur: 8 },
    { w: 200, h: 200, left: "80%", top: "55%", dx: -12, dy: 14, dur: 13 },
  ].slice(0, count);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {configs.map((c, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: c.w,
            height: c.h,
            left: c.left,
            top: c.top,
            background: `radial-gradient(circle at 40% 40%, hsl(var(--primary) / 0.07) 0%, hsl(var(--primary) / 0.02) 50%, transparent 70%)`,
          }}
          animate={{
            x: [0, c.dx, 0],
            y: [0, c.dy, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: c.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.8,
          }}
        />
      ))}
    </div>
  );
};

/**
 * ScrollBand — infinite horizontal marquee of short text items
 * Creates the luxury-brand style scrolling text band
 */
export const ScrollBand = ({
  items,
  className = "",
  speed = 28,
  direction = "left",
  separator = "✦",
}: {
  items: string[];
  className?: string;
  speed?: number;
  direction?: "left" | "right";
  separator?: string;
}) => {
  // 4× duplicate so loop is always invisible
  const all = [...items, ...items, ...items, ...items];

  return (
    <div className={`overflow-hidden py-5 ${className}`}>
      <motion.div
        className="flex whitespace-nowrap will-change-transform"
        animate={{ x: direction === "left" ? ["0%", "-25%"] : ["-25%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {all.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 mx-5 text-muted-foreground/35 font-display font-bold text-xs uppercase tracking-[0.25em] select-none"
          >
            {item}
            <span className="text-primary/40 text-xs">{separator}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/**
 * ImageReveal — reveals an image with a solid panel sweeping away
 * Wraps children in a clip masking container
 */
export const ImageReveal = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {children}
      {/* The sweeping panel */}
      <motion.div
        className="absolute inset-0 bg-card z-10 origin-left"
        initial={{ scaleX: 1 }}
        animate={isInView ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ duration: 0.85, delay, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: "right" }}
      />
      {/* Secondary accent panel for a two-tone stripe */}
      <motion.div
        className="absolute inset-0 bg-primary/20 z-20 origin-right"
        initial={{ scaleX: 1 }}
        animate={isInView ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ duration: 0.65, delay: delay + 0.08, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: "right" }}
      />
    </div>
  );
};

/**
 * VelocityScrollBand — speed changes based on scroll velocity (most premium)
 * Wraps a ScrollBand whose speed reacts to the user's scroll speed.
 */
export const VelocityScrollBand = ({
  items,
  className = "",
  baseSpeed = 60,
  separator = "✦",
}: {
  items: string[];
  className?: string;
  baseSpeed?: number;
  separator?: string;
}) => {
  // 4× duplicate so there's always content visible
  const all = [...items, ...items, ...items, ...items];
  const innerRef = useRef<HTMLDivElement>(null);
  const [wrapWidth, setWrapWidth] = useState(1600);

  const x = useMotionValue(0);
  const scrollYMotion = useMotionValue(0);
  const scrollVelocity = useVelocity(scrollYMotion);
  const smoothV = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothV, [-3000, 0, 3000], [0.3, 1, 3.5], { clamp: true });

  // Sync scroll position
  useEffect(() => {
    const update = () => scrollYMotion.set(window.scrollY);
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [scrollYMotion]);

  // Measure the half-width of all items for a seamless wrap point
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      if (el) setWrapWidth(el.scrollWidth / 2);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    const speed = baseSpeed * velocityFactor.get();
    let newX = x.get() - speed * (delta / 1000);
    if (newX < -wrapWidth) newX += wrapWidth;
    x.set(newX);
  });

  return (
    <div className={`overflow-hidden py-5 ${className}`}>
      <motion.div ref={innerRef} style={{ x }} className="flex whitespace-nowrap will-change-transform">
        {all.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 mx-5 text-muted-foreground/35 font-display font-bold text-xs uppercase tracking-[0.25em] select-none"
          >
            {item}
            <span className="text-primary/40 text-xs">{separator}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};
