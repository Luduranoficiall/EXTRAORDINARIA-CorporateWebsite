#!/usr/bin/env bash
# Use Docker to compile the WASM if emscripten not available locally
# Requires Docker to be installed and running.

docker run --rm -v "$(pwd)":/src -w /src/wasm emscripten/emsdk:latest \
  emcc preview.cpp -s WASM=1 -O2 -s EXPORTED_FUNCTIONS='["_add"]' -s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap"]' -o dist/preview.js

echo "WASM build (docker) complete: wasm/dist/preview.js + preview.wasm"
