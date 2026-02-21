import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const testimonials = [
  {
    text: "Virtual Producers was amazing. We needed last-minute support for a large webinar including more than 10 high level speakers, translation into 5 languages, and thousands of participants.",
    author: "Jeanette McCullough",
    company: "BirthSwell",
  },
  {
    text: "Their team was incredibly professional and made our hybrid conference seamless. The production quality was outstanding and our attendees loved every moment.",
    author: "Event Director",
    company: "Fortune 500 Client",
  },
  {
    text: "From concept to execution, VM Producers delivered an exceptional virtual summit with thousands of attendees. Their attention to detail is unmatched.",
    author: "Program Manager",
    company: "Tech Industry Leader",
  },
];

const TestimonialSlide = ({
  testimonial,
  index,
  total,
  scrollYProgress,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
  total: number;
  scrollYProgress: any;
}) => {
  // Each testimonial occupies an equal portion of the scroll
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const peak = start + segmentSize * 0.5;
  const end = start + segmentSize;

  // Fade in then fade out (last one stays)
  const opacity = useTransform(
    scrollYProgress,
    index === total - 1
      ? [start, peak]
      : [start, peak, end],
    index === total - 1
      ? [0, 1]
      : [0, 1, 0]
  );

  // Scale: subtle zoom in then slight zoom out
  const scale = useTransform(
    scrollYProgress,
    index === total - 1
      ? [start, peak]
      : [start, peak, end],
    index === total - 1
      ? [0.92, 1]
      : [0.92, 1, 1.05]
  );

  // Slide up gently
  const y = useTransform(
    scrollYProgress,
    index === total - 1
      ? [start, peak]
      : [start, peak, end],
    index === total - 1
      ? [60, 0]
      : [60, 0, -40]
  );

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="absolute inset-0 flex items-center justify-center px-6"
    >
      <div className="text-center max-w-4xl mx-auto">
        {/* Quote mark */}
        <motion.span
          className="block text-primary/15 font-display text-[120px] md:text-[180px] leading-none select-none mb-[-60px] md:mb-[-90px]"
        >
          "
        </motion.span>

        <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-display font-medium text-foreground leading-snug tracking-tight">
          {testimonial.text}
        </p>

        <div className="mt-10 md:mt-14">
          <p className="font-display font-semibold text-foreground text-base md:text-lg">
            {testimonial.author}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {testimonial.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Progress indicator
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${(testimonials.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Header — fades out as you scroll into testimonials */}
        <motion.div
          ref={headerRef}
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.12], [1, 0]),
            scale: useTransform(scrollYProgress, [0, 0.12], [1, 0.95]),
            y: useTransform(scrollYProgress, [0, 0.12], [0, -30]),
          }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-6 font-medium"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground"
          >
            What they say.
          </motion.h2>
        </motion.div>

        {/* Testimonials stack */}
        <div className="absolute inset-0">
          {testimonials.map((t, i) => (
            <TestimonialSlide
              key={i}
              testimonial={t}
              index={i}
              total={testimonials.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-32 md:w-48">
          <div className="h-[2px] bg-border rounded-full overflow-hidden">
            <motion.div
              style={{ width: progressWidth }}
              className="h-full bg-primary/50 rounded-full"
            />
          </div>
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-3">
          {testimonials.map((_, i) => {
            const segmentSize = 1 / testimonials.length;
            const start = i * segmentSize;
            const mid = start + segmentSize * 0.5;
            const dotOpacity = useTransform(
              scrollYProgress,
              [start, mid, start + segmentSize],
              [0.25, 1, 0.25]
            );
            const dotScale = useTransform(
              scrollYProgress,
              [start, mid, start + segmentSize],
              [1, 1.4, 1]
            );
            return (
              <motion.div
                key={i}
                style={{ opacity: dotOpacity, scale: dotScale }}
                className="w-1.5 h-1.5 rounded-full bg-primary"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
