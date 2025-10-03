/**
 * iframeMessenger
 *
 * Implementa a lógica de handshake com um iframe externo (postMessage + MessagePort).
 * Melhores práticas aplicadas:
 * - Tipagem e validação das mensagens
 * - Lista configurável de origins permitidos
 * - Logs controláveis via opção `debug`
 * - Métodos de init / dispose / sendMessage para gerenciamento do ciclo de vida
 * - Proteção contra erros e limpeza de recursos (revokeObjectURL)
 */

type InitData = {
  type?: string;
  previewIframeInitialOptions?: unknown;
  initScriptBlob?: Blob | null;
  initScriptURL?: string | null;
  [k: string]: unknown;
}

export type IframeMessengerOptions = {
  allowedOrigins?: string[];
  debug?: boolean;
  onInit?: (opts: { origin: string; previewIframeInitialOptions?: unknown }) => void;
}

declare global {
  interface Window {
    messagePort: MessagePort | null;
    __PREVIEW_IFRAME_INITIAL_OPTIONS__?: unknown;
    iframeMessenger?: {
      dispose: () => void;
      sendMessage: (data: unknown) => void;
    };
  }
}

const DEFAULT_ALLOWED_ORIGINS = [
  'https://www.figma.com',
  'https://staging.figma.com',
  'https://local.figma.engineering:8443',
  'http://localhost:9000',
];

function isStringArray(a: unknown): a is string[] {
  return Array.isArray(a) && a.every(i => typeof i === 'string');
}

function safeLog(debug: boolean, ...args: unknown[]) {
  if (debug) console.debug('[iframeMessenger]', ...args);
}

export function initIframeMessenger(opts?: IframeMessengerOptions) {
  const allowedOrigins = isStringArray(opts?.allowedOrigins) ? opts!.allowedOrigins : DEFAULT_ALLOWED_ORIGINS;
  const debug = Boolean(opts?.debug);

  // Ensure window.messagePort exists and is null initially
  window.messagePort = null;

  function sendMessage(data: unknown) {
    try {
      if (window.messagePort) {
        window.messagePort.postMessage({ data });
      } else {
        safeLog(debug, 'No messagePort available; dropping message', data);
      }
    } catch (err) {
      console.error('[iframeMessenger] sendMessage error', err);
    }
  }

  function handleMessage(e: MessageEvent) {
    try {
      safeLog(debug, 'message event received', e.origin, e.data);

      if (!allowedOrigins.includes(e.origin)) {
        safeLog(debug, 'origin not allowed', e.origin);
        return;
      }

      const data = e.data as InitData;
      if (!data || typeof data !== 'object') return;

      if (data.type === 'iframe-init') {
        // use the first MessagePort if provided
        const port = (e as MessageEvent).ports && (e as MessageEvent).ports[0];
        if (port && !window.messagePort) {
          window.messagePort = port;
          // forward status (false = not ready yet)
          sendMessage({ method: 'status', isReady: false });
        }

        // expose preview options for other code paths
        window.__PREVIEW_IFRAME_INITIAL_OPTIONS__ = data.previewIframeInitialOptions;

        // notify consumer
        opts?.onInit?.({ origin: e.origin, previewIframeInitialOptions: data.previewIframeInitialOptions });

        // load provided script (blob preferred)
        if (data.initScriptBlob instanceof Blob) {
          const blobUrl = URL.createObjectURL(data.initScriptBlob as Blob);
          // dynamic import of the blob as module if supported
          import(/* @vite-ignore */ blobUrl)
            .catch(err => console.error('[iframeMessenger] import blob failed', err))
            .finally(() => {
              try { URL.revokeObjectURL(blobUrl); } catch (e) { /* ignore */ }
            });
        } else if (typeof data.initScriptURL === 'string' && data.initScriptURL.length > 0) {
          const script = document.createElement('script');
          script.src = data.initScriptURL;
          // improving security: request anonymous cross-origin and don't allow referrer
          script.crossOrigin = 'anonymous';
          script.referrerPolicy = 'no-referrer';
          script.async = true;
          script.addEventListener('error', (err) => console.error('[iframeMessenger] external script failed to load', err));
          document.body.appendChild(script);
        }
      }
    } catch (err) {
      console.error('[iframeMessenger] handleMessage error', err);
    }
  }

  // attach the listener
  window.addEventListener('message', handleMessage, false);

  function dispose() {
    try {
      window.removeEventListener('message', handleMessage as EventListener);
      if (window.messagePort) {
        try { window.messagePort.close(); } catch (e) { /* ignore */ }
      }
      window.messagePort = null;
      delete window.iframeMessenger;
      safeLog(debug, 'disposed');
    } catch (err) {
      console.error('[iframeMessenger] dispose error', err);
    }
  }

  // expose small API on window for other scripts/tests
  window.iframeMessenger = {
    dispose,
    sendMessage,
  };

  safeLog(debug, 'iframeMessenger initialized', { allowedOrigins });

  return { dispose, sendMessage };
}

export default initIframeMessenger;
