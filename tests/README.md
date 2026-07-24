# Integration Tests

This directory contains cross-service integration and end-to-end tests.

Tests here should verify interactions between the major components of the system:

- Frontend to Backend API
- API to Worker
- Worker to Database and external services

## Running Tests

Integration tests are not yet fully configured in the root `Makefile`. They can be run directly with `pytest`:

```bash
pytest tests/
```
