declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_BACKEND_URL?: string;
    REACT_APP_ADMIN_KEY?: string;
    NODE_ENV?: 'development' | 'production' | 'test';
  }
}

// do not redeclare `process` — only augment types above
