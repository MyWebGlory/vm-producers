/**
 * AppRoutes - shared route definitions used by both the client entry (App.tsx)
 * and the server-side prerender entry (entry-ssr.tsx).
 * No BrowserRouter / StaticRouter here - the parent provides the router.
 */
import { Routes, Route } from "react-router-dom";
import { CalendlyProvider } from "@/components/CalendlyModal";
import Index from "@/pages/Index";
import LiveEvents from "@/pages/LiveEvents";
import VirtualEvents from "@/pages/VirtualEvents";
import HybridEvents from "@/pages/HybridEvents";
import VideoProduction from "@/pages/VideoProduction";
import MeetingPros from "@/pages/MeetingPros";
import Marketing from "@/pages/Marketing";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import LegalNotice from "@/pages/LegalNotice";
import NotFound from "@/pages/NotFound";
import { ROUTES } from "@/routes";

export { ROUTES };

const AppRoutes = () => (
  <CalendlyProvider>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/live-events" element={<LiveEvents />} />
      <Route path="/virtual-events" element={<VirtualEvents />} />
      <Route path="/hybrid-events" element={<HybridEvents />} />
      <Route path="/video-production" element={<VideoProduction />} />
      <Route path="/meeting-pros" element={<MeetingPros />} />
      <Route path="/marketing" element={<Marketing />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/legal-notice" element={<LegalNotice />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </CalendlyProvider>
);

export default AppRoutes;
