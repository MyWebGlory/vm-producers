import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import vpLogo from "@/assets/vp-logo-white.png";
import { useCalendly } from "@/components/CalendlyModal";

const navLinks = [
  { label: "Live Events", href: "/live-events" },
  { label: "Virtual Events", href: "/virtual-events" },
  { label: "Hybrid Events", href: "/hybrid-events" },
  { label: "Video Production", href: "/video-production" },
  { label: "Meeting Pros", href: "/meeting-pros" },
];

const Navbar = () => {
  const { openCalendly } = useCalendly();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isActive = (href: string) => location.pathname === href;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img
            src={vpLogo}
            alt="VM Producers"
            width={120}
            height={40}
            className={`h-10 w-auto transition-all duration-500 ${
              scrolled ? "invert" : ""
            }`}
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`text-sm font-semibold transition-all duration-500 ${
                isActive(link.href)
                  ? scrolled
                    ? "text-primary"
                    : "text-white"
                  : scrolled
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-white/90 hover:text-white"
              }`}
              style={!scrolled ? { textShadow: "0 1px 8px rgba(0,0,0,0.6), 0 0 2px rgba(0,0,0,0.4)" } : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={openCalendly}
          className="hidden lg:inline-flex px-6 py-3 rounded-full bg-primary text-primary-foreground font-display font-semibold text-sm hover:bg-primary/90 transition-all duration-300 glow-shadow cursor-pointer"
        >
          Free Consultation
        </button>

        <button onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen} className={`lg:hidden p-3 transition-colors duration-500 ${scrolled ? "text-foreground" : "text-white"}`}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-strong border-t border-border/50"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`py-3 font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => { openCalendly(); setIsOpen(false); }}
                className="mt-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-display font-semibold text-center text-sm cursor-pointer"
              >
                Free Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
