"""API endpoints for Repository Scanner & AI Code Intelligence Engine."""

import logging
from pathlib import Path
import shutil
from tempfile import NamedTemporaryFile
from typing import Any

from fastapi import APIRouter, File, HTTPException, UploadFile, status, Response
from fastapi.responses import HTMLResponse, PlainTextResponse

from app.engine.ai_summary import generate_ai_summary
from app.engine.intelligence import analyze_code_intelligence
from app.engine.scanner.extractor import safe_extract
from app.engine.scanner.scanner import scan_repository
from app.engine.scanner.utils import generate_workspace_id
from app.engine.statistics import generate_statistics

logger = logging.getLogger(__name__)
router = APIRouter()

# In-memory storage for scanned repositories (MVP result cache)
scans_db: dict[str, dict[str, Any]] = {}


@router.post("/upload", status_code=status.HTTP_201_CREATED)
async def upload_and_scan_repository(
    file: UploadFile = File(..., description="ZIP archive containing repository source code."),
) -> dict[str, Any]:
    """Accepts a ZIP file, extracts, scans contents, and generates complete AI Code Intelligence."""
    if not file.filename or not file.filename.endswith(".zip"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file type. Only .zip files are supported.",
        )

    try:
        # Create temporary file for ZIP
        with NamedTemporaryFile(delete=False, suffix=".zip") as tmp_zip:
            shutil.copyfileobj(file.file, tmp_zip)
            tmp_zip_path = Path(tmp_zip.name)

        # Safely extract and scan
        with safe_extract(tmp_zip_path) as workspace_path:
            workspace_id = generate_workspace_id()

            scan_result = scan_repository(
                workspace_path=workspace_path,
                original_filename=file.filename,
                workspace_id=workspace_id,
            )

            stats = generate_statistics(scan_result, workspace_path)

            ai_summary = generate_ai_summary(
                filename=file.filename,
                primary_framework=stats.primary_framework,
                frameworks=stats.detected_frameworks,
                languages=[l.model_dump() for l in stats.language_distribution],
                total_files=scan_result.summary.total_files,
                total_size_bytes=scan_result.summary.total_size_bytes,
                files=[f.model_dump() for f in scan_result.files],
            )

            code_intelligence = analyze_code_intelligence(
                filename=file.filename,
                files=[f.model_dump() for f in scan_result.files],
                frameworks=stats.detected_frameworks,
                primary_framework=stats.primary_framework,
                languages=[l.model_dump() for l in stats.language_distribution],
                total_files=scan_result.summary.total_files,
                total_folders=scan_result.summary.total_folders,
                total_size_bytes=scan_result.summary.total_size_bytes,
            )

            payload = {
                "id": workspace_id,
                "workspace_id": workspace_id,
                "metadata": scan_result.metadata.model_dump(),
                "summary": scan_result.summary.model_dump(),
                "files": [f.model_dump() for f in scan_result.files],
                "extensions": [e.model_dump() for e in scan_result.extensions],
                "statistics": stats.model_dump(),
                "ai_summary": ai_summary.model_dump(),
                "intelligence": code_intelligence.model_dump(),
            }

            # Save in memory store
            scans_db[workspace_id] = payload
            return payload

    except ValueError as e:
        logger.error(f"Error processing ZIP: {e}")
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Failed to process archive: {e}",
        )
    except Exception as e:
        logger.critical(f"Unexpected scan failure: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal server error: {e}",
        )
    finally:
        if "tmp_zip_path" in locals() and tmp_zip_path.exists():
            tmp_zip_path.unlink()


@router.get("/statistics/{id}")
async def get_repository_statistics(id: str) -> dict[str, Any]:
    """Returns calculated statistics for a scanned repository by ID."""
    if id not in scans_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Repository analysis with ID '{id}' not found.",
        )
    return {
        "id": id,
        "statistics": scans_db[id]["statistics"],
        "summary": scans_db[id]["summary"],
    }


@router.get("/frameworks/{id}")
async def get_repository_frameworks(id: str) -> dict[str, Any]:
    """Returns detected frameworks and tech stack for a repository by ID."""
    if id not in scans_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Repository analysis with ID '{id}' not found.",
        )
    stats = scans_db[id]["statistics"]
    return {
        "id": id,
        "primary_framework": stats["primary_framework"],
        "detected_frameworks": stats["detected_frameworks"],
    }


@router.get("/languages/{id}")
async def get_repository_languages(id: str) -> dict[str, Any]:
    """Returns programming language distribution for a repository by ID."""
    if id not in scans_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Repository analysis with ID '{id}' not found.",
        )
    stats = scans_db[id]["statistics"]
    return {
        "id": id,
        "language_distribution": stats["language_distribution"],
    }


@router.get("/summary/{id}")
async def get_repository_summary(id: str) -> dict[str, Any]:
    """Returns executive summary and AI recommendations for a repository by ID."""
    if id not in scans_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Repository analysis with ID '{id}' not found.",
        )
    return {
        "id": id,
        "metadata": scans_db[id]["metadata"],
        "summary": scans_db[id]["summary"],
        "ai_summary": scans_db[id]["ai_summary"],
        "intelligence": scans_db[id]["intelligence"],
    }


@router.get("/report/{id}/markdown", response_class=PlainTextResponse)
async def get_repository_markdown_report(id: str) -> str:
    """Returns downloadable Markdown report for a scanned repository by ID."""
    if id not in scans_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Repository analysis with ID '{id}' not found.",
        )

    data = scans_db[id]
    intel = data["intelligence"]
    health = intel["health"]
    arch = intel["architecture"]

    md = f"""# AI Code Intelligence Audit Report

**Repository:** {data['metadata']['original_filename']}  
**Workspace ID:** `{id}`  
**Scanned At:** {data['metadata']['scanned_at']}  
**Overall Health Score:** {health['overall_score']} / 100  

---

## 1. Executive Architectural Summary

{intel['executive_summary']}

---

## 2. Category Health Breakdown

| Category | Score |
| :--- | :---: |
| Folder Structure | {health['folder_structure']} / 100 |
| Project Organization | {health['project_organization']} / 100 |
| Documentation | {health['documentation']} / 100 |
| Configuration | {health['configuration']} / 100 |
| Dependency Management | {health['dependency_management']} / 100 |
| Framework Usage | {health['framework_usage']} / 100 |

---

## 3. Architecture Analysis

- **Style:** {arch['style']}
- **Scale:** {arch['scale']}
- **Complexity:** {arch['complexity']}
- **Layer Separation Score:** {arch['layer_separation_score']} / 100

### Strengths
{chr(10).join('- ' + s for s in arch['strengths'])}

### Potential Risks
{chr(10).join('- ' + r for r in arch['potential_risks'])}

---

## 4. Prioritized Recommendations

"""
    for rec in intel["recommendations"]:
        md += f"### [{rec['priority']}] {rec['title']}\n"
        md += f"{rec['description']}\n\n"
        md += f"**Why it matters:** {rec['why_it_matters']}\n\n"
        md += f"**Suggested solution:** {rec['suggested_solution']}\n\n---\n\n"

    return md


@router.get("/report/{id}/html", response_class=HTMLResponse)
async def get_repository_html_report(id: str) -> str:
    """Returns downloadable styled HTML report for a scanned repository by ID."""
    if id not in scans_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Repository analysis with ID '{id}' not found.",
        )

    data = scans_db[id]
    intel = data["intelligence"]
    health = intel["health"]

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Code Intelligence Report - {data['metadata']['original_filename']}</title>
    <style>
        body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; padding: 40px; line-height: 1.6; max-width: 900px; margin: 0 auto; }}
        h1 {{ color: #38bdf8; border-bottom: 2px solid #334155; padding-bottom: 12px; }}
        h2 {{ color: #818cf8; margin-top: 30px; }}
        .score-card {{ background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 20px; }}
        .score {{ font-size: 48px; font-weight: bold; color: #34d399; }}
        table {{ width: 100%; border-collapse: collapse; margin-top: 15px; }}
        th, td {{ border: 1px solid #334155; padding: 10px; text-align: left; }}
        th {{ background: #1e293b; }}
        .badge {{ background: #38bdf820; color: #38bdf8; border: 1px solid #38bdf840; padding: 4px 8px; border-radius: 4px; font-size: 12px; }}
    </style>
</head>
<body>
    <h1>AI Code Intelligence Audit</h1>
    <p>Repository: <strong>{data['metadata']['original_filename']}</strong> | Workspace ID: <code>{id}</code></p>
    
    <div class="score-card">
        <div>Overall Health Score</div>
        <div class="score">{health['overall_score']} / 100</div>
    </div>

    <h2>Executive Summary</h2>
    <p>{intel['executive_summary'].replace(chr(10), '<br>')}</p>

    <h2>Architecture Analysis</h2>
    <p>Style: <span class="badge">{intel['architecture']['style']}</span></p>
    <p>Scale: <span class="badge">{intel['architecture']['scale']}</span></p>

    <h2>Category Health Scores</h2>
    <table>
        <tr><th>Category</th><th>Score</th></tr>
        <tr><td>Folder Structure</td><td>{health['folder_structure']}/100</td></tr>
        <tr><td>Project Organization</td><td>{health['project_organization']}/100</td></tr>
        <tr><td>Documentation</td><td>{health['documentation']}/100</td></tr>
        <tr><td>Configuration</td><td>{health['configuration']}/100</td></tr>
    </table>
</body>
</html>
"""
    return html
