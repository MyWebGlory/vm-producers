import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClientLogos from "@/components/ClientLogos";
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const PainPointsSection = lazy(() => import("@/components/PainPointsSection"));
const WhatYouGetSection = lazy(() => import("@/components/WhatYouGetSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Subtle ambient color patches - very low opacity golden tones */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <div style={{ position: "absolute", top: "8%",  left: "-10%", width: "55vw", height: "55vw", borderRadius: "50%", background: "radial-gradient(circle, hsl(36 55% 55% / 0.07) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", top: "30%", right: "-12%", width: "45vw", height: "45vw", borderRadius: "50%", background: "radial-gradient(circle, hsl(36 55% 55% / 0.05) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", top: "60%", left: "20%",  width: "60vw", height: "60vw", borderRadius: "50%", background: "radial-gradient(circle, hsl(36 55% 55% / 0.06) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", top: "82%", right: "5%",  width: "40vw", height: "40vw", borderRadius: "50%", background: "radial-gradient(circle, hsl(36 55% 55% / 0.05) 0%, transparent 70%)" }} />
      </div>
      <div className="relative" style={{ zIndex: 1 }}>
      <Navbar />
      <HeroSection />
      <ClientLogos />
      <Suspense fallback={<div className="h-96" />}>
        <ServicesSection />
          <TestimonialsSection />
          <AboutSection />
          <PainPointsSection />
          <WhatYouGetSection />
        <CTASection />
        <Footer />
      </Suspense>
      </div>
    </div>
  );
};

export default Index;
