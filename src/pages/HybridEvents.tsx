import ServicePageLayout from "@/components/ServicePageLayout";
import hybridEventsImg from "@/assets/hybrid-summit-stage.webp";
import hybridEventsVideo from "@/assets/hybrid-events-video.mp4";

const HybridEvents = () => (
    <ServicePageLayout
    title="Hybrid Events"
    subtitle="Best of Both Worlds"
    description="Bridging in-person and virtual audiences into one cohesive, engaging experience that maximizes reach and impact."
    heroImage={hybridEventsImg}
    heroVideo={hybridEventsVideo}
    stats={[
      { value: 95, suffix: "%", label: "Retention Rate" },
      { value: 3, suffix: "x", label: "Audience Reach" },
      { value: 200, suffix: "+", label: "Hybrid Events" },
    ]}
    features={[
      {
        title: "Unified Experience Design",
        description: "We craft seamless experiences where both physical and remote attendees feel equally valued and engaged throughout your event.",
      },
      {
        title: "Synchronized Content Delivery",
        description: "Real-time content syncing between venues and screens: presentations, polls, and interactions work in perfect harmony.",
      },
      {
        title: "Flexible Scaling",
        description: "Start with an intimate room and extend to 100,000 online viewers. Our infrastructure adapts to your ambition.",
      },
      {
        title: "Post-Event Content Hub",
        description: "All sessions recorded, edited, and delivered as on-demand content, extending the life of your event long after the curtain falls.",
      },
    ]}
  />
);

export default HybridEvents;
