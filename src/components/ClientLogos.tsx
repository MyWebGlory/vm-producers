import { motion } from "framer-motion";

import nikeLogo from "@/assets/logos/nike.webp";
import samsungLogo from "@/assets/logos/samsung.png";
import hpLogo from "@/assets/logos/hp.webp";
import chevroletLogo from "@/assets/logos/chevrolet.png";
import angryOrchardLogo from "@/assets/logos/angry-orchard.png";
import nokiaLogo from "@/assets/logos/nokia.png";
import oracleLogo from "@/assets/logos/oracle.png";
import secureworksLogo from "@/assets/logos/secureworks.png";
import adidasLogo from "@/assets/logos/adidas.webp";
import atlantaUnitedLogo from "@/assets/logos/atlanta-united.png";

const clients = [
  { name: "Nike", logo: nikeLogo },
  { name: "Samsung", logo: samsungLogo },
  { name: "HP", logo: hpLogo },
  { name: "Chevrolet", logo: chevroletLogo },
  { name: "Angry Orchard", logo: angryOrchardLogo },
  { name: "Nokia", logo: nokiaLogo },
  { name: "Oracle", logo: oracleLogo },
  { name: "Secureworks", logo: secureworksLogo },
  { name: "Adidas", logo: adidasLogo },
  { name: "Atlanta United", logo: atlantaUnitedLogo },
];

const ClientLogos = () => {
  return (
    <section className="relative py-16 bg-card overflow-hidden">
      {/* Row 1 */}
      <div className="relative mb-5">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />
        <div className="flex animate-logo-scroll">
          {[...clients, ...clients].map((client, i) => (
            <div key={`r1-${i}`} className="flex-shrink-0 mx-3">
              <div className="elevated rounded-xl px-8 py-5 flex items-center justify-center min-w-[160px] h-[70px] border border-border/30">
                <img src={client.logo} alt={client.name} className="max-h-8 max-w-[120px] object-contain opacity-50 hover:opacity-90 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />
        <div className="flex animate-logo-scroll-reverse">
          {[...clients.slice(5), ...clients.slice(0, 5), ...clients.slice(5), ...clients.slice(0, 5)].map((client, i) => (
            <div key={`r2-${i}`} className="flex-shrink-0 mx-3">
              <div className="elevated rounded-xl px-8 py-5 flex items-center justify-center min-w-[160px] h-[70px] border border-border/30">
                <img src={client.logo} alt={client.name} className="max-h-8 max-w-[120px] object-contain opacity-50 hover:opacity-90 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
