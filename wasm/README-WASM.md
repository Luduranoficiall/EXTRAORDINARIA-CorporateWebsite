# C++ → WebAssembly (POC)

This document explains how to build a minimal C++ WebAssembly module using Emscripten and call it from the web app.

## Requirements
- Emscripten SDK (emsdk) installed and activated. See https://emscripten.org/docs/getting_started/downloads.html

## Example steps
1. Create a simple C++ file (preview.cpp):

```cpp
#include <emscripten.h>

extern "C" {
  EMSCRIPTEN_KEEPALIVE
  int add(int a, int b) {
    return a + b;
  }
}
```

2. Compile to wasm / JS glue:

```bash
emcc preview.cpp -s WASM=1 -O2 -s EXPORTED_FUNCTIONS='["_add"]' -s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap"]' -o preview.js
```

3. Use from JS in the app (example):

```js
// after loading preview.js
const add = Module.cwrap('add', 'number', ['number', 'number']);
console.log(add(2,3));
```

## Notes
- Interaction with DOM/postMessage remains in JS. WASM can provide compute-heavy utilities.
- If you want I can produce a working build script and integrate the wasm loader into the app.

*** End of file
