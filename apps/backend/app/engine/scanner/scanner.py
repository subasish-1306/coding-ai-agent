"""Core repository scanning logic."""

from collections import defaultdict
from datetime import datetime, timezone
import logging
from pathlib import Path
import time

from app.engine.scanner.filters import should_ignore
from app.engine.scanner.models import ExtensionStatistics, FileInfo, RepositoryMetadata, ScanResponse, ScanSummary
from app.engine.scanner.utils import generate_workspace_id, get_file_extension, get_utc_now

logger = logging.getLogger(__name__)


class RepositoryScanner:
    """Scans a directory, collects file metadata, and generates a structured report."""

    def __init__(self, workspace_path: Path, original_filename: str, workspace_id: str):
        self.workspace_path = workspace_path
        self.original_filename = original_filename
        self.workspace_id = workspace_id

    def scan(self) -> ScanResponse:
        start_time = time.monotonic()
        logger.info(f"Starting scan for workspace: {self.workspace_id}")

        all_files: list[FileInfo] = []
        extension_stats: defaultdict[str, dict] = defaultdict(
            lambda: {"count": 0, "size": 0}
        )
        total_folders = 0
        total_size = 0
        ignored_dirs_count = 0

        for path_object in self.workspace_path.rglob("*"):
            if should_ignore(path_object):
                if path_object.is_dir():
                    ignored_dirs_count += 1
                continue

            if path_object.is_dir():
                total_folders += 1
                continue

            if not path_object.is_file():
                continue

            try:
                stat = path_object.stat()
                file_info = FileInfo(
                    filename=path_object.name,
                    extension=get_file_extension(path_object.name),
                    relative_path=str(path_object.relative_to(self.workspace_path)),
                    size_bytes=stat.st_size,
                    modified_at=datetime.fromtimestamp(stat.st_mtime, tz=timezone.utc),
                )
                all_files.append(file_info)

                extension_stats[file_info.extension]["count"] += 1
                extension_stats[file_info.extension]["size"] += file_info.size_bytes
                total_size += file_info.size_bytes

            except (OSError, ValueError) as e:
                logger.warning(f"Could not process file '{path_object}': {e}")

        scan_duration_ms = int((time.monotonic() - start_time) * 1000)

        return self._build_response(
            all_files,
            extension_stats,
            total_folders,
            total_size,
            ignored_dirs_count,
            scan_duration_ms,
        )

    def _build_response(
        self,
        files: list[FileInfo],
        ext_stats: dict,
        folder_count: int,
        total_size: int,
        ignored_count: int,
        duration_ms: int,
    ) -> ScanResponse:
        extensions = [
            ExtensionStatistics(
                extension=ext,
                file_count=stats["count"],
                total_size_bytes=stats["size"],
            )
            for ext, stats in ext_stats.items()
        ]

        metadata = RepositoryMetadata(
            original_filename=self.original_filename,
            workspace_id=self.workspace_id,
            scanned_at=get_utc_now(),
        )

        summary = ScanSummary(
            total_files=len(files),
            total_folders=folder_count,
            total_size_bytes=total_size,
            extension_counts=len(extensions),
            ignored_directories=ignored_count,
            scanned_duration_ms=duration_ms,
        )

        return ScanResponse(
            metadata=metadata,
            summary=summary,
            files=files,
            extensions=extensions,
        )


def scan_repository(
    workspace_path: Path, original_filename: str, workspace_id: str
) -> ScanResponse:
    """High-level function to scan a repository and return the results."""
    scanner = RepositoryScanner(workspace_path, original_filename, workspace_id)
    return scanner.scan()
