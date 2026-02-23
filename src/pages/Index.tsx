import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClientLogos from "@/components/ClientLogos";

const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ClientLogos />
      <Suspense fallback={<div className="h-96" />}>
        <ServicesSection />
        <AboutSection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
