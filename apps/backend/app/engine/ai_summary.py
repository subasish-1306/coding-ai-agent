"""Generates structured AI insights and summaries for analyzed repositories."""

from pydantic import BaseModel, Field


class AISummary(BaseModel):
    """Structured AI summary and architectural analysis of a repository."""

    title: str = Field(..., description="Project title derived from structure.")
    architecture_overview: str = Field(..., description="High-level architectural overview.")
    tech_stack_highlights: list[str] = Field(..., description="Key technology highlights.")
    key_modules: list[str] = Field(..., description="Main modules or directory structures detected.")
    code_health_score: int = Field(..., ge=0, le=100, description="Estimated code health score (0-100).")
    recommendations: list[str] = Field(..., description="Actionable recommendations for improvement.")


def generate_ai_summary(
    filename: str,
    primary_framework: str | None,
    frameworks: list[str],
    languages: list[dict],
    total_files: int,
    total_size_bytes: int,
    files: list[dict],
) -> AISummary:
    """Generates an intelligent analysis summary based on repository metrics."""
    clean_name = filename.replace(".zip", "").replace("-main", "").replace("-master", "").replace("_", " ").title()

    primary_lang = languages[0]["language"] if languages else "Code"
    top_langs = ", ".join([l["language"] for l in languages[:3]]) if languages else "Various"
    fw_str = ", ".join(frameworks) if frameworks else "Custom Architecture"

    # Compute key modules from root directory parts
    module_set: set[str] = set()
    for file in files[:100]:
        rel = file.get("relative_path", "")
        parts = rel.split("/")
        if len(parts) > 1 and parts[0] not in (".", ".."):
            module_set.add(parts[0])
    key_modules = sorted(module_set)[:6] if module_set else ["root"]

    # Calculate heuristic health score
    base_score = 85
    if "Docker" in frameworks:
        base_score += 5
    if "TypeScript" in frameworks or "ESLint" in frameworks:
        base_score += 5
    if total_files > 500:
        base_score -= 5
    health_score = min(max(base_score, 60), 98)

    overview = (
        f"{clean_name} is a {primary_lang}-based project built using {fw_str}. "
        f"It consists of {total_files} source files totaling {round(total_size_bytes / (1024 * 1024), 2)} MB. "
        f"The primary language distribution is dominated by {top_langs}."
    )

    highlights = [
        f"Primary Framework: {primary_framework or 'Vanilla / Custom'}",
        f"Detected Tooling: {fw_str}",
        f"Language Stack: {top_langs}",
        f"Repository Scale: {total_files} files across {len(key_modules)} main modules",
    ]

    recs = [
        "Ensure all configuration secrets and environment variables are excluded from version control.",
        "Maintain high automated test coverage for core business logic modules.",
        "Audit third-party dependencies periodically for security vulnerabilities.",
    ]
    if "TypeScript" not in frameworks and any("JavaScript" in l["language"] for l in languages):
        recs.append("Consider migrating JavaScript files to TypeScript for enhanced type safety.")

    return AISummary(
        title=clean_name,
        architecture_overview=overview,
        tech_stack_highlights=highlights,
        key_modules=key_modules,
        code_health_score=health_score,
        recommendations=recs,
    )
