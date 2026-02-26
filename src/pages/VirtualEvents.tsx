import ServicePageLayout from "@/components/ServicePageLayout";
import virtualEventsImg from "@/assets/virtual-events-control-room.webp";
import virtualEventsVideo from "@/assets/virtual-events-video.mp4";

const VirtualEvents = () => (
  <ServicePageLayout
    title="Virtual Events"
    subtitle="Global Reach, Zero Limits"
    description="All-inclusive virtual production for webinars to large-scale conferences with up to 100,000 attendees across the globe."
    heroImage={virtualEventsImg}
    heroVideo={virtualEventsVideo}
    stats={[
      { value: 100, suffix: "K", label: "Max Attendees" },
      { value: 5, suffix: "+", label: "Languages Supported" },
      { value: 99.9, suffix: "%", label: "Uptime" },
    ]}
    features={[
      {
        title: "Custom Virtual Platforms",
        description: "Branded virtual environments tailored to your event, from lobbies to breakout rooms, fully interactive and engagement-driven.",
      },
      {
        title: "Real-Time Engagement",
        description: "Live polls, Q&A, chat moderation, networking lounges, and gamification to keep your audience active and connected.",
      },
      {
        title: "Multi-Language Support",
        description: "Simultaneous translation in 5+ languages with professional interpreters, making your event accessible to a global audience.",
      },
      {
        title: "Analytics & Reporting",
        description: "Attendance, drop-off rates, session engagement, ROI. One clean report after the event.",
      },
    ]}
  />
);

export default VirtualEvents;
