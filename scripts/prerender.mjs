/**
 * scripts/prerender.mjs - Build-time static HTML generation
 *
 * Run AFTER both client and SSR builds:
 *   1. vite build                                  → dist/ (client bundle + manifest)
 *   2. vite build --config vite.ssr.config.ts      → dist/server/ (SSR Node bundle)
 *   3. node scripts/prerender.mjs                  → dist/{route}/index.html
 *
 * For each route, the script:
 *   - Calls render(url) from the SSR bundle (renderToString + StaticRouter)
 *   - Injects the rendered HTML into <div id="root">
 *   - Updates <title>, <meta name="description">, <link rel="canonical">
 *   - Injects page-specific JSON-LD and other <head> tags from react-helmet-async
 *   - Writes the final HTML to dist/{route}/index.html
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const distPath = path.join(ROOT, "dist");
const ssrEntryPath = path.join(distPath, "server", "entry-ssr.js");

// ---------------------------------------------------------------------------
// Routes to prerender (must match src/AppRoutes.tsx ROUTES)
// ---------------------------------------------------------------------------
const ROUTES = [
  "/",
  "/live-events",
  "/virtual-events",
  "/hybrid-events",
  "/video-production",
  "/meeting-pros",
  "/privacy-policy",
  "/legal-notice",
];

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

/**
 * Inject rendered HTML into <div id="root">, replacing the empty shell.
 */
function injectAppHtml(template, appHtml) {
  return template.replace(
    '<div id="root"></div>',
    `<div id="root" data-server-rendered="true">${appHtml}</div>`
  );
}

/**
 * Replace or inject a tag in <head>.
 * `pattern` - regex that matches the existing tag (if any)
 * `newTag`  - the new tag to inject
 */
function replaceHeadTag(html, pattern, newTag) {
  if (pattern.test(html)) {
    return html.replace(pattern, newTag);
  }
  // Not found? Inject right before </head>
  return html.replace("</head>", `  ${newTag}\n  </head>`);
}

/**
 * Extract all <meta>, <link>, <script> tags emitted by react-helmet-async
 * and inject them into <head> - deduplicating against what's already there.
 */
function mergeHelmetHead(template, helmet) {
  let result = template;

  // 1. Title
  const titleStr = helmet.title?.toString() ?? "";
  if (titleStr) {
    result = replaceHeadTag(result, /<title>.*?<\/title>/s, titleStr);
  }

  // 2. meta description & robots (helmet emits all <meta> as one string)
  const metaStr = helmet.meta?.toString() ?? "";
  if (metaStr) {
    // Replace the existing description meta if present
    result = result.replace(
      /<meta\s+name="description"[^>]*>/,
      ""
    );
    // Replace existing robots meta if present
    result = result.replace(
      /<meta\s+name="robots"[^>]*>/,
      ""
    );
    // Replace OG tags that helmet may re-emit (avoid dupes)
    const ogProps = ["og:type", "og:url", "og:title", "og:description", "og:image", "og:image:width", "og:image:height", "og:site_name", "og:locale"];
    for (const prop of ogProps) {
      const reg = new RegExp(`<meta\\s+property="${prop}"[^>]*>`, "g");
      result = result.replace(reg, "");
    }
    // Same for twitter
    const twProps = ["twitter:card", "twitter:url", "twitter:title", "twitter:description", "twitter:image"];
    for (const prop of twProps) {
      const reg = new RegExp(`<meta\\s+name="${prop}"[^>]*>`, "g");
      result = result.replace(reg, "");
    }
    // Inject all helmet meta before </head>
    result = result.replace("</head>", `  ${metaStr}\n  </head>`);
  }

  // 3. <link rel="canonical"> - helmet emits as link tags
  const linkStr = helmet.link?.toString() ?? "";
  if (linkStr) {
    // Remove the existing canonical if on a non-home page
    result = result.replace(/<link\s+rel="canonical"[^>]*>/g, "");
    result = result.replace("</head>", `  ${linkStr}\n  </head>`);
  }

  // 4. JSON-LD and other scripts emitted by helmet
  const scriptStr = helmet.script?.toString() ?? "";
  if (scriptStr) {
    // Inject before </head>
    result = result.replace("</head>", `  ${scriptStr}\n  </head>`);
  }

  return result;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function prerender() {
  console.log("\n🔨 Starting prerender...\n");

  // Verify the SSR bundle exists
  if (!fs.existsSync(ssrEntryPath)) {
    console.error(`✗ SSR bundle not found at: ${ssrEntryPath}`);
    console.error("  Run: vite build --config vite.ssr.config.ts  before this script.");
    process.exit(1);
  }

  // Read the client's index.html template (the built one, not the source)
  const templatePath = path.join(distPath, "index.html");
  if (!fs.existsSync(templatePath)) {
    console.error(`✗ dist/index.html not found. Run: vite build  first.`);
    process.exit(1);
  }
  const template = fs.readFileSync(templatePath, "utf-8");

  // Dynamically import the SSR bundle (ESM).
  // On Windows, the path MUST be a file:// URL for dynamic ESM imports.
  const ssrEntryUrl = pathToFileURL(ssrEntryPath).href;
  const { render } = await import(ssrEntryUrl);

  let successCount = 0;
  let failCount = 0;

  for (const route of ROUTES) {
    try {
      const { html, helmet } = render(route);

      // Start from the built template
      let pageHtml = template;

      // Inject rendered React HTML
      pageHtml = injectAppHtml(pageHtml, html);

      // Merge helmet head tags (title, meta, canonical, JSON-LD)
      if (helmet) {
        pageHtml = mergeHelmetHead(pageHtml, helmet);
      }

      // Determine output path
      // "/" → dist/index.html  (replaces the SPA shell)
      // "/live-events" → dist/live-events/index.html
      const outDir =
        route === "/" ? distPath : path.join(distPath, route.slice(1));
      fs.mkdirSync(outDir, { recursive: true });

      const outFile = path.join(outDir, "index.html");
      fs.writeFileSync(outFile, pageHtml, "utf-8");

      const relative = outFile.replace(ROOT + path.sep, "");
      console.log(`  ✓  ${route.padEnd(22)} → ${relative}`);
      successCount++;
    } catch (err) {
      console.error(`  ✗  ${route} - ${err.message}`);
      if (process.env.PRERENDER_VERBOSE) console.error(err);
      failCount++;
    }
  }

  console.log(
    `\n🎉 Prerender complete: ${successCount} succeeded${failCount ? `, ${failCount} failed` : ""}\n`
  );

  if (failCount > 0) process.exit(1);
}

prerender().catch((err) => {
  console.error("Fatal prerender error:", err);
  process.exit(1);
});
