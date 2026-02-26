import ServicePageLayout from "@/components/ServicePageLayout";
import meetingProsImg from "@/assets/meeting-pros.webp";
import meetingProsVideo from "@/assets/meeting-pros-video.mp4";
import { Zap, ClipboardList, MapPin, Plane, Monitor, Grid2x2 } from "lucide-react";

const MeetingPros = () => (
  <ServicePageLayout
    title="Meeting Pros"
    subtitle="Your Global Talent Network"
    description="A worldwide network of verified event professionals matched within 48 hours, covering 70+ countries and 55+ specialties."
    heroImage={meetingProsImg}
    heroVideo={meetingProsVideo}
    stats={[
      { value: 70, suffix: "+", label: "Countries" },
      { value: 48, suffix: "h", label: "Matching Time" },
      { value: 12, suffix: "K", label: "Meetings Supported" },
    ]}
    features={[
      {
        icon: Zap,
        title: "48-Hour Talent Matching",
        description: "Tell us what you need and we match you with the right professional within 48 hours or less - anywhere in the world, without compromise on quality.",
      },
      {
        icon: ClipboardList,
        title: "Project Management",
        description: "Full-service event and project management from planning and logistics through to execution. Every detail handled, nothing left to chance.",
      },
      {
        icon: MapPin,
        title: "On-Site Implementation",
        description: "Local meeting experts who know the venue, the market, and the logistics. They oversee and enhance your on-site operations from setup to strike.",
      },
      {
        icon: Plane,
        title: "Travel Management",
        description: "Dedicated travel managers handle all attendee transportation, accommodations, and scheduling so arrivals and departures just work.",
      },
      {
        icon: Monitor,
        title: "Virtual Producers & AV Specialists",
        description: "Experienced virtual producers on the technical side, local AV specialists on the ground. State-of-the-art equipment, skilled operators.",
      },
      {
        icon: Grid2x2,
        title: "55+ Event Specialties",
        description: "VIP coordinators, trade show supervisors, registration managers, booth supervisors, F&B planners, procurement experts, and more - all in one network.",
      },
    ]}
  />
);

export default MeetingPros;
