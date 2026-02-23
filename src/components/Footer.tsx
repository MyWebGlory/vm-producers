import { Link } from "react-router-dom";
import vpLogo from "@/assets/vp-logo-white.png";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Brand & Description */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center">
              <img src={vpLogo} alt="Virtual Producers" className="h-10 w-auto invert" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Virtual Producers is a full-service production agency specializing in creating engaging in person, virtual and hybrid events for organizations of all sizes, from Fortune 500 companies to emerging startups.
            </p>
          </div>

          {/* Get in Touch */}
          <div className="space-y-5">
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
            <a
              href="https://www.vmproducers.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-8 py-3 rounded-full bg-foreground text-background font-display font-semibold text-sm hover:opacity-90 transition-all duration-300 mt-2"
            >
              Schedule a Call
            </a>
          </div>

          {/* Navigation */}
          <div className="space-y-5">
            <h3 className="font-display font-bold text-foreground text-lg">About</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/live-events" className="hover:text-foreground transition-colors">Live</Link>
              </li>
              <li>
                <Link to="/virtual-events" className="hover:text-foreground transition-colors">Virtual Events</Link>
              </li>
              <li>
                <Link to="/hybrid-events" className="hover:text-foreground transition-colors">Hybrid Events</Link>
              </li>
              <li>
                <Link to="/video-production" className="hover:text-foreground transition-colors">Video Production</Link>
              </li>
              <li>
                <Link to="/meeting-pros" className="hover:text-foreground transition-colors">Meeting Pros</Link>
              </li>
              <li>
                <a
                  href="https://www.vmproducers.com/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2026 Virtual Producers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
