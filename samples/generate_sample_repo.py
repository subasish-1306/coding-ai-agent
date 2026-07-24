"""Generates sample repository ZIP archive for instant testing and demonstration."""

import json
from pathlib import Path
import zipfile

OUTPUT_DIR = Path(__file__).parent
OUTPUT_ZIP = OUTPUT_DIR / "sample-fullstack-repo.zip"

def create_sample_zip():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    files = {
        "README.md": "# Sample E-Commerce Monorepo\n\nFull-stack e-commerce project with React frontend and FastAPI backend.",
        "LICENSE": "MIT License\n\nCopyright (c) 2026 Coding AI Agent",
        ".gitignore": "node_modules/\n.venv/\ndist/\n.env\n*.pyc\n",
        "Dockerfile": "FROM python:3.12-slim\nWORKDIR /app\nCOPY . .\nCMD [\"uvicorn\", \"apps.backend.app.main:app\"]",
        "docker-compose.yml": "version: '3.8'\nservices:\n  backend:\n    build: .\n    ports:\n      - '8000:8000'\n",
        "apps/frontend/package.json": json.dumps({
            "name": "@ecommerce/frontend",
            "version": "1.0.0",
            "dependencies": {
                "react": "^18.3.1",
                "react-dom": "^18.3.1",
                "next": "^14.2.0",
                "tailwindcss": "^3.4.0"
            }
        }, indent=2),
        "apps/frontend/src/App.tsx": "import React from 'react';\nexport const App = () => <h1>E-Commerce Storefront</h1>;\n",
        "apps/backend/requirements.txt": "fastapi>=0.115.0\nuvicorn>=0.30.0\npydantic>=2.9.0\nsqlalchemy>=2.0.0\n",
        "apps/backend/app/main.py": "from fastapi import FastAPI\napp = FastAPI(title='E-Commerce API')\n",
        "services/payment/package.json": json.dumps({
            "name": "@ecommerce/payment-service",
            "dependencies": { "express": "^4.19.0", "stripe": "^14.0.0" }
        }, indent=2),
    }

    with zipfile.ZipFile(OUTPUT_ZIP, "w") as zf:
        for path, content in files.items():
            zf.writestr(path, content)

    print(f"Generated sample repository archive at: {OUTPUT_ZIP} ({OUTPUT_ZIP.stat().st_size} bytes)")

if __name__ == "__main__":
    create_sample_zip()
