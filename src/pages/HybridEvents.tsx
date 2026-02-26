import ServicePageLayout from "@/components/ServicePageLayout";
import hybridEventsImg from "@/assets/hybrid-summit-stage.webp";
import hybridEventsVideo from "@/assets/hybrid-events-video.mp4";
import { Layers, Camera, Volume2, Monitor, MessageSquare, Laptop, Archive } from "lucide-react";

const HybridEvents = () => (
    <ServicePageLayout
    title="Hybrid Events"
    subtitle="Best of Both Worlds"
    description="We create hybrid events that effectively engage both in-person and online attendees - from the same stage, at the same time."
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
        description: "In-person and online audiences feel the same show. Same energy, same content, same moments - no second-class stream.",
      },
      {
        icon: Camera,
        title: "Multi-Camera Live Production",
        description: "Award-winning technical producers run your event on-site and remotely. Branded streams, split-screen layouts, and seamless feed switching.",
      },
      {
        icon: Volume2,
        title: "Full AV Production",
        description: "Lighting, sound, staging, and dedicated crew for the in-person side. We assemble teams of any size, all delivering to the same standard.",
      },
      {
        icon: Monitor,
        title: "Platform Management",
        description: "Complete virtual platform setup, customization, and live support. We handle all the technology so you can concentrate on your content.",
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
        description: "All sessions recorded, edited, and delivered as on-demand content. Your event keeps generating value long after the room empties.",
      },
    ]}
  />
);

export default HybridEvents;
