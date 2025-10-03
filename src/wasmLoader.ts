export async function loadPreviewWasm() {
  // This loader expects wasm/dist/preview.js + preview.wasm to exist
  if (!(window as any).Module) {
    // Dynamically load the generated preview.js (Emscripten glue)
    const script = document.createElement('script');
    script.src = '/wasm/dist/preview.js';
    script.async = true;
    document.body.appendChild(script);
    await new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = reject;
    });
  }

  const Module = (window as any).Module;
  if (!Module) throw new Error('WASM Module failed to load');
  const add = Module.cwrap('add', 'number', ['number', 'number']);
  return { add };
}
