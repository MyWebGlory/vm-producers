/**
 * Canonical route list — single source of truth for:
 *  - React Router (AppRoutes.tsx)
 *  - Sitemap generation (vite.config.ts)
 *
 * NOTE: scripts/prerender.mjs runs as plain Node ESM after the build and cannot
 * import TypeScript files. Its route list is kept in sync manually with this file.
 */
export const ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/live-events", priority: "0.9", changefreq: "monthly" },
  { path: "/virtual-events", priority: "0.9", changefreq: "monthly" },
  { path: "/hybrid-events", priority: "0.9", changefreq: "monthly" },
  { path: "/video-production", priority: "0.9", changefreq: "monthly" },
  { path: "/meeting-pros", priority: "0.9", changefreq: "monthly" },
  { path: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
  { path: "/legal-notice", priority: "0.3", changefreq: "yearly" },
] as const;
