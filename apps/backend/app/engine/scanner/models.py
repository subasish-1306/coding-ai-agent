"""Pydantic v2 models for the Repository Scanner Engine."""

from datetime import datetime
from pydantic import BaseModel, Field, field_validator


class FileInfo(BaseModel):
    """Metadata for a single file discovered during a repository scan."""

    filename: str = Field(..., description="Base name of the file.")
    extension: str = Field(..., description="File extension with leading dot.")
    relative_path: str = Field(..., description="Path relative to repo root.")
    size_bytes: int = Field(..., description="Size in bytes.", ge=0)
    modified_at: datetime = Field(..., description="Last modification timestamp (UTC).")

    @field_validator("relative_path")
    @classmethod
    def ensure_forward_slashes(cls, value: str) -> str:
        return value.replace("\\", "/")


class ExtensionStatistics(BaseModel):
    """Aggregated statistics for a single file extension."""

    extension: str = Field(..., description="File extension.")
    file_count: int = Field(..., description="Total count.", ge=0)
    total_size_bytes: int = Field(..., description="Cumulative size in bytes.", ge=0)


class ScanSummary(BaseModel):
    """High-level counts aggregated from a completed repository scan."""

    total_files: int = Field(..., ge=0)
    total_folders: int = Field(..., ge=0)
    total_size_bytes: int = Field(..., ge=0)
    extension_counts: int = Field(..., ge=0)
    ignored_directories: int = Field(..., ge=0)
    scanned_duration_ms: int = Field(..., ge=0)


class RepositoryMetadata(BaseModel):
    """Identifying metadata for the repository."""

    original_filename: str = Field(..., min_length=1)
    workspace_id: str = Field(...)
    scanned_at: datetime = Field(...)


class ScanResponse(BaseModel):
    """Complete response returned by the repository scan endpoint."""

    metadata: RepositoryMetadata
    summary: ScanSummary
    files: list[FileInfo]
    extensions: list[ExtensionStatistics]

    @field_validator("files")
    @classmethod
    def sort_files_by_path(cls, value: list[FileInfo]) -> list[FileInfo]:
        return sorted(value, key=lambda f: f.relative_path)

    @field_validator("extensions")
    @classmethod
    def sort_extensions(cls, value: list[ExtensionStatistics]) -> list[ExtensionStatistics]:
        return sorted(value, key=lambda e: (e.extension == "", e.extension))
