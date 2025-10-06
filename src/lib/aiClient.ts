export type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };

import { API_BASE } from '@/lib/config';

export async function aiChat(messages: ChatMessage[], opts?: { model?: string; temperature?: number }) {
  const resp = await fetch(`${API_BASE}/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, ...opts }),
  });
  if (!resp.ok) throw new Error(`AI chat failed: ${resp.status}`);
  return resp.json();
}

export async function aiEmbeddings(input: string[]) {
  const resp = await fetch(`${API_BASE}/ai/embeddings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input }),
  });
  if (!resp.ok) throw new Error(`AI embeddings failed: ${resp.status}`);
  return resp.json();
}
