import { motion } from "framer-motion";
import virtualEventsImg from "@/assets/virtual-events.webp";
import videoProductionImg from "@/assets/video-production.webp";
import hybridEventsImg from "@/assets/hybrid-events.webp";
import meetingProsImg from "@/assets/meeting-pros.webp";
import liveEventsImg from "@/assets/live-events.webp";

const services = [
  {
    title: "Live Events",
    description: "In person events are the bread and butter of building community. We ensure seamless and unforgettable in-person event experiences with expert planning and execution.",
    features: [
      "Full Service Event Management from A to Z",
      "Venue and hotel sourcing",
      "Streamlined registration and check-in solutions",
      "High-quality staging, lighting, and AV production",
      "Curated catering and hospitality services",
    ],
    image: liveEventsImg,
  },
  {
    title: "Virtual Events",
    description: "Our all-inclusive virtual event production service manages everything from small webinars to expansive online conferences.",
    features: [
      "Large-scale conferences with concurrent sessions",
      "Premium livestreams with professional graphics",
      "Online summits and trade shows with tailored expo booths",
      "Audience engagement through polls and networking",
      "Up to 100,000 attendees supported",
    ],
    image: virtualEventsImg,
  },
  {
    title: "Hybrid Events",
    description: "We connect in-person and virtual attendees, ensuring both groups feel equally involved through smooth online integration.",
    features: [
      "Professional livestream with multi-cameras",
      "Customized branded web interfaces",
      "Shared mobile app for all attendees",
      "Polling and Q&A integration",
      "Real-time engagement tracking",
    ],
    image: hybridEventsImg,
  },
  {
    title: "Video Production",
    description: "We produce captivating video content that boosts your event marketing and enriches the overall experience.",
    features: [
      "Promotional event videos and teasers",
      "Whiteboard explainer animations",
      "Event highlight reels",
      "Testimonial videos",
      "Social media optimized content",
    ],
    image: videoProductionImg,
  },
  {
    title: "Meeting Pros",
    description: "We connect you with a worldwide network of skilled event professionals, providing adaptable staffing solutions for all your event requirements.",
    features: [
      "Quick talent matching within 48 hours",
      "Verified professionals with proven success",
      "99.9% freelancer success rate",
      "Scalable workforce solutions across 70 countries",
      "Complete compliance and security measures",
    ],
    image: meetingProsImg,
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
          <p className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-4 font-medium">
            Our Services
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
            Everything You Need
            <br />
            <span className="text-gradient">In One Place</span>
          </h2>
        </motion.div>

        <div className="space-y-32">
          {services.map((service, i) => {
            const isEven = i % 2 === 0;
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
                    <div className="absolute -inset-4 rounded-2xl bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-all duration-700" />
                    <div className="relative overflow-hidden rounded-2xl glow-border">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-[400px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <h3 className="text-3xl md:text-4xl font-display font-bold glow-text">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                        <span className="text-secondary-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="inline-flex mt-4 px-6 py-3 rounded-lg border border-primary/30 text-primary font-display font-semibold text-sm hover:bg-primary/10 transition-all duration-300"
                  >
                    Learn More
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
