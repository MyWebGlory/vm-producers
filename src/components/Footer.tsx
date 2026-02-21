const Footer = () => {
  return (
    <footer className="border-t border-border/30 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-primary/20 flex items-center justify-center border border-primary/30">
              <span className="font-display font-bold text-primary text-sm">V</span>
            </div>
            <span className="font-display font-semibold text-sm">Virtual Producers</span>
          </div>
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
