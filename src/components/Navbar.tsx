import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Live", href: "#services" },
  { label: "Virtual", href: "#services" },
  { label: "Hybrid", href: "#services" },
  { label: "Video Production", href: "#services" },
  { label: "Meeting Pros", href: "#services" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
            <span className="font-display font-bold text-primary text-lg">V</span>
          </div>
          <div className="font-display font-semibold text-sm uppercase tracking-wider leading-tight">
            <span className="block text-foreground">Virtual</span>
            <span className="block text-primary">Producers</span>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden lg:inline-flex px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm hover:bg-primary/90 transition-all duration-300 glow-shadow"
        >
          Free Consultation
        </a>

        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-foreground p-2">
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
                <a key={link.label} href={link.href} onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors py-2 font-medium">
                  {link.label}
                </a>
              ))}
              <a href="#contact" className="mt-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-center text-sm">
                Free Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
