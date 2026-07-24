"""Integration test suite: module verification and endpoint registration.

These tests validate that all FastAPI backend modules, configuration settings,
and app routes import cleanly.
"""

import sys
sys.path.insert(0, r"apps/backend")

import pytest


class TestBackendImports:
    """Verify core backend modules import successfully."""

    def test_app_main_import(self):
        """Ensure the FastAPI app factory is importable."""
        from app.main import create_app, app

        assert callable(create_app)
        assert app.title is not None

    def test_config_import(self):
        """Ensure the settings module is importable."""
        from app.config import Settings, settings

        assert isinstance(settings, Settings)

    def test_health_route_exists(self):
        """Verify the health check endpoint is registered."""
        from app.main import app

        routes = [getattr(r, 'path', str(r)) for r in app.routes]
        assert "/health" in routes


class TestDevDependencies:
    """Verify that development tools are available."""

    def test_pytest_available(self):
        """Ensure pytest is installed."""
        import pytest

        assert pytest.__version__ is not None

    def test_httpx_available(self):
        """Ensure httpx is installed for integration tests."""
        import httpx

        assert httpx.__version__ is not None
