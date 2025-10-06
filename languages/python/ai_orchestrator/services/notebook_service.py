import re
import json
import httpx
from typing import List, Optional, Dict, Any
try:
    from bs4 import BeautifulSoup  # type: ignore
except Exception:  # fallback if bs4 isn't available at runtime
    BeautifulSoup = None  # type: ignore

from ..providers.openai_provider import OpenAIProvider
from ..providers.stub_provider import StubProvider


def _get_ai_provider():
    import os
    provider = (os.getenv("AI_PROVIDER") or "stub").lower()
    if provider == "openai":
        return OpenAIProvider()
    return StubProvider()


class NotebookSource:
    def __init__(self, url: str, title: Optional[str] = None, text: Optional[str] = None):
        self.url = url
        self.title = title
        self.text = text

    @classmethod
    async def fetch(cls, url: str) -> "NotebookSource":
        async with httpx.AsyncClient(timeout=20) as client:
            resp = await client.get(url)
            resp.raise_for_status()
            html = resp.text
        title = url
        text = re.sub(r"<[^>]+>", " ", html)
        text = re.sub(r"\s+", " ", text).strip()
        if BeautifulSoup is not None:
            soup = BeautifulSoup(html, "html.parser")
            title = soup.title.string.strip() if soup.title and soup.title.string else url
            # Extract readable text, avoid scripts/styles/nav
            for tag in soup(["script", "style", "noscript", "header", "footer", "nav"]):
                tag.decompose()
            text = re.sub(r"\s+", " ", soup.get_text(" ").strip())[:200_000]
        return cls(url=url, title=title, text=text)


class NotebookService:
    """
    Minimal, clean-room "notebook" assistant that:
    - Accepts a list of source URLs and optional notes
    - Summarizes and extracts key points
    - Answers user questions grounded on the provided sources
    """

    def __init__(self):
        self.provider = _get_ai_provider()

    async def ingest(self, urls: List[str]) -> List[NotebookSource]:
        results: List[NotebookSource] = []
        for u in urls:
            try:
                src = await NotebookSource.fetch(u)
                results.append(src)
            except Exception:
                # best-effort: skip broken URL
                continue
        return results

    async def summarize(self, sources: List[NotebookSource], language: str = "pt-br") -> Dict[str, Any]:
        """
        Produce an executive summary and bullet key points from sources.
        """
        if not sources:
            return {"summary": "Nenhuma fonte válida fornecida.", "bullets": []}
        corpus = "\n\n".join([f"Fonte: {s.title} ({s.url})\n{s.text}" for s in sources])[:300_000]
        prompt = (
            f"Você é um assistente de pesquisa confiável. Leia atentamente o conteúdo a seguir e produza:\n"
            f"1) Um resumo executivo conciso em {language}.\n"
            f"2) 5-10 tópicos em bullet points com os fatos mais importantes (sem exageros).\n"
            f"3) Cite explicitamente a(s) fonte(s) quando necessário (pelo título).\n\n"
            f"=== CONTEÚDO ===\n{corpus}\n\n=== RESPOSTA ==="
        )
        completion = await self.provider.chat(
            messages=[{"role": "user", "content": prompt}],
            model=None,
            temperature=0.2,
        )
        text = completion.get("content") or completion.get("choices", [{}])[0].get("message", {}).get("content", "")
        bullets = [b.strip("- • ") for b in text.split("\n") if b.strip().startswith(("-", "•"))]
        return {"summary": text, "bullets": bullets}

    async def qa(self, question: str, sources: List[NotebookSource], language: str = "pt-br") -> Dict[str, Any]:
        if not sources:
            return {"answer": "Sem fontes para consultar.", "quotes": []}
        corpus = "\n\n".join([f"Fonte: {s.title} ({s.url})\n{s.text}" for s in sources])[:300_000]
        prompt = (
            f"Com base APENAS nas fontes fornecidas, responda em {language}:\n"
            f"Pergunta: {question}\n\n"
            f"=== FONTES ===\n{corpus}\n\n"
            f"Regras:\n- Seja objetivo, cite as fontes (pelo título) para trechos específicos.\n- Se a resposta não estiver nas fontes, diga claramente que não há informação suficiente.\n"
        )
        completion = await self.provider.chat(
            messages=[{"role": "user", "content": prompt}],
            model=None,
            temperature=0.1,
        )
        answer = completion.get("content") or completion.get("choices", [{}])[0].get("message", {}).get("content", "")
        return {"answer": answer, "quotes": []}

    @staticmethod
    def embed_script(base_url: Optional[str] = None) -> str:
        """
        Returns a small JS to embed a "Notebook" button that opens a panel where the user
        can paste URLs and ask a question; it calls backend /notebook/summarize and /notebook/qa.
        """
                base = (base_url or "").rstrip("/")
                js = """
(() => {
    const d=document; if(d.getElementById('aeo-notebook-embed')) return; const m=d.createElement('meta'); m.id='aeo-notebook-embed'; d.head.appendChild(m);
    const css = `
        .nb-btn{position:fixed;left:20px;bottom:20px;z-index:99999;border-radius:20px;padding:10px 12px;background:#234776;color:#fff;box-shadow:0 2px 10px rgba(0,0,0,.2);cursor:pointer}
        .nb-panel{position:fixed;left:20px;bottom:70px;width:420px;max-width:95vw;height:520px;max-height:75vh;background:#fff;border:1px solid #ddd;border-radius:8px;box-shadow:0 12px 40px rgba(0,0,0,.2);display:none;flex-direction:column;overflow:hidden;z-index:99999}
        .nb-hd{background:#234776;color:#fff;padding:10px;display:flex;justify-content:space-between;align-items:center}
        .nb-bd{padding:10px;overflow:auto;gap:8px;display:flex;flex-direction:column}
        .nb-row{display:flex;gap:6px}
        .nb-row input{flex:1;padding:8px;border:1px solid #ccc;border-radius:6px}
        .nb-row button{padding:8px 10px;border-radius:6px;border:0;background:#234776;color:#fff}
        .nb-out{white-space:pre-wrap; font: 13px/1.4 system-ui,Segoe UI,Roboto;}
    `;
    const style=d.createElement('style'); style.textContent=css; d.head.appendChild(style);
    const panel=d.createElement('div'); panel.className='nb-panel';
    panel.innerHTML = `
        <div class='nb-hd'><div>Notebook Assistente</div><button style='background:transparent;border:0;color:#fff;font-weight:700'>×</button></div>
        <div class='nb-bd'>
            <div class='nb-row'><input placeholder='Cole uma URL e pressione Enter' /><button class='nb-add'>Adicionar</button></div>
            <div class='nb-row'><input class='nb-q' placeholder='Sua pergunta...' /><button class='nb-ask'>Perguntar</button></div>
            <div style='font:12px/1.2 system-ui;color:#666'>Dica: adicione várias fontes antes de perguntar.</div>
            <div class='nb-out'></div>
        </div>`;
    const close=panel.querySelector('button'); const urlInput=panel.querySelector('input'); const addBtn=panel.querySelector('.nb-add');
    const qInput=panel.querySelector('.nb-q'); const askBtn=panel.querySelector('.nb-ask'); const out=panel.querySelector('.nb-out');
    const urls=[];

    function log(t){ out.textContent = (out.textContent ? out.textContent + '\n\n' : '') + t; out.scrollTop=out.scrollHeight; }
    async function summarize(){
         if(!urls.length) return log('Nenhuma fonte.');
         log('Resumo: processando...');
         const r = await fetch('__BASE__/notebook/summarize', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ urls })});
         const j = await r.json();
         log(j.summary || JSON.stringify(j));
    }
    async function ask(){
         const question = qInput.value.trim(); if(!question) return; log('Pergunta: '+question); qInput.value='';
         const r = await fetch('__BASE__/notebook/qa', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ urls, question })});
         const j = await r.json();
         log(j.answer || JSON.stringify(j));
    }
    addBtn.addEventListener('click', () => { if(urlInput.value.trim()){ urls.push(urlInput.value.trim()); urlInput.value=''; log('Adicionado. Total fontes: '+urls.length); }});
    urlInput.addEventListener('keydown', (ev)=>{ if(ev.key==='Enter'){ addBtn.click(); }});
    askBtn.addEventListener('click', ask);
    close.addEventListener('click', ()=>{ panel.style.display='none'; });
    d.body.appendChild(panel);

    function toggle(){ panel.style.display = panel.style.display==='flex' ? 'none' : 'flex'; if(panel.style.display==='flex') urlInput.focus(); }
    const btn=d.createElement('button'); btn.className='nb-btn'; btn.textContent='Notebook'; btn.addEventListener('click', toggle); d.body.appendChild(btn);
})();
"""
                return js.replace("__BASE__", base)
