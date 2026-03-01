import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Mail, Phone, Linkedin, ArrowRight, Star } from "lucide-react";
import founderPhoto from "@/assets/austin-talley-founder.png";

const stats = [
  { value: "2,000+", label: "Events produced" },
  { value: "95%",    label: "Client retention" },
  { value: "70+",    label: "Countries served" },
  { value: "48h",    label: "Match guaranteed" },
];

const FounderSection = () => {
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
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(216 90% 65% / 0.06) 0%, transparent 65%)" }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10 flex flex-col gap-16 lg:gap-20">

        {/* ① Eyebrow + headline */}
        <motion.div {...fadeUp(0)} className="text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] font-semibold mb-3" style={{ color: "hsl(216 90% 58% / 0.75)" }}>
            Meet the founder
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight leading-tight" style={{ color: "hsl(var(--foreground))" }}>
            Meet <span style={{ color: "hsl(216 90% 58%)" }}>Austin.</span>
          </h2>
        </motion.div>

        {/* ② Photo + identity centered, bio below */}
        <div className="flex flex-col items-center gap-10">

          {/* Photo + name/contact side by side, centered */}
          <motion.div {...fadeUp(0.1)} className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 lg:gap-10 w-fit mx-auto">
            {/* Photo */}
            <div className="relative shrink-0">
              <div className="absolute -inset-3 rounded-3xl blur-2xl pointer-events-none" style={{ background: "hsl(216 90% 58% / 0.12)" }} />
                <div className="relative w-52 h-64 sm:w-44 sm:h-56 lg:w-64 lg:h-80 rounded-2xl overflow-hidden" style={{ border: "2px solid hsl(216 90% 58% / 0.28)" }}>
                <img src={founderPhoto} alt="Austin Talley, Founder and CEO, VM Producers" className="w-full h-full object-cover object-top" />
              </div>
            </div>
            {/* Name + contact to the right */}
            <div className="flex flex-col gap-4 pt-1 items-center sm:items-start text-center sm:text-left">
              <div>
                <p className="font-display font-bold text-xl sm:text-2xl" style={{ color: "hsl(var(--foreground))" }}>Austin Talley</p>
                <p className="text-sm font-semibold mt-0.5" style={{ color: "hsl(216 90% 58%)" }}>Founder & CEO</p>
                <p className="text-xs mt-0.5" style={{ color: "hsl(216 90% 58% / 0.70)" }}>VM Producers</p>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-2" style={{ color: "hsl(var(--foreground) / 0.40)" }}>
                  <MapPin size={11} />
                  <span className="text-xs">New York, NY</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-center sm:items-start">
                {[
                  { icon: Mail, href: "mailto:austin@vproducers.com", label: "austin@vproducers.com" },
                  { icon: Phone, href: "tel:+14043371539", label: "404.337.1539" },
                  { icon: Linkedin, href: "https://www.linkedin.com/company/virtual-producers", label: "LinkedIn", external: true },
                ].map(({ icon: Icon, href, label, external }) => (
                  <a key={href} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105 w-fit"
                    style={{ background: "hsl(216 90% 58% / 0.08)", border: "1px solid hsl(216 90% 58% / 0.20)", color: "hsl(var(--foreground) / 0.65)" }}>
                    <Icon size={12} style={{ color: "hsl(216 90% 58%)" }} />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bio centered below */}
          <div className="flex flex-col gap-4 text-center max-w-2xl">
            <motion.p {...fadeUp(0.18)} className="text-xl sm:text-2xl font-display font-semibold leading-snug" style={{ color: "hsl(var(--foreground) / 0.88)" }}>
              "Make world-class event production accessible to{" "}
              <em style={{ color: "hsl(216 90% 58%)", fontStyle: "italic" }}>any organization, anywhere.</em>"
            </motion.p>
            <motion.p {...fadeUp(0.26)} className="text-base leading-relaxed" style={{ color: "hsl(var(--foreground) / 0.55)" }}>
              Austin personally oversees every client engagement, ensuring the right expertise is in your corner from day one. He's been on the ground for 2,000+ productions across 70+ countries, from startup launches to global Fortune 500 conferences.
            </motion.p>
          </div>

        </div>

        {/* ③ Stats strip */}
        <motion.div {...fadeUp(0.22)} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map(({ value, label }, i) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.28 + i * 0.08, duration: 0.55 }}
              className="flex flex-col items-center gap-2 py-7 px-4 rounded-2xl"
              style={{ background: "hsl(var(--background))", border: "1px solid hsl(216 90% 58% / 0.18)" }}>
              <span className="text-3xl lg:text-4xl font-display font-bold" style={{ color: "hsl(216 90% 58%)" }}>{value}</span>
              <span className="text-[9px] uppercase tracking-widest font-medium text-center" style={{ color: "hsl(var(--foreground) / 0.40)" }}>{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ④ Testimonial + CTA */}
        <div className="grid sm:grid-cols-2 gap-6 items-stretch">
          {/* Testimonial */}
          <motion.div {...fadeUp(0.35)}
            className="flex flex-col justify-between rounded-2xl p-7 gap-5"
            style={{ background: "hsl(var(--background))", border: "1px solid hsl(216 90% 58% / 0.18)" }}>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} fill="hsl(216 90% 58%)" style={{ color: "hsl(216 90% 58%)" }} />
              ))}
            </div>
            <p className="text-sm leading-relaxed flex-1" style={{ color: "hsl(var(--foreground) / 0.68)" }}>
              "Virtual Producers were simply outstanding. His contributions brought our trainings to a higher level of professionalism.{" "}
              <strong className="font-semibold" style={{ color: "hsl(var(--foreground) / 0.90)" }}>
                I would highly recommend Austin.
              </strong>"
            </p>
            <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid hsl(216 90% 58% / 0.12)" }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                style={{ background: "hsl(216 90% 58% / 0.14)", color: "hsl(216 90% 58%)" }}>D</div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "hsl(var(--foreground) / 0.85)" }}>Dean Hart</p>
                <p className="text-xs" style={{ color: "hsl(var(--foreground) / 0.42)" }}>Commex Consulting</p>
              </div>
            </div>
          </motion.div>

          {/* CTA card */}
          <motion.div {...fadeUp(0.42)}
            className="flex flex-col justify-center items-center gap-5 rounded-2xl p-7 text-center"
            style={{ background: "linear-gradient(135deg, hsl(216 90% 58% / 0.10) 0%, hsl(216 90% 58% / 0.04) 100%)", border: "1px solid hsl(216 90% 58% / 0.22)" }}>
            <p className="text-lg font-display font-semibold" style={{ color: "hsl(var(--foreground) / 0.88)" }}>
              Ready to work with Austin's team?
            </p>
            <p className="text-sm" style={{ color: "hsl(var(--foreground) / 0.50)" }}>
              You'll be matched with your dedicated producer within 48 hours.
            </p>
            <a href="https://www.vmproducers.com/contact" target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-display font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ background: "hsl(216 90% 58%)", color: "white" }}>
              Get in touch
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default FounderSection;
