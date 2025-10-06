import os
import base64
import tempfile
from fastapi.testclient import TestClient

import app as orchestrator


def make_client(tmp_storage_dir=None, tmp_db_path=None):
    # Configure env for local providers in tests
    os.environ["AI_PROVIDER"] = os.getenv("AI_PROVIDER", "stub")
    if tmp_storage_dir:
        os.environ["STORAGE_PROVIDER"] = "local"
        os.environ["STORAGE_DIR"] = tmp_storage_dir
    if tmp_db_path:
        os.environ["DATA_DB"] = tmp_db_path
    return TestClient(orchestrator.app)


def test_health_endpoints():
    c = make_client()
    r = c.get("/health")
    assert r.status_code == 200
    r = c.get("/health/live")
    assert r.status_code == 200
    r = c.get("/health/ready")
    assert r.status_code == 200


def test_chat_stub():
    c = make_client()
    r = c.post("/ai/chat", json={"messages": [{"role": "user", "content": "ping"}]})
    assert r.status_code in (200, 501)


def test_storage_local_roundtrip():
    with tempfile.TemporaryDirectory() as d:
        c = make_client(tmp_storage_dir=d)
        data = b"hello-storage"
        up = c.post("/storage/upload", params={"path": "tests/hello.txt"}, files={"file": ("hello.txt", data, "text/plain")})
        assert up.status_code == 200
        down = c.get("/storage/download", params={"path": "tests/hello.txt"})
        assert down.status_code == 200
        payload = down.json()
        assert base64.b64decode(payload["base64"]) == data
        rm = c.delete("/storage/delete", params={"path": "tests/hello.txt"})
        assert rm.status_code == 200


def test_data_endpoints():
    with tempfile.TemporaryDirectory() as d:
        db_path = os.path.join(d, "metrics.db")
        c = make_client(tmp_db_path=db_path)
        r = c.post("/data/collect", json={"value": 1.5})
        assert r.status_code == 200
        r = c.post("/data/collect", json={"value": 2.5})
        assert r.status_code == 200
        stats = c.get("/data/analyze")
        assert stats.status_code == 200
        j = stats.json()
        assert j["count"] >= 2


def test_checkout_without_stripe_secrets_returns_error():
    # Ensure envs are not set for this test
    os.environ.pop("STRIPE_SECRET_KEY", None)
    os.environ.pop("PRICE_ID", None)
    c = make_client()
    r = c.post("/api/checkout", json={})
    assert r.status_code in (400, 500)
