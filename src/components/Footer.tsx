import vmLogo from "@/assets/vm-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="#" className="flex items-center gap-3">
            <img src={vmLogo} alt="Virtual Producers" className="h-8 w-auto object-contain brightness-0" />
          </a>
          <div className="flex flex-wrap gap-8 text-sm text-muted-foreground">
            <a href="#services" className="hover:text-foreground transition-colors">Services</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
            <a href="https://www.vmproducers.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              Original Site
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 Virtual Producers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
