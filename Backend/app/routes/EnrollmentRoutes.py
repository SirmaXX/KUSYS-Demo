from fastapi import APIRouter,Depends, Request, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session



from app.models import SessionLocal,Enrollment
from app.schemas import Enrollment,EnrollmentCreate
from app.Controller.Enrollment_Controller import EnrollmentController
# Dependency

enrollment_router = APIRouter(responses={404: {"description": "Not found"}})


def get_db():
    db = SessionLocal()
    try: 
        yield db
    finally:
        db.close()



@enrollment_router.post("/enrollments/", response_model=Enrollment,description="Bir kullanıcının bir kursa kayıt olabilmesi için oluşturulan endpoint")
def create_enrollment_route(enrollment: EnrollmentCreate, db: Session = Depends(get_db)):
    return EnrollmentController.create_enrollment(db, enrollment)

@enrollment_router.get("/enrollments/{enrollment_id}", response_model=Enrollment ,description="Bir kurs kaydının bilgilerini getirmek için oluşturulan endpoint")
def read_enrollment(enrollment_id: int, db: Session = Depends(get_db)):
    return EnrollmentController.get_enrollment(db, enrollment_id)

@enrollment_router.get("/enrollments/", response_model=list[Enrollment],description="İlk 10 Kaydın bilgisini getirmek için oluşturulan endpoint")
def read_enrollments(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return EnrollmentController.get_enrollments(db, skip=skip, limit=limit)



@enrollment_router.get("/enrollments/courses/{course_id}",description="Bir kurstaki öğrencilerin bilgilerini getirmek için oluşturulan endpoint")
def read_classenrollment(course_id: int, db: Session = Depends(get_db)):
    return EnrollmentController.get_classenrollments(db, course_id)

@enrollment_router.get("/enrollments/student/{student_id}" ,description="Bir öğrencininhangi kursta kayıtlı olduğunu  getirmek için oluşturulan endpoint")
def read_classenrollment(student_id: int, db: Session = Depends(get_db)):
    return EnrollmentController.get_user_enrollments(db, student_id)

@enrollment_router.put("/enrollments/{enrollment_id}", response_model=Enrollment,description="Bir kurs kaydının bilgilerini güncellemek için oluşturulan endpoint")
def update_enrollment_route(enrollment_id: int, enrollment: EnrollmentCreate, db: Session = Depends(get_db)):
    return EnrollmentController.update_enrollment(db, enrollment_id, enrollment)

@enrollment_router.delete("/enrollments/{enrollment_id}", response_model=Enrollment,description="Bir kurs kaydının silinmesi için oluşturulan endpoint")
def delete_enrollment_route(enrollment_id: int, db: Session = Depends(get_db)):
    return EnrollmentController.delete_enrollment(db, enrollment_id)