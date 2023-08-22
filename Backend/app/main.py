from fastapi import FastAPI
from .routes.routes import items_router
from .config import DefaultConfig

def create_app():
    app = FastAPI(title="KUSYS-DEMO", description="KUSYS-DEMO mülakat servisi") 
    app.config = DefaultConfig
    app.include_router(items_router)
    return app