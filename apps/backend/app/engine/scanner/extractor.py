"""Handles extraction of uploaded repository archives."""

from contextlib import contextmanager
import logging
import zipfile
from collections.abc import Generator
from pathlib import Path
from tempfile import TemporaryDirectory

logger = logging.getLogger(__name__)


class ZipExtractor:
    """A context manager for extracting and cleaning up a ZIP archive."""

    def __init__(self, zip_file_path: Path):
        if not zip_file_path.exists() or not zip_file_path.is_file():
            raise FileNotFoundError(f"ZIP file not found at: {zip_file_path}")
        self.zip_file_path = zip_file_path
        self._temp_dir: TemporaryDirectory | None = None

    def __enter__(self) -> Path:
        logger.info(f"Extracting ZIP file: {self.zip_file_path.name}")
        self._temp_dir = TemporaryDirectory()
        workspace_path = Path(self._temp_dir.name)

        try:
            with zipfile.ZipFile(self.zip_file_path, "r") as zip_ref:
                zip_ref.extractall(workspace_path)
            logger.info(f"Successfully extracted to workspace: {workspace_path}")
            return workspace_path
        except zipfile.BadZipFile as e:
            logger.error(f"Invalid ZIP file provided: {self.zip_file_path.name}")
            self.__exit__(None, None, None)
            raise ValueError(f"Invalid or corrupted ZIP file: {e}") from e
        except Exception as e:
            logger.error(f"Failed to extract ZIP file: {e}", exc_info=True)
            self.__exit__(None, None, None)
            raise IOError(f"Could not extract ZIP file: {e}") from e

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self._temp_dir:
            logger.info(f"Cleaning up temporary workspace: {self._temp_dir.name}")
            try:
                self._temp_dir.cleanup()
            except Exception as e:
                logger.error(f"Failed to clean up temporary directory: {e}", exc_info=True)


@contextmanager
def safe_extract(zip_path: Path) -> Generator[Path, None, None]:
    """A generator context manager that extracts a ZIP file to a temporary workspace."""
    with ZipExtractor(zip_path) as workspace:
        yield workspace
