/**
 * AppRoutes — shared route definitions used by both the client entry (App.tsx)
 * and the server-side prerender entry (entry-ssr.tsx).
 * ⚠️  No BrowserRouter / StaticRouter here — the parent provides the router.
 */
import { Routes, Route } from "react-router-dom";
import { CalendlyProvider } from "@/components/CalendlyModal";
import Index from "@/pages/Index";
import LiveEvents from "@/pages/LiveEvents";
import VirtualEvents from "@/pages/VirtualEvents";
import HybridEvents from "@/pages/HybridEvents";
import VideoProduction from "@/pages/VideoProduction";
import MeetingPros from "@/pages/MeetingPros";
import NotFound from "@/pages/NotFound";

/** Ordered list of routes for prerendering / sitemap generation */
export const ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/live-events", priority: "0.9", changefreq: "monthly" },
  { path: "/virtual-events", priority: "0.9", changefreq: "monthly" },
  { path: "/hybrid-events", priority: "0.9", changefreq: "monthly" },
  { path: "/video-production", priority: "0.9", changefreq: "monthly" },
  { path: "/meeting-pros", priority: "0.9", changefreq: "monthly" },
] as const;

const AppRoutes = () => (
  <CalendlyProvider>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/live-events" element={<LiveEvents />} />
      <Route path="/virtual-events" element={<VirtualEvents />} />
      <Route path="/hybrid-events" element={<HybridEvents />} />
      <Route path="/video-production" element={<VideoProduction />} />
      <Route path="/meeting-pros" element={<MeetingPros />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </CalendlyProvider>
);

export default AppRoutes;
