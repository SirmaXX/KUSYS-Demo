from sqlalchemy.orm import Session
from .. import models, schemas


#USERS

class UserController:
  def checkuser(db: Session, user: schemas.UserCreate):
    user= db.query(models.User).filter(models.User.username == user.username).first()
    if user:
        return True
    else:
        return False
    

  def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(**user.dict())
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
    if  user != None:
      db.delete( user)
      db.commit()
      db.refresh( user )
      return {}
    else :
        return {}