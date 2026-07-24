# API Reference

This document outlines the REST API endpoints provided by the FastAPI backend service (`apps/backend`).

## Base URL

| Environment | Base URL |
|---|---|
| Local Development | `http://127.0.0.1:8000/api/v1` |
| Production | Configured per environment |

## Operational Endpoints

### Health Check
```http
GET /health
```
**Response `200 OK`**
```json
{
  "status": "ok"
}
```

---

## Core Product Endpoints (`/api/v1`)

### 1. Upload & Analyze Repository
Accepts a `.zip` archive, extracts contents, executes AST scanning, framework/language detection, health scoring, and AI summary generation.

```http
POST /api/v1/upload
Content-Type: multipart/form-data
```

**Parameters:**
- `file`: ZIP file binary blob.

**Response `201 Created`**
```json
{
  "id": "ws_37bece02e4ce",
  "workspace_id": "ws_37bece02e4ce",
  "metadata": {
    "original_filename": "my-project.zip",
    "scanned_at": "2026-07-25T01:43:36Z"
  },
  "summary": {
    "total_files": 42,
    "total_folders": 8,
    "total_size_bytes": 1048576
  },
  "statistics": {
    "primary_framework": "React",
    "detected_frameworks": ["React", "FastAPI", "Tailwind CSS"],
    "language_distribution": [
      { "language": "TypeScript", "file_count": 20, "percentage": 47.6 }
    ]
  },
  "intelligence": {
    "health": {
      "overall_score": 88
    },
    "executive_summary": "Executive Code Intelligence Audit..."
  }
}
```

### 2. Get Repository Statistics
```http
GET /api/v1/statistics/{id}
```
**Response `200 OK`**

### 3. Get Detected Frameworks
```http
GET /api/v1/frameworks/{id}
```
**Response `200 OK`**

### 4. Get Language Distribution
```http
GET /api/v1/languages/{id}
```
**Response `200 OK`**

### 5. Get Executive Summary
```http
GET /api/v1/summary/{id}
```
**Response `200 OK`**

### 6. Export Markdown Report
```http
GET /api/v1/report/{id}/markdown
```
**Response `200 OK`** (Content-Type: `text/plain`)

### 7. Export HTML Report
```http
GET /api/v1/report/{id}/html
```
**Response `200 OK`** (Content-Type: `text/html`)
