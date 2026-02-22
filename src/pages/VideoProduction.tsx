import ServicePageLayout from "@/components/ServicePageLayout";
import videoProductionImg from "@/assets/video-production.webp";
import videoProductionVideo from "@/assets/video-production-video.mp4";

const VideoProduction = () => (
  <ServicePageLayout
    title="Video Production"
    subtitle="Visual Storytelling"
    description="Captivating video content from teasers to highlight reels that elevate your brand and leave a lasting impression."
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
        description: "Color grading, motion graphics, sound design, and editing that transforms raw footage into polished, compelling content.",
      },
    ]}
  />
);

export default VideoProduction;
