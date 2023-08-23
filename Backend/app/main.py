from fastapi import FastAPI

from .routes.CourseRoutes import course_router
from .routes.EnrollmentRoutes import enrollment_router

from .routes.UserRoutes import user_router
from .config import DefaultConfig

def create_app():
    app = FastAPI(title="KUSYS-DEMO", description="KUSYS-DEMO mülakat servisi") 
    app.config = DefaultConfig
    app.include_router(course_router)
    app.include_router(enrollment_router)

    app.include_router(user_router)
    return app