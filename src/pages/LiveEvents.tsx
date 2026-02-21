import ServicePageLayout from "@/components/ServicePageLayout";
import liveEventsImg from "@/assets/live-events.webp";
import liveEventsVideo from "@/assets/live-events-video.mp4";

const LiveEvents = () => (
  <ServicePageLayout
    title="Live Events"
    subtitle="In-Person Excellence"
    description="Seamless and unforgettable in-person experiences, from intimate gatherings to large-scale productions that leave lasting impressions."
    heroImage={liveEventsImg}
    heroVideo={liveEventsVideo}
    stats={[
      { value: 500, suffix: "+", label: "Events Delivered" },
      { value: 50, suffix: "+", label: "Countries" },
      { value: 100, suffix: "%", label: "Success Rate" },
    ]}
    features={[
      {
        title: "End-to-End Production",
        description: "From concept to execution, we manage every detail: staging, lighting, sound, and logistics, so you can focus on your message.",
      },
      {
        title: "Venue Sourcing & Management",
        description: "Access our global network of premium venues. We handle negotiations, setup, and coordination to ensure a flawless experience.",
      },
      {
        title: "Live Streaming Integration",
        description: "Extend your reach beyond the venue with broadcast-quality live streaming, bringing your event to audiences worldwide in real time.",
      },
      {
        title: "On-Site Technical Support",
        description: "Our experienced technical crew ensures everything runs smoothly: AV, networking, power, and contingency plans for any scenario.",
      },
    ]}
  />
);

export default LiveEvents;
