from sqlalchemy.orm import Session
from .. import models, schemas


#USERS

class StudentController:
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
