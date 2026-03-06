import ServicePageLayout from "@/components/ServicePageLayout";
import liveEventsImg from "@/assets/live-events.webp";
import liveEventsVideo from "@/assets/live-events-video.mp4";
import hybridSummitImg from "@/assets/hybrid-summit-stage.webp";
import venueLogisticsImg from "@/assets/venue-logistics.webp";
import guestExperienceImg from "@/assets/guest-experience-management.webp";
import productionStageImg from "@/assets/production-stage-design.webp";
import conferencesSummitsImg from "@/assets/Conferences-_-Summits_1.webp";
import productLaunchesImg from "@/assets/Product-Launches_1.webp";
import awardsGalasImg from "@/assets/Awards-_-Galas_1.webp";
import { Layers, MapPin, Users, Cpu } from "lucide-react";
import { buildWebPageSchema, buildBreadcrumbSchema, buildServiceSchema, TODAY } from "@/components/SEO";

const seo = {
  title: "Live Event Production Services | In-Person Events | VM Producers",
  description: "Professional live event production for in-person events from 50 to 50,000 attendees. End-to-end management including staging, AV, lighting, venue sourcing, and on-site technical support. 500+ events delivered worldwide.",
  canonical: "/live-events",
  dateModified: TODAY,
  jsonLd: {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageSchema({
        path: "/live-events",
        name: "Live Event Production Services | In-Person Events | VM Producers",
        description: "Professional live event production for in-person events from 50 to 50,000 attendees. End-to-end management including staging, AV, lighting, venue sourcing, and on-site technical support.",
      }),
      buildServiceSchema({
        path: "/live-events",
        serviceType: "Live Event Production",
        name: "Live Events",
        description: "Professional live event production for in-person events from 50 to 50,000 attendees. End-to-end management including staging, AV, lighting, and technical support.",
        offerNames: ["End-to-End Production", "Venue Sourcing & Management", "Live Streaming Integration", "On-Site Technical Support"],
      }),
      buildBreadcrumbSchema("/live-events", "Live Events"),
    ],
  },
};

const LiveEvents = () => (
  <ServicePageLayout
    seo={seo}
    title="Live Events"
    subtitle="In-Person Production"
    featuresBefore="Live event production, "
    featuresAccent="start to finish."
    featuresDescription="Everything you need to run a flawless in-person event, from the first brief to the final breakdown. Here's exactly what we take off your plate."
    description="In-person events that run on time, look sharp, and hold together under pressure. We handle the full production, so you show up as the host."
    heroImage={liveEventsImg}
    heroVideo={liveEventsVideo}
    stats={[
      { value: 500, suffix: "+", label: "Events Delivered" },
      { value: 50, suffix: "+", label: "Countries" },
      { value: 100, suffix: "%", label: "Success Rate" },
    ]}
    featuresIcon={MapPin}
  typeCardsTitle="What your next event could look like"
  typeCards={[
      {
        label: "Corporate",
        title: "Conferences & Summits",
        description: "Multi-day conferences, keynotes, and panel sessions for 50 to 50,000 attendees. Produced start to finish with zero surprises.",
        image: conferencesSummitsImg,
      },
      {
        label: "Brand Moments",
        title: "Product Launches",
        description: "High-energy launch events that generate buzz, earn media coverage, and make your product's debut unforgettable.",
        image: productLaunchesImg,
      },
      {
        label: "Prestige Events",
        title: "Awards & Galas",
        description: "Elegant ceremonies and gala productions that reflect the prestige of your brand and honor your audience in style.",
        image: awardsGalasImg,
      },
    ]}
    features={[
      {
        icon: Layers,
        title: "End-to-End Production",
        description: "Your event is handled from first brief to final breakdown. We manage program development, A-to-Z event logistics, staging, lighting, AV production, branding, signage, catering, and on-site staff, so you walk in as the host, not the fixer. Every detail is documented, rehearsed, and executed to plan.",
        image: liveEventsImg,
      },
      {
        icon: MapPin,
        title: "Venue & Logistics",
        description: "Finding the right venue is only the beginning. We handle venue selection, hotel room block negotiations, attendee transportation, and on-site logistics coordination, so your guests arrive on time, settled comfortably, and focused entirely on your content rather than the chaos of getting there.",
        image: venueLogisticsImg,
      },
      {
        icon: Users,
        title: "Guest Experience Management",
        description: "From the moment your attendees register to the final farewell, every touchpoint is managed. Our on-site staff handles check-in, catering coordination, and guest services, creating a polished experience that reflects your brand and keeps your audience engaged throughout.",
        image: guestExperienceImg,
      },
      {
        icon: Cpu,
        title: "Production & Stage Design",
        description: "Our production team turns ordinary spaces into branded environments. Premium staging, professional lighting rigs, broadcast-quality sound, and strategic signage all work together to deliver an immersive atmosphere that amplifies your message and keeps your audience fully present from opening to close.",
        image: productionStageImg,
      },
    ]}
  />
);

export default LiveEvents;
