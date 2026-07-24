"""Language detection for repository source code."""

import logging
from pathlib import Path

logger = logging.getLogger(__name__)

LANGUAGE_MAP: dict[str, str] = {
    ".py": "Python",
    ".java": "Java",
    ".js": "JavaScript",
    ".jsx": "React (JS)",
    ".ts": "TypeScript",
    ".tsx": "React (TS)",
    ".html": "HTML",
    ".htm": "HTML",
    ".css": "CSS",
    ".scss": "SCSS",
    ".less": "LESS",
    ".json": "JSON",
    ".yaml": "YAML",
    ".yml": "YAML",
    ".md": "Markdown",
    ".mdown": "Markdown",
    ".markdown": "Markdown",
    ".sql": "SQL",
    ".go": "Go",
    ".rs": "Rust",
    ".cpp": "C++",
    ".c": "C",
    ".cs": "C#",
    ".php": "PHP",
    ".rb": "Ruby",
    ".kt": "Kotlin",
    ".swift": "Swift",
    ".sh": "Shell",
    ".bash": "Shell",
    ".ps1": "PowerShell",
    ".dockerfile": "Docker",
}


def detect_language(extension: str) -> str | None:
    """Returns the programming language for a given file extension."""
    return LANGUAGE_MAP.get(extension.lower())


def compute_language_distribution(files: list[Path]) -> dict[str, int]:
    """Counts files grouped by their detected language."""
    distribution: dict[str, int] = {}
    for fp in files:
        ext = fp.suffix.lower()
        lang = detect_language(ext) or "Other"
        distribution[lang] = distribution.get(lang, 0) + 1
    return dict(sorted(distribution.items(), key=lambda x: -x[1]))


def get_detected_languages(files: list[Path]) -> list[str]:
    """Returns the unique set of detected languages for the repo."""
    langs: set[str] = set()
    for fp in files:
        ext = fp.suffix.lower()
        lang = detect_language(ext)
        if lang:
            langs.add(lang)
    return sorted(langs)
