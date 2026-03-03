/**
 * vite.ssr.config.ts — Vite SSR build configuration
 *
 * Run with: vite build --config vite.ssr.config.ts
 * Output:   dist/server/entry-ssr.js  (ESM Node.js bundle)
 *
 * The SSR build MUST run after the standard client build so that Vite can
 * read dist/.vite/manifest.json and resolve hashed asset URLs correctly.
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: process.env.BASE_PATH || "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Tell Vite this is a server-side build targeting the SSR entry
    ssr: "src/entry-ssr.tsx",
    outDir: "dist/server",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        format: "esm",
        entryFileNames: "entry-ssr.js",
      },
    },
  },
  // SSR-specific options: bundle all dependencies to avoid Node require() issues
  ssr: {
    noExternal: [
      "react-helmet-async",
      "framer-motion",
    ],
  },
});
