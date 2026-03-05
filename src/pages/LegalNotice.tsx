import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

const LegalNotice = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="Legal Notice | VM Producers"
      description="Legal notice and publisher information for vmproducers.com."
      canonical="/legal-notice"
      noIndex={true}
    />
    <Navbar />
    <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6 py-32 md:py-40">
      <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-8">
        Legal Notice
      </h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: March 5, 2026</p>

      <div className="space-y-10 text-sm sm:text-base leading-relaxed text-foreground/80">

        {/* Publisher */}
        <section>
          <h2 className="text-xl font-display font-semibold text-foreground mb-3">
            Publisher
          </h2>
          <address className="not-italic space-y-1 text-muted-foreground">
            <p><strong className="text-foreground">[NOM SOCIÉTÉ]</strong> — to be completed by the client</p>
            <p>[ADRESSE] — to be completed by the client</p>
            <p>[SIRET / Company registration number] — to be completed by the client</p>
            <p>
              Email:{" "}
              <a href="mailto:austin@vmproducers.com" className="text-primary hover:underline">
                austin@vmproducers.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a href="tel:4043371539" className="text-primary hover:underline">
                404.337.1539
              </a>
            </p>
          </address>
        </section>

        {/* Publication Director */}
        <section>
          <h2 className="text-xl font-display font-semibold text-foreground mb-3">
            Publication Director
          </h2>
          <p className="text-muted-foreground">
            [NOM] — to be completed by the client
          </p>
        </section>

        {/* Hosting */}
        <section>
          <h2 className="text-xl font-display font-semibold text-foreground mb-3">
            Hosting
          </h2>
          <address className="not-italic space-y-1 text-muted-foreground">
            <p><strong className="text-foreground">[NOM HÉBERGEUR]</strong> — to be completed by the client</p>
            <p>[ADRESSE HÉBERGEUR] — to be completed by the client</p>
          </address>
        </section>

        {/* Intellectual Property */}
        <section>
          <h2 className="text-xl font-display font-semibold text-foreground mb-3">
            Intellectual Property
          </h2>
          <p>
            All content on this website — including text, images, logos, and videos —
            is the exclusive property of VM Producers and is protected by applicable
            intellectual property laws. Any reproduction, distribution, or use without
            prior written consent is strictly prohibited.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section>
          <h2 className="text-xl font-display font-semibold text-foreground mb-3">
            Limitation of Liability
          </h2>
          <p>
            VM Producers endeavours to keep the information on this website accurate
            and up to date but makes no warranties as to its completeness or accuracy.
            VM Producers shall not be liable for any damages arising from the use of,
            or reliance on, the information on this website.
          </p>
        </section>

      </div>
    </main>
    <Footer />
  </div>
);

export default LegalNotice;
