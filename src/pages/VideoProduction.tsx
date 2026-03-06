import ServicePageLayout from "@/components/ServicePageLayout";
import videoProductionImg from "@/assets/video-production.webp";
import videoProductionVideo from "@/assets/video-production-video.mp4";
import liveEventsImg from "@/assets/live-events.webp";
import aboutEventImg from "@/assets/about-event.webp";
import attractBuildHypeImg from "@/assets/attract-build-hype.webp";
import captureEveryMomentImg from "@/assets/capture-every-moment.webp";
import extendYourReachImg from "@/assets/extend-your-reach.webp";
import productionStageImg from "@/assets/production-stage-design.webp";
import whiteboardExplainerImg from "@/assets/whiteboard-explainer-videos.webp";
import { Play, Camera, Star, PenTool, Film, RefreshCw, Sliders } from "lucide-react";
import { buildWebPageSchema, buildBreadcrumbSchema, buildServiceSchema, TODAY } from "@/components/SEO";

const seo = {
  title: "Corporate Video Production Services | Event Films & Recaps | VM Producers",
  description: "Professional video production for events, brands, and corporate storytelling. 4K multi-camera production, event highlight reels, brand films, explainer videos, and post-production. 2000+ videos delivered, 48h turnaround.",
  canonical: "/video-production",
  dateModified: TODAY,
  jsonLd: {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageSchema({
        path: "/video-production",
        name: "Corporate Video Production Services | Event Films & Recaps | VM Producers",
        description: "Professional video production for events, brands, and corporate storytelling. 4K multi-camera production, event highlight reels, brand films, and fast 48h turnaround. 2000+ videos delivered.",
      }),
      buildServiceSchema({
        path: "/video-production",
        serviceType: "Video Production",
        name: "Video Production",
        description: "Professional video production for events, brands, and corporate storytelling. 4K multi-camera production, event highlight reels, brand films, and fast 48h turnaround.",
        offerNames: ["Event Promos & Teasers", "Live Multi-Camera Production", "Event Highlight Reels", "Corporate Films & Brand Stories", "Post-Production & Delivery"],
      }),
      buildBreadcrumbSchema("/video-production", "Video Production"),
    ],
  },
};

const VideoProduction = () => (
  <ServicePageLayout
    seo={seo}
    title="Video Production"
    subtitle="Visual Storytelling"
    featuresBefore="Video that "
    featuresAccent="tells your story."
    featuresDescription="We produce content for every stage of your event lifecycle: before, during, and long after the cameras stop rolling."
    description="Video that looks like it cost three times what it did. We build content that works before your event, during the show, and long after it ends."
    heroImage={videoProductionImg}
    heroVideo={videoProductionVideo}
    stats={[
      { value: 2000, suffix: "+", label: "Videos Produced" },
      { value: 4, suffix: "K", label: "Resolution" },
      { value: 48, suffix: "h", label: "Fast Turnaround" },
    ]}
    featuresIcon={Film}
  typeCardsTitle="What you'll walk away with"
  typeCards={[
      {
        label: "Before the Event",
        title: "Attract & Build Hype",
        description: "Trailers, teasers, and speaker spotlights that build anticipation and drive registrations before a single ticket is sold.",
        image: attractBuildHypeImg,
      },
      {
        label: "During the Event",
        title: "Capture Every Moment",
        description: "Multi-camera live coverage that preserves your event's energy in broadcast-quality footage, ready to repurpose the moment the show ends.",
        image: captureEveryMomentImg,
      },
      {
        label: "After the Event",
        title: "Extend Your Reach",
        description: "Highlight reels, session recaps, and social cuts that keep your event alive online for weeks after the last attendee logs off.",
        image: extendYourReachImg,
      },
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
        description: "Within days of your event closing, you receive a professionally edited highlight reel ready to use immediately. Built for social sharing, sponsor deliverables, board presentations, and future marketing campaigns, it captures the energy of your event and keeps working for you long after the show ends.",
        image: attractBuildHypeImg,
      },
      {
        icon: PenTool,
        title: "Whiteboard & Explainer Videos",
        description: "Some ideas are too complex for a talking-head video. Our hand-drawn whiteboard explainer videos break down sophisticated concepts into clear, engaging visual narratives, ideal for product training, onboarding programs, investor pitches, and any situation where you need your audience to actually understand what you're saying.",
        image: whiteboardExplainerImg,
      },
      {
        icon: Film,
        title: "Corporate Films & Brand Stories",
        description: "Your company's story deserves cinematic treatment. We produce corporate films for culture showcases, product launches, brand anthems, and executive keynotes, with the production value to make a lasting impression on investors, clients, and potential hires alike.",
        image: captureEveryMomentImg,
      },
      {
        icon: RefreshCw,
        title: "Evergreen & On-Demand Content",
        description: "Your event recordings have a longer shelf life than your event. We edit, package, and structure your session footage into replay-ready on-demand assets, gated content libraries, and ongoing series, turning a single production day into months of marketing, education, and audience growth.",
        image: extendYourReachImg,
      },
      {
        icon: Sliders,
        title: "Post-Production & Delivery",
        description: "Raw footage is just the starting point. Our post-production team handles color grading, motion graphics, sound design, subtitle tracks, and platform-specific exports, delivering broadcast-ready files on your deadline, every time, with the polish your brand demands.",
        image: productionStageImg,
      },
    ]}
  />
);

export default VideoProduction;
