import { motion } from "framer-motion";
import { Sparkles, Globe, Monitor, Video, Users, Mic } from "lucide-react";
import virtualEventsImg from "@/assets/virtual-events.webp";
import videoProductionImg from "@/assets/video-production.webp";
import hybridEventsImg from "@/assets/hybrid-events.webp";
import meetingProsImg from "@/assets/meeting-pros.webp";
import liveEventsImg from "@/assets/live-events.webp";

const services = [
  {
    title: "Live Events",
    icon: Mic,
    description: "In-person events are the bread and butter of building community. We ensure seamless and unforgettable experiences with expert planning and execution.",
    features: [
      "Full Service Management",
      "Venue Sourcing",
      "Registration & Check-in",
      "Staging & AV",
      "Catering & Hospitality",
    ],
    image: liveEventsImg,
    stat: { value: "500+", label: "Live events delivered" },
  },
  {
    title: "Virtual Events",
    icon: Monitor,
    description: "Our all-inclusive virtual event production manages everything from intimate webinars to expansive online conferences with up to 100,000 attendees.",
    features: [
      "Multi-session Conferences",
      "Premium Livestreams",
      "Expo Booths",
      "Polls & Networking",
      "Multi-language Support",
    ],
    image: virtualEventsImg,
    stat: { value: "100K", label: "Max attendees per event" },
  },
  {
    title: "Hybrid Events",
    icon: Globe,
    description: "We connect in-person and virtual attendees, ensuring both groups feel equally involved through smooth online integration and shared experiences.",
    features: [
      "Multi-camera Livestream",
      "Branded Interfaces",
      "Shared Mobile App",
      "Live Q&A",
      "Engagement Tracking",
    ],
    image: hybridEventsImg,
    stat: { value: "95%", label: "Client retention rate" },
  },
  {
    title: "Video Production",
    icon: Video,
    description: "We produce captivating video content that boosts your event marketing and enriches the overall experience, from teasers to highlight reels.",
    features: [
      "Promo Videos",
      "Explainer Animations",
      "Highlight Reels",
      "Testimonials",
      "Social Content",
    ],
    image: videoProductionImg,
    stat: { value: "2000+", label: "Videos produced" },
  },
  {
    title: "Meeting Pros",
    icon: Users,
    description: "A worldwide network of skilled event professionals with adaptable staffing solutions across 50 states and 70 countries, matched within 48 hours.",
    features: [
      "48h Talent Matching",
      "Verified Professionals",
      "99.9% Success Rate",
      "Global Coverage",
      "Scalable Teams",
    ],
    image: meetingProsImg,
    stat: { value: "70+", label: "Countries covered" },
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-accent font-display text-sm uppercase tracking-[0.3em] mb-4 font-medium">
            Our Services
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
            Everything You Need
            <br />
            <span className="text-gradient">In One Place</span>
          </h2>
        </motion.div>

        <div className="space-y-40">
          {services.map((service, i) => {
            const isEven = i % 2 === 0;
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-20 items-center`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative group">
                    <div className="absolute -inset-4 rounded-2xl bg-accent/5 blur-2xl group-hover:bg-accent/10 transition-all duration-700" />
                    <div className="relative overflow-hidden rounded-2xl border border-border/50">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-[400px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                      
                      {/* Floating stat badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="absolute bottom-6 left-6 glass-strong rounded-xl px-5 py-3"
                      >
                        <p className="text-2xl font-display font-bold text-foreground">{service.stat.value}</p>
                        <p className="text-xs text-muted-foreground">{service.stat.label}</p>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  {/* Icon + Title */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl glass flex items-center justify-center border border-accent/20">
                      <Icon size={22} className="text-accent" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                      {service.title}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Feature pills */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    {service.features.map((f, j) => (
                      <motion.div
                        key={f}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * j, duration: 0.4 }}
                        className="glass rounded-full px-5 py-2.5 border border-border/60 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 group/pill cursor-default"
                      >
                        <div className="flex items-center gap-2">
                          <Sparkles size={12} className="text-accent/60 group-hover/pill:text-accent transition-colors" />
                          <span className="text-sm text-secondary-foreground font-medium">{f}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="inline-flex mt-6 px-7 py-3 rounded-xl glass border border-accent/20 text-accent font-display font-semibold text-sm hover:bg-accent/10 hover:border-accent/40 transition-all duration-300"
                  >
                    Learn More →
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
