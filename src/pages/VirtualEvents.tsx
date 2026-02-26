import ServicePageLayout from "@/components/ServicePageLayout";
import virtualEventsImg from "@/assets/virtual-events-control-room.webp";
import virtualEventsVideo from "@/assets/virtual-events-video.mp4";
import { Tv, Layout, Users, TrendingUp, Globe, Zap, BarChart2 } from "lucide-react";

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
        icon: Tv,
        title: "TV-Quality Livestream Production",
        description: "No screen-share webinars. Every production gets professional broadcast quality: graphics, switching, lower thirds, and a director on the call.",
      },
      {
        icon: Layout,
        title: "Custom Branded Platforms",
        description: "Fully branded virtual environments with custom lobbies, breakout rooms, and networking lounges - built around your event, not a generic template.",
      },
      {
        icon: Users,
        title: "Conferences & Multi-Session Events",
        description: "Simultaneous sessions, expo booths, networking lounges, contests, and live polls. Everything a physical conference offers, delivered online.",
      },
      {
        icon: TrendingUp,
        title: "Summits, Series & Shows",
        description: "Multi-day summits and webinar series with integrated replays, giveaways, and sponsor visibility. Built to grow your audience between sessions.",
      },
      {
        icon: Globe,
        title: "Multi-Language Support",
        description: "Simultaneous interpretation in 5+ languages with professional interpreters on standby, so your event lands clearly with every audience.",
      },
      {
        icon: Zap,
        title: "Real-Time Engagement Tools",
        description: "Live polls, Q&A moderation, chat, virtual networking, and gamification - all managed by our team so you never have to watch a chat scroll alone.",
      },
      {
        icon: BarChart2,
        title: "Analytics & Post-Event Reporting",
        description: "Attendance figures, drop-off rates, session engagement, and ROI in one clean report. Everything you need to brief stakeholders.",
      },
    ]}
  />
);

export default VirtualEvents;
