from sqlalchemy.orm import Session
from .. import models, schemas
import hashlib
import jwt
from fastapi.encoders import jsonable_encoder

SECRET_KEY = "secrettoken"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 800


#USERS
def hash_password(password):
    # Hash the password using SHA-256
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    return hashed_password

def verify_password(input_password, hashed_password):
    # Hash the input password and compare it with the stored hashed password
    return hashlib.sha256(input_password.encode()).hexdigest() == hashed_password


class UserController:
  def checkuser(db: Session, user: schemas.User_Schema):
        db_user = db.query(models.User).filter(models.User.username == user.username).first()
        data = jsonable_encoder(user)
        if db_user:
            result = verify_password(user.password, db_user.password)
            if result:
                encoded_jwt = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
                return {"user_id": db_user.id,"token":encoded_jwt,"message":True}
            else:
                return False
        else:
            return False

        
  def checkadmin(db: Session, user: schemas.User_Login):
        db_user = db.query(models.User).filter(models.User.username == user.username,models.User.admin == 1).first()
        data = jsonable_encoder(user)
        if db_user:
            result = verify_password(user.password, db_user.password)
            if result:
                encoded_jwt = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
                return {"user_id": db_user.id,"token":encoded_jwt,"message":True}
            else:
                return False
        else:
            return False

  def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = hash_password(user.password)
    db_user = models.User(username=user.username, password=hashed_password,email=user.email, admin=0,enabled=1)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user



  def create_admin(db: Session, user: schemas.UserCreate):
    hashed_password = hash_password(user.password)
    db_user = models.User(username=user.username, password=hashed_password,email=user.email,admin=1, enabled=1)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


  def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

  def get_user_by_username(db: Session, username:str):
    return db.query(models.User).filter(models.User.username == username.first())


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
    if user:
        db.delete(user)
        db.commit()
        return user
    else:
        return None