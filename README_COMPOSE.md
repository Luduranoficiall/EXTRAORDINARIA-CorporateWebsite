Stack: Web + AI Orchestrator + Payments

Prereqs
- Docker Desktop

Env (.env)
- STRIPE_SECRET_KEY, PRICE_ID (Stripe test)
- AI_PROVIDER=stub or openai; OPENAI_API_KEY
- STORAGE_PROVIDER=local or s3; for s3: S3_BUCKET, AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY

Run
1) docker compose up --build
2) Open http://localhost:8080

Endpoints (proxied by nginx)
- /ai/* -> FastAPI orchestrator
- /storage/* -> Storage upload/download/delete
- /api/* -> Payments (Stripe) via orchestrator

Notes
- For S3 testing locally, use MinIO and set S3_ENDPOINT_URL.
- Payments server is embedded in the orchestrator (/api/checkout).
