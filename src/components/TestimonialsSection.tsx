import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 400 : -400,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -400 : 400,
    opacity: 0,
    scale: 0.95,
  }),
};

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [[current, direction], setCurrent] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);

  const paginate = useCallback((newDirection: number) => {
    setCurrent(([prev]) => {
      let next = prev + newDirection;
      if (next < 0) next = testimonials.length - 1;
      if (next >= testimonials.length) next = 0;
      return [next, newDirection];
    });
  }, []);

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipe = Math.abs(info.velocity.x) * info.offset.x;
    if (swipe < -5000 || info.offset.x < -80) {
      paginate(1);
    } else if (swipe > 5000 || info.offset.x > 80) {
      paginate(-1);
    }
    setIsDragging(false);
  };

  const t = testimonials[current];

  return (
    <section ref={sectionRef} className="py-32 lg:py-44 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
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
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          {/* Arrows - desktop only */}
          <button
            onClick={() => paginate(-1)}
            className="hidden md:flex absolute -left-4 lg:-left-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => paginate(1)}
            className="hidden md:flex absolute -right-4 lg:-right-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slide container */}
          <div className="relative min-h-[320px] md:min-h-[280px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 250, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
                className="w-full cursor-grab active:cursor-grabbing select-none"
              >
                <div className="text-center max-w-3xl mx-auto px-4">
                  {/* Quote */}
                  <p className="text-xl md:text-2xl lg:text-3xl font-display font-medium text-foreground leading-relaxed tracking-tight">
                    "{t.text}"
                  </p>

                  {/* Author */}
                  <div className="mt-10 flex items-center justify-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-display font-semibold text-sm">
                        {t.initials}
                      </span>
                    </div>
                    <div className="text-left">
                      <p className="font-display font-semibold text-foreground text-sm">
                        {t.author}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t.company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2.5 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent([i, i > current ? 1 : -1])}
                className="relative p-1"
                aria-label={`Go to testimonial ${i + 1}`}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    i === current
                      ? "bg-primary scale-125"
                      : "bg-border hover:bg-muted-foreground/30"
                  }`}
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
