import ServicePageLayout from "@/components/ServicePageLayout";
import liveEventsImg from "@/assets/live-events.webp";
import liveEventsVideo from "@/assets/live-events-video.mp4";
import hybridSummitImg from "@/assets/hybrid-summit-stage.webp";
import aboutEventImg from "@/assets/about-event.webp";
import { Layers, MapPin, Users, Cpu } from "lucide-react";

const seo = {
  title: "Live Event Production Services | In-Person Events | VM Producers",
  description: "Professional live event production for in-person events from 50 to 50,000 attendees. End-to-end management including staging, AV, lighting, venue sourcing, and on-site technical support. 500+ events delivered worldwide.",
  canonical: "/live-events",
  jsonLd: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "serviceType": "Live Event Production",
        "name": "Live Events",
        "description": "Professional live event production for in-person events from 50 to 50,000 attendees. End-to-end management including staging, AV, lighting, and technical support.",
        "provider": { "@type": "Organization", "name": "VM Producers", "url": "https://www.vmproducers.com" },
        "url": "https://www.vmproducers.com/live-events",
        "areaServed": "Worldwide",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Live Event Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "End-to-End Production" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Venue Sourcing & Management" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Live Streaming Integration" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "On-Site Technical Support" } }
          ]
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.vmproducers.com/" },
          { "@type": "ListItem", "position": 2, "name": "Live Events", "item": "https://www.vmproducers.com/live-events" }
        ]
      }
    ]
  }
};

const LiveEvents = () => (
  <ServicePageLayout
    seo={seo}
    title="Live Events"
    subtitle="In-Person Excellence"
    featuresBefore="Live event production, "
    featuresAccent="start to finish."
    description="In-person events that run on time, look sharp, and hold together under pressure. We handle the full production, so you show up as the host."
    heroImage={liveEventsImg}
    heroVideo={liveEventsVideo}
    stats={[
      { value: 500, suffix: "+", label: "Events Delivered" },
      { value: 50, suffix: "+", label: "Countries" },
      { value: 100, suffix: "%", label: "Success Rate" },
    ]}
    features={[
      {
        icon: Layers,
        title: "End-to-End Production",
        description: "Your event is handled from first brief to final breakdown. We manage program development, A-to-Z event logistics, staging, lighting, AV production, branding, signage, catering, and dedicated on-site staff, so you walk in as the host, not the fixer. Every detail is documented, rehearsed, and executed to plan.",
        image: liveEventsImg,
      },
      {
        icon: MapPin,
        title: "Venue & Logistics",
        description: "Finding the right venue is only the beginning. We handle venue selection, hotel room block negotiations, attendee transportation, and on-site logistics coordination, ensuring your guests arrive on time, settled comfortably, and focused entirely on your content rather than the chaos of getting there.",
        image: hybridSummitImg,
      },
      {
        icon: Users,
        title: "Guest Experience Management",
        description: "From the moment your attendees register to the final farewell, every touchpoint is managed. Our on-site staff handles check-in, catering coordination, and guest services, creating a seamless, premium experience that reflects your brand and keeps your audience engaged throughout.",
        image: aboutEventImg,
      },
      {
        icon: Cpu,
        title: "Production & Stage Design",
        description: "Our production team turns ordinary spaces into branded environments. Premium staging, professional lighting rigs, broadcast-quality sound, and strategic signage all work together to deliver an immersive atmosphere that amplifies your message and keeps your audience fully present from opening to close.",
        image: liveEventsImg,
      },
    ]}
  />
);

export default LiveEvents;
