import ServicePageLayout from "@/components/ServicePageLayout";
import hybridEventsImg from "@/assets/hybrid-summit-stage.webp";
import hybridEventsVideo from "@/assets/hybrid-events-video.mp4";
import liveEventsImg from "@/assets/live-events.webp";
import productLaunchesImg from "@/assets/Product-Launches_1.webp";
import executiveSummitsImg from "@/assets/executive-summits.webp";
import townHallsImg from "@/assets/Town-Halls-_-All-Hands.webp";
import virtualEventsControlRoomImg from "@/assets/virtual-events-control-room.webp";
import videoProductionImg from "@/assets/video-production.webp";
import captureEveryMomentImg from "@/assets/capture-every-moment.webp";
import webinarsTrainingImg from "@/assets/webinars-training.webp";
import { Layers, Camera, Volume2, Monitor, MessageSquare, Laptop, Archive } from "lucide-react";
import { buildWebPageSchema, buildBreadcrumbSchema, buildServiceSchema, TODAY } from "@/components/SEO";

const seo = {
  title: "Hybrid Event Production Services | In-Person & Virtual | VM Producers",
  description: "Expert hybrid event production connecting in-person and virtual audiences. Full AV production, multi-camera live streaming, audience engagement tools, and post-event content hub. 95% audience retention rate.",
  canonical: "/hybrid-events",
  dateModified: TODAY,
  jsonLd: {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageSchema({
        path: "/hybrid-events",
        name: "Hybrid Event Production Services | In-Person & Virtual | VM Producers",
        description: "Expert hybrid event production connecting in-person and virtual audiences. Full AV production, multi-camera live streaming, audience engagement tools, 95% retention rate.",
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
    featuresDescription="One cohesive production running across two rooms. Here's everything we put in place to make sure the experience holds together on both sides."
    description="Your hybrid event brings in-person and online audiences together into one seamless experience, from the same stage, at the same time. No second-class stream, both rooms get the full show."
    heroImage={hybridEventsImg}
    heroVideo={hybridEventsVideo}
    stats={[
      { value: 95, suffix: "%", label: "Retention Rate" },
      { value: 3, suffix: "x", label: "Audience Reach" },
      { value: 200, suffix: "+", label: "Hybrid Events" },
    ]}
    featuresIcon={Layers}
  typeCardsTitle="What your next event could look like"
  typeCards={[
      {
        label: "Leadership",
        title: "Executive Summits",
        description: "Hybrid summits where C-suite speakers command the room and remote executives join with the same presence. No one feels like an afterthought.",
        image: executiveSummitsImg,
      },
      {
        label: "Go To Market",
        title: "Product Launches",
        description: "Launch to a live audience and a global stream simultaneously. Both rooms get the reveal, the energy, and the follow-up content.",
        image: productLaunchesImg,
      },
      {
        label: "Internal Comms",
        title: "Town Halls & All-Hands",
        description: "Company-wide meetings where in-office and remote employees participate equally. Q&A, polls, and culture moments included.",
        image: townHallsImg,
      },
    ]}
    features={[
      {
        icon: Layers,
        title: "Unified Experience Design",
        description: (
          <>
            <p>Your in-person and online audiences experience the same event � same energy, same content, same key moments.</p>
            <p className="mt-2">We build your production to serve both rooms simultaneously, so neither audience ever feels excluded:</p>
            <ul className="mt-1 space-y-0.5 list-none pl-0">
              <li>- Branded webcasts</li>
              <li>- Multi-screen layouts</li>
              <li>- A single unified run-of-show</li>
            </ul>
          </>
        ),
        image: hybridEventsImg,
      },
      {
        icon: Camera,
        title: "Multi-Camera Live Production",
        description: (
          <>
            <p>Our Head of Hybrid is an award-winning technical producer who has led hundreds of complex productions.</p>
            <p className="mt-2">We deploy the full broadcast setup on-site:</p>
            <ul className="mt-1 space-y-0.5 list-none pl-0">
              <li>- Multiple cameras with experienced operators</li>
              <li>- A remote production team handling the broadcast feed</li>
              <li>- Branded streams and sharp split-screen layouts</li>
              <li>- Real-time feed switching for a broadcast-quality show</li>
            </ul>
          </>
        ),
        image: captureEveryMomentImg,
      },
      {
        icon: Volume2,
        title: "Full AV Production",
        description: (
          <>
            <p>Your in-person audience gets the full live production treatment:</p>
            <ul className="mt-1 space-y-0.5 list-none pl-0">
              <li>- Professional lighting rigs</li>
              <li>- Broadcast-quality sound design</li>
              <li>- Sharp staging</li>
            </ul>
            <p className="mt-2">We assemble AV crews of any size, all aligned to the same standard, from the first rehearsal through the closing session.</p>
          </>
        ),
        image: liveEventsImg,
      },
      {
        icon: Monitor,
        title: "Platform Management",
        description: (
          <>
            <p>We handle all the technology for you:</p>
            <ul className="mt-1 space-y-0.5 list-none pl-0">
              <li>- Full platform setup</li>
              <li>- Branding customization</li>
              <li>- Technical rehearsals</li>
              <li>- Live support throughout your event</li>
            </ul>
            <p className="mt-2">Whether you're streaming to a branded webpage, Zoom, or a virtual event platform � your remote audience gets a polished, stable, fully branded experience from login to close.</p>
          </>
        ),
        image: virtualEventsControlRoomImg,
      },
      {
        icon: MessageSquare,
        title: "Engagement for Both Rooms",
        description: (
          <>
            <p>Keeping two audiences engaged simultaneously requires intentional design.</p>
            <p className="mt-2">We connect in-person and online attendees through a shared event app:</p>
            <ul className="mt-1 space-y-0.5 list-none pl-0">
              <li>- Social wall</li>
              <li>- Group and private messaging</li>
              <li>- Virtual booths</li>
              <li>- Live polls</li>
              <li>- Speaker Q&A</li>
            </ul>
            <p className="mt-2">Every participant feels equally present, wherever in the world they're watching from.</p>
          </>
        ),
        image: townHallsImg,
      },
      {
        icon: Laptop,
        title: "Online-Only Sessions",
        description: (
          <>
            <p>Your virtual attendees get more than a window into the room.</p>
            <p className="mt-2">We produce sessions designed specifically for your remote audience:</p>
            <ul className="mt-1 space-y-0.5 list-none pl-0">
              <li>- Exclusive online-only sessions</li>
              <li>- Digital breakouts</li>
              <li>- Virtual networking opportunities</li>
            </ul>
            <p className="mt-2">This extends your event's reach and gives your online community a compelling reason to show up and stay engaged.</p>
          </>
        ),
        image: webinarsTrainingImg,
      },
      {
        icon: Archive,
        title: "Post-Event Content Hub",
        description: (
          <>
            <p>Every session is recorded, edited, and packaged for on-demand access.</p>
            <p className="mt-2">Your event doesn't end when the room empties � it becomes a content library that continues:</p>
            <ul className="mt-1 space-y-0.5 list-none pl-0">
              <li>- Training new team members</li>
              <li>- Attracting new attendees</li>
              <li>- Giving sponsors lasting visibility well beyond the event day</li>
            </ul>
          </>
        ),
        image: videoProductionImg,
      },
    ]}
  />
);

export default HybridEvents;
