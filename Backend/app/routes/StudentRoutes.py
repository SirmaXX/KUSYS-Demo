from fastapi import APIRouter,Depends, Request, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session



from app.models import SessionLocal,Student
from app.schemas import Student,StudentCreate
from app.Controller.Student_Controller import StudentController
# Dependency

student_router = APIRouter(responses={404: {"description": "Not found"}})
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_db():
    db = SessionLocal()
    try: 
        yield db
    finally:
        db.close()

@student_router.post("/students/", response_model=Student)
def create_student_route(student: StudentCreate, db: Session = Depends(get_db)):
    return StudentController.create_student(db, student)

@student_router.get("/students/{student_id}", response_model=Student)
def read_student(student_id: int, db: Session = Depends(get_db)):
    return StudentController.get_student(db, student_id)

@student_router.get("/students/", response_model=list[Student])
def read_students(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    students =StudentController.get_students(db, skip=skip, limit=limit)
    return students

@student_router.put("/students/{student_id}", response_model=Student)
def update_student_route(student_id: int, student: StudentCreate, db: Session = Depends(get_db)):
    return StudentController.update_student(db, student_id, student)


@student_router.delete("/students/{student_id}")
def delete_student_route(student_id: int, db: Session = Depends(get_db)):
    return StudentController.delete_student(db, student_id)

