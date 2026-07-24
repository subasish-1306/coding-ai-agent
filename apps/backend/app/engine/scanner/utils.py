"""Utility functions for repository scanning."""

from datetime import datetime, timezone
from pathlib import Path
import uuid


def get_file_extension(filename: str) -> str:
    """Returns the file extension in lowercase with a leading dot, or empty string."""
    return Path(filename).suffix.lower()


def get_utc_now() -> datetime:
    """Returns the current UTC timestamp."""
    return datetime.now(timezone.utc)


def generate_workspace_id() -> str:
    """Generates a unique workspace ID string."""
    return f"ws_{uuid.uuid4().hex[:12]}"
