import ServicePageLayout from "@/components/ServicePageLayout";
import videoProductionImg from "@/assets/video-production.webp";
import videoProductionVideo from "@/assets/video-production-video.mp4";

const VideoProduction = () => (
  <ServicePageLayout
    title="Video Production"
    subtitle="Visual Storytelling"
    description="Video that looks like it cost three times what it did. Fast turnaround, broadcast quality."
    heroImage={videoProductionImg}
    heroVideo={videoProductionVideo}
    stats={[
      { value: 2000, suffix: "+", label: "Videos Produced" },
      { value: 4, suffix: "K", label: "Resolution" },
      { value: 48, suffix: "h", label: "Fast Turnaround" },
    ]}
    features={[
      {
        title: "Corporate Films & Brand Stories",
        description: "Cinematic storytelling that captures your brand's essence, from company culture pieces to product launches and brand anthems.",
      },
      {
        title: "Event Highlight Reels",
        description: "Professional post-event videos that capture the energy and key moments, perfect for social media and stakeholder reports.",
      },
      {
        title: "Live Multi-Camera Production",
        description: "Broadcast-quality multi-camera setups with real-time switching, graphics overlay, and professional directing.",
      },
      {
        title: "Post-Production Excellence",
        description: "Color grading, motion graphics, sound design. Raw footage in, finished content out.",
      },
    ]}
  />
);

export default VideoProduction;
