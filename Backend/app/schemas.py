from pydantic import BaseModel, Field
from datetime import date
from typing import List
from typing import Optional


class StudentBase(BaseModel):
    FirstName: str
    LastName: str
    BirthDate: date

class StudentCreate(StudentBase):
    pass

class Student(StudentBase):
    StudentId: int

    class Config:
        orm_mode = True

class CourseBase(BaseModel):
    CourseName: str

class CourseCreate(CourseBase):
    pass

class Course(CourseBase):
    CourseId: int

    class Config:
        orm_mode = True

class EnrollmentBase(BaseModel):
    StudentId: int
    CourseId: int

class EnrollmentCreate(EnrollmentBase):
    pass

class Enrollment(EnrollmentBase):
    EnrollmentId: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id:int
    admin: int
    password: str
    enabled: int

    class Config:
        orm_mode = True


class User_Schema(BaseModel):
    username : str
    password : str
 

    
    class Config:
        orm_mode = True
        validate_assignment = True
