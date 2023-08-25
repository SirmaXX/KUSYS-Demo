import os
from .config import DefaultConfig

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine  # type: ignore
from sqlalchemy.ext.declarative import declarative_base  # type: ignore
from sqlalchemy.orm import sessionmaker,relationship # type: ignore
from sqlalchemy.sql import expression
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String,Date
from datetime import datetime

DB_URL = DefaultConfig.DATABASE_URI

engine = create_engine(DB_URL,
    pool_size=5,
    pool_recycle=60,
    pool_pre_ping=True)

SessionLocal = sessionmaker( bind=engine,
    autocommit=False,
    autoflush=False)

session=SessionLocal()
Base = declarative_base() 
Now = datetime.utcnow()



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



def db_reset():
   """Veritabanını sıfırlamak için hazırlan fonksiyon """
   Base.metadata.reflect(bind=engine)
   Base.metadata.drop_all(bind=engine)
   


class User(Base):
    __tablename__ = "users" 
    id = Column(Integer, primary_key=True)
    username = Column(String(64), index=True, unique=True)
    email = Column(String(120), index=True, unique=True)
    password = Column(String(128))  # Add this line
    admin = Column(Integer, default=0) # 0 not admin, 1 admin
    enabled = Column(Integer, default=1) # 0 not enabled, 1 enabled

    enrollments = relationship("Enrollment", back_populates="user")
    def __repr__(self):
        return '<User {}>'.format(self.username)





class Course(Base):
    __tablename__ = "courses"

    CourseId = Column(Integer, primary_key=True, index=True)
    CourseName = Column(String)

    # Establish the relationship with the Enrollment table
    enrollments = relationship("Enrollment", back_populates="course")

class Enrollment(Base):
    __tablename__ = "enrollments"

    EnrollmentId = Column(Integer, primary_key=True, index=True)
    StudentId = Column(Integer, ForeignKey("users.id"))
    CourseId = Column(Integer, ForeignKey("courses.CourseId"))

    # Establish bidirectional relationships with Student and Course
    user = relationship("User", back_populates="enrollments")
    course = relationship("Course", back_populates="enrollments")

#TEST İÇİN OLUŞTURULAN DEFAULT KULLANICI VE KURSLAR

db_reset()
Base.metadata.create_all(bind=engine)

adminadd=User(id=1,username="admin",password="8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",email="admin",admin=1,enabled=1)
useradd=User(id=2,username="string",password="473287f8298dba7163a897908958f7c0eae733e25d2e027992ea2edc9bed2fa8",email="string",admin=0,enabled=1)
courseadd=Course(CourseId = 1,CourseName="Python")
session.add(adminadd)
session.add(useradd)
session.add(courseadd)


session.commit()
