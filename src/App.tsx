import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

const LiveEvents = lazy(() => import("./pages/LiveEvents"));
const VirtualEvents = lazy(() => import("./pages/VirtualEvents"));
const HybridEvents = lazy(() => import("./pages/HybridEvents"));
const VideoProduction = lazy(() => import("./pages/VideoProduction"));
const MeetingPros = lazy(() => import("./pages/MeetingPros"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/live-events" element={<LiveEvents />} />
            <Route path="/virtual-events" element={<VirtualEvents />} />
            <Route path="/hybrid-events" element={<HybridEvents />} />
            <Route path="/video-production" element={<VideoProduction />} />
            <Route path="/meeting-pros" element={<MeetingPros />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
