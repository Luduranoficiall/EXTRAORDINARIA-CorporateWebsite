#!/usr/bin/env bash
# Script to compile wasm/preview.cpp using emscripten (emcc)
# Usage: ./build-wasm.sh

if ! command -v emcc &> /dev/null; then
  echo "emcc not found. Install Emscripten (emsdk) first: https://emscripten.org/docs/getting_started/downloads.html"
  exit 1
fi

mkdir -p wasm/dist
emcc wasm/preview.cpp -s WASM=1 -O2 -s EXPORTED_FUNCTIONS='["_add"]' -s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap"]' -o wasm/dist/preview.js

echo "WASM build complete: wasm/dist/preview.js + preview.wasm"
