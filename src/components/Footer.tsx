import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { RevealLine } from "@/components/ScrollAnimations";
import vpLogo from "@/assets/vp-logo-white.png";
import { useCalendly } from "@/components/CalendlyModal";

const Footer = () => {
  const { openCalendly } = useCalendly();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer ref={ref} className="bg-card border-t border-border">
      <RevealLine delay={0} className="" />
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Brand & Description */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Link to="/" className="flex items-center">
              <img src={vpLogo} alt="VM Producers - Full-Service Event Production" className="h-10 w-auto invert" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              VM Producers is a full-service production agency specializing in creating engaging in person, virtual and hybrid events for organizations of all sizes, from Fortune 500 companies to emerging startups.
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
                <a href="tel:4043371539" className="hover:text-foreground transition-colors">
                  404.337.1539
                </a>
              </li>
              <li>
                <a href="mailto:austin@vproducers.com" className="hover:text-foreground transition-colors">
                  austin@vproducers.com
                </a>
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
        <div className="max-w-7xl mx-auto px-6 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2026 VM Producers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
