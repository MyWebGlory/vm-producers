import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LiveEvents from "./pages/LiveEvents";
import VirtualEvents from "./pages/VirtualEvents";
import HybridEvents from "./pages/HybridEvents";
import VideoProduction from "./pages/VideoProduction";
import MeetingPros from "./pages/MeetingPros";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/live-events" element={<LiveEvents />} />
          <Route path="/virtual-events" element={<VirtualEvents />} />
          <Route path="/hybrid-events" element={<HybridEvents />} />
          <Route path="/video-production" element={<VideoProduction />} />
          <Route path="/meeting-pros" element={<MeetingPros />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
