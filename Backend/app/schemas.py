from pydantic import BaseModel, Field
from datetime import date
from typing import List
from typing import Optional



class CourseBase(BaseModel):
    CourseName: str

class CourseCreate(CourseBase):
    pass

class Course(CourseBase):
    CourseId: int

    class Config:
        from_attributes = True

class EnrollmentBase(BaseModel):
    StudentId: int
    CourseId: int

class EnrollmentCreate(EnrollmentBase):
    pass

class Enrollment(EnrollmentBase):
    EnrollmentId: int

    class Config:
        from_attributes = True


class UserBase(BaseModel):
    username: str
    email: Optional[str] 
    

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id:int
    admin: int
    password: str
    enabled: int

    class Config:
        from_attributes= True


class User_Schema(BaseModel):
    username : str
    password : str
 

    
    class Config:
        from_attributes = True
        validate_assignment = True
