import ServicePageLayout from "@/components/ServicePageLayout";
import meetingProsImg from "@/assets/meeting-pros.webp";
import meetingProsVideo from "@/assets/meeting-pros-video.mp4";
import aboutEventImg from "@/assets/about-event.webp";
import virtualEventsControlRoomImg from "@/assets/virtual-events-control-room.webp";
import { Zap, ClipboardList, MapPin, Plane, Monitor, Grid2x2 } from "lucide-react";

const seo = {
  title: "Meeting Professionals Network | Global Event Staffing | VM Producers",
  description: "Worldwide network of verified event professionals matched within 48 hours across 70+ countries and 55+ specialties. Event directors, AV technicians, travel managers, on-site coordinators, and more. 12,000+ meetings supported.",
  canonical: "/meeting-pros",
  jsonLd: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "serviceType": "Event Staffing & Talent Matching",
        "name": "Meeting Pros",
        "description": "Worldwide network of verified event professionals matched within 48 hours across 70+ countries and 55+ specialties.",
        "provider": { "@type": "Organization", "name": "VM Producers", "url": "https://www.vmproducers.com" },
        "url": "https://www.vmproducers.com/meeting-pros",
        "areaServed": "Worldwide",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Meeting Pros Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "48-Hour Talent Matching" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Project Management" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "On-Site Implementation" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Travel Management" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "55+ Event Specialties" } }
          ]
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.vmproducers.com/" },
          { "@type": "ListItem", "position": 2, "name": "Meeting Pros", "item": "https://www.vmproducers.com/meeting-pros" }
        ]
      }
    ]
  }
};

const MeetingPros = () => (
  <ServicePageLayout
    seo={seo}
    title="Meeting Pros"
    subtitle="Your Global Talent Network"
    description="The go-to partner for businesses that need verified event professionals fast. Connected within 48 hours, active across 70+ countries, covering more than 55 specialties."
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
        description: "Tell us what you need and you’re matched with the right professional within 48 hours or less, anywhere in the world, without compromise on quality.",
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
        image: meetingProsImg,
      },
      {
        icon: Plane,
        title: "Travel Management",
        description: "Dedicated travel managers handle all your attendee transportation, accommodations, and scheduling so every arrival and departure just works.",
        image: aboutEventImg,
      },
      {
        icon: Monitor,
        title: "Virtual Producers & AV Specialists",
        description: "Experienced virtual producers on the technical side, local AV specialists on the ground. State-of-the-art equipment, skilled operators.",
        image: virtualEventsControlRoomImg,
      },
      {
        icon: Grid2x2,
        title: "55+ Event Specialties",
        description: "VIP coordinators, trade show supervisors, registration managers, booth supervisors, F&B planners, procurement experts, and more - all in one network.",
        image: meetingProsImg,
      },
    ]}
  />
);

export default MeetingPros;
