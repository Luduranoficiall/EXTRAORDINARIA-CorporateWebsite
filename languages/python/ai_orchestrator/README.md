# AI Orchestrator (FastAPI)

Endpoints unificados: /ai/chat, /ai/embeddings, /ai/moderation, /ai/vision, /ai/speech.

Como rodar local:

```powershell
cd CorporateWebsite\languages\python\ai_orchestrator
python -m pip install -r requirements.txt
$env:AI_PROVIDER="stub"; uvicorn app:app --host 0.0.0.0 --port 5050
```

Para usar OpenAI:
```powershell
$env:AI_PROVIDER="openai"; $env:OPENAI_API_KEY="sk-..."
uvicorn app:app --host 0.0.0.0 --port 5050
```

Front-end pode chamar `fetch('/ai/chat', ...)` via proxy configurado no Vite (adicione se necessário).