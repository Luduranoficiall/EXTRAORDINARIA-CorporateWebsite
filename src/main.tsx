
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import initIframeMessenger from "./iframeMessenger";

// Inicializa o iframe messenger para interagir com iframes externos/preview
const messenger = initIframeMessenger({
  debug: false,
  onInit: ({ origin, previewIframeInitialOptions }) => {
    // exemplo de hook para quando o iframe inicializar
    console.info("[main] iframe initialized from", origin, previewIframeInitialOptions);
  },
});

const rootEl = document.getElementById("root");
if (!rootEl) {
  // Fallback seguro se o container não existir
  console.error("[main] root element not found. Did you mount index.html correctly?");
} else {
  const root = createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Cleanup on unload to avoid leaking MessagePorts or listeners
  window.addEventListener("beforeunload", () => {
    try {
      messenger?.dispose?.();
    } catch (e) {
      /* ignore */
    }
  });
}

// opcional: expor para debugging no console
if (process.env.NODE_ENV === "development") {
  (window as any).__messenger = messenger;
}
