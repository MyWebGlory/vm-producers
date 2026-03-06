import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="Privacy Policy | VM Producers"
      description="Privacy policy for VM Producers: how we collect and use your personal data."
      canonical="/privacy-policy"
      noIndex={true}
    />
    <Navbar />
    <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6 py-32 md:py-40">
      <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-8">
        Privacy Policy
      </h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: March 5, 2026</p>

      <div className="space-y-10 text-sm sm:text-base leading-relaxed text-foreground/80">

        {/* 1 — Data Controller */}
        <section>
          <h2 className="text-xl font-display font-semibold text-foreground mb-3">
            1. Data Controller
          </h2>
          <p>
            The data controller responsible for the processing of your personal data is:
          </p>
          <address className="not-italic mt-3 space-y-1 text-muted-foreground">
            <p><strong className="text-foreground">[NOM SOCIÉTÉ]</strong> (to be completed by the client)</p>
            <p>[ADRESSE] (to be completed by the client)</p>
            <p>Email: <a href="mailto:[EMAIL]" className="text-primary hover:underline">[EMAIL]</a> (to be completed by the client)</p>
          </address>
        </section>

        {/* 2 — Data Collected */}
        <section>
          <h2 className="text-xl font-display font-semibold text-foreground mb-3">
            2. Personal Data Collected
          </h2>
          <p>
            When you book a consultation through our website, we use{" "}
            <strong>Calendly</strong> (operated by Calendly LLC, 271 17th St NW, Suite 1000,
            Atlanta, GA 30363, USA) to schedule appointments. Calendly may collect
            the following data:
          </p>
          <ul className="list-disc list-inside mt-3 space-y-1 text-muted-foreground">
            <li>Full name</li>
            <li>Email address</li>
            <li>Time zone</li>
            <li>Any additional information you voluntarily provide in the booking form</li>
          </ul>
          <p className="mt-3">
            No other personal data is collected directly by this website. We do not
            use analytics tracking cookies or advertising trackers.
          </p>
        </section>

        {/* 3 — Purpose & Legal Basis */}
        <section>
          <h2 className="text-xl font-display font-semibold text-foreground mb-3">
            3. Purpose and Legal Basis of Processing
          </h2>
          <p>
            Your personal data is processed for the sole purpose of scheduling and
            conducting a free strategy consultation with our team. The legal basis for
            this processing is your explicit consent provided at the time of booking
            (GDPR Article 6(1)(a)).
          </p>
        </section>

        {/* 4 — Retention */}
        <section>
          <h2 className="text-xl font-display font-semibold text-foreground mb-3">
            4. Data Retention
          </h2>
          <p>
            Data collected through Calendly is retained for a maximum of{" "}
            <strong>12 months</strong> from the date of collection, after which it is
            deleted or anonymised, unless a longer retention period is required by
            applicable law.
          </p>
        </section>

        {/* 5 — Third Parties */}
        <section>
          <h2 className="text-xl font-display font-semibold text-foreground mb-3">
            5. Third-Party Data Processors
          </h2>
          <p>
            We use Calendly as a sub-processor for appointment scheduling. Calendly
            processes data in accordance with its own{" "}
            <a
              href="https://calendly.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Privacy Policy
            </a>
            . Data may be transferred to the United States under appropriate
            safeguards (Standard Contractual Clauses).
          </p>
        </section>

        {/* 6 — Your Rights */}
        <section>
          <h2 className="text-xl font-display font-semibold text-foreground mb-3">
            6. Your Rights (GDPR)
          </h2>
          <p>
            Under the General Data Protection Regulation (GDPR), you have the
            following rights regarding your personal data:
          </p>
          <ul className="list-disc list-inside mt-3 space-y-1 text-muted-foreground">
            <li>Right of access: request a copy of your data</li>
            <li>Right to rectification: correct inaccurate data</li>
            <li>Right to erasure: request deletion of your data</li>
            <li>Right to restriction of processing</li>
            <li>Right to data portability</li>
            <li>Right to withdraw consent at any time</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, contact us at:{" "}
            <a href="mailto:[EMAIL]" className="text-primary hover:underline">
              [EMAIL] (to be completed by the client)
            </a>
          </p>
        </section>

        {/* 7 — Cookies */
        <section>
          <h2 className="text-xl font-display font-semibold text-foreground mb-3">
            7. Cookies
          </h2>
          <p>
            This website does not use analytics cookies or advertising trackers.
            Calendly may set functional cookies required for its booking widget to
            operate. These are strictly necessary cookies and do not require consent
            under ePrivacy regulations.
          </p>
        </section>

        {/* 8 — Contact */}
        <section>
          <h2 className="text-xl font-display font-semibold text-foreground mb-3">
            8. Contact & Complaints
          </h2>
          <p>
            For any questions about this privacy policy or to exercise your rights,
            contact:{" "}
            <a href="mailto:[EMAIL]" className="text-primary hover:underline">
              [EMAIL] (to be completed by the client)
            </a>
          </p>
          <p className="mt-3">
            You also have the right to lodge a complaint with your local data
            protection authority.
          </p>
        </section>

      </div>
    </main>
    <Footer />
  </div>
);

export default PrivacyPolicy;
