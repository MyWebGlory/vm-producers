import ServicePageLayout from "@/components/ServicePageLayout";
import meetingProsImg from "@/assets/meeting-pros.webp";

const MeetingPros = () => (
  <ServicePageLayout
    title="Meeting Pros"
    subtitle="Your Global Network"
    description="A worldwide network of verified event professionals, matched within 48 hours across 70+ countries for any event need."
    heroImage={meetingProsImg}
    stats={[
      { value: 70, suffix: "+", label: "Countries" },
      { value: 48, suffix: "h", label: "Matching Time" },
      { value: 1000, suffix: "+", label: "Verified Pros" },
    ]}
    features={[
      {
        title: "Vetted Professionals",
        description: "Every professional in our network is thoroughly vetted: background checks, portfolio reviews, and client references verified.",
      },
      {
        title: "48-Hour Matching",
        description: "Tell us what you need and we'll match you with the perfect event professional within 48 hours, anywhere in the world.",
      },
      {
        title: "On-Demand Staffing",
        description: "Scale your team up or down for any event. From event managers to AV technicians, we have the talent you need.",
      },
      {
        title: "Global Coverage",
        description: "Whether it's Tokyo, New York, or Lagos, our network spans 70+ countries so you always have local expertise on the ground.",
      },
    ]}
  />
);

export default MeetingPros;
