"""API v1 router registry."""

from fastapi import APIRouter

from app.api.v1.endpoints import scanner

router = APIRouter()
router.include_router(scanner.router, tags=["Scanner"])
