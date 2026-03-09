import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
// entry

const rootEl = document.getElementById("root")!;
const app = (
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// Use hydrateRoot when the server has pre-rendered HTML into #root,
// otherwise fall back to createRoot for the SPA shell.
if (rootEl.hasAttribute("data-server-rendered")) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
