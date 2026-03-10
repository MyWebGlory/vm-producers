import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react"; // v1
import { RevealLine } from "@/components/ScrollAnimations";
import vpLogo from "@/assets/vp-logo-white.png";
import { useCalendly } from "@/components/CalendlyModal";
import { Check } from "lucide-react";

const Footer = () => {
  const { openCalendly } = useCalendly();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [toast, setToast] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setToast(label);
      setTimeout(() => setToast(null), 2500);
    });
  };

  return (
    <footer ref={ref} className="bg-card border-t border-border">
      <RevealLine delay={0} className="" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Brand & Description */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Link to="/" className="flex items-center">
              <img src={vpLogo} alt="VM Producers - Full-Service Event Production" width={120} height={40} className="h-10 w-auto invert" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              VM Producers is a full-service production agency specializing in creating engaging in person, virtual and hybrid events for organizations of all sizes, from Fortune 500 companies to emerging startups. With our nimble, tech-forward approach and dedicated team of experts, we handle everything from planning to execution, ensuring flawless events that leave lasting impressions on audiences worldwide.
            </p>
          </motion.div>

          {/* Get in Touch */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="font-display font-bold text-foreground text-lg">Get in Touch</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://www.linkedin.com/company/virtual-producers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => copyToClipboard("4043371539", "Phone number copied!")}
                  className="hover:text-foreground transition-colors cursor-pointer text-left"
                >
                  404.337.1539
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => copyToClipboard("austin@vmproducers.com", "Email address copied!")}
                  className="hover:text-foreground transition-colors cursor-pointer text-left"
                >
                  austin@vmproducers.com
                </button>
              </li>
              <li>New York, NY, USA</li>
            </ul>
            <button
              type="button"
              onClick={openCalendly}
              className="inline-flex px-8 py-3 rounded-full bg-foreground text-background font-display font-semibold text-sm hover:opacity-90 transition-all duration-300 mt-2 cursor-pointer"
            >
              Schedule a Call
            </button>
          </motion.div>

          {/* Navigation */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3 className="font-display font-bold text-foreground text-lg">Services</h3>
            <nav aria-label="Site pages">
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/live-events" className="hover:text-foreground transition-colors">Live Event Production</Link>
              </li>
              <li>
                <Link to="/virtual-events" className="hover:text-foreground transition-colors">Virtual Event Production</Link>
              </li>
              <li>
                <Link to="/hybrid-events" className="hover:text-foreground transition-colors">Hybrid Event Production</Link>
              </li>
              <li>
                <Link to="/video-production" className="hover:text-foreground transition-colors">Corporate Video Production</Link>
              </li>
              <li>
                <Link to="/meeting-pros" className="hover:text-foreground transition-colors">Meeting Pros Network</Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openCalendly}
                  className="hover:text-foreground transition-colors cursor-pointer text-left"
                >
                  Free Consultation
                </button>
              </li>
            </ul>
            </nav>
          </motion.div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2026 VM Producers. All rights reserved.
            {" · "}
            <Link to="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            {" · "}
            <Link to="/legal-notice" className="hover:text-foreground transition-colors">Legal Notice</Link>
          </p>
        </div>
      </div>

      {/* Copy toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="copy-toast"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl text-sm font-medium"
            style={{ background: "hsl(var(--foreground))", color: "hsl(var(--background))" }}
          >
            <Check size={15} strokeWidth={2.5} />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
