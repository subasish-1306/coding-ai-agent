# Testing & QA Guide

This document details automated testing practices, verification scripts, and quality control procedures.

## Automated Test Suites

### 1. Pytest Integration Tests
Runs import validation, router health check tests, and module integrity verification.

```bash
# Run pytest from root
pytest tests
```

### 2. End-to-End QA Suite (`scratch/qa_validation.py`)
Generates a multi-file repository archive and asserts all 6 REST endpoints:

```bash
python scratch/qa_validation.py
```

Asserts:
- `POST /api/v1/upload` (201 Created)
- Folder ignore rules (`node_modules`, `.git`, `.venv`, `dist` filtered out)
- Framework detection (`React`, `FastAPI`, `Next.js`, `Docker`, `Tailwind CSS`)
- Language distribution calculation
- Health score radar generation
- Markdown and HTML report exporter endpoints (`200 OK`)

### 3. Frontend Typecheck & Build
Validates TypeScript types and generates production build:

```bash
npx pnpm --filter @coding-ai/frontend build
```
