import React, { useState } from 'react';
import { API_BASE } from '@/lib/config';

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true); setError(null);
    try {
  const resp = await fetch(`${API_BASE}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      const data = await resp.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        setError(data?.error || 'Erro ao iniciar checkout');
      }
    } catch (e: any) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
  <button onClick={handleClick} disabled={loading} className="checkout-btn">
        {loading ? 'Redirecionando…' : 'Assinar agora'}
      </button>
      {error && <div role="alert" className="status-message">{error}</div>}
    </div>
  );
}
