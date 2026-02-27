import ServicePageLayout from "@/components/ServicePageLayout";
import liveEventsImg from "@/assets/live-events.webp";
import liveEventsVideo from "@/assets/live-events-video.mp4";
import { Layers, MapPin, Radio, Wrench } from "lucide-react";

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
    description="In-person events that run on time, look sharp, and hold together under pressure."
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
        description: "From concept to execution, we manage every detail: staging, lighting, sound, and logistics, so you can focus on your message.",
      },
      {
        icon: MapPin,
        title: "Venue Sourcing & Management",
        description: "We know the venues, handle the negotiations, and get it set up the way it needs to be.",
      },
      {
        icon: Radio,
        title: "Live Streaming Integration",
        description: "Extend your reach beyond the venue with broadcast-quality live streaming, bringing your event to audiences worldwide in real time.",
      },
      {
        icon: Wrench,
        title: "On-Site Technical Support",
        description: "AV, networking, power, and backup plans. Our crew has seen it before and knows how to fix it fast.",
      },
    ]}
  />
);

export default LiveEvents;
