from sqlalchemy.orm import Session
from . import models, schemas


#USERS
def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.User).offset(skip).limit(limit).all()

def update_user(db: Session, user_id: int, user: schemas.User):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    for var, value in vars(user).items():
        setattr(db_user, var, value) if value is not None else None
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if  user != None:
      db.delete( user)
      db.commit()
      db.refresh( user )
      return {}
    else :
        return {}
#USERS 

#STUDENTS
def create_student(db: Session, student: schemas.StudentCreate):
    db_student = models.Student(**student.dict())
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

def get_student(db: Session, student_id: int):
    return db.query(models.Student).filter(models.Student.StudentId == student_id).first()

def get_students(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Student).offset(skip).limit(limit).all()

def update_student(db: Session, student_id: int, student: schemas.StudentCreate):
    db_student = db.query(models.Student).filter(models.Student.StudentId == student_id).first()
    for attr, value in student.dict().items():
        setattr(db_student, attr, value)
    db.commit()
    db.refresh(db_student)
    return db_student

def delete_student(db: Session, student_id: int):
    db_student = db.query(models.Student).filter(models.Student.StudentId == student_id).first()
    db.delete(db_student)
    db.commit()

#STUDENTS

#Course

def create_course(db: Session, course: schemas.CourseCreate):
    db_course = models.Course(**course.dict())
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course

def get_course(db: Session, course_id: int):
    return db.query(models.Course).filter(models.Course.CourseId == course_id).first()

def get_courses(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Course).offset(skip).limit(limit).all()

def update_course(db: Session, course_id: int, course: schemas.CourseCreate):
    db_course = db.query(models.Course).filter(models.Course.CourseId == course_id).first()
    if db_course:
        for key, value in course.dict().items():
            setattr(db_course, key, value)
        db.commit()
        db.refresh(db_course)
        return db_course
    return None

def delete_course(db: Session, course_id: int):
    db_course = db.query(models.Course).filter(models.Course.CourseId == course_id).first()
    if db_course:
        db.delete(db_course)
        db.commit()
        return db_course
    return None

#Course


#Enrollment
def create_enrollment(db: Session, enrollment: schemas.EnrollmentCreate):
    db_enrollment = models.Enrollment(**enrollment.dict())
    db.add(db_enrollment)
    db.commit()
    db.refresh(db_enrollment)
    return db_enrollment

def get_enrollment(db: Session, enrollment_id: int):
    return db.query(models.Enrollment).filter(models.Enrollment.EnrollmentId == enrollment_id).first()

def get_enrollments(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Enrollment).offset(skip).limit(limit).all()

def update_enrollment(db: Session, enrollment_id: int, enrollment: schemas.EnrollmentCreate):
    db_enrollment = db.query(models.Enrollment).filter(models.Enrollment.EnrollmentId == enrollment_id).first()
    if db_enrollment:
        for key, value in enrollment.dict().items():
            setattr(db_enrollment, key, value)
        db.commit()
        db.refresh(db_enrollment)
        return db_enrollment
    return None

def delete_enrollment(db: Session, enrollment_id: int):
    db_enrollment = db.query(models.Enrollment).filter(models.Enrollment.EnrollmentId == enrollment_id).first()
    if db_enrollment:
        db.delete(db_enrollment)
        db.commit()
        return db_enrollment
    return None