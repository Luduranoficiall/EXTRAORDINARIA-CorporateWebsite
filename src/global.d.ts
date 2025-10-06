declare module '*.css';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';

interface ImportMetaEnv {
  readonly VITE_ADMIN_PASSWORD?: string;
  readonly VITE_BACKEND_URL?: string;
  readonly DEV?: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
