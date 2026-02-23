import { useState, useEffect } from "react";

/**
 * Defers video source loading by a configurable delay (ms).
 * Returns null until the delay has elapsed, then returns the src.
 * This lets the browser prioritize images and critical resources first.
 */
export const useDeferredVideo = (src: string | undefined, delayMs = 3000): string | null => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!src) return;
    const t = setTimeout(() => setReady(true), delayMs);
    return () => clearTimeout(t);
  }, [src, delayMs]);

  return ready && src ? src : null;
};
