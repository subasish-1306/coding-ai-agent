"""Health check endpoints."""

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def health_check():
    """Return basic health status."""
    return {"status": "healthy"}