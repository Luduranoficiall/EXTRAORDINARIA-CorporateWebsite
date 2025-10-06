/// <reference types="vite/client" />

declare module '*.css';

declare global {
  interface ImportMetaEnv {
    readonly VITE_ADMIN_PASSWORD?: string;
    // add other env vars here as needed
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
