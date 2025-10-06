Python App - Professional

This folder contains a pure-Python professional backend for data collection, analysis and encryption.

Quickstart (PowerShell):

python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m python_app.cli init-db
python -m python_app.cli run --host 0.0.0.0 --port 5000

Endpoints:
- POST /collect {"value": number}
- GET /analyze
- POST /encrypt {"value": "text"} -> returns base64 ciphertext
- POST /decrypt {"cipher": "base64", "key": "base64"}

CLI:
- init-db: initialize sqlite DB
- gen-keys: generate RSA keypair
- run: run Flask dev server

Tests: pytest

Docker:
  docker build -t python-app:latest .
  docker run -p 5000:5000 python-app:latest

Docker Compose (orquestrar Python app, Node demo e dashboard):

From project root:

```powershell
docker-compose up --build -d
# Services:
# - Python API: http://localhost:5000
# - Node demo: http://localhost:5002
# - Dashboard: http://localhost:8050
```

To stop:

```powershell
docker-compose down
```
