"""Framework detection based on configuration and manifest files."""

import json
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

FRAMEWORK_INDICATORS: dict[str, list[str]] = {
    "React": ["package.json:react", "react"],
    "Next.js": ["package.json:next", "next.config.js", "next.config.ts", "next.config.mjs"],
    "Spring Boot": ["pom.xml:spring-boot", "build.gradle:spring-boot", "build.gradle.kts:spring-boot"],
    "FastAPI": ["requirements.txt:fastapi", "pyproject.toml:fastapi", "setup.py:fastapi"],
    "Flask": ["requirements.txt:flask", "pyproject.toml:flask", "setup.py:flask"],
    "Express": ["package.json:express", "package.json:express-generator"],
    "Angular": ["package.json:@angular/core", "angular.json"],
    "Vue": ["package.json:vue", "vue.config.js", "vue.config.ts"],
    "Django": ["requirements.txt:django", "pyproject.toml:django", "manage.py"],
    "Node.js": ["package.json", "server.js", "app.js"],
    "NestJS": ["package.json:@nestjs/core"],
    "Nuxt": ["package.json:nuxt", "nuxt.config.js", "nuxt.config.ts"],
    "Svelte": ["package.json:svelte", "svelte.config.js"],
    "Remix": ["package.json:@remix-run"],
    "Astro": ["package.json:astro", "astro.config.mjs"],
    "Gatsby": ["package.json:gatsby", "gatsby-config.js"],
    "Electron": ["package.json:electron"],
    "Tauri": ["tauri.conf.json"],
    "Vite": ["vite.config.ts", "vite.config.js", "package.json:vite"],
    "Webpack": ["webpack.config.js", "webpack.config.ts"],
    "Babel": ["babel.config.js", ".babelrc"],
    "ESLint": [".eslintrc.js", ".eslintrc.json", ".eslintrc.yaml", ".eslintrc.cjs"],
    "Prettier": [".prettierrc", ".prettierrc.js", ".prettierrc.json"],
    "TypeScript": ["tsconfig.json"],
    "Tailwind CSS": ["tailwind.config.js", "tailwind.config.ts", "package.json:tailwindcss"],
    "Docker": ["Dockerfile", "docker-compose.yml", "docker-compose.yaml"],
}


def detect_frameworks(root: Path) -> list[str]:
    """Detects frameworks present in the repository root and subdirectories."""
    detected: set[str] = set()

    if not root.exists() or not root.is_dir():
        return []

    # Find all manifest files across repository (up to subdirectories)
    package_jsons = list(root.rglob("package.json"))
    requirements_txts = list(root.rglob("requirements.txt"))
    pyproject_tomls = list(root.rglob("pyproject.toml"))

    # Check package.json files
    for pkg_json in package_jsons:
        if any(ignored in pkg_json.parts for ignored in ("node_modules", ".venv", "dist", "build")):
            continue
        try:
            data = json.loads(pkg_json.read_text(encoding="utf-8"))
            deps = {**data.get("dependencies", {}), **data.get("devDependencies", {})}
            for fw, indicators in FRAMEWORK_INDICATORS.items():
                for ind in indicators:
                    if ind.startswith("package.json:"):
                        dep = ind.split(":", 1)[1]
                        if dep in deps:
                            detected.add(fw)
            if data:
                detected.add("Node.js")
        except (json.JSONDecodeError, OSError):
            pass

    # Check requirements.txt files
    for req_txt in requirements_txts:
        if any(ignored in req_txt.parts for ignored in ("node_modules", ".venv", "dist", "build")):
            continue
        try:
            content = req_txt.read_text(encoding="utf-8").lower()
            for fw, indicators in FRAMEWORK_INDICATORS.items():
                for ind in indicators:
                    if ind.startswith("requirements.txt:") and ind.split(":", 1)[1] in content:
                        detected.add(fw)
        except OSError:
            pass

    # Check pyproject.toml files
    for pyproject in pyproject_tomls:
        if any(ignored in pyproject.parts for ignored in ("node_modules", ".venv", "dist", "build")):
            continue
        try:
            content = pyproject.read_text(encoding="utf-8").lower()
            for fw, indicators in FRAMEWORK_INDICATORS.items():
                for ind in indicators:
                    if ind.startswith("pyproject.toml:") and ind.split(":", 1)[1] in content:
                        detected.add(fw)
        except OSError:
            pass

    # Check for specific indicator files across repo
    for path_obj in root.rglob("*"):
        if any(ignored in path_obj.parts for ignored in ("node_modules", ".venv", "dist", "build")):
            continue
        name = path_obj.name
        for fw, indicators in FRAMEWORK_INDICATORS.items():
            for ind in indicators:
                if not ind.startswith("package.json:") and not ind.startswith("requirements.txt:") and not ind.startswith("pyproject.toml:"):
                    if ind == name:
                        detected.add(fw)

    return sorted(detected)


def get_primary_framework(root: Path) -> str | None:
    """Returns the primary framework detected, if any."""
    frameworks = detect_frameworks(root)
    if not frameworks:
        return None
    priority = [
        "Next.js", "React", "Angular", "Vue", "Svelte", "Spring Boot",
        "FastAPI", "Flask", "Django", "Express", "NestJS", "Nuxt",
        "Vite", "Astro", "Electron", "Node.js"
    ]
    for p in priority:
        if p in frameworks:
            return p
    return frameworks[0]
