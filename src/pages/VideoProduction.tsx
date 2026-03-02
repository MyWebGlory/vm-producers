import ServicePageLayout from "@/components/ServicePageLayout";
import videoProductionImg from "@/assets/video-production.webp";
import videoProductionVideo from "@/assets/video-production-video.mp4";
import { Play, Camera, Star, PenTool, Film, RefreshCw, Sliders } from "lucide-react";

const seo = {
  title: "Corporate Video Production Services | Event Films & Recaps | VM Producers",
  description: "Professional video production for events, brands, and corporate storytelling. 4K multi-camera production, event highlight reels, brand films, explainer videos, and post-production. 2000+ videos delivered, 48h turnaround.",
  canonical: "/video-production",
  jsonLd: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "serviceType": "Video Production",
        "name": "Video Production",
        "description": "Professional video production for events, brands, and corporate storytelling. 4K multi-camera production, event highlight reels, brand films, and fast 48h turnaround.",
        "provider": { "@type": "Organization", "name": "VM Producers", "url": "https://www.vmproducers.com" },
        "url": "https://www.vmproducers.com/video-production",
        "areaServed": "Worldwide",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Video Production Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Event Promos & Teasers" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Live Multi-Camera Production" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Event Highlight Reels" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Corporate Films & Brand Stories" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Post-Production Excellence" } }
          ]
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.vmproducers.com/" },
          { "@type": "ListItem", "position": 2, "name": "Video Production", "item": "https://www.vmproducers.com/video-production" }
        ]
      }
    ]
  }
};

const VideoProduction = () => (
  <ServicePageLayout
    seo={seo}
    title="Video Production"
    subtitle="Visual Storytelling"
    description="Video that looks like it cost three times what it did. Fast turnaround, broadcast quality, before and after your event."
    heroImage={videoProductionImg}
    heroVideo={videoProductionVideo}
    stats={[
      { value: 2000, suffix: "+", label: "Videos Produced" },
      { value: 4, suffix: "K", label: "Resolution" },
      { value: 48, suffix: "h", label: "Fast Turnaround" },
    ]}
    features={[
      {
        icon: Play,
        title: "Event Promos & Teasers",
        description: "Build pre-event excitement with sharp promotional videos. Your event, campaign, or organization gets promoted to the right audience before the doors open.",
      },
      {
        icon: Camera,
        title: "Live Multi-Camera Production",
        description: "Broadcast-quality multi-camera setups with real-time switching, graphics overlay, and professional directing - on-site or remote.",
      },
      {
        icon: Star,
        title: "Event Highlight Reels",
        description: "Post-event videos that capture your energy and key moments. Built for social sharing, sponsor reports, and board decks, delivered fast.",
      },
      {
        icon: PenTool,
        title: "Whiteboard & Explainer Videos",
        description: "Hand-drawn style explainer videos that educate and hold attention. Ideal for training, onboarding, and complex ideas that need clarity.",
      },
      {
        icon: Film,
        title: "Corporate Films & Brand Stories",
        description: "Cinematic storytelling for company culture, product launches, and brand anthems. Produced for the long shelf life, not just the launch week.",
      },
      {
        icon: RefreshCw,
        title: "Evergreen & On-Demand Content",
        description: "Turn your event recordings into replay-ready content, gated assets, or a full content library that keeps generating value for you month after month.",
      },
      {
        icon: Sliders,
        title: "Post-Production Excellence",
        description: "Color grading, motion graphics, sound design, and subtitles. Raw footage in, polished deliverable out - on your deadline.",
      },
    ]}
  />
);

export default VideoProduction;
