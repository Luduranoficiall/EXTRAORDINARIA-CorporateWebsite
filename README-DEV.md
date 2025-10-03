# Corporate Website - Development README

This file summarizes how to work with the project locally and finish the remaining optional steps.

## Quick start
1. Open PowerShell and go to project root:

```powershell
cd 'C:\Users\User\OneDrive\Documentos\Extraordinaria.ai\CorporateWebsite'
```

2. Install dependencies (stable):

```powershell
npm install
```

3. Start development server:

```powershell
npm run dev
# open http://localhost:5173
# or preview the iframe test page at http://localhost:5173/iframe-preview.html
```

## Lint / Format / Tests
Install dev dependencies (if not already):

```powershell
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react prettier vitest --save-dev
```

Run lint:

```powershell
npm run lint
```

Run tests (Vitest):

```powershell
npm run test
```

## Build & Docker
Build production static:

```powershell
npm run build
```

Build Docker image (requires Docker installed):

```powershell
docker build -t corporate-site:latest .
```

## Troubleshooting
- If you run into `EPERM` errors on Windows in `node_modules`, try removing `node_modules` and running `npm install` again. If the project is under OneDrive/Dropbox, pause sync while installing.
- If npm prompts or stops mid-install, restart PowerShell and run the commands again.

## C++ → WASM (POC)
See `wasm/README-WASM.md` for instructions to create a prototype WebAssembly module from C++ and call it from JS. Emscripten is required.

*** End of file
