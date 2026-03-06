import ServicePageLayout from "@/components/ServicePageLayout";
import virtualEventsImg from "@/assets/virtual-events.webp";
import virtualEventsVideo from "@/assets/virtual-events-video.mp4";
import virtualEventsControlRoomImg from "@/assets/virtual-events-control-room.webp";
import conferencesSummitsSeriesImg from "@/assets/conferences-summits-series.webp";
import webinarsTrainingImg from "@/assets/webinars-training.webp";
import globalTownHallsImg from "@/assets/global-town-halls.webp";
import virtualTradeShowsImg from "@/assets/virtual-trade-shows.webp";
import extendYourReachImg from "@/assets/extend-your-reach.webp";
import { Tv, Layout, Users, Globe, Zap, BarChart2 } from "lucide-react";
import { buildWebPageSchema, buildBreadcrumbSchema, buildServiceSchema, TODAY } from "@/components/SEO";

const seo = {
  title: "Virtual Event Production Services | Webinars & Conferences | VM Producers",
  description: "Full-service virtual event production for webinars, conferences, and global summits with up to 100,000 attendees. TV-quality livestreaming, multi-language support in 5+ languages, custom branded platforms, and 99.9% uptime.",
  canonical: "/virtual-events",
  dateModified: TODAY,
  jsonLd: {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageSchema({
        path: "/virtual-events",
        name: "Virtual Event Production Services | Webinars & Conferences | VM Producers",
        description: "Full-service virtual event production for webinars, conferences, and global summits with up to 100,000 attendees. TV-quality livestreaming, multi-language support, custom branded platforms.",
      }),
      buildServiceSchema({
        path: "/virtual-events",
        serviceType: "Virtual Event Production",
        name: "Virtual Events",
        description: "Full-service virtual event production for webinars and conferences with up to 100,000 attendees. TV-quality livestreaming, multi-language support, custom branded platforms.",
        offerNames: ["TV-Quality Livestream Production", "Custom Branded Platforms", "Multi-Language Support", "Real-Time Engagement Tools", "Analytics & Post-Event Reporting"],
      }),
      buildBreadcrumbSchema("/virtual-events", "Virtual Events"),
    ],
  },
};

const VirtualEvents = () => (
  <ServicePageLayout
    seo={seo}
    title="Virtual Events"
    subtitle="Global Reach, Zero Limits"
    featuresBefore="Virtual events that "
    featuresAccent="actually work."
    featuresDescription="From the platform setup to the post-event report, we handle every technical and production detail so you can focus on your audience, not your screen."
    description="From single-session webinars to global conferences with 100,000 participants, we handle every technical and production detail so you deliver flawlessly, every time."
    heroImage={virtualEventsImg}
    heroVideo={virtualEventsVideo}
    stats={[
      { value: 100, suffix: "K", label: "Max Attendees" },
      { value: 5, suffix: "+", label: "Languages Supported" },
      { value: 99.9, suffix: "%", label: "Uptime" },
    ]}
    featuresIcon={Globe}
  typeCardsTitle="What your next event could look like"
  typeCards={[
      {
        label: "Broad Audience",
        title: "Webinars & Training",
        description: "Single-session webinars and corporate training broadcasts produced to TV quality, keeping every participant engaged from start to finish.",
        image: webinarsTrainingImg,
      },
      {
        label: "Company Wide",
        title: "Global Town Halls",
        description: "Company-wide broadcasts for audiences across time zones, languages, and devices. Executed flawlessly with zero dropped connections.",
        image: globalTownHallsImg,
      },
      {
        label: "Revenue Driven",
        title: "Virtual Trade Shows",
        description: "Fully branded virtual expos with sponsor booths, networking lounges, and live demos that turn browsers into buyers.",
        image: virtualTradeShowsImg,
      },
    ]}
    features={[
      {
        icon: Tv,
        title: "TV-Quality Livestream Production",
        description: "No more screen-share webinars that lose your audience within minutes. Your production gets the full broadcast treatment: professional graphics, real-time switching between feeds, lower thirds, and a dedicated director managing your show live. Your attendees won't know the difference between your stream and cable television.",
        image: virtualEventsControlRoomImg,
      },
      {
        icon: Layout,
        title: "Custom Branded Virtual Platforms",
        description: "Your virtual event runs on an environment built around your brand, not a generic meeting template. We set up fully branded virtual spaces with custom lobbies, breakout rooms, networking lounges, and sponsor areas, every screen your attendees see carries your identity and reinforces your message.",
        image: virtualEventsImg,
      },
      {
        icon: Users,
        title: "Conferences, Summits & Series",
...description: "Running multiple tracks, breakout sessions, and expo booths simultaneously is complex, but you won't feel that complexity. We manage the full conference architecture: session scheduling, virtual expo booths, attendee networking spaces, live contests, and real-time polls. And if your strategy requires building an audience over time, we produce recurring webinar series and multi-day summits with integrated replay libraries, giveaway mechanics, and affiliate or sponsorship structures, turning your content into a long-term revenue and authority asset.",
        image: conferencesSummitsSeriesImg,
      },
      {
        icon: Zap,
        title: "Global Engagement: Live & Multilingual",
        description: "Passive audiences don't convert, and they don't come back. We integrate live polls, moderated Q&A, real-time chat, virtual networking, and gamification directly into your event, all managed for you, so you never have to monitor a chat feed while running your show. And your message lands clearly with every audience: we provide simultaneous interpretation across 5+ languages, with professional interpreters on standby throughout, so every attendee feels fully included regardless of where in the world they're watching from.",
        image: globalTownHallsImg,
      },
      {
        icon: BarChart2,
        title: "Analytics & Post-Event Reporting",
        description: "After the event ends, the data starts working for you. You receive a full post-event report covering attendance figures, session engagement rates, drop-off points, and ROI indicators, everything you need to brief stakeholders, justify the investment, and plan your next event smarter.",
        image: extendYourReachImg,
      },
    ]}
  />
);

export default VirtualEvents;
