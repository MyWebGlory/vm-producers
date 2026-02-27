import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClientLogos from "@/components/ClientLogos";
import { SEO } from "@/components/SEO";
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const ResultsSection = lazy(() => import("@/components/ResultsSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const PainPointsSection = lazy(() => import("@/components/PainPointsSection"));
const WhatYouGetSection = lazy(() => import("@/components/WhatYouGetSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));

const homeSEO = {
  title: "VM Producers | Full-Service Event Production - Live, Virtual & Hybrid Events",
  description: "VM Producers is a global full-service event production company. 2000+ successful events, 350K+ attendees worldwide, 95% client retention. Live events, virtual events, hybrid events, video production, and global talent matching across 70+ countries.",
  canonical: "/",
  jsonLd: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.vmproducers.com/#organization",
        "name": "VM Producers",
        "url": "https://www.vmproducers.com",
        "logo": { "@type": "ImageObject", "url": "https://www.vmproducers.com/favicon.png" },
        "description": "Full-service event production company specializing in live, virtual, and hybrid events. 2000+ successful events, 350K+ global attendees across 70+ countries.",
        "contactPoint": { "@type": "ContactPoint", "contactType": "customer service", "url": "https://www.vmproducers.com/contact" },
        "areaServed": "Worldwide",
        "knowsAbout": ["Live Event Production", "Virtual Event Production", "Hybrid Event Production", "Video Production", "Corporate Event Management"]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.vmproducers.com/#website",
        "url": "https://www.vmproducers.com",
        "name": "VM Producers",
        "publisher": { "@id": "https://www.vmproducers.com/#organization" }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What types of events does VM Producers manage?",
            "acceptedAnswer": { "@type": "Answer", "text": "VM Producers manages live in-person events, virtual events, hybrid events, corporate conferences, webinars, product launches, and more. We serve Fortune 500 companies to emerging businesses, from 50 to 50,000+ attendees." }
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
          }
        ]
      },
      {
        "@type": "AggregateRating",
        "itemReviewed": { "@id": "https://www.vmproducers.com/#organization" },
        "ratingValue": "5",
        "bestRating": "5",
        "ratingCount": "3"
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
        <div style={{ position: "absolute", top: "8%",  left: "-10%", width: "55vw", height: "55vw", borderRadius: "50%", background: "radial-gradient(circle, hsl(43 80% 55% / 0.07) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", top: "30%", right: "-12%", width: "45vw", height: "45vw", borderRadius: "50%", background: "radial-gradient(circle, hsl(43 80% 55% / 0.05) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", top: "60%", left: "20%",  width: "60vw", height: "60vw", borderRadius: "50%", background: "radial-gradient(circle, hsl(43 80% 55% / 0.06) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", top: "82%", right: "5%",  width: "40vw", height: "40vw", borderRadius: "50%", background: "radial-gradient(circle, hsl(43 80% 55% / 0.05) 0%, transparent 70%)" }} />
      </div>
      <div className="relative" style={{ zIndex: 1 }}>
      <Navbar />
      <HeroSection />
      <ClientLogos />
      <Suspense fallback={<div className="h-96" />}>
        {/* Social proof first - build trust before pitching services */}
        <TestimonialsSection />
        <ResultsSection />
        <ServicesSection />
        <PainPointsSection />
        <WhatYouGetSection />
        {/* FAQ before final CTA - answer objections */}
        <FAQSection />
        <CTASection />
        <Footer />
      </Suspense>
      </div>
    </div>
  );
};

export default Index;
