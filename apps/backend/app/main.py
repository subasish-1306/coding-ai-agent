from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import api_router
from app.config import settings
from app.database import close_db, init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Context manager for application lifespan."""
    await init_db()
    yield
    await close_db()


def create_app() -> FastAPI:
    """Create the FastAPI application instance."""
    app = FastAPI(
        title=settings.APP_NAME,
        version="0.1.0",
        lifespan=lifespan,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(api_router, prefix=settings.API_V1_PREFIX)

    @app.get("/health", tags=["Health"])
    async def health_check():
        """Simple health check endpoint."""
        return {"status": "ok"}

    return app


app = create_app()
