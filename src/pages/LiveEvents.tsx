import ServicePageLayout from "@/components/ServicePageLayout";
import liveEventsImg from "@/assets/live-events.webp";
import liveEventsVideo from "@/assets/live-events-video.mp4";
import { Layers, MapPin, Radio, Wrench } from "lucide-react";

const LiveEvents = () => (
  <ServicePageLayout
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
