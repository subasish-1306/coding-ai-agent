"""Detector package for language and framework analysis."""

from app.engine.detector.framework import detect_frameworks, get_primary_framework
from app.engine.detector.language import compute_language_distribution, detect_language, get_detected_languages

__all__ = [
    "detect_language",
    "compute_language_distribution",
    "get_detected_languages",
    "detect_frameworks",
    "get_primary_framework",
]
