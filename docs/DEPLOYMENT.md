# Deployment Guide

This document provides instructions for building and deploying the **Coding AI Agent** system in containerized environments.

## Docker Architecture

The project provides production-grade Docker containers for both backend and frontend services:

- `infrastructure/docker/backend.Dockerfile`: Multi-stage Python 3.12 slim container for FastAPI server.
- `infrastructure/docker/frontend.Dockerfile`: Nginx static server for built Vite production assets.
- `docker-compose.yml`: Local orchestrator for postgres, redis, backend, and frontend.

## Local Docker Compose Startup

To run the complete production environment locally:

```bash
# Build and launch all services
docker compose -f docker-compose.yml up --build -d
```

## Service URLs

| Service | Container Port | Host Port |
|---|---|---|
| Frontend Web UI | 80 | `http://localhost:5173` (or port 80 via Nginx) |
| Backend FastAPI | 8000 | `https://coding-ai-agent-s67b.onrender.com` |
| PostgreSQL | 5432 | `localhost:5432` |
| Redis | 6379 | `localhost:6379` |

## Environment Variables

Configure `.env` using `.env.example`:

```env
APP_NAME="Coding AI Agent"
APP_ENV=production
LOG_LEVEL=INFO
API_V1_PREFIX=/api/v1
CORS_ORIGINS=["http://localhost:5173"]
```
