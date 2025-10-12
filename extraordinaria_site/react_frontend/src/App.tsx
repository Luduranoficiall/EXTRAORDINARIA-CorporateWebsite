import React from 'react';
import './index.css';

export default function App() {
  return (
    <div className="app-root frontend-placeholder">
      <h1 className="placeholder-title">Extraordinaria - Frontend Placeholder</h1>
      <p className="placeholder-sub">Este é um placeholder para o frontend React localizado em extraordinaria_site/react_frontend.</p>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import './index.css';
import BotGPTLanding from './BotGPTLanding';

const App: React.FC = () => {
  const [message, setMessage] = useState<string>('Carregando...');

  useEffect(() => {
    // Prefer Vite-style env, fallback to a sensible default
    const env: any = (typeof import.meta !== 'undefined' && (import.meta as any).env) ? (import.meta as any).env : {};
    const backendUrl = env.REACT_APP_BACKEND_URL || env.VITE_BACKEND_URL || 'http://127.0.0.1:5000';

    const checkBackend = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/test`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setMessage(data.message ?? 'Conectado ao backend');
      } catch (err: any) {
        setMessage('Erro: ' + (err.message ?? String(err)));
      }
    };

    checkBackend();
  }, []);

  return (
    <div className="app-root">
      <BotGPTLanding />
      <div className="status-message">{message}</div>
    </div>
  );
};

export default App;
