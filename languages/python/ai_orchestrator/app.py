import os
import uuid
import time
from fastapi import FastAPI, HTTPException, UploadFile, File, Request
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import stripe

from .providers.openai_provider import OpenAIProvider
from .providers.stub_provider import StubProvider
from .storage import LocalStorageProvider, S3StorageProvider, StorageProvider
from .storage.icloud_provider import ICloudStorageProvider
from .storage.onedrive_provider import OneDriveStorageProvider
from .storage.dropbox_provider import DropboxStorageProvider
from .storage.gdrive_provider import GoogleDriveStorageProvider
from .storage.azure_blob_provider import AzureBlobStorageProvider
from .services.notebook_service import NotebookService


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: List[Message]
    tools: Optional[List[Dict[str, Any]]] = None
    model: Optional[str] = None
    temperature: Optional[float] = 0.7


class EmbeddingsRequest(BaseModel):
    input: List[str]
    model: Optional[str] = None


def get_provider():
    provider = (os.getenv("AI_PROVIDER") or "stub").lower()
    if provider == "openai":
        return OpenAIProvider()
    return StubProvider()


def get_storage_provider() -> StorageProvider:
    kind = (os.getenv("STORAGE_PROVIDER") or "local").lower()
    if kind == "s3" and S3StorageProvider is not None:
        return S3StorageProvider()
    if kind == "icloud":
        return ICloudStorageProvider()
    if kind == "onedrive":
        return OneDriveStorageProvider()
    if kind == "dropbox":
        return DropboxStorageProvider()
    if kind == "gdrive":
        return GoogleDriveStorageProvider()
    if kind == "azure":
        return AzureBlobStorageProvider()
    # Future: drive/dropbox/onedrive/icloud adapters
    return LocalStorageProvider(base_dir=os.getenv("STORAGE_DIR", "/data/storage"))


app = FastAPI(title="AI Orchestrator", version="0.1.0")

# CORS configurable via env (comma-separated); default permissive for dev
allow_origins_env = os.getenv("ALLOW_ORIGINS", "*")
allow_origins = [o.strip() for o in allow_origins_env.split(",") if o.strip()] or ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def add_request_id_header(request: Request, call_next):
    req_id = request.headers.get("x-request-id") or str(uuid.uuid4())
    start = time.time()
    try:
        response = await call_next(request)
    except Exception as e:
        # Fallback error
        from fastapi.responses import JSONResponse

        response = JSONResponse({"detail": str(e), "requestId": req_id}, status_code=500)
    response.headers["x-request-id"] = req_id
    response.headers["x-response-time-ms"] = str(int((time.time() - start) * 1000))
    return response


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/health/live")
def live():
    return {"status": "live"}


@app.get("/health/ready")
def ready():
    # Provide simple readiness information
    return {
        "status": "ready",
        "aiProvider": (os.getenv("AI_PROVIDER") or "stub").lower(),
        "storageProvider": (os.getenv("STORAGE_PROVIDER") or "local").lower(),
    }


# =============== NOTEBOOK (Assistente de Pesquisa) =====================
notebook_service = NotebookService()


class NotebookSummarizeRequest(BaseModel):
    urls: List[str]
    language: Optional[str] = "pt-br"


class NotebookQARequest(BaseModel):
    urls: List[str]
    question: str
    language: Optional[str] = "pt-br"


@app.get("/notebook/embed.js")
def notebook_embed_js(request: Request):
    base = f"{request.url.scheme}://{request.url.netloc}"
    js = notebook_service.embed_script(base)
    return Response(content=js, media_type="application/javascript")


@app.post("/notebook/summarize")
async def notebook_summarize(req: NotebookSummarizeRequest):
    try:
        sources = await notebook_service.ingest(req.urls)
        result = await notebook_service.summarize(sources, language=req.language or "pt-br")
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/notebook/qa")
async def notebook_qa(req: NotebookQARequest):
    try:
        sources = await notebook_service.ingest(req.urls)
        result = await notebook_service.qa(req.question, sources, language=req.language or "pt-br")
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/embed.js")
def embed_js():
        """
        Pequeno widget de chat embutível. Copie e cole em qualquer site:
            <script src="https://SEU-ORCHESTRATOR/embed.js" async></script>
        Opcional: configure via window.aeoSettings antes do script.
        """
        js = r"""
(() => {
    const d = document;
    if (d.getElementById('aeo-embed-script-loaded')) return;
    const m = d.createElement('meta'); m.id = 'aeo-embed-script-loaded'; d.head.appendChild(m);

    const S = Object.assign({
        organization_id: undefined,
        base_url: undefined,
        chat: {
            enabled: true,
            button_text: 'Ask AI',
            intro_text: "Hello! How can I help?",
            button_color: '#111',
            button_text_color: '#fff',
        },
        button: {
            enabled: true,
            subdomain: undefined,
            button_selector: undefined,
        }
    }, (window.aeoSettings || {}));

    // Descobre base do Orchestrator a partir da origem do script se não vier configurado
    try {
        const scr = document.currentScript || (function(){const s = document.querySelector('script[src*="/embed.js"]'); return s;})()
        if (!S.base_url && scr && scr.src) {
            const u = new URL(scr.src);
            S.base_url = u.origin;
        }
    } catch(e){}
    if (!S.base_url) S.base_url = '';

    // estilos mínimos
    const css = `
    .aeo-chat-btn{position:fixed;right:20px;bottom:20px;z-index:99999;border-radius:24px;padding:10px 14px;font:600 14px/1.2 system-ui,Segoe UI,Roboto;color:${S.chat.button_text_color};background:${S.chat.button_color};cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.2)}
    .aeo-chat-panel{position:fixed;right:20px;bottom:70px;width:340px;height:460px;max-width:90vw;max-height:70vh;background:#fff;border:1px solid #ddd;border-radius:8px;box-shadow:0 12px 40px rgba(0,0,0,.2);display:none;flex-direction:column;overflow:hidden;z-index:99999}
    .aeo-chat-header{padding:10px 12px;background:#111;color:#fff;display:flex;align-items:center;justify-content:space-between}
    .aeo-chat-body{flex:1;overflow:auto;padding:10px;background:#fafafa}
    .aeo-msg{margin:8px 0;padding:8px 10px;border-radius:8px;max-width:85%}
    .aeo-msg.user{margin-left:auto;background:#e6f0ff}
    .aeo-msg.assistant{margin-right:auto;background:#eee}
    .aeo-chat-input{display:flex;gap:6px;padding:8px;border-top:1px solid #eee}
    .aeo-chat-input input{flex:1;padding:8px;border:1px solid #ccc;border-radius:6px}
    .aeo-chat-input button{padding:8px 10px;border-radius:6px;border:0;background:#111;color:#fff}
    `;
    const style = d.createElement('style'); style.textContent = css; d.head.appendChild(style);

    // cria UI
    const panel = d.createElement('div'); panel.className = 'aeo-chat-panel';
    panel.innerHTML = `
        <div class="aeo-chat-header">
            <div>AI Chat</div>
            <button aria-label="Fechar" style="background:transparent;border:0;color:#fff;font-weight:700;cursor:pointer">×</button>
        </div>
        <div class="aeo-chat-body"></div>
        <div class="aeo-chat-input">
            <input type="text" placeholder="Digite sua mensagem..." />
            <button>Enviar</button>
        </div>
    `;
    const closeBtn = panel.querySelector('.aeo-chat-header button');
    const body = panel.querySelector('.aeo-chat-body');
    const input = panel.querySelector('.aeo-chat-input input');
    const sendBtn = panel.querySelector('.aeo-chat-input button');

    function addMsg(text, who){
        const div = d.createElement('div');
        div.className = 'aeo-msg ' + (who||'assistant');
        div.textContent = text;
        body.appendChild(div); body.scrollTop = body.scrollHeight;
    }

    // Mensagem inicial
    if (S.chat.intro_text) setTimeout(() => addMsg(S.chat.intro_text, 'assistant'), 50);

    async function ask(text){
        addMsg(text, 'user');
        input.value='';
        try{
            const r = await fetch(S.base_url + '/ai/chat', {
                method: 'POST', headers:{'Content-Type':'application/json'},
                body: JSON.stringify({ messages: [{ role:'user', content: text }] })
            });
            const j = await r.json();
            let reply = '';
            if (j && j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) {
                reply = j.choices[0].message.content;
            } else if (j.content) {
                reply = j.content;
            } else {
                reply = JSON.stringify(j);
            }
            addMsg(reply, 'assistant');
        } catch(e){ addMsg('Erro ao obter resposta: '+e, 'assistant'); }
    }

    sendBtn.addEventListener('click', () => { if (input.value.trim()) ask(input.value.trim()); });
    input.addEventListener('keydown', (ev) => { if (ev.key==='Enter' && input.value.trim()) ask(input.value.trim()); });
    closeBtn.addEventListener('click', () => { panel.style.display='none'; });
        d.addEventListener('keydown', (ev)=>{ if (ev.key === 'Escape') panel.style.display='none'; });

    d.body.appendChild(panel);

        function openPanel(){ panel.style.display = 'flex'; input?.focus?.(); }
        function togglePanel(){ panel.style.display = (panel.style.display==='flex') ? 'none' : 'flex'; if (panel.style.display==='flex') input?.focus?.(); }

        function bindSelectorButtons(){
            if (!S.button || !S.button.enabled || !S.button.button_selector) return false;
            const nodes = d.querySelectorAll(S.button.button_selector);
            if (!nodes || nodes.length === 0) return false;
            nodes.forEach(el => {
                el.addEventListener('click', (e)=>{ e.preventDefault?.(); openPanel(); });
            });
            return true;
        }

        function mountFloatingButton(){
            if (!S.chat.enabled) return;
            const btn = d.createElement('button');
            btn.className = 'aeo-chat-btn';
            btn.textContent = S.chat.button_text || 'Ask AI';
            btn.style.background = S.chat.button_color || '#111';
            btn.style.color = S.chat.button_text_color || '#fff';
            btn.addEventListener('click', togglePanel);
            d.body.appendChild(btn);
        }

        function initButtons(){
            const bound = bindSelectorButtons();
            if (!bound) mountFloatingButton();
        }

        if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', initButtons); else initButtons();

    // pageview básico para nosso backend (opcional)
    try{
        fetch(S.base_url + '/analytics/collect', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({
            event: 'page_view',
            url: location.href,
            title: document.title,
            referrer: document.referrer,
            user_status: (window.APP_USER && window.APP_USER.status) || 'guest'
        })});
    }catch(e){}
})();
        """
        return Response(content=js, media_type="application/javascript")


@app.post("/ai/chat")
async def chat(req: ChatRequest):
    provider = get_provider()
    try:
        result = await provider.chat(
            messages=[m.model_dump() for m in req.messages],
            tools=req.tools,
            model=req.model,
            temperature=req.temperature,
        )
        return result
    except NotImplementedError as e:
        raise HTTPException(status_code=501, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/ai/embeddings")
async def embeddings(req: EmbeddingsRequest):
    provider = get_provider()
    try:
        result = await provider.embeddings(inputs=req.input, model=req.model)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Stubs: moderation, vision, speech — adapt when provider supports
@app.post("/ai/moderation")
async def moderation(payload: Dict[str, Any]):
    provider = get_provider()
    try:
        return await provider.moderation(payload)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/ai/vision")
async def vision(payload: Dict[str, Any]):
    provider = get_provider()
    try:
        return await provider.vision(payload)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/ai/speech")
async def speech(payload: Dict[str, Any]):
    provider = get_provider()
    try:
        return await provider.speech(payload)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Storage endpoints
@app.post("/storage/upload")
async def upload_file(path: str, file: UploadFile = File(...)):
    storage = get_storage_provider()
    try:
        data = await file.read()
        uri = storage.upload(path, data, content_type=file.content_type)
        return {"ok": True, "uri": uri}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/storage/download")
async def download_file(path: str):
    storage = get_storage_provider()
    try:
        data = storage.download(path)
        # Return as base64 to keep it simple for now
        import base64

        return {"ok": True, "base64": base64.b64encode(data).decode("utf-8")}
    except NotImplementedError as e:
        raise HTTPException(status_code=501, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))


@app.delete("/storage/delete")
async def delete_file(path: str):
    storage = get_storage_provider()
    try:
        storage.delete(path)
        return {"ok": True}
    except NotImplementedError as e:
        raise HTTPException(status_code=501, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))


# Payments (Stripe) endpoint
class CheckoutRequest(BaseModel):
    success_url: Optional[str] = None
    cancel_url: Optional[str] = None
    customer_email: Optional[str] = None


@app.post("/api/checkout")
async def checkout(req: CheckoutRequest):
    secret = os.getenv("STRIPE_SECRET_KEY")
    price_id = os.getenv("PRICE_ID")
    if not secret:
        raise HTTPException(status_code=500, detail="Stripe not configured. Set STRIPE_SECRET_KEY env.")
    if not price_id:
        raise HTTPException(status_code=400, detail="PRICE_ID not set.")
    try:
        stripe.api_key = secret
        session = stripe.checkout.Session.create(
            mode="subscription",
            line_items=[{"price": price_id, "quantity": 1}],
            success_url=req.success_url or "http://localhost:3000/?checkout=success",
            cancel_url=req.cancel_url or "http://localhost:3000/?checkout=cancel",
            customer_email=req.customer_email,
            allow_promotion_codes=True,
        )
        return {"url": session.url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Data collection/analysis (migrated from Node -> Python)
import sqlite3


def get_db_path() -> str:
    return os.getenv("DATA_DB", "/data/metrics.db")


def with_db(fn):
    def wrapper(*args, **kwargs):
        db_path = get_db_path()
        os.makedirs(os.path.dirname(db_path), exist_ok=True)
        con = sqlite3.connect(db_path, check_same_thread=False)
        try:
            con.execute(
                "CREATE TABLE IF NOT EXISTS samples (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT, value REAL)"
            )
            con.execute("CREATE INDEX IF NOT EXISTS idx_samples_ts ON samples(ts)")
            return fn(con, *args, **kwargs)
        finally:
            con.close()
    return wrapper


class CollectRequest(BaseModel):
    value: float


@app.post("/data/collect")
@with_db
def data_collect(con: sqlite3.Connection, req: CollectRequest):
    try:
        from datetime import datetime, timezone

        ts = datetime.now(tz=timezone.utc).isoformat()
        con.execute("INSERT INTO samples (ts, value) VALUES (?,?)", (ts, float(req.value)))
        con.commit()
        return {"status": "ok"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/data/analyze")
@with_db
def data_analyze(con: sqlite3.Connection):
    try:
        cur = con.execute("SELECT value FROM samples")
        rows = [r[0] for r in cur.fetchall()]
        vals = [float(v) for v in rows if v is not None]
        if not vals:
            return {"count": 0}
        n = len(vals)
        s = sum(vals)
        mean = s / n
        sqmean = sum(v * v for v in vals) / n
        variance = max(0.0, sqmean - mean * mean)
        import math

        std = math.sqrt(variance)
        return {"count": n, "mean": mean, "std": std, "min": min(vals), "max": max(vals)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Analytics (coleta simples de eventos)
class AnalyticsEvent(BaseModel):
    event: str
    url: Optional[str] = None
    title: Optional[str] = None
    referrer: Optional[str] = None
    user_status: Optional[str] = None
    meta: Optional[Dict[str, Any]] = None


@app.post("/analytics/collect")
@with_db
def analytics_collect(con: sqlite3.Connection, ev: AnalyticsEvent, request: Request):
    try:
        con.execute(
            "CREATE TABLE IF NOT EXISTS analytics (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT, event TEXT, url TEXT, title TEXT, referrer TEXT, user_status TEXT, ip TEXT, ua TEXT, meta TEXT)"
        )
        from datetime import datetime, timezone
        import json as _json

        ts = datetime.now(tz=timezone.utc).isoformat()
        ip = request.client.host if request.client else None
        ua = request.headers.get("user-agent")
        meta = _json.dumps(ev.meta) if ev.meta else None
        con.execute(
            "INSERT INTO analytics (ts, event, url, title, referrer, user_status, ip, ua, meta) VALUES (?,?,?,?,?,?,?,?,?)",
            (ts, ev.event, ev.url, ev.title, ev.referrer, ev.user_status, ip, ua, meta),
        )
        con.commit()
        return {"ok": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("AI_PORT", "5050")))
