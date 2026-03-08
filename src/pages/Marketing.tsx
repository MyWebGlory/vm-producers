import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import {
  Megaphone,
  Target,
  Users,
  BarChart3,
  Zap,
  ArrowRight,
  Crosshair,
  TrendingUp,
  Mail,
  Globe,
  Award,
  CheckCircle2,
  XCircle,
  Calendar,
  Layers,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ServiceCardsNav from "@/components/ServiceCardsNav";
import { SEO, buildWebPageSchema, buildBreadcrumbSchema, buildServiceSchema, TODAY } from "@/components/SEO";
import { AnimatedCounter, RevealLine, SplitTextReveal, MagneticHover } from "@/components/ScrollAnimations";
import { ConstellationBG } from "@/components/ConstellationBG";
import { useCalendly } from "@/components/CalendlyModal";
import heroBg from "@/assets/hero-bg.webp";
import mwgFull from "@/assets/logos/mywebglory-full.png";
import mwgIcon from "@/assets/logos/mywebglory-icon.png";
import conferencesImg from "@/assets/Conferences-_-Summits_1.webp";
import attractImg from "@/assets/attract-build-hype.webp";
import extendReachImg from "@/assets/extend-your-reach.webp";
import captureImg from "@/assets/capture-every-moment.webp";
import aboutEventImg from "@/assets/about-event.webp";
import executiveSummitsImg from "@/assets/executive-summits.webp";

const PARTNER_URL = "https://mywebglory.com";
// MyWebGlory brand purple — used discretely on marketing-specific elements
const MWG_PURPLE = "#8a21cc";

const seo = {
  title: "Event Marketing Services | Fill Every Seat | VM Producers",
  description:
    "Go beyond production. VM Producers and our marketing partner deliver end-to-end event marketing: targeted acquisition, high-converting funnels, reminder systems, and post-event leverage. Fill every seat with the right people.",
  canonical: "/marketing",
  dateModified: TODAY,
  jsonLd: {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageSchema({
        path: "/marketing",
        name: "Event Marketing Services | Fill Every Seat | VM Producers",
        description:
          "Go beyond production. VM Producers and our marketing partner deliver end-to-end event marketing: targeted acquisition, high-converting funnels, and post-event leverage.",
      }),
      buildServiceSchema({
        path: "/marketing",
        serviceType: "Event Marketing",
        name: "Event Marketing",
        description:
          "Full-scope event marketing services including audience targeting, funnel design, paid & organic acquisition, reminder systems, and post-event content leverage.",
        offerNames: [
          "ICP-Targeted Acquisition",
          "High-Converting Funnels",
          "Multi-Channel Campaigns",
          "Post-Event Leverage",
        ],
      }),
      buildBreadcrumbSchema("/marketing", "Event Marketing"),
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Dual CTA Component                                                 */
/* ------------------------------------------------------------------ */
function DualCTA({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const { openCalendly } = useCalendly();
  const isDark = variant === "dark";

  return (
    <div className={`flex flex-col sm:flex-row items-center gap-4 ${className}`}>
      <MagneticHover>
        <button
          type="button"
          onClick={openCalendly}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-display font-semibold text-sm transition-all duration-300 hover:scale-105 cursor-pointer"
          style={{
            background: isDark ? "white" : "hsl(var(--primary))",
            color: isDark ? "hsl(220 25% 10%)" : "white",
          }}
        >
          <Calendar size={16} />
          Book a Free Strategy Call
        </button>
      </MagneticHover>
      <a
        href={PARTNER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-display font-semibold text-sm transition-all duration-300 hover:scale-105 border"
        style={{
          borderColor: isDark
            ? "rgba(138, 33, 204, 0.45)"
            : "rgba(138, 33, 204, 0.25)",
          color: isDark ? "white" : "hsl(var(--foreground))",
          background: isDark
            ? "rgba(138, 33, 204, 0.12)"
            : "rgba(138, 33, 204, 0.05)",
        }}
      >
        <img src={mwgIcon} alt="Our Partner MyWebGlory" width={18} height={18} className="rounded" />
        Visit Our Marketing Partner
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pain Point Card                                                    */
/* ------------------------------------------------------------------ */
function PainCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: typeof XCircle;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="flex flex-col gap-3 p-6 rounded-2xl border"
      style={{
        background: "hsl(0 84% 60% / 0.04)",
        borderColor: "hsl(0 84% 60% / 0.12)",
      }}
    >
      <Icon size={22} style={{ color: "hsl(0 84% 60% / 0.7)" }} />
      <h3 className="text-base font-display font-bold text-foreground">
        {title}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: "hsl(var(--foreground) / 0.55)" }}
      >
        {description}
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Solution Row                                                       */
/* ------------------------------------------------------------------ */
function SolutionRow({
  icon: Icon,
  title,
  description,
  image,
  index,
}: {
  icon: typeof Target;
  title: string;
  description: string;
  image: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const imageRight = index % 2 === 1;

  const imageCol = (
    <motion.div
      className="relative rounded-2xl overflow-hidden w-full h-40 sm:h-32 md:h-40 lg:h-52"
      initial={{ opacity: 0, x: imageRight ? 48 : -48 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <img
        src={image}
        alt={title}
        width={600}
        height={400}
        loading="lazy"
        className="w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--primary) / 0.10) 0%, transparent 60%)",
        }}
      />
    </motion.div>
  );

  const textCol = (
    <motion.div
      className="flex flex-col justify-center gap-4 sm:gap-5"
      initial={{ opacity: 0, x: imageRight ? -48 : 48 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <span
        className="hidden sm:flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl shrink-0"
        style={{
          background: "hsl(var(--primary) / 0.10)",
          border: "1.5px solid hsl(var(--primary) / 0.25)",
        }}
      >
        <Icon size={19} style={{ color: "hsl(var(--primary))" }} />
      </span>
      <h3 className="text-2xl sm:text-2xl md:text-3xl font-display font-bold leading-tight text-foreground text-center sm:text-left">
        {title}
      </h3>
      <p
        className="text-sm sm:text-base leading-relaxed text-center sm:text-left"
        style={{ color: "hsl(var(--foreground) / 0.60)" }}
      >
        {description}
      </p>
    </motion.div>
  );

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10 md:gap-16 lg:gap-20 items-center"
    >
      {/* Mobile */}
      <div className="sm:hidden flex flex-col items-center gap-4 pt-2">
        <span
          className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0"
          style={{
            background: "hsl(var(--primary) / 0.10)",
            border: "1.5px solid hsl(var(--primary) / 0.25)",
          }}
        >
          <Icon size={19} style={{ color: "hsl(var(--primary))" }} />
        </span>
        <h3 className="text-2xl font-display font-bold leading-tight text-foreground text-center mb-3">
          {title}
        </h3>
        <motion.div
          className="relative rounded-2xl overflow-hidden w-full h-36"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={image}
            alt={title}
            width={600}
            height={400}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--primary) / 0.10) 0%, transparent 60%)",
            }}
          />
        </motion.div>
        <p
          className="text-sm leading-relaxed text-left w-full"
          style={{ color: "hsl(var(--foreground) / 0.60)" }}
        >
          {description}
        </p>
      </div>
      {/* Desktop */}
      <div className="hidden sm:contents">
        {imageRight ? (
          <>
            {textCol}
            {imageCol}
          </>
        ) : (
          <>
            {imageCol}
            {textCol}
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Process Step                                                        */
/* ------------------------------------------------------------------ */
interface ProcessStep {
  num: string;
  title: string;
  description: string;
  partner?: boolean;
}

const processSteps: ProcessStep[] = [
  {
    num: "01",
    title: "Tell Us What You're Building",
    description:
      "One focused call. You share your event vision, audience, and goals. We loop in our marketing partner and map the full strategy, production and promotion, designed together from day one.",
  },
  {
    num: "02",
    title: "We Design the Entire System",
    description:
      "While we engineer your production, our marketing team builds your acquisition machine: ads, funnels, landing pages, email sequences, and automations, all custom-built around your event and ICP.",
    partner: true,
  },
  {
    num: "03",
    title: "Launch, Optimize, Fill the Room",
    description:
      "Campaigns go live across paid and organic channels. We monitor and optimize daily while you stay focused on delivering value. Sniper-precise targeting finds the decision-makers who can actually buy from you.",
    partner: true,
  },
  {
    num: "04",
    title: "Deliver a Flawless Event, Then Leverage It",
    description:
      "Walk into a packed room with qualified, warm attendees. We produce the event; our partner activates post-event flows, turning one event into weeks of pipeline, content, and momentum.",
    partner: true,
  },
];

/* ------------------------------------------------------------------ */
/*  Main Page                                                           */
/* ------------------------------------------------------------------ */
const Marketing = () => {
  const { openCalendly } = useCalendly();
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.55], [0, -50]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        jsonLd={seo.jsonLd}
        dateModified={seo.dateModified}
      />
      <Navbar />
      <main id="main-content">
        {/* ============================================================ */}
        {/*  HERO                                                         */}
        {/* ============================================================ */}
        <section
          ref={heroRef}
          aria-label="Event Marketing hero"
          className="relative h-screen min-h-[600px] overflow-hidden"
        >
          <motion.div className="absolute inset-0" style={{ y: bgY }}>
            <img
              src={heroBg}
              alt="Event marketing, production and promotion under one roof"
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
              // @ts-expect-error fetchpriority is a valid HTML attribute not yet in React types
              fetchpriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
            <div className="absolute inset-0 hero-gradient" />
          </motion.div>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="absolute top-20 left-6 z-20">
            <ol
              className="flex items-center gap-1.5 text-xs font-medium"
              itemScope
              itemType="https://schema.org/BreadcrumbList"
            >
              <li
                itemScope
                itemType="https://schema.org/ListItem"
                itemProp="itemListElement"
              >
                <Link
                  to="/"
                  itemProp="item"
                  className="transition-colors duration-200 hover:text-white"
                  style={{ color: "hsl(0 0% 100% / 0.60)" }}
                >
                  <span itemProp="name">Home</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <li
                aria-hidden="true"
                style={{ color: "hsl(0 0% 100% / 0.40)" }}
              >
                ›
              </li>
              <li
                itemScope
                itemType="https://schema.org/ListItem"
                itemProp="itemListElement"
              >
                <span
                  itemProp="name"
                  style={{ color: "hsl(0 0% 100% / 0.90)" }}
                >
                  Event Marketing
                </span>
                <meta itemProp="position" content="2" />
              </li>
            </ol>
          </nav>

          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6"
          >
            <div className="max-w-4xl mx-auto text-center">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="font-display font-medium text-sm uppercase tracking-[0.3em] mb-6"
                style={{ color: "hsl(0, 0%, 100%, 0.7)" }}
              >
                Production + Promotion
              </motion.p>
              <motion.h1
                initial={{ opacity: 1, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-display font-bold leading-[1.05] md:leading-[0.95] mb-4 md:mb-8"
                style={{ color: "white" }}
                data-speakable
              >
                Fill Every Seat.
                <br />
                <span style={{ color: "hsl(var(--primary))" }}>
                  With the Right People.
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 1, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-2 service-summary"
                style={{ color: "hsl(0, 0%, 100%, 0.75)" }}
                data-speakable
              >
                Most companies stop at production. We don't. We produce your
                event and make sure the right audience shows up, creating
                pipeline, authority, and revenue long after the lights go down.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-8 md:mt-10"
              >
                <DualCTA variant="dark" className="justify-center" />
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          >
            <motion.div
              animate={{
                y: [0, 14, 0],
                opacity: [0.8, 0.2, 0.8],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.6,
                ease: "easeInOut",
              }}
              className="w-0.5 h-8 rounded-full bg-white/60"
            />
          </motion.div>
        </section>

        {/* ============================================================ */}
        {/*  STATS BAR                                                    */}
        {/* ============================================================ */}
        <div
          ref={statsRef}
          className="relative z-20 bg-card border-t border-border/40"
        >
          <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-14">
            <div className="grid grid-cols-3 divide-x divide-border/60">
              {[
                { value: 50, suffix: "+", label: "Events Marketed" },
                { value: 60, suffix: "%", label: "Avg. Show-Up Rate" },
                { value: 40, suffix: "K+", label: "Attendees Reached" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: i * 0.12,
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <p className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      prefix=""
                    />
                  </p>
                  <p className="text-sm md:text-base mt-2 text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
          <RevealLine delay={0.2} />
        </div>

        {/* ============================================================ */}
        {/*  THE PROBLEM, PAIN POINTS                                    */}
        {/* ============================================================ */}
        <section className="py-20 md:py-28 lg:py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14 md:mb-20">
              <motion.p
                className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-4 font-medium"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                The Hard Truth
              </motion.p>
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                Great production is only half{" "}
                <span style={{ color: "hsl(var(--primary))" }}>the battle.</span>
              </motion.h2>
              <motion.p
                className="text-base md:text-lg mt-5 max-w-2xl mx-auto leading-relaxed"
                style={{ color: "hsl(var(--foreground) / 0.55)" }}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                You can have the most polished stage, the sharpest AV, and a
                perfect run of show. But if the wrong people show up, or worse,
                not enough people show up, none of it matters.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <PainCard
                icon={XCircle}
                title="Wrong audience shows up"
                description="You wanted decision-makers and VPs. You got interns browsing for free coffee. Classic."
                index={0}
              />
              <PainCard
                icon={XCircle}
                title="Spray-and-pray promotion"
                description="You blasted your event everywhere, targeted nobody specific, and prayed something would stick."
                index={1}
              />
              <PainCard
                icon={XCircle}
                title="Half-empty rooms"
                description="Low registrations, even lower show-up rates. Your speakers present to a fraction of the expected crowd."
                index={2}
              />
              <PainCard
                icon={XCircle}
                title="No follow‑up, no pipeline"
                description="The event ends and… radio silence. No nurture sequences, no retargeting, no pipeline. Just a spreadsheet of emails collecting dust."
                index={3}
              />
              <PainCard
                icon={XCircle}
                title="Zero long-term value"
                description="All that production effort for one day? No content repurposing, no authority building, no compounding returns."
                index={4}
              />
              <PainCard
                icon={XCircle}
                title="Cross fingers and hope"
                description="No system, no process, just vibes and hope that this time will be different."
                index={5}
              />
            </div>

            <motion.div
              className="text-center mt-14"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p
                className="text-lg md:text-xl font-display font-bold"
                style={{ color: "hsl(var(--foreground) / 0.70)" }}
              >
                The math nobody wants to do:{" "}
                <span className="text-foreground">
                  expensive production + empty room = wasted budget.
                </span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  THE SOLUTION, FULL SCOPE 360                                */}
        {/* ============================================================ */}
        <section className="py-20 md:py-28 lg:py-32 bg-card border-t border-b border-border/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14 md:mb-20">
              <motion.div
                className="flex justify-center mb-5"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className="rounded-2xl p-3 border"
                  style={{
                    background: "hsl(var(--primary) / 0.08)",
                    borderColor: "hsl(var(--primary) / 0.2)",
                  }}
                >
                  <Layers size={22} style={{ color: "hsl(var(--primary))" }} />
                </div>
              </motion.div>
              <motion.p
                className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-4 font-medium"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Full-Scope Solution
              </motion.p>
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                Production{" "}
                <span style={{ color: "hsl(var(--primary))" }}>+</span>{" "}
                Marketing.
                <br />
                One team.{" "}
                <span style={{ color: "hsl(var(--primary))" }}>
                  Zero gaps.
                </span>
              </motion.h2>
              <motion.p
                className="text-base md:text-lg mt-5 max-w-2xl mx-auto leading-relaxed"
                style={{ color: "hsl(var(--foreground) / 0.55)" }}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                We handle end-to-end production. Our dedicated marketing partner
                builds the acquisition systems that fill your room with
                qualified, ready-to-buy attendees. Together, we cover every angle
               , so your event doesn't just look great, it generates revenue.
              </motion.p>
            </div>

            {/* Two-pillar visual */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
              {/* Production pillar */}
              <motion.div
                initial={{ opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl border p-8 flex flex-col gap-5"
                style={{
                  borderColor: "hsl(var(--primary) / 0.15)",
                  background:
                    "linear-gradient(135deg, hsl(var(--primary) / 0.04) 0%, transparent 60%)",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="flex items-center justify-center w-10 h-10 rounded-xl"
                    style={{
                      background: "hsl(var(--primary) / 0.12)",
                      border: "1.5px solid hsl(var(--primary) / 0.25)",
                    }}
                  >
                    <Zap
                      size={18}
                      style={{ color: "hsl(var(--primary))" }}
                    />
                  </span>
                  <h3 className="text-xl font-display font-bold text-foreground">
                    We Produce It
                  </h3>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "hsl(var(--foreground) / 0.55)" }}
                >
                  Live, virtual, or hybrid, we build your event from the ground
                  up. Staging, AV, lighting, livestream, graphics, on-site crew,
                  run of show. Every moving part, handled.
                </p>
                <ul className="space-y-2.5 mt-1">
                  {[
                    "Full AV & stage production",
                    "Virtual & hybrid platforms",
                    "On-site technical direction",
                    "Video content & livestream",
                    "Global crew via Meeting Pros",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm"
                    >
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0"
                        style={{ color: "hsl(var(--primary))" }}
                      />
                      <span style={{ color: "hsl(var(--foreground) / 0.70)" }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Marketing pillar — MyWebGlory */}
              <motion.div
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-2xl border p-8 flex flex-col gap-5"
                style={{
                  borderColor: "rgba(138, 33, 204, 0.22)",
                  background:
                    "linear-gradient(135deg, rgba(138, 33, 204, 0.06) 0%, transparent 60%)",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden"
                    style={{
                      background: "rgba(138, 33, 204, 0.10)",
                      border: "1.5px solid rgba(138, 33, 204, 0.25)",
                    }}
                  >
                    <img src={mwgIcon} alt="MyWebGlory" width={24} height={24} className="object-contain" />
                  </span>
                  <h3 className="text-xl font-display font-bold text-foreground">
                    They Fill the Room
                  </h3>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "hsl(var(--foreground) / 0.55)" }}
                >
                  Our marketing partner builds end-to-end systems that attract
                  the exact decision-makers who can actually buy from you, not
                  just anyone with a pulse.
                </p>
                <ul className="space-y-2.5 mt-1">
                  {[
                    "ICP research & sniper targeting",
                    "Ads, funnels & landing pages",
                    "Email & SMS reminder sequences",
                    "Show-up rate optimization",
                    "Post-event pipeline activation",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm"
                    >
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0"
                        style={{ color: MWG_PURPLE }}
                      />
                      <span style={{ color: "hsl(var(--foreground) / 0.70)" }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                {/* Partner attribution */}
                <div
                  className="mt-2 pt-4 flex items-center gap-2.5 border-t"
                  style={{ borderColor: "rgba(138, 33, 204, 0.12)" }}
                >
                  <span
                    className="text-xs font-medium"
                    style={{ color: "hsl(var(--foreground) / 0.38)" }}
                  >
                    Marketing by
                  </span>
                  <a
                    href={PARTNER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-80"
                  >
                    <img
                      src={mwgFull}
                      alt="MyWebGlory"
                      height={20}
                      className="h-5 w-auto object-contain opacity-75"
                      style={{ filter: "brightness(0.6) saturate(1.2)" }}
                    />
                  </a>
                </div>
              </motion.div>
            </div>

            <div className="flex justify-center">
              <DualCTA variant="light" />
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  PARTNER STRIP                                                */}
        {/* ============================================================ */}
        <div className="border-t border-b border-border/40 py-6">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5"
            >
              <span
                className="text-xs uppercase tracking-[0.22em] font-semibold"
                style={{ color: "hsl(var(--foreground) / 0.35)" }}
              >
                Event marketing powered by
              </span>
              <a
                href={PARTNER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 transition-opacity hover:opacity-75"
              >
                <img
                  src={mwgFull}
                  alt="MyWebGlory"
                  height={22}
                  className="h-[22px] w-auto object-contain"
                  style={{ filter: "saturate(0.9) brightness(0.65)" }}
                />
              </a>
            </motion.div>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  WHAT YOU ACTUALLY GET                                        */}
        {/* ============================================================ */}
        <section className="py-20 md:py-28 lg:py-36">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-6 md:mb-8">
              <motion.div
                className="flex justify-center mb-5"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className="rounded-2xl p-3 border"
                  style={{
                    background: "hsl(var(--primary) / 0.08)",
                    borderColor: "hsl(var(--primary) / 0.2)",
                  }}
                >
                  <Megaphone
                    size={22}
                    style={{ color: "hsl(var(--primary))" }}
                  />
                </div>
              </motion.div>
              <motion.p
                className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-4 font-medium"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                What You Get
              </motion.p>
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                Events engineered to{" "}
                <span style={{ color: "hsl(var(--primary))" }}>sell.</span>
              </motion.h2>
              <motion.p
                className="text-base md:text-lg mt-5 max-w-2xl mx-auto leading-relaxed"
                style={{ color: "hsl(var(--foreground) / 0.55)" }}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Forget "more signups." Here's what you actually get when
                production and marketing work as one system.
              </motion.p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-14 md:mt-20">
            <div className="flex flex-col gap-20 md:gap-24 lg:gap-32">
              <SolutionRow
                icon={Crosshair}
                title="Sniper-Precise Targeting"
                description="We find the exact decision-makers who can actually buy from you. No vanity metrics, your campaigns attract buyers, not tire-kickers. Every seat in your event is filled with someone who belongs there."
                image={conferencesImg}
                index={0}
              />
              <SolutionRow
                icon={TrendingUp}
                title="Funnels That Actually Convert"
                description="High-converting landing pages, ad creatives, and registration paths, all designed around your specific event and audience. Every step moves prospects closer to saying yes."
                image={attractImg}
                index={1}
              />
              <SolutionRow
                icon={Mail}
                title="Show-Up Rates That Shock"
                description="Email flows, SMS sequences, even phone campaigns. Your attendees feel expected, important, and invested. This alone can double attendance compared to standard events."
                image={extendReachImg}
                index={2}
              />
              <SolutionRow
                icon={BarChart3}
                title="Revenue Long After the Event"
                description="Post-event email flows, retargeting pools, authority content, and pipeline activation. One event becomes months of deal velocity, lower acquisition costs, and audiences you can reuse again and again."
                image={captureImg}
                index={3}
              />
              <SolutionRow
                icon={Award}
                title="Authority, Not Just Attendance"
                description="Your events build your reputation in the market. We ensure the production looks world-class and the marketing positions you as the authority in your niche, a combination that compounds over time."
                image={executiveSummitsImg}
                index={4}
              />
            </div>
          </div>

          <div className="flex justify-center mt-16 md:mt-20">
            <DualCTA variant="light" />
          </div>
        </section>

        {/* ============================================================ */}
        {/*  HOW IT WORKS, PROCESS                                       */}
        {/* ============================================================ */}
        <section className="py-20 md:py-28 lg:py-32 bg-card border-t border-b border-border/40 overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14 md:mb-20">
              <motion.p
                className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-4 font-medium"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                The Process
              </motion.p>
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                Dead simple.{" "}
                <span style={{ color: "hsl(var(--primary))" }}>
                  Here's how it works.
                </span>
              </motion.h2>
              <motion.p
                className="text-base md:text-lg mt-5 max-w-xl mx-auto leading-relaxed"
                style={{ color: "hsl(var(--foreground) / 0.55)" }}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                One call, one strategy, one coordinated team handling
                everything. You focus on delivering value, we fill your room
                and produce the show.
              </motion.p>
            </div>

            <div className="relative">
              {/* Vertical line connector */}
              <div
                className="hidden md:block absolute left-[39px] top-8 bottom-8 w-px"
                style={{
                  background:
                    "linear-gradient(to bottom, hsl(var(--primary) / 0.3), hsl(var(--primary) / 0.05))",
                }}
              />

              <div className="flex flex-col gap-10 md:gap-14">
                {processSteps.map((step, i) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-6 md:gap-8 items-start"
                  >
                    <div
                      className="flex items-center justify-center w-[56px] h-[56px] md:w-[78px] md:h-[78px] rounded-2xl shrink-0 font-display font-bold text-lg md:text-2xl"
                      style={{
                        background: step.partner
                          ? "rgba(138, 33, 204, 0.08)"
                          : "hsl(var(--primary) / 0.10)",
                        border: step.partner
                          ? "1.5px solid rgba(138, 33, 204, 0.25)"
                          : "1.5px solid hsl(var(--primary) / 0.25)",
                        color: step.partner
                          ? MWG_PURPLE
                          : "hsl(var(--primary))",
                      }}
                    >
                      {step.num}
                    </div>
                    <div className="flex flex-col gap-2 pt-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-xl md:text-2xl font-display font-bold text-foreground">
                          {step.title}
                        </h3>
                        {step.partner && (
                          <a
                            href={PARTNER_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 p-0.5 rounded-[5px] text-[10px] font-semibold uppercase tracking-wide transition-opacity hover:opacity-70"
                            style={{
                              background: "rgba(138, 33, 204, 0.08)",
                              border: "1px solid rgba(138, 33, 204, 0.18)",
                              color: MWG_PURPLE,
                            }}
                          >
                            <img src={mwgIcon} alt="" width={17} height={17} className="rounded-sm" />
                          </a>
                        )}
                      </div>
                      <p
                        className="text-sm md:text-base leading-relaxed max-w-xl"
                        style={{
                          color: "hsl(var(--foreground) / 0.55)",
                        }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  WHY FULL-SCOPE, THE BOTTOM LINE                            */}
        {/* ============================================================ */}
        <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14 md:mb-20">
              <motion.p
                className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-4 font-medium"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                The Bottom Line
              </motion.p>
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                Stop treating production and marketing{" "}
                <span style={{ color: "hsl(var(--primary))" }}>
                  as separate problems.
                </span>
              </motion.h2>
              <motion.p
                className="text-base md:text-lg mt-5 max-w-2xl mx-auto leading-relaxed"
                style={{ color: "hsl(var(--foreground) / 0.55)" }}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                When production and marketing are engineered together, your
                event becomes more than a moment, it becomes a growth engine.
                A lead machine. A sales accelerator. An authority amplifier.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-16">
              {[
                {
                  icon: Target,
                  title: "Higher-Quality Pipeline",
                  description:
                    "Qualified leads and booked calls from day one, not just emailcollections that go nowhere.",
                },
                {
                  icon: Globe,
                  title: "Audiences You Own Forever",
                  description:
                    "Email lists, SMS lists, and retargeting pools you keep. Assets your competitors have to rebuild every time.",
                },
                {
                  icon: TrendingUp,
                  title: "Compounding Returns",
                  description:
                    "Every event builds authority, lowers future acquisition costs, and creates content that works for months.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col gap-4 p-6 md:p-8 rounded-2xl border text-center"
                  style={{
                    borderColor: "hsl(var(--primary) / 0.12)",
                    background:
                      "linear-gradient(135deg, hsl(var(--primary) / 0.03) 0%, transparent 60%)",
                  }}
                >
                  <div className="flex justify-center">
                    <span
                      className="flex items-center justify-center w-12 h-12 rounded-xl"
                      style={{
                        background: "hsl(var(--primary) / 0.10)",
                        border: "1.5px solid hsl(var(--primary) / 0.25)",
                      }}
                    >
                      <item.icon
                        size={20}
                        style={{ color: "hsl(var(--primary))" }}
                      />
                    </span>
                  </div>
                  <h3 className="text-lg font-display font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "hsl(var(--foreground) / 0.55)" }}
                  >
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p
                className="text-lg md:text-xl font-display font-semibold mb-8"
                style={{ color: "hsl(var(--foreground) / 0.70)" }}
              >
                Everything we do is built around one thing:{" "}
                <span className="text-foreground font-bold">Your Growth.</span>
                <br />
                <span className="text-sm font-normal" style={{ color: "hsl(var(--foreground) / 0.50)" }}>
                  No hype. No guesswork. Just a repeatable system that makes
                  your events pay for themselves.
                </span>
              </p>
              <DualCTA variant="light" className="justify-center" />
            </motion.div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  WHO THIS IS FOR                                              */}
        {/* ============================================================ */}
        <section className="py-20 md:py-28 bg-card border-t border-b border-border/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.p
              className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-4 font-medium"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Is This For You?
            </motion.p>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Built for businesses that{" "}
              <span style={{ color: "hsl(var(--primary))" }}>
                take events seriously.
              </span>
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left mb-12">
              {[
                "You sell high-ticket offers",
                "You need trust before purchase",
                "You want qualified leads, not volume",
                "You care about authority and long-term leverage",
                "Your offer requires explanation, proof, or credibility",
                "You're tired of events that don't generate ROI",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex items-start gap-3 py-2"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0"
                    style={{ color: "hsl(var(--primary))" }}
                  />
                  <span
                    className="text-sm md:text-base"
                    style={{ color: "hsl(var(--foreground) / 0.70)" }}
                  >
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="flex flex-wrap justify-center gap-3 mb-10"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {[
                "SaaS & Tech",
                "Agencies",
                "Education",
                "B2B Products",
                "Finance",
                "Healthcare",
                "Professional Services",
              ].map((industry) => (
                <span
                  key={industry}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: "hsl(var(--primary) / 0.08)",
                    color: "hsl(var(--primary))",
                    border: "1px solid hsl(var(--primary) / 0.15)",
                  }}
                >
                  {industry}
                </span>
              ))}
            </motion.div>

            <DualCTA variant="light" className="justify-center" />
          </div>
        </section>

        {/* --- Related Services Navigation --- */}
        <ServiceCardsNav currentPath="/marketing" />

        {/* --- CTA Section --- */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Marketing;
