Deploy rápido (Frontend + Backend)

Frontend (GitHub Pages)
1. Faça push para a branch main/master.
2. O workflow .github/workflows/deploy-pages.yml builda e publica a pasta build.
3. Em Settings > Pages, confirme a publicação e (opcional) configure domínio custom.
4. Para apontar o frontend para o backend público, defina VITE_API_BASE na build (ex.: VITE_API_BASE=https://sua-api.onrender.com)

Backend (Render.com)
1. Novo Web Service > Connect a repo > raiz: CorporateWebsite/languages/python/ai_orchestrator
2. Runtime: Python 3.11; Build command: pip install -r requirements.txt
3. Start command: uvicorn app:app --host 0.0.0.0 --port 10000
4. Env vars:
   - AI_PROVIDER=stub|openai; OPENAI_API_KEY=...
   - STORAGE_PROVIDER=local|s3|dropbox; (S3_*, AWS_*, DROPBOX_ACCESS_TOKEN)
   - STRIPE_SECRET_KEY, PRICE_ID
   - DATA_DB=/data/metrics.db
5. Add Disk (Persistence) /data se necessário.

Frontend apontando para backend público
- Ajuste as chamadas no frontend para usar URL do Render em produção (ou mantenha NGINX com proxy se usar docker próprio).
