import pytest
from python_app.app import create_app
from python_app.models import init_db, DB_PATH
import os

@pytest.fixture
def client(tmp_path, monkeypatch):
    dbfile = str(tmp_path / 'test.db')
    monkeypatch.setenv('PYAPP_DB', dbfile)
    init_db()
    app = create_app({'TESTING': True})
    with app.test_client() as c:
        yield c


def test_collect_and_analyze(client):
    rv = client.post('/collect', json={'value': 10.5})
    assert rv.status_code == 201
    rv = client.post('/collect', json={'value': 20.0})
    assert rv.status_code == 201
    rv = client.get('/analyze')
    assert rv.status_code == 200
    data = rv.get_json()
    assert data['count'] == 2
