# Project Structure

This document outlines the directory tree and workspace layout of the **Coding AI Agent** project.

```
Coding-AI-Agent/
├── apps/
│   ├── frontend/         # Single-Page Application (React, Vite, TypeScript, Tailwind)
│   └── backend/          # FastAPI REST Server & AI Code Intelligence Engine
├── docs/                 # Project documentation
│   ├── ARCHITECTURE.md
│   ├── API_REFERENCE.md
│   ├── DEPLOYMENT.md
│   ├── TESTING.md
│   ├── ERROR_HANDLING.md
│   └── PROJECT_STRUCTURE.md
├── tests/                # Integration test suites
│   └── test_integration.py
├── samples/              # Sample test repository asset generator
│   ├── generate_sample_repo.py
│   └── sample-fullstack-repo.zip
├── infrastructure/       # Docker & Nginx configuration
├── .github/              # CI/CD Workflows
├── README.md             # Primary project documentation & quickstart
├── LICENSE               # MIT License
├── CHANGELOG.md          # Version changelog
├── VERSION               # Version tag (1.0.0-rc1)
└── RELEASE_NOTES.md      # Release Candidate notes
```
