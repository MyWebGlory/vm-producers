import ServicePageLayout from "@/components/ServicePageLayout";
import videoProductionImg from "@/assets/video-production.webp";
import videoProductionVideo from "@/assets/video-production-video.mp4";
import liveEventsImg from "@/assets/live-events.webp";
import aboutEventImg from "@/assets/about-event.webp";
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
    description="Video that looks like it cost three times what it did. We craft content that works before your event, during the show, and long after it ends."
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
        title: "Promotional Videos & Event Teasers",
        description: "Your event needs an audience before it has one. We produce sharp promotional videos that build anticipation and drive registrations, for your event, your cause, your campaign, or your organization. From short-form social cuts to full-length promo reels, your story gets told in a way that makes people want to show up.",
        image: videoProductionImg,
      },
      {
        icon: Camera,
        title: "Live Multi-Camera Production",
        description: "On the day, your production is in the hands of a professional broadcast team. Multi-camera setups, real-time feed switching, live graphics overlay, and professional directing, on-site or fully remote. Your audience sees a polished, directed show, not a static single-angle recording.",
        image: liveEventsImg,
      },
      {
        icon: Star,
        title: "Event Highlight Reels",
        description: "Within days of your event closing, you receive a professionally edited highlight reel built for maximum impact. These are crafted for social sharing, sponsor deliverables, board presentations, and future marketing campaigns, capturing the energy of your event and turning it into content that keeps working for you.",
        image: aboutEventImg,
      },
      {
        icon: PenTool,
        title: "Whiteboard & Explainer Videos",
        description: "Some ideas are too complex for a talking-head video. Our hand-drawn whiteboard explainer videos break down sophisticated concepts into clear, engaging visual narratives, ideal for product training, onboarding programs, investor pitches, and any situation where you need your audience to actually understand what you're saying.",
        image: videoProductionImg,
      },
      {
        icon: Film,
        title: "Corporate Films & Brand Stories",
        description: "Your company's story deserves cinematic treatment. We produce corporate films for company culture showcases, major product launches, brand anthems, and executive keynotes, with the production value and visual storytelling craft to make a lasting impression on investors, clients, and potential hires alike.",
        image: liveEventsImg,
      },
      {
        icon: RefreshCw,
        title: "Evergreen & On-Demand Content",
        description: "Your event recordings have a longer shelf life than your event. We edit, package, and structure your session footage into replay-ready on-demand assets, gated content libraries, and ongoing series, turning a single production day into months of marketing, education, and audience growth.",
        image: aboutEventImg,
      },
      {
        icon: Sliders,
        title: "Post-Production Excellence",
        description: "Raw footage is just the starting point. Our post-production team handles color grading, motion graphics, sound design, subtitle tracks, and platform-specific exports, delivering broadcast-ready files on your deadline, every time, with the polish your brand demands.",
        image: videoProductionImg,
      },
    ]}
  />
);

export default VideoProduction;
