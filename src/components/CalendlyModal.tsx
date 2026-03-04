import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { X } from "lucide-react";

const CALENDLY_URL =
  "https://calendly.com/austin-vmproducers/virtual-producer-consultation?embed_domain=vmproducers.com&embed_type=Inline&hide_gdpr_banner=1&background_color=ffffff&text_color=111827&primary_color=16a34a";

const MODAL_W = 1020;
const HEADER_H = 72;
const CONTENT_H = 660;
const TOTAL_H = HEADER_H + CONTENT_H;

interface CalendlyContextValue {
  openCalendly: () => void;
}

const CalendlyContext = createContext<CalendlyContextValue>({ openCalendly: () => {} });
export const useCalendly = () => useContext(CalendlyContext);

export function CalendlyProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openCalendly = useCallback(() => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeCalendly = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeCalendly(); };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [closeCalendly]);

  return (
    <CalendlyContext.Provider value={{ openCalendly }}>
      {children}

      {isOpen && (
        <div
          onClick={closeCalendly}
          style={{
            position: "fixed", inset: 0, zIndex: 9998,
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            animation: "cly-fade 0.15s ease forwards",
          }}
        />
      )}

      {/*
        ALWAYS at center-screen with real pixel dimensions so the browser
        gives the iframe full rendering priority (it's in the viewport).

        Hidden state : z-index -1  - sits behind ALL page content (covered by
                       the page's own background/elements), pointer-events none.
        Open state   : z-index 9999 - floats above everything.

        NO left:-9999px / visibility:hidden / opacity:0 - browser never
        throttles or deprioritises the iframe. Calendly loads at full speed.
      */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Book a Free Consultation"
        aria-hidden={!isOpen}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: isOpen
            ? "translate(-50%, -50%) scale(1)"
            : "translate(-50%, -50%) scale(0.97)",
          transition: "transform 0.15s cubic-bezier(0.16,1,0.3,1)",
          zIndex: isOpen ? 9999 : -1,
          width: MODAL_W,
          maxWidth: "calc(100vw - 3rem)",
          height: TOTAL_H,
          background: "#fff",
          borderRadius: "1rem",
          overflow: "hidden",
          boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
          pointerEvents: isOpen ? "auto" : "none",
          willChange: "transform",
        }}
      >
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1rem 1.5rem", borderBottom: "1px solid #f3f4f6",
          height: HEADER_H, boxSizing: "border-box", background: "#fff", flexShrink: 0,
        }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: "0.9375rem", color: "#111827", margin: 0 }}>
              Book a Free Consultation
            </p>
            <p style={{ fontSize: "0.75rem", color: "#6b7280", margin: "2px 0 0" }}>
              Choose a time that works for you, no commitment needed
            </p>
          </div>
          <button
            onClick={closeCalendly}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 32, height: 32, borderRadius: "50%", border: "none",
              background: "transparent", cursor: "pointer", color: "#9ca3af",
              transition: "background 0.15s, color 0.15s", flexShrink: 0,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#f3f4f6"; (e.currentTarget as HTMLButtonElement).style.color = "#111827"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#9ca3af"; }}
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <iframe
          src={CALENDLY_URL}
          title="Book a consultation with VM Producers"
          frameBorder="0"
          allow="camera; microphone"
          // @ts-expect-error fetchpriority is a valid HTML attribute not yet in React types
          fetchpriority="high"
          importance="high"
          style={{ display: "block", width: "100%", height: CONTENT_H, border: "none" }}
        />
      </div>

      <style>{`@keyframes cly-fade { from { opacity:0 } to { opacity:1 } }`}</style>
    </CalendlyContext.Provider>
  );
}
