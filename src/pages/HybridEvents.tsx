import ServicePageLayout from "@/components/ServicePageLayout";
import hybridEventsImg from "@/assets/hybrid-summit-stage.webp";
import hybridEventsVideo from "@/assets/hybrid-events-video.mp4";
import hybridEventsHeroImg from "@/assets/hybrid-events.webp";
import liveEventsImg from "@/assets/live-events.webp";
import virtualEventsControlRoomImg from "@/assets/virtual-events-control-room.webp";
import virtualEventsConferenceImg from "@/assets/virtual-events-conference.webp";
import virtualEventsImg from "@/assets/virtual-events.webp";
import videoProductionImg from "@/assets/video-production.webp";
import { Layers, Camera, Volume2, Monitor, MessageSquare, Laptop, Archive } from "lucide-react";
import { buildWebPageSchema, buildBreadcrumbSchema, buildServiceSchema, TODAY } from "@/components/SEO";

const seo = {
  title: "Hybrid Event Production Services | In-Person & Virtual | VM Producers",
  description: "Expert hybrid event production bridging in-person and virtual audiences seamlessly. Full AV production, multi-camera live streaming, audience engagement tools, and post-event content hub. 95% audience retention rate.",
  canonical: "/hybrid-events",
  dateModified: TODAY,
  jsonLd: {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageSchema({
        path: "/hybrid-events",
        name: "Hybrid Event Production Services | In-Person & Virtual | VM Producers",
        description: "Expert hybrid event production bridging in-person and virtual audiences seamlessly. Full AV production, multi-camera live streaming, audience engagement tools, 95% retention rate.",
      }),
      buildServiceSchema({
        path: "/hybrid-events",
        serviceType: "Hybrid Event Production",
        name: "Hybrid Events",
        description: "Expert hybrid event production bridging in-person and virtual audiences. Full AV production, multi-camera streaming, and unified audience experience.",
        offerNames: ["Unified Experience Design", "Multi-Camera Live Production", "Full AV Production", "Audience Engagement for Both Rooms", "Post-Event Content Hub"],
      }),
      buildBreadcrumbSchema("/hybrid-events", "Hybrid Events"),
    ],
  },
};

const HybridEvents = () => (
    <ServicePageLayout
    seo={seo}
    title="Hybrid Events"
    subtitle="Best of Both Worlds"
    featuresBefore="Hybrid events, "
    featuresAccent="done right."
    description="Your hybrid event brings in-person and online audiences together into one seamless experience, from the same stage, at the same time. No second-class stream, both rooms get the full show."
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
        description: "Your in-person and online audiences experience the same event, same energy, same content, same key moments. We design your production from the ground up to serve both rooms simultaneously, using branded webcasts, multi-screen layouts, and a single unified run-of-show that neither audience ever feels excluded from.",
        image: hybridEventsHeroImg,
      },
      {
        icon: Camera,
        title: "Multi-Camera Live Production",
        description: "Our Head of Hybrid is an award-winning technical producer who has led hundreds of complex productions. We deploy multiple cameras and experienced operators on-site, with a remote production team handling the broadcast feed, delivering branded streams, seamless split-screen layouts, and real-time feed switching that makes your show look and feel world-class.",
        image: hybridEventsImg,
      },
      {
        icon: Volume2,
        title: "Full AV Production",
        description: "Your in-person audience gets the full live production treatment: professional lighting rigs, broadcast-quality sound design, and sharp staging. We assemble dedicated AV crews of any size, all aligned to the same standard, all committed to delivering excellence from the first rehearsal through the closing session.",
        image: liveEventsImg,
      },
      {
        icon: Monitor,
        title: "Platform Management",
        description: "We handle all the technology for you, full platform setup, branding customization, technical rehearsals, and live support throughout your event. Whether you're streaming to a branded webpage, Zoom, or a dedicated virtual event platform, your remote audience gets a polished, stable, and fully branded experience from login to close.",
        image: virtualEventsControlRoomImg,
      },
      {
        icon: MessageSquare,
        title: "Engagement for Both Rooms",
        description: "Keeping two audiences engaged simultaneously requires intentional design. We connect in-person and online attendees through a shared event app with a social wall, group and private messaging, virtual booths, live polls, and speaker Q&A, making every participant feel equally present, regardless of where in the world they're watching from.",
        image: virtualEventsConferenceImg,
      },
      {
        icon: Laptop,
        title: "Online-Only Sessions",
        description: "Your virtual attendees get more than a window into the room. We produce exclusive online-only sessions, digital breakouts, and virtual networking opportunities designed specifically for your remote audience, extending your event's reach and giving your online community a compelling reason to show up and stay engaged.",
        image: virtualEventsImg,
      },
      {
        icon: Archive,
        title: "Post-Event Content Hub",
        description: "Every session is recorded, edited, and packaged for on-demand access. Your event doesn't end when the room empties, it becomes a content library that continues generating value, training new team members, attracting new attendees, and giving sponsors lasting visibility well beyond the day of the event.",
        image: videoProductionImg,
      },
    ]}
  />
);

export default HybridEvents;
