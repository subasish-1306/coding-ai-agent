"""Generates high-level statistics and derived metrics from a repository scan."""

from collections import Counter
import logging
from pathlib import Path

from pydantic import BaseModel, Field

from app.engine.detector.framework import detect_frameworks, get_primary_framework
from app.engine.detector.language import detect_language
from app.engine.scanner.models import FileInfo, ScanResponse

logger = logging.getLogger(__name__)


class LanguageDistribution(BaseModel):
    """Represents the distribution of a single programming language."""

    language: str
    file_count: int = Field(..., description="Number of files of this language.")
    percentage: float = Field(..., description="Percentage of total files.", ge=0, le=100)


class RepositoryStatistics(BaseModel):
    """A collection of derived statistics about a scanned repository."""

    total_files: int
    total_folders: int
    total_size_bytes: int
    primary_framework: str | None
    detected_frameworks: list[str]
    language_distribution: list[LanguageDistribution]
    largest_files: list[FileInfo]


def generate_statistics(scan_response: ScanResponse, workspace_path: Path) -> RepositoryStatistics:
    """Analyzes scan results to generate repository statistics."""
    lang_counter: Counter[str] = Counter()
    for file_info in scan_response.files:
        lang = detect_language(file_info.extension) or "Other"
        lang_counter[lang] += 1

    total_files = scan_response.summary.total_files
    lang_dist: list[LanguageDistribution] = []
    if total_files > 0:
        for lang, count in lang_counter.most_common():
            lang_dist.append(
                LanguageDistribution(
                    language=lang,
                    file_count=count,
                    percentage=round((count / total_files) * 100, 2),
                )
            )

    largest_files = sorted(scan_response.files, key=lambda f: f.size_bytes, reverse=True)[:10]

    detected_frameworks = detect_frameworks(workspace_path)
    primary_framework = get_primary_framework(workspace_path)

    return RepositoryStatistics(
        total_files=total_files,
        total_folders=scan_response.summary.total_folders,
        total_size_bytes=scan_response.summary.total_size_bytes,
        primary_framework=primary_framework,
        detected_frameworks=detected_frameworks,
        language_distribution=lang_dist,
        largest_files=largest_files,
    )
