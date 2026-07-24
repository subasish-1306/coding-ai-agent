# Changelog

All notable changes to the **Coding AI Agent** platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0-rc1] - 2026-07-25

### Added
- **Repository Scanner Engine:** Recursive AST directory walker with automated filtering for `.git`, `node_modules`, `.venv`, `dist`, `.next`, and cache folders.
- **Unified FastAPI Backend:** Consolidated API server exposing RESTful endpoints under `/api/v1/upload`, `/api/v1/statistics/{id}`, `/api/v1/frameworks/{id}`, `/api/v1/languages/{id}`, `/api/v1/summary/{id}`, and report exporters.
- **AI Code Intelligence Engine:** Evaluates category health scores (0-100), architectural styles (Monorepo, SPA + API, Microservices), layer separation, developer metrics, and generates 350-word Senior Architect Executive Reviews.
- **React SaaS Dashboard:** Built with React 18, Vite 6, TypeScript 5, Tailwind CSS 3.4, Recharts, and Lucide Icons. Features Health Radar Chart, Quality Audit Grid, Technology Intelligence Cards, and Prioritized Recommendations.
- **Multi-Format Exporters:** 1-click downloads for JSON (`.json`), formatted Markdown (`.md`), and standalone styled HTML (`.html`) reports.
- **Documentation & Sample Assets:** Comprehensive `README.md` and `docs/ARCHITECTURE.md` with Mermaid sitemap diagrams, plus `samples/sample-fullstack-repo.zip` asset generator.

### Fixed
- Unified dual backend structures into single `apps/backend` source of truth.
- Resolved monorepo framework detection across subdirectories.
- Fixed TypeScript type definitions and Recharts payload optional chaining.
