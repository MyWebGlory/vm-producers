import ServicePageLayout from "@/components/ServicePageLayout";
import virtualEventsImg from "@/assets/virtual events.webp";
import virtualEventsVideo from "@/assets/virtual-events-video.mp4";
import virtualEventsConferenceImg from "@/assets/virtual-events-conference.webp";
import virtualEventsControlRoomImg from "@/assets/virtual-events-control-room.webp";
import { Tv, Layout, Users, TrendingUp, Globe, Zap, BarChart2 } from "lucide-react";

const seo = {
  title: "Virtual Event Production Services | Webinars & Conferences | VM Producers",
  description: "Full-service virtual event production for webinars, conferences, and global summits with up to 100,000 attendees. TV-quality livestreaming, multi-language support in 5+ languages, custom branded platforms, and 99.9% uptime.",
  canonical: "/virtual-events",
  jsonLd: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.vmproducers.com/virtual-events#webpage",
        "url": "https://www.vmproducers.com/virtual-events",
        "name": "Virtual Event Production Services | Webinars & Conferences | VM Producers",
        "isPartOf": { "@id": "https://www.vmproducers.com/#website" },
        "about": { "@id": "https://www.vmproducers.com/#organization" },
        "description": "Full-service virtual event production for webinars, conferences, and global summits with up to 100,000 attendees. TV-quality livestreaming, multi-language support, custom branded platforms.",
        "breadcrumb": { "@id": "https://www.vmproducers.com/virtual-events#breadcrumb" }
      },
      {
        "@type": "Service",
        "serviceType": "Virtual Event Production",
        "name": "Virtual Events",
        "description": "Full-service virtual event production for webinars and conferences with up to 100,000 attendees. TV-quality livestreaming, multi-language support, custom branded platforms.",
        "provider": { "@type": "Organization", "name": "VM Producers", "url": "https://www.vmproducers.com" },
        "url": "https://www.vmproducers.com/virtual-events",
        "areaServed": "Worldwide",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Virtual Event Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "TV-Quality Livestream Production" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Branded Platforms" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Multi-Language Support" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Real-Time Engagement Tools" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Analytics & Post-Event Reporting" } }
          ]
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.vmproducers.com/virtual-events#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.vmproducers.com/" },
          { "@type": "ListItem", "position": 2, "name": "Virtual Events", "item": "https://www.vmproducers.com/virtual-events" }
        ]
      }
    ]
  }
};

const VirtualEvents = () => (
  <ServicePageLayout
    seo={seo}
    title="Virtual Events"
    subtitle="Global Reach, Zero Limits"
    featuresBefore="Virtual events that "
    featuresAccent="actually work."
    description="From single-session webinars to global conferences with 100,000 participants, we handle every technical and production detail so you deliver flawlessly, every time."
    heroImage={virtualEventsImg}
    heroVideo={virtualEventsVideo}
    stats={[
      { value: 100, suffix: "K", label: "Max Attendees" },
      { value: 5, suffix: "+", label: "Languages Supported" },
      { value: 99.9, suffix: "%", label: "Uptime" },
    ]}
    features={[
      {
        icon: Tv,
        title: "TV-Quality Livestream Production",
        description: "No more screen-share webinars that lose your audience within minutes. Your production gets the full broadcast treatment: professional graphics, real-time switching between feeds, lower thirds, and a dedicated director managing your show live. Your attendees won't know the difference between your stream and cable television.",
        image: virtualEventsControlRoomImg,
      },
      {
        icon: Layout,
        title: "Custom Branded Virtual Platforms",
        description: "Your virtual event runs on an environment built around your brand, not a generic meeting template. We set up fully branded virtual spaces with custom lobbies, breakout rooms, networking lounges, and sponsor areas, every screen your attendees see carries your identity and reinforces your message.",
        image: virtualEventsImg,
      },
      {
        icon: Users,
        title: "Conferences & Multi-Session Events",
        description: "Running multiple tracks, breakout sessions, and expo booths simultaneously is complex, but you won't feel that complexity. We manage the full conference architecture: session scheduling, virtual expo booths, attendee networking spaces, live contests, and real-time polls, so every participant has a rich, structured experience from start to finish.",
        image: virtualEventsConferenceImg,
      },
      {
        icon: TrendingUp,
        title: "Summits, Series & Shows",
        description: "If your strategy requires building an audience over time, a webinar series or multi-day summit is your answer. We produce recurring events with integrated replay libraries, giveaway mechanics, and affiliate or sponsorship structures, expanding your reach between sessions and turning your content into a long-term revenue and authority asset.",
        image: virtualEventsImg,
      },
      {
        icon: Globe,
        title: "Multi-Language Support",
        description: "Your message should land clearly with every audience, regardless of what language they speak. We provide simultaneous interpretation across 5+ languages, with professional interpreters on standby throughout your event, allowing you to address a truly global room without a single attendee feeling left behind.",
        image: virtualEventsConferenceImg,
      },
      {
        icon: Zap,
        title: "Real-Time Engagement Tools",
        description: "Passive audiences don't convert, and they don't come back. We integrate live polls, moderated Q&A, real-time chat, virtual networking, and gamification directly into your event, all managed for you, so you never have to monitor a chat feed or troubleshoot a poll while trying to run your show.",
        image: virtualEventsControlRoomImg,
      },
      {
        icon: BarChart2,
        title: "Analytics & Post-Event Reporting",
        description: "After the event ends, the data starts working for you. You receive a full post-event report covering attendance figures, session engagement rates, drop-off points, and ROI indicators, everything you need to brief stakeholders, justify the investment, and plan your next event smarter.",
        image: virtualEventsImg,
      },
    ]}
  />
);

export default VirtualEvents;
