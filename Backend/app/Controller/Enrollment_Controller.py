from sqlalchemy.orm import Session
from .. import models, schemas


class EnrollmentController:
 
 def create_enrollment(db: Session, enrollment_data: schemas.EnrollmentCreate):
    existing_enrollment = db.query(models.Enrollment).filter(models.Enrollment.StudentId == enrollment_data.StudentId).first()
    
    if existing_enrollment and existing_enrollment.EnrollmentId:
        return {"message": "Enrollment already exists"}
    else:
        db_enrollment = models.Enrollment(**enrollment_data.dict())
        db.add(db_enrollment)
        db.commit()
        db.refresh(db_enrollment)
        return db_enrollment
 

 def get_enrollment(db: Session, enrollment_id: int):
    return db.query(models.Enrollment).filter(models.Enrollment.EnrollmentId == enrollment_id).first()

 def get_enrollments(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Enrollment).offset(skip).limit(limit).all()


 def get_classenrollments(db: Session, course_id: int):
  return db.query(models.Enrollment).filter(models.Enrollment.CourseId == course_id).all()

 def get_user_enrollments(db: Session, user_id: int):
   return db.query(models.Enrollment).filter(models.Enrollment.StudentId == user_id).all()
 
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