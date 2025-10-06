
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import initIframeMessenger from "./iframeMessenger";
import ErrorBoundary from "./components/ErrorBoundary";

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
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );

  // Cleanup on unload to avoid leaking MessagePorts or listeners
  // Cleanup on unload to avoid leaking MessagePorts or listeners
  const onUnload = () => {
    try {
      messenger?.dispose?.();
    } catch (e) {
      // ignore
    }
  };

  window.addEventListener("beforeunload", onUnload);

  // If the app is unmounted by HMR or similar, try to cleanup
  if ((import.meta as any).hot?.dispose) {
    (import.meta as any).hot.dispose(onUnload);
  }
}

// opcional: expor para debugging no console
if ((import.meta as any).env && (import.meta as any).env.DEV) {
  (window as any).__messenger = messenger;
}
