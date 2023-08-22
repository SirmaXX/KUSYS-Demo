from fastapi import APIRouter,Depends, Request,HTTPException
from sqlalchemy.orm import Session
items_router = APIRouter(responses={404: {"description": "Not found"}})
from app.models import SessionLocal,User,Course,Enrollment
from app.schemas import User,Student,StudentCreate,Course,CourseCreate,Enrollment,EnrollmentCreate
from app.crud import create_user,get_user,get_users,update_user,delete_user,create_student,get_student,get_students,update_student,delete_student,create_course,get_course,get_courses,update_course,delete_course,create_enrollment,get_enrollment,get_enrollments,update_enrollment,delete_enrollment
# Dependency

def get_db():
    db = SessionLocal()
    try: 
        yield db
    finally:
        db.close()



@items_router.get("/health",description="servisin çalışıp çalışmadığını kontrol eden router")
async def health(req: Request): 
    health=True
    if health==True:
        return True
    else:
        return None



@items_router.get("/",description="index için router")
async def api_index():
    """ 
    iş servisinin giriş sayfası
    """
    return {"Hello": "Job"}



@items_router.post("/users/", response_model=User)
def create_new_user(user_create: User, db: Session = Depends(get_db)):
    return create_user(db, user_create)

@items_router.get("/users/{user_id}", response_model=User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = get_user(db, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@items_router.get("/users/", response_model=list[User])
def read_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    users = get_users(db, skip, limit)
    return users

@items_router.put("/users/{user_id}", response_model=User)
def update_existing_user(user_id: int, user_update: User, db: Session = Depends(get_db)):
    user = update_user(db, user_id, user_update)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@items_router.delete("/users/{user_id}", response_model=User)
def delete_existing_user(user_id: int, db: Session = Depends(get_db)):
    user = delete_user(db, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user




@items_router.post("/students/", response_model=Student)
def create_student_route(student: StudentCreate, db: Session = Depends(get_db)):
    return create_student(db, student)

@items_router.get("/students/{student_id}", response_model=Student)
def read_student(student_id: int, db: Session = Depends(get_db)):
    return get_student(db, student_id)

@items_router.get("/students/", response_model=list[Student])
def read_students(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    students =get_students(db, skip=skip, limit=limit)
    return students

@items_router.put("/students/{student_id}", response_model=Student)
def update_student_route(student_id: int, student: StudentCreate, db: Session = Depends(get_db)):
    return update_student(db, student_id, student)


@items_router.delete("/students/{student_id}")
def delete_student_route(student_id: int, db: Session = Depends(get_db)):
    return delete_student(db, student_id)





@items_router.post("/courses/", response_model=Course)
def create_course_route(course: CourseCreate, db: Session = Depends(get_db)):
    return create_course(db, course)

@items_router.get("/courses/{course_id}", response_model=Course)
def read_course(course_id: int, db: Session = Depends(get_db)):
    return get_course(db, course_id)

@items_router.get("/courses/", response_model=list[Course])
def read_courses(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return get_courses(db, skip=skip, limit=limit)

@items_router.put("/courses/{course_id}", response_model=Course)
def update_course_route(course_id: int, course: CourseCreate, db: Session = Depends(get_db)):
    return update_course(db, course_id, course)

@items_router.delete("/courses/{course_id}", response_model=Course)
def delete_course_route(course_id: int, db: Session = Depends(get_db)):
    return delete_course(db, course_id)




@items_router.post("/enrollments/", response_model=Enrollment)
def create_enrollment_route(enrollment: EnrollmentCreate, db: Session = Depends(get_db)):
    return create_enrollment(db, enrollment)

@items_router.get("/enrollments/{enrollment_id}", response_model=Enrollment)
def read_enrollment(enrollment_id: int, db: Session = Depends(get_db)):
    return get_enrollment(db, enrollment_id)

@items_router.get("/enrollments/", response_model=list[Enrollment])
def read_enrollments(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return get_enrollments(db, skip=skip, limit=limit)

@items_router.put("/enrollments/{enrollment_id}", response_model=Enrollment)
def update_enrollment_route(enrollment_id: int, enrollment: EnrollmentCreate, db: Session = Depends(get_db)):
    return update_enrollment(db, enrollment_id, enrollment)

@items_router.delete("/enrollments/{enrollment_id}", response_model=Enrollment)
def delete_enrollment_route(enrollment_id: int, db: Session = Depends(get_db)):
    return delete_enrollment(db, enrollment_id)