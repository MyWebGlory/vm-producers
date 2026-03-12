import ServicePageLayout from "@/components/ServicePageLayout";
import virtualEventsImg from "@/assets/virtual events.webp";
import virtualEventsVideo from "@/assets/virtual events.mp4";
import virtualEventsControlRoomImg from "@/assets/virtual events.webp";
import strategicConsultingImg from "@/assets/Strategic Consulting.webp";
import conferencesSummitsSeriesImg from "@/assets/Conferences & Summits.webp";
import webinarsTrainingImg from "@/assets/Broad Audience Webinars & Training.webp";
import globalTownHallsImg from "@/assets/Global Town Halls.webp";
import virtualTradeShowsImg from "@/assets/virtual trade show.webp";
import analyticsReportingImg from "@/assets/Analytics & Post-Event Reporting.webp";
import { Tv, Layout, Users, Globe, Zap, BarChart2, Target } from "lucide-react";
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
    featuresDescription="Every platform, tool, and technical layer your event needs, built around your audience and owned entirely by our team. Here's what's included."
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
        icon: Target,
        title: "Strategic Consulting",
        description: (
          <>
            <p>Our experienced event planning and marketing consultants work with you before a single technical detail is finalized.</p>
            <p className="mt-2">We consult on every dimension:</p>
            <ul className="mt-1 space-y-0.5 list-none pl-0">
              <li>- Event strategy and objective definition</li>
              <li>- Format decisions and content architecture</li>
              <li>- Platform selection</li>
              <li>- Full production planning aligned to your mission</li>
            </ul>
          </>
        ),
        image: strategicConsultingImg,
      },
      {
        icon: Tv,
        title: "TV-Quality Livestream Production",
        description: (
          <>
            <p>No more screen-share webinars that lose your audience within minutes. Your production gets the full broadcast treatment: professional graphics, real-time feed switching, lower thirds, and a dedicated director managing your show live.</p>
            <p className="mt-2">Your attendees won't know the difference between your stream and cable television.</p>
          </>
        ),
        image: virtualEventsControlRoomImg,
      },
      {
        icon: Layout,
        title: "Custom Branded Virtual Platforms",
        description: (
          <>
            <p>Your virtual event runs on an environment built around your brand, not a generic meeting template. We set up fully branded virtual spaces with custom lobbies, breakout rooms, networking lounges, and sponsor areas.</p>
            <p className="mt-2">Every screen your attendees see carries your identity and reinforces your message.</p>
          </>
        ),
        image: virtualTradeShowsImg,
      },
      {
        icon: Users,
        title: "Conferences, Summits & Series",
        description: (
          <>
            <p>Running multiple tracks, breakout sessions, and expo booths simultaneously is complex, but you won't feel that complexity.</p>
            <p className="mt-2">We manage the full conference architecture:</p>
            <ul className="mt-1 space-y-0.5 list-none pl-0">
              <li>- Session scheduling</li>
              <li>- Virtual expo booths</li>
              <li>- Attendee networking spaces</li>
              <li>- Live contests and real-time polls</li>
            </ul>
            <p className="mt-2">For recurring formats, we produce webinar series and multi-day summits with integrated replay libraries, giveaway mechanics, and affiliate or sponsorship structures, turning your content into a long-term revenue and authority asset.</p>
          </>
        ),
        image: conferencesSummitsSeriesImg,
      },
      {
        icon: Zap,
        title: "Global Engagement: Live & Multilingual",
        description: (
          <>
            <p>Passive audiences don't convert, and they don't come back.</p>
            <p className="mt-2">We integrate engagement tools directly into your event, all managed for you:</p>
            <ul className="mt-1 space-y-0.5 list-none pl-0">
              <li>- Live polls</li>
              <li>- Moderated Q&A</li>
              <li>- Real-time chat</li>
              <li>- Virtual networking</li>
              <li>- Gamification</li>
            </ul>
            <p className="mt-2">We also provide simultaneous interpretation across 5+ languages, with professional interpreters on standby, so every attendee feels fully included.</p>
          </>
        ),
        image: globalTownHallsImg,
      },
      {
        icon: BarChart2,
        title: "Analytics & Post-Event Reporting",
        description: (
          <>
            <p>After the event ends, the data starts working for you. You receive a full post-event report covering attendance figures, session engagement rates, drop-off points, and ROI indicators.</p>
            <p className="mt-2">Everything you need to brief stakeholders, justify the investment, and plan your next event smarter.</p>
          </>
        ),
        image: analyticsReportingImg,
      },
    ]}
  />
);

export default VirtualEvents;
