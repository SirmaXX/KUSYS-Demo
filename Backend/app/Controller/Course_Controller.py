from sqlalchemy.orm import Session
from .. import models, schemas


class CourseController:
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
    else :
       return None
 
