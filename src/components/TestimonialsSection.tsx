import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const testimonials = [
  {
    text: "Virtual Producers was amazing. We needed last-minute support for a large webinar including more than 10 high level speakers, translation into 5 languages, and thousands of participants.",
    author: "Jeanette McCullough",
    company: "BirthSwell",
    initials: "JM",
  },
  {
    text: "Their team was incredibly professional and made our hybrid conference seamless. The production quality was outstanding and our attendees loved every moment.",
    author: "Sarah Chen",
    company: "Fortune 500 Client",
    initials: "SC",
  },
  {
    text: "From concept to execution, VM Producers delivered an exceptional virtual summit with thousands of attendees. Their attention to detail is unmatched.",
    author: "Marcus Williams",
    company: "Tech Industry Leader",
    initials: "MW",
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
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const fadeIn = start + segmentSize * 0.15;
  const peak = start + segmentSize * 0.5;
  const fadeOut = start + segmentSize * 0.85;
  const end = start + segmentSize;

  const isLast = index === total - 1;

  const opacity = useTransform(
    scrollYProgress,
    isLast ? [start, fadeIn, peak] : [start, fadeIn, peak, fadeOut, end],
    isLast ? [0, 1, 1] : [0, 1, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    isLast ? [start, fadeIn] : [start, fadeIn, fadeOut, end],
    isLast ? [50, 0] : [50, 0, 0, -30]
  );

  // Author card slides in slightly delayed
  const authorOpacity = useTransform(
    scrollYProgress,
    isLast ? [start + segmentSize * 0.2, start + segmentSize * 0.35] : [start + segmentSize * 0.2, start + segmentSize * 0.35, fadeOut, end],
    isLast ? [0, 1] : [0, 1, 1, 0]
  );

  const authorY = useTransform(
    scrollYProgress,
    isLast ? [start + segmentSize * 0.2, start + segmentSize * 0.35] : [start + segmentSize * 0.2, start + segmentSize * 0.35, fadeOut, end],
    isLast ? [25, 0] : [25, 0, 0, -15]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center justify-center px-6 pt-28 md:pt-32"
    >
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display font-medium text-foreground leading-relaxed tracking-tight">
          "{testimonial.text}"
        </p>

        <motion.div
          style={{ opacity: authorOpacity, y: authorY }}
          className="mt-10 md:mt-14 flex items-center justify-center gap-4"
        >
          {/* Avatar with initials */}
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-primary font-display font-semibold text-sm">
              {testimonial.initials}
            </span>
          </div>
          <div className="text-left">
            <p className="font-display font-semibold text-foreground text-base">
              {testimonial.author}
            </p>
            <p className="text-sm text-muted-foreground">
              {testimonial.company}
            </p>
          </div>
        </motion.div>
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

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Title stays visible, just moves up slightly
  const titleY = useTransform(scrollYProgress, [0, 0.15], [0, -10]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${(testimonials.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Header — stays visible the whole time */}
        <motion.div
          ref={headerRef}
          style={{ y: titleY }}
          className="absolute top-[12vh] md:top-[14vh] left-0 right-0 z-20 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-5 font-medium"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground"
          >
            What they say.
          </motion.h2>
        </motion.div>

        {/* Testimonials */}
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

        {/* Bottom indicators */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-5">
          {/* Dots */}
          <div className="flex gap-3">
            {testimonials.map((_, i) => {
              const segmentSize = 1 / testimonials.length;
              const start = i * segmentSize;
              const mid = start + segmentSize * 0.5;
              const dotOpacity = useTransform(
                scrollYProgress,
                [start, mid, start + segmentSize],
                [0.2, 1, 0.2]
              );
              const dotScale = useTransform(
                scrollYProgress,
                [start, mid, start + segmentSize],
                [1, 1.5, 1]
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

          {/* Progress */}
          <div className="w-24 md:w-32">
            <div className="h-[1.5px] bg-border rounded-full overflow-hidden">
              <motion.div
                style={{ width: progressWidth }}
                className="h-full bg-primary/40 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
