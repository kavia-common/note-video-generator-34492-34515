import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

// PUBLIC_INTERFACE
export function mountApp(rootElementId = "root") {
  /** Mounts the Notes Video Generator App in a standard DOM container. */
  // Guard against non-browser environments during lint/SSR
  // Use a minimal structural type to avoid relying on DOM lib globals
  const g = globalThis as unknown as { document?: { getElementById: (id: string) => unknown } };
  if (!g?.document) return;
  const rootEl = g.document.getElementById(rootElementId);
  if (!rootEl) return;
  const root = ReactDOM.createRoot(rootEl);
  root.render(<App />);
}
