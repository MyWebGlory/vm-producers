import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl p-12 md:p-20 glow-border relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Feeling overwhelmed?{" "}
              <span className="glow-text">We got you.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Managing your program, A/V services, event platforms, tight budgets,
              increasing costs, and various teams can be overwhelming. Don't tackle it on your own.
              We fit seamlessly within any organization to help as much as you need.
            </p>
            <a
              href="https://www.vmproducers.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-10 py-4 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-lg hover:bg-primary/90 transition-all duration-300 glow-shadow hover:scale-105"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
