import { useState } from "react";
import ServicePageLayout from "@/components/ServicePageLayout";
import liveEventsImg from "@/assets/live-events.webp";
import liveEventsVideo from "@/assets/live-events-video.mp4";
import hybridSummitImg from "@/assets/hybrid-summit-stage.webp";
import venueLogisticsImg from "@/assets/venue-logistics.webp";
import guestExperienceImg from "@/assets/guest-experience-management.webp";
import productionStageImg from "@/assets/production-stage-design.webp";
import conferencesSummitsImg from "@/assets/Conferences-_-Summits_1.webp";
import productLaunchesImg from "@/assets/Product-Launches_1.webp";
import awardsGalasImg from "@/assets/Awards-_-Galas_1.webp";
import { Layers, MapPin, Users, Cpu } from "lucide-react";
import { buildWebPageSchema, buildBreadcrumbSchema, buildServiceSchema, TODAY } from "@/components/SEO";
import melissaAvatar from "@/assets/testimonials/melissa-dawn-simkins.jpg";

const QUOTE = "Austin Talley is a top notch virtual producer. Patient, knowledgeable, professional and ready to jump in to make your event a success are a few words that describe my experience. I look forward to further partnerships. Definitely worth the investment!";
const QUOTE_SHORT = "Austin Talley is a top notch virtual producer. Patient, knowledgeable, professional and ready to jump in...";

function MelissaQuote() {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <p className="text-sm leading-relaxed italic" style={{ color: "hsl(var(--foreground) / 0.75)" }}>
        <span className="sm:hidden">"{expanded ? QUOTE : QUOTE_SHORT}"</span>
        <span className="hidden sm:inline">"{QUOTE}"</span>
      </p>
      <button
        onClick={() => setExpanded(v => !v)}
        className="sm:hidden text-xs font-semibold mt-0.5"
        style={{ color: "hsl(var(--primary))" }}
      >
        {expanded ? "See less ?" : "See more ?"}
      </button>
    </>
  );
}

const seo = {
  title: "Live Event Production Services | In-Person Events | VM Producers",
  description: "Professional live event production for in-person events from 50 to 50,000 attendees. End-to-end management including staging, AV, lighting, venue sourcing, and on-site technical support. 500+ events delivered worldwide.",
  canonical: "/live-events",
  dateModified: TODAY,
  jsonLd: {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageSchema({
        path: "/live-events",
        name: "Live Event Production Services | In-Person Events | VM Producers",
        description: "Professional live event production for in-person events from 50 to 50,000 attendees. End-to-end management including staging, AV, lighting, venue sourcing, and on-site technical support.",
      }),
      buildServiceSchema({
        path: "/live-events",
        serviceType: "Live Event Production",
        name: "Live Events",
        description: "Professional live event production for in-person events from 50 to 50,000 attendees. End-to-end management including staging, AV, lighting, and technical support.",
        offerNames: ["End-to-End Production", "Venue Sourcing & Management", "Live Streaming Integration", "On-Site Technical Support"],
      }),
      buildBreadcrumbSchema("/live-events", "Live Events"),
    ],
  },
};

const LiveEvents = () => (
  <ServicePageLayout
    seo={seo}
    title="Live Events"
    subtitle="In-Person Production"
    featuresBefore="Live event production, "
    featuresAccent="start to finish."
    featuresDescription="Everything you need to run a flawless in-person event, from the first brief to the final breakdown. Here's exactly what we take off your plate."
    description="In-person events that run on time, look sharp, and hold together under pressure. We handle the full production, so you show up as the host."
    heroImage={liveEventsImg}
    heroVideo={liveEventsVideo}
    stats={[
      { value: 500, suffix: "+", label: "Events Delivered" },
      { value: 50, suffix: "+", label: "Countries" },
      { value: 100, suffix: "%", label: "Success Rate" },
    ]}
    featuresIcon={MapPin}
  typeCardsTitle="What your next event could look like"
  typeCards={[
      {
        label: "Corporate",
        title: "Conferences & Summits",
        description: "Multi-day conferences, keynotes, and panel sessions for 50 to 50,000 attendees. Produced start to finish with zero surprises.",
        image: conferencesSummitsImg,
      },
      {
        label: "Brand Moments",
        title: "Product Launches",
        description: "High-energy launch events that generate buzz, earn media coverage, and make your product's debut unforgettable.",
        image: productLaunchesImg,
      },
      {
        label: "Prestige Events",
        title: "Awards & Galas",
        description: "Elegant ceremonies and gala productions that reflect the prestige of your brand and honor your audience in style.",
        image: awardsGalasImg,
      },
    ]}
    features={[
      {
        icon: Layers,
        title: "End-to-End Production",
        description: (
          <>
            <p>Your event is handled from first brief to final breakdown � so you walk in as the host, not the fixer.</p>
            <p className="mt-2">We manage:</p>
            <ul className="mt-1 space-y-0.5 list-none pl-0">
              <li>- Program development and A-to-Z event logistics</li>
              <li>- Staging, lighting, and AV production</li>
              <li>- Branding and signage</li>
              <li>- Catering and on-site staff</li>
            </ul>
            <p className="mt-2">Every detail is documented, rehearsed, and executed to plan.</p>
          </>
        ),
        image: liveEventsImg,
      },
      {
        icon: MapPin,
        title: "Venue & Logistics",
        description: (
          <>
            <p>Finding the right venue is only the beginning.</p>
            <p className="mt-2">We handle:</p>
            <ul className="mt-1 space-y-0.5 list-none pl-0">
              <li>- Venue selection</li>
              <li>- Hotel room block negotiations</li>
              <li>- Attendee transportation</li>
              <li>- On-site logistics coordination</li>
            </ul>
            <p className="mt-2">Your guests arrive on time, settled comfortably, and focused entirely on your content.</p>
          </>
        ),
        image: venueLogisticsImg,
      },
      {
        icon: Users,
        title: "Guest Experience Management",
        description: (
          <>
            <p>From the moment your attendees register to the final farewell, every touchpoint is managed.</p>
            <p className="mt-2">Our on-site staff handles:</p>
            <ul className="mt-1 space-y-0.5 list-none pl-0">
              <li>- Check-in</li>
              <li>- Catering coordination</li>
              <li>- Guest services</li>
            </ul>
            <p className="mt-2">The result is a polished experience that reflects your brand and keeps your audience engaged throughout.</p>
          </>
        ),
        image: guestExperienceImg,
      },
      {
        icon: Cpu,
        title: "Production & Stage Design",
        description: (
          <>
            <p>Our production team turns ordinary spaces into branded environments.</p>
            <p className="mt-2">Every element is built to amplify your message:</p>
            <ul className="mt-1 space-y-0.5 list-none pl-0">
              <li>- Premium staging</li>
              <li>- Professional lighting rigs</li>
              <li>- Broadcast-quality sound</li>
              <li>- Strategic signage</li>
            </ul>
            <p className="mt-2">All unified to deliver an immersive atmosphere that keeps your audience fully present from opening to close.</p>
          </>
        ),
        image: productionStageImg,
      },
    ]}
    additionalContent={
      <section className="py-20 md:py-28 bg-card relative overflow-hidden" aria-labelledby="elevate-team-heading">
        {/* Dot grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(216 90% 58% / 0.045) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-3 font-medium">
              Our Talent Network
            </p>
            <h2 id="elevate-team-heading" className="text-3xl md:text-4xl font-display font-bold text-foreground mb-5">
              Elevate Your Event Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Create a strong and reliable network of independent meeting professionals that you can connect with swiftly and strategically. The Virtual Producer's Network specializes in more than 55 areas of meetings and events.
            </p>
          </div>

          {/* Specialties grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 mb-14">
            {[
              "Brand Representatives",
              "Audio Visual Experts",
              "Logistics Managers",
              "Conference Coordinators",
              "Food & Beverage Planners",
              "Event Producers",
              "Travel Agents",
              "Project Coordinators",
              "Booth Supervisors",
              "Event Technology Specialists",
              "Procurement Experts",
              "Venue Planners",
              "Transportation Coordinators",
              "Strategic Meeting Facilitators",
              "Trade Show Supervisors",
              "On-Demand Virtual Moderators",
              "VIP Coordinators",
              "Virtual Event Strategists",
              "Registration Managers",
            ].map((specialty, i) => (
              <div
                key={specialty}
                className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm${i >= 10 ? " hidden sm:flex" : ""}`}
                style={{
                  background: "hsl(var(--primary) / 0.06)",
                  border: "1px solid hsl(var(--primary) / 0.15)",
                  color: "hsl(var(--foreground) / 0.80)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "hsl(var(--primary))" }}
                />
                {specialty}
              </div>
            ))}
          </div>

          {/* Melissa testimonial */}
          <div
            className="flex flex-col sm:flex-row items-center sm:items-start gap-5 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto"
            style={{
              background: "hsl(var(--primary) / 0.06)",
              border: "1px solid hsl(var(--primary) / 0.18)",
            }}
          >
            <img
              src={melissaAvatar}
              alt="Melissa Dawn Simkins"
              width={64}
              height={64}
              className="w-16 h-16 rounded-full object-cover shrink-0"
              style={{ border: "2px solid hsl(var(--primary) / 0.30)" }}
            />
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <div className="flex justify-center sm:justify-start gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="hsl(var(--primary))" aria-hidden="true">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </div>
              <MelissaQuote />
              <p className="text-sm font-semibold text-foreground">Melissa Dawn Simkins <span className="font-normal text-muted-foreground">� CEO, Velvet Suite</span></p>
            </div>
          </div>
        </div>
      </section>
    }
  />
);

export default LiveEvents;
