"""Directory and file filtering for the repository scanner."""

import logging
from pathlib import Path

logger = logging.getLogger(__name__)

DEFAULT_IGNORE_DIRS: set[str] = {
    "node_modules",
    ".git",
    "dist",
    "build",
    ".next",
    "__pycache__",
    ".venv",
    "venv",
    "env",
    ".mypy_cache",
    ".pytest_cache",
    ".ruff_cache",
    "coverage",
    "htmlcov",
    ".eggs",
    "*.egg-info",
    ".turbo",
    ".idea",
    ".vscode",
}


def should_ignore(path: Path, ignore_dirs: set[str] | None = None) -> bool:
    """Returns True if the given path should be ignored."""
    dirs_to_ignore = ignore_dirs if ignore_dirs is not None else DEFAULT_IGNORE_DIRS

    for part in path.parts:
        if part in dirs_to_ignore:
            return True
    return False


def is_interesting_file(file_path: Path) -> bool:
    """Returns True if the file at the given path is a regular file."""
    return file_path.is_file()
