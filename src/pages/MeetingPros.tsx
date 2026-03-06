import ServicePageLayout from "@/components/ServicePageLayout";
import meetingProsImg from "@/assets/meeting-pros.webp";
import meetingProsVideo from "@/assets/meeting-pros-video.mp4";
import aboutEventImg from "@/assets/about-event.webp";
import virtualEventsControlRoomImg from "@/assets/virtual-events-control-room.webp";
import eventDirectorsImg from "@/assets/event-directors.webp";
import productionStageImg from "@/assets/production-stage-design.webp";
import logisticsCoordinatorsImg from "@/assets/logistics-coordinators.webp";
import venueLogisticsImg from "@/assets/venue-logistics.webp";
import { Zap, ClipboardList, MapPin, Plane, Monitor, Grid2x2 } from "lucide-react";
import { buildWebPageSchema, buildBreadcrumbSchema, buildServiceSchema, TODAY } from "@/components/SEO";

const seo = {
  title: "Meeting Professionals Network | Global Event Staffing | VM Producers",
  description: "Worldwide network of verified event professionals matched within 48 hours across 70+ countries and 55+ specialties. Event directors, AV technicians, travel managers, on-site coordinators, and more. 12,000+ meetings supported.",
  canonical: "/meeting-pros",
  dateModified: TODAY,
  jsonLd: {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageSchema({
        path: "/meeting-pros",
        name: "Meeting Professionals Network | Global Event Staffing | VM Producers",
        description: "Worldwide network of verified event professionals matched within 48 hours across 70+ countries and 55+ specialties. Event directors, AV technicians, travel managers, and more.",
      }),
      buildServiceSchema({
        path: "/meeting-pros",
        serviceType: "Event Staffing & Talent Matching",
        name: "Meeting Pros",
        description: "Worldwide network of verified event professionals matched within 48 hours across 70+ countries and 55+ specialties.",
        offerNames: ["48-Hour Talent Matching", "Project Management", "On-Site Implementation", "Travel Management", "55+ Event Specialties"],
      }),
      buildBreadcrumbSchema("/meeting-pros", "Meeting Pros"),
    ],
  },
};

const MeetingPros = () => (
  <ServicePageLayout
    seo={seo}
    title="Meeting Pros"
    subtitle="Your Global Talent Network"
    featuresBefore="The right talent, "
    featuresAccent="for every meeting."
    featuresDescription="Whatever your event requires, we have a specialist for it. Here's the talent you can mobilize, ready to deploy wherever you need them."
    description="The go-to partner for businesses that need verified event professionals fast. Connected within 48 hours, active across 70+ countries, covering more than 55 specialties."
    heroImage={meetingProsImg}
    heroVideo={meetingProsVideo}
    stats={[
      { value: 2000, suffix: "+", label: "Meetings & Events" },
      { value: 70, suffix: "+", label: "Countries" },
      { value: 12, suffix: "K", label: "Meetings Supported" },
      { value: 75, suffix: "K+", label: "Global Attendees" },
    ]}
    featuresIcon={Zap}
  typeCardsTitle="Who you'll have on your team"
  typeCards={[
      {
        label: "Senior Leadership",
        title: "Event Directors",
        description: "Senior event professionals who oversee your entire program from planning through execution, with the experience to handle anything that comes up.",
        image: eventDirectorsImg,
      },
      {
        label: "Broadcast Ready",
        title: "Technical Specialists",
        description: "AV engineers, virtual producers, and broadcast technicians who own the technical side of your event so nothing fails when it matters most.",
        image: productionStageImg,
      },
      {
        label: "Boots on the Ground",
        title: "Logistics Coordinators",
        description: "Experienced coordinators who manage every moving part: transportation, registration, catering, and on-site flow, so the day runs like clockwork.",
        image: logisticsCoordinatorsImg,
      },
    ]}
    features={[
      {
        icon: Zap,
        title: "48-Hour Talent Matching",
        description: "Tell us what you need and you're matched with the right professional within 48 hours or less, anywhere in the world, without compromise on quality.",
        image: meetingProsImg,
      },
      {
        icon: ClipboardList,
        title: "Project Management",
        description: "Full-service event and project management from planning and logistics through to execution. Every detail handled for you, nothing left to chance.",
        image: aboutEventImg,
      },
      {
        icon: MapPin,
        title: "On-Site Implementation",
        description: "Local meeting experts who know your venue, your market, and your logistics. They oversee and enhance your on-site operations from setup to strike.",
        image: logisticsCoordinatorsImg,
      },
      {
        icon: Plane,
        title: "Travel Management",
        description: "Dedicated travel managers handle all your attendee transportation, accommodations, and scheduling so every arrival and departure just works.",
        image: venueLogisticsImg,
      },
      {
        icon: Monitor,
        title: "Virtual Producers & AV Specialists",
        description: "Experienced virtual producers on the technical side, local AV specialists on the ground. Professional-grade equipment, skilled operators.",
        image: virtualEventsControlRoomImg,
      },
      {
        icon: Grid2x2,
        title: "55+ Event Specialties",
        description: (
          <>
            <p>One network covering everything your event requires:</p>
            <ul className="mt-1 space-y-0.5 list-none pl-0">
              <li>- VIP coordinators and trade show supervisors</li>
              <li>- Registration and booth managers</li>
              <li>- F&B planners and procurement experts</li>
              <li>- And 50+ more specialties</li>
            </ul>
          </>
        ),
        image: eventDirectorsImg,
      },
    ]}
  />
);

export default MeetingPros;
