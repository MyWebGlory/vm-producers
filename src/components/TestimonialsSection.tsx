import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import liveEventsImg from "@/assets/live-events.webp";
import hybridEventsImg from "@/assets/hybrid-summit-stage.webp";
import virtualEventsImg from "@/assets/virtual-events-conference.webp";
import meetingProsImg from "@/assets/meeting-pros.webp";

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

const AUTOPLAY_INTERVAL = 6000;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.92,
    filter: "blur(8px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.92,
    filter: "blur(8px)",
  }),
};

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [[current, direction], setCurrent] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);

  const paginate = useCallback((newDirection: number) => {
    setProgress(0);
    setCurrent(([prev]) => {
      let next = prev + newDirection;
      if (next < 0) next = testimonials.length - 1;
      if (next >= testimonials.length) next = 0;
      return [next, newDirection];
    });
  }, []);

  // Autoplay
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          paginate(1);
          return 0;
        }
        return p + 100 / (AUTOPLAY_INTERVAL / 50);
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isInView, paginate]);

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipe = Math.abs(info.velocity.x) * info.offset.x;
    if (swipe < -5000 || info.offset.x < -80) {
      paginate(1);
    } else if (swipe > 5000 || info.offset.x > 80) {
      paginate(-1);
    }
    setIsDragging(false);
  };

  const goTo = (i: number) => {
    setProgress(0);
    setCurrent(([prev]) => [i, i > prev ? 1 : -1]);
  };

  const t = testimonials[current];

  return (
    <section
      ref={sectionRef}
      className="py-32 lg:py-44 overflow-hidden relative"
    >
      {/* Blurry photo background with white veil */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src={liveEventsImg}
          alt=""
          className="absolute -top-10 -left-10 w-[65%] h-[75%] object-cover blur-[40px] opacity-[0.55]"
        />
        <img
          src={hybridEventsImg}
          alt=""
          className="absolute -bottom-10 -right-10 w-[65%] h-[75%] object-cover blur-[40px] opacity-[0.5]"
        />
        <img
          src={virtualEventsImg}
          alt=""
          className="absolute top-1/4 right-1/5 w-[50%] h-[60%] object-cover blur-[50px] opacity-[0.4]"
        />
        <img
          src={meetingProsImg}
          alt=""
          className="absolute bottom-1/4 left-1/5 w-[50%] h-[60%] object-cover blur-[50px] opacity-[0.35]"
        />
        {/* White veil overlay */}
        <div className="absolute inset-0 bg-background/40" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-20 lg:mb-28"
        >
          <p className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-5 font-medium">
            Testimonials
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground">
            What they say.
          </h2>
        </motion.div>

        {/* Carousel area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          {/* Navigation arrows */}
          <button
            onClick={() => paginate(-1)}
            className="hidden md:flex absolute -left-4 lg:-left-14 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full items-center justify-center border border-border/60 bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => paginate(1)}
            className="hidden md:flex absolute -right-4 lg:-right-14 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full items-center justify-center border border-border/60 bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight size={22} />
          </button>

          {/* Card container */}
          <div className="relative min-h-[400px] md:min-h-[360px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 200, damping: 28 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 },
                  filter: { duration: 0.4 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
                className="w-full cursor-grab active:cursor-grabbing select-none"
              >
                <div className="max-w-4xl mx-auto">
                  {/* Glass card */}
                  <div className="relative p-10 md:p-14 lg:p-16 rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-[0_8px_60px_hsl(var(--primary)/0.06),0_2px_20px_hsl(220_25%_10%/0.05)]">
                    {/* Large decorative quote */}
                    <div className="absolute -top-5 left-8 md:left-12">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-lg shadow-primary/5">
                        <Quote
                          size={22}
                          className="text-primary"
                          style={{ transform: "scaleX(-1)" }}
                        />
                      </div>
                    </div>

                    {/* Quote text */}
                    <p className="text-xl md:text-2xl lg:text-[1.75rem] font-display font-medium text-foreground leading-[1.5] tracking-[-0.01em] mt-2">
                      "{t.text}"
                    </p>

                    {/* Divider */}
                    <div className="mt-10 mb-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                    {/* Author row */}
                    <div className="flex items-center gap-5">
                      <motion.div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border border-primary/20"
                        style={{
                          background:
                            "linear-gradient(135deg, hsl(var(--primary) / 0.12), hsl(var(--primary) / 0.04))",
                        }}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay: 0.3,
                          type: "spring",
                          stiffness: 300,
                        }}
                      >
                        <span className="text-primary font-display font-bold text-base">
                          {t.initials}
                        </span>
                      </motion.div>
                      <div>
                        <motion.p
                          className="font-display font-bold text-foreground text-base"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.35 }}
                        >
                          {t.author}
                        </motion.p>
                        <motion.p
                          className="text-sm text-muted-foreground mt-0.5"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          {t.company}
                        </motion.p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-3 mt-14">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="relative h-1.5 rounded-full overflow-hidden transition-all duration-500"
                style={{ width: i === current ? 48 : 12 }}
                aria-label={`Go to testimonial ${i + 1}`}
              >
                <div className="absolute inset-0 bg-border rounded-full" />
                {i === current && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary"
                    style={{
                      transformOrigin: "left",
                      scaleX: progress / 100,
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
