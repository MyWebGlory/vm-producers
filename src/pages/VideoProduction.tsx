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
    featuresDescription="From shareable pre-event teasers to broadcast-quality live coverage and polished post-event recaps, here's everything we produce for you."
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
        description: (
          <>
            <p>Your event needs an audience before it has one.</p>
            <p className="mt-2">We produce sharp promotional videos that build anticipation and drive registrations � for your event, your cause, your campaign, or your organization.</p>
            <p className="mt-2">From short-form social cuts to full-length promo reels, your story gets told in a way that makes people want to show up.</p>
          </>
        ),
        image: videoProductionImg,
      },
      {
        icon: Camera,
        title: "Live Multi-Camera Production",
        description: (
          <>
            <p>On the day, your production is in the hands of a professional broadcast team.</p>
            <p className="mt-2">We deploy:</p>
            <ul className="mt-1 space-y-0.5 list-none pl-0">
              <li>- Multi-camera setups</li>
              <li>- Real-time feed switching</li>
              <li>- Live graphics overlay</li>
              <li>- Professional directing � on-site or fully remote</li>
            </ul>
            <p className="mt-2">Your audience sees a polished, directed show, not a static single-angle recording.</p>
          </>
        ),
        image: liveEventsImg,
      },
      {
        icon: Star,
        title: "Event Highlight Reels",
        description: (
          <>
            <p>Within days of your event closing, you receive a professionally edited highlight reel ready to use immediately.</p>
            <p className="mt-2">Built for:</p>
            <ul className="mt-1 space-y-0.5 list-none pl-0">
              <li>- Social sharing</li>
              <li>- Sponsor deliverables</li>
              <li>- Board presentations</li>
              <li>- Future marketing campaigns</li>
            </ul>
            <p className="mt-2">It captures the energy of your event and keeps working for you long after the show ends.</p>
          </>
        ),
        image: attractBuildHypeImg,
      },
      {
        icon: PenTool,
        title: "Whiteboard & Explainer Videos",
        description: (
          <>
            <p>Some ideas are too complex for a talking-head video.</p>
            <p className="mt-2">Our hand-drawn whiteboard explainer videos break down sophisticated concepts into clear, engaging visual narratives. Ideal for:</p>
            <ul className="mt-1 space-y-0.5 list-none pl-0">
              <li>- Product training</li>
              <li>- Onboarding programs</li>
              <li>- Investor pitches</li>
              <li>- Any situation where you need your audience to actually understand what you're saying</li>
            </ul>
          </>
        ),
        image: whiteboardExplainerImg,
      },
      {
        icon: Film,
        title: "Corporate Films & Brand Stories",
        description: (
          <>
            <p>Your company's story deserves cinematic treatment.</p>
            <p className="mt-2">We produce corporate films for:</p>
            <ul className="mt-1 space-y-0.5 list-none pl-0">
              <li>- Culture showcases</li>
              <li>- Product launches</li>
              <li>- Brand anthems</li>
              <li>- Executive keynotes</li>
            </ul>
            <p className="mt-2">With the production value to make a lasting impression on investors, clients, and potential hires alike.</p>
          </>
        ),
        image: captureEveryMomentImg,
      },
      {
        icon: RefreshCw,
        title: "Evergreen & On-Demand Content",
        description: (
          <>
            <p>Your event recordings have a longer shelf life than your event.</p>
            <p className="mt-2">We edit, package, and structure your footage into:</p>
            <ul className="mt-1 space-y-0.5 list-none pl-0">
              <li>- Replay-ready on-demand assets</li>
              <li>- Gated content libraries</li>
              <li>- Ongoing series</li>
            </ul>
            <p className="mt-2">Turning a single production day into months of marketing, education, and audience growth.</p>
          </>
        ),
        image: extendYourReachImg,
      },
      {
        icon: Sliders,
        title: "Post-Production & Delivery",
        description: (
          <>
            <p>Raw footage is just the starting point.</p>
            <p className="mt-2">Our post-production team handles:</p>
            <ul className="mt-1 space-y-0.5 list-none pl-0">
              <li>- Color grading</li>
              <li>- Motion graphics</li>
              <li>- Sound design</li>
              <li>- Subtitle tracks</li>
              <li>- Platform-specific exports</li>
            </ul>
            <p className="mt-2">Broadcast-ready files delivered on your deadline, every time, with the polish your brand demands.</p>
          </>
        ),
        image: productionStageImg,
      },
    ]}
  />
);

export default VideoProduction;
