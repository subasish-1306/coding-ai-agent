import io
import sys
import zipfile
import pytest

sys.path.insert(0, r"apps/backend")

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_fastapi_starts_and_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_docs_and_openapi():
    docs_resp = client.get("/docs")
    assert docs_resp.status_code == 200

    openapi_resp = client.get("/openapi.json")
    assert openapi_resp.status_code == 200


def test_cors_preflight():
    response = client.options(
        "/api/v1/upload",
        headers={
            "Origin": "https://coding-ai-agent-k2vxct3k8-subasish-1306s-projects.vercel.app",
            "Access-Control-Request-Method": "POST",
        },
    )
    assert response.status_code == 200
    assert (
        response.headers.get("access-control-allow-origin")
        == "https://coding-ai-agent-k2vxct3k8-subasish-1306s-projects.vercel.app"
    )


def test_upload_endpoint():
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, "w") as zf:
        zf.writestr("index.js", "console.log('hello world');")
        zf.writestr("package.json", '{"name": "test-repo", "version": "1.0.0"}')
    zip_buffer.seek(0)

    response = client.post(
        "/api/v1/upload",
        files={"file": ("test.zip", zip_buffer.getvalue(), "application/zip")},
    )
    assert response.status_code == 201
    data = response.json()
    assert "workspace_id" in data
    assert "intelligence" in data
