from fastapi import APIRouter,Depends, Request, HTTPException,status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session



from app.models import SessionLocal,Course
from app.schemas import Course,CourseCreate
from app.Controller.Course_Controller import CourseController
# Dependency

course_router = APIRouter(responses={404: {"description": "Not found"}})
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_db():
    db = SessionLocal()
    try: 
        yield db
    finally:
        db.close()


def get_current_user(token: str = Depends(oauth2_scheme)):
    return token




@course_router.post("/courses/", response_model=Course,status_code=status.HTTP_201_CREATED)
def create_course_route(course: CourseCreate, db: Session = Depends(get_db)):
    return CourseController.create_course(db, course)

@course_router.get("/courses/{course_id}", response_model=Course)
def read_course(course_id: int, db: Session = Depends(get_db)):
    return CourseController.get_course(db, course_id)

@course_router.get("/courses/", response_model=list[Course])
def read_courses(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return CourseController.get_courses(db, skip=skip, limit=limit)

@course_router.put("/courses/{course_id}", response_model=Course)
def update_course_route(course_id: int, course: CourseCreate, db: Session = Depends(get_db)):
    return CourseController.update_course(db, course_id, course)

@course_router.delete("/courses/{course_id}", response_model=Course,status_code=status.HTTP_201_CREATED)
def delete_course_route(course_id: int, db: Session = Depends(get_db)):
    return CourseController.delete_course(db, course_id)

