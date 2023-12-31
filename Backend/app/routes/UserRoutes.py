from fastapi import APIRouter,Depends, Request, HTTPException,status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.models import SessionLocal,User
from app.schemas import User,User_Schema,User_Login
from app.Controller.User_Controller import UserController

# Dependency


user_router = APIRouter(responses={404: {"description": "Not found"}})
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_db():
    db = SessionLocal()
    try: 
        yield db
    finally:
        db.close()


def get_current_user(token: str = Depends(oauth2_scheme)):
    return token

def is_admin(user: User = Depends(get_current_user),db: Session = Depends(get_db)):
    user = UserController.get_user_by_username(db, user.username)
    if user.admin != 1:
        raise HTTPException(status_code=404, detail="Admin not found")
    return user


@user_router.get("/health",description="servisin çalışıp çalışmadığını kontrol eden router")
async def health(req: Request): 
    health=True
    if health==True:
        return True
    else:
        return None



@user_router.get("/",description="index için router")
async def api_index():
     return {"message": "Hello from FastAPI!"}




@user_router.post("/login", description="Kullanıcının logini için oluşturulan endpoint")
def login(user_check: User_Login, db: Session = Depends(get_db)):
         return UserController.checkuser(db, user_check)

@user_router.post("/adminlogin", description="Adminlerin logini için oluşturulan endpoint")
def login(user_check: User_Login, db: Session = Depends(get_db)):
         return UserController.checkadmin(db, user_check)


@user_router.post("/users/", response_model=User, status_code=status.HTTP_201_CREATED,description="Kullanıcı oluşturmak için oluşturulan endpoint")
def create_new_user(user_create: User, db: Session = Depends(get_db)):
    return UserController.create_user(db, user_create)




@user_router.post("/admin/users/", response_model=User, status_code=status.HTTP_201_CREATED,description="Admin oluşturmak için oluşturulan endpoint")
def create_new_user(user_create: User, db: Session = Depends(get_db)):
    return UserController.create_admin(db, user_create)




@user_router.get("/users/{user_id}", response_model=User,description="herhangi bir idye sahip kullanıcının bilgilerini getirmek için oluşturulan endpoint")
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = UserController.get_user(db, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@user_router.get("/users/", response_model=list[User],description="İlk 10 Kullanıcının listesini getirmek için oluşturulan endpoint")
def read_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    users = UserController.get_users(db, skip, limit)
    return users

@user_router.put("/users/{user_id}", response_model=User,description="Kullanıcıyı güncellemek için oluşturulan endpoint")
def update_existing_user(user_id: int, user_update: User, db: Session = Depends(get_db)):
    user = UserController.update_user(db, user_id, user_update)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user



@user_router.delete("/users/{user_id}", response_model=User, status_code=status.HTTP_201_CREATED,description="Kullanıcıyı silmek için oluşturulan endpoint")
def delete_existing_user(user_id: int, db: Session = Depends(get_db)):
    user = UserController.delete_user(db, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user





