import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import founderPhoto from "@/assets/austin-talley-founder.png";
import { useCalendly } from "@/components/CalendlyModal";

const credentials = [
  { value: "2,000+", label: "Events produced" },
  { value: "70+",    label: "Countries" },
  { value: "95%",    label: "Client retention" },
];

const FounderSection = () => {
  const { openCalendly } = useCalendly();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <section ref={ref} className="relative py-24 lg:py-36 overflow-hidden bg-card">
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(220 15% 82% / 0.38) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(216 90% 65% / 0.06) 0%, transparent 65%)" }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-10 lg:gap-16">

          {/* Photo */}
          <motion.div {...fadeUp(0)} className="relative shrink-0">
            <div className="absolute -inset-3 rounded-3xl pointer-events-none" style={{ boxShadow: "0 0 40px hsl(216 90% 58% / 0.18)" }} />
            <div
              className="relative w-36 h-44 sm:w-44 sm:h-56 lg:w-56 lg:h-72 rounded-2xl overflow-hidden"
              style={{ border: "2px solid hsl(216 90% 58% / 0.28)" }}
            >
              <img src={founderPhoto} alt="Austin Talley, Founder & CEO" className="w-full h-full object-cover object-top" />
            </div>
          </motion.div>

          {/* Text */}
          <div className="flex flex-col gap-5 text-center sm:text-left">

            {/* Name + title */}
            <motion.div {...fadeUp(0.1)}>
              <p className="text-[10px] uppercase tracking-[0.35em] font-semibold mb-3" style={{ color: "hsl(216 90% 58% / 0.75)" }}>
                Meet the founder
              </p>
              <p className="font-display font-bold text-2xl lg:text-3xl" style={{ color: "hsl(var(--foreground))" }}>Austin Talley</p>
              <p className="text-sm font-semibold mt-1" style={{ color: "hsl(216 90% 58%)" }}>Founder & CEO, VM Producers</p>
            </motion.div>

            {/* Credential pills */}
            <motion.div {...fadeUp(0.16)} className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {credentials.map(({ value, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: "hsl(216 90% 58% / 0.08)",
                    border: "1px solid hsl(216 90% 58% / 0.20)",
                    color: "hsl(var(--foreground) / 0.70)",
                  }}
                >
                  <span className="font-bold" style={{ color: "hsl(216 90% 58%)" }}>{value}</span>
                  {label}
                </span>
              ))}
            </motion.div>

            {/* Quote */}
            <motion.p {...fadeUp(0.22)} className="text-xl lg:text-2xl font-display font-semibold leading-snug" style={{ color: "hsl(var(--foreground) / 0.85)" }}>
              "Make world-class event production accessible to{" "}
              <em style={{ color: "hsl(216 90% 58%)", fontStyle: "italic" }}>any organization, anywhere.</em>"
            </motion.p>

            {/* Bio */}
            <motion.p {...fadeUp(0.28)} className="text-sm leading-relaxed" style={{ color: "hsl(var(--foreground) / 0.52)" }}>
              Austin personally oversees every client engagement, ensuring the right expertise is in your corner from day one.
              He's been on the ground for 2,000+ productions, from startup launches to global Fortune 500 conferences across 70+ countries.
              Every project benefits from his direct involvement and a network of 500+ vetted event professionals.
            </motion.p>

            {/* Testimonial line */}
            <motion.div
              {...fadeUp(0.34)}
              className="flex items-start gap-3 pt-4"
              style={{ borderTop: "1px solid hsl(216 90% 58% / 0.12)" }}
            >
              <div className="flex gap-0.5 mt-0.5 shrink-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={11} fill="hsl(216 90% 58%)" style={{ color: "hsl(216 90% 58%)" }} />
                ))}
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "hsl(var(--foreground) / 0.50)" }}>
                <span className="italic">"His contributions brought our trainings to a higher level of professionalism. I would highly recommend Austin."</span>
                {" · "}
                <span className="font-semibold not-italic" style={{ color: "hsl(var(--foreground) / 0.70)" }}>Dean Hart, Commex Consulting</span>
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div {...fadeUp(0.40)}>
              <button
                type="button"
                onClick={openCalendly}
                className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full font-display font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                style={{ background: "hsl(216 90% 58%)", color: "white" }}
              >
                Work with Austin's team
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
