import ServicePageLayout from "@/components/ServicePageLayout";
import hybridEventsImg from "@/assets/hybrid-summit-stage.webp";
import hybridEventsVideo from "@/assets/hybrid-events-video.mp4";
import { Layers, Camera, Volume2, Monitor, MessageSquare, Laptop, Archive } from "lucide-react";

const seo = {
  title: "Hybrid Event Production Services | In-Person & Virtual | VM Producers",
  description: "Expert hybrid event production bridging in-person and virtual audiences seamlessly. Full AV production, multi-camera live streaming, audience engagement tools, and post-event content hub. 95% audience retention rate.",
  canonical: "/hybrid-events",
  jsonLd: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "serviceType": "Hybrid Event Production",
        "name": "Hybrid Events",
        "description": "Expert hybrid event production bridging in-person and virtual audiences. Full AV production, multi-camera streaming, and unified audience experience.",
        "provider": { "@type": "Organization", "name": "VM Producers", "url": "https://www.vmproducers.com" },
        "url": "https://www.vmproducers.com/hybrid-events",
        "areaServed": "Worldwide",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Hybrid Event Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Unified Experience Design" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Multi-Camera Live Production" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Full AV Production" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Audience Engagement for Both Rooms" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Post-Event Content Hub" } }
          ]
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.vmproducers.com/" },
          { "@type": "ListItem", "position": 2, "name": "Hybrid Events", "item": "https://www.vmproducers.com/hybrid-events" }
        ]
      }
    ]
  }
};

const HybridEvents = () => (
    <ServicePageLayout
    seo={seo}
    title="Hybrid Events"
    subtitle="Best of Both Worlds"
    description="Your hybrid event brings in-person and online audiences together into one seamless experience, from the same stage, at the same time."
    heroImage={hybridEventsImg}
    heroVideo={hybridEventsVideo}
    stats={[
      { value: 95, suffix: "%", label: "Retention Rate" },
      { value: 3, suffix: "x", label: "Audience Reach" },
      { value: 200, suffix: "+", label: "Hybrid Events" },
    ]}
    features={[
      {
        icon: Layers,
        title: "Unified Experience Design",
        description: "Your in-person and online audiences feel the same show. Same energy, same content, same moments, no second-class stream.",
      },
      {
        icon: Camera,
        title: "Multi-Camera Live Production",
        description: "Award-winning technical producers run your event on-site and remotely. Branded streams, split-screen layouts, and seamless feed switching, your audience sees it all.",
      },
      {
        icon: Volume2,
        title: "Full AV Production",
        description: "Lighting, sound, staging, and dedicated crew for the in-person side. We assemble teams of any size, all delivering to the same standard.",
      },
      {
        icon: Monitor,
        title: "Platform Management",
        description: "Complete virtual platform setup, customization, and live support, all handled for you so you can concentrate fully on your content.",
      },
      {
        icon: MessageSquare,
        title: "Audience Engagement for Both Rooms",
        description: "Live polls, speaker Q&A, shared social wall, virtual booths, and group messaging - keeping every attendee active regardless of where they are.",
      },
      {
        icon: Laptop,
        title: "Online-Only Sessions",
        description: "Extend beyond the physical venue with exclusive online-only sessions, breakouts, and networking for your remote audience.",
      },
      {
        icon: Archive,
        title: "Post-Event Content Hub",
        description: "All sessions recorded, edited, and delivered as on-demand content. Your event keeps generating value for you long after the room empties.",
      },
    ]}
  />
);

export default HybridEvents;
