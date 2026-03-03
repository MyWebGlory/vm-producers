// All sections are eagerly imported - required for SSR prerendering and react-snap
// to capture the full page HTML for every section in the homepage.
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClientLogos from "@/components/ClientLogos";
import ProcessSection from "@/components/ProcessSection";
import { SEO, buildWebPageSchema, TODAY } from "@/components/SEO";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FounderSection from "@/components/FounderSection";
import ResultsSection from "@/components/ResultsSection";
import ServicesSection from "@/components/ServicesSection";
import ComparisonSection from "@/components/ComparisonSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const homeSEO = {
  title: "VM Producers | Full-Service Event Production - Live, Virtual & Hybrid Events",
  description: "VM Producers is a global full-service event production company. 2000+ successful events, 350K+ attendees worldwide, 95% client retention. Live events, virtual events, hybrid events, video production, and global talent matching across 70+ countries.",
  canonical: "/",
  dateModified: TODAY,
  jsonLd: {
    "@context": "https://schema.org",
    "@graph": [
      // WebPage schema - provides page-level E-E-A-T signals for the homepage
      buildWebPageSchema({
        path: "/",
        name: "VM Producers | Full-Service Event Production - Live, Virtual & Hybrid Events",
        description: "VM Producers is a global full-service event production company. 2000+ successful events, 350K+ attendees worldwide, 95% client retention. Live events, virtual events, hybrid events, video production, and global talent matching across 70+ countries.",
      }),
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What types of events does VM Producers manage?",
            "acceptedAnswer": { "@type": "Answer", "text": "VM Producers handles live in-person events, virtual events, hybrid events, corporate conferences, webinars, product launches, and more. You get a dedicated production team whether you're a Fortune 500 or a growing business, from 50 to 50,000+ attendees." }
          },
          {
            "@type": "Question",
            "name": "How many countries does VM Producers operate in?",
            "acceptedAnswer": { "@type": "Answer", "text": "VM Producers operates in 70+ countries worldwide through its network of verified Meeting Pros event professionals." }
          },
          {
            "@type": "Question",
            "name": "What is VM Producers' client retention rate?",
            "acceptedAnswer": { "@type": "Answer", "text": "VM Producers maintains a 95% client retention rate, reflecting consistent delivery across 2,000+ successful events." }
          },
          {
            "@type": "Question",
            "name": "Can VM Producers handle virtual events with large attendee counts?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. VM Producers handles virtual events with up to 100,000 attendees, including multi-language translation, speaker management, and broadcast-quality streaming." }
          },
          {
            "@type": "Question",
            "name": "How quickly can VM Producers match event professionals?",
            "acceptedAnswer": { "@type": "Answer", "text": "Through the Meeting Pros service, VM Producers matches clients with verified professionals within 48 hours, across 70+ countries." }
          },
          {
            "@type": "Question",
            "name": "Can VM Producers handle virtual-only or hybrid event formats?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. Virtual and hybrid events are a core specialty. Remote attendees get broadcast-quality streaming, multi-language translation into 5+ languages, interactive features, and audiences of up to 100,000 participants - the exact same quality as those in the room." }
          }
        ]
      }
    ]
  }
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <SEO {...homeSEO} />
      {/* Subtle ambient color patches - very low opacity golden tones */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <div style={{ position: "absolute", top: "8%",  left: "-10%", width: "55vw", height: "55vw", borderRadius: "50%", background: "radial-gradient(circle, hsl(216 90% 65% / 0.07) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", top: "30%", right: "-12%", width: "45vw", height: "45vw", borderRadius: "50%", background: "radial-gradient(circle, hsl(216 90% 65% / 0.05) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", top: "60%", left: "20%",  width: "60vw", height: "60vw", borderRadius: "50%", background: "radial-gradient(circle, hsl(216 90% 65% / 0.06) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", top: "82%", right: "5%",  width: "40vw", height: "40vw", borderRadius: "50%", background: "radial-gradient(circle, hsl(216 90% 65% / 0.05) 0%, transparent 70%)" }} />
      </div>
      <div className="relative" style={{ zIndex: 1 }}>
      <Navbar />
      <main id="main-content">
      <HeroSection />
      <ClientLogos />
      <ServicesSection />
      <AboutSection />
      <ProcessSection />
      <TestimonialsSection />
      <FounderSection />
      <ResultsSection />
      <ComparisonSection />
      {/* FAQ before final CTA - answer objections */}
      <FAQSection />
      <CTASection />
      </main>
      <Footer />
      </div>
    </div>
  );
};

export default Index;
