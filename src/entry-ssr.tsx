/**
 * entry-ssr.tsx - Server-side rendering entry point.
 *
 * Used exclusively by the Vite SSR build (`vite build --config vite.ssr.config.ts`)
 * to produce a Node-compatible bundle that the prerender script can call.
 *
 * The client NEVER imports this file.
 */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, HelmetServerState } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppRoutes from "./AppRoutes";

export interface RenderResult {
  html: string;
  helmet: HelmetServerState;
}

/**
 * Render the React app for a given URL path to an HTML string.
 * Returns the rendered HTML and the Helmet context (title, meta, links, scripts).
 */
export function render(url: string): RenderResult {
  const helmetContext: { helmet?: HelmetServerState } = {};

  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 0, staleTime: Infinity } },
  });

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <StaticRouter location={url}>
            <AppRoutes />
          </StaticRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );

  return { html, helmet: helmetContext.helmet! };
}
