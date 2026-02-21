import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Live Events", href: "/live-events" },
  { label: "Virtual Events", href: "/virtual-events" },
  { label: "Hybrid Events", href: "/hybrid-events" },
  { label: "Video Production", href: "/video-production" },
  { label: "Meeting Pros", href: "/meeting-pros" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-display font-bold text-xl tracking-tight text-foreground">
                Virtual Producers
              </span>
            </Link>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              © 2026 Virtual Producers. All rights reserved.
            </p>
            <a
              href="https://www.vmproducers.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Original Site
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
