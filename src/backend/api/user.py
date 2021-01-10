from crud import crud_user
from db import session
import fastapi
from schema import schema_common, schema_user

router = fastapi.APIRouter()


@router.post("/user/", response_model=schema_common.Response)
def create_user(user: schema_user.UserCreate):
    with session.get_db_session() as db_session:
        db_user = crud_user.get_user_by_mail(db_session, user.mail)
        if db_user:
            raise fastapi.HTTPException(
                status_code=400, detail="Mail already bound to another user"
            )
        db_user = crud_user.create_user(db_session, user)
        return schema_common.Response(message=f"User {db_user.mail} created")


@router.post("/user/auth/", response_model=schema_user.UserGet)
def get_user_by_mail(credentials: schema_user.UserAuth):
    with session.get_db_session() as db_session:
        db_user = crud_user.get_user_by_mail(db_session, credentials.mail)
        if db_user and db_user.password == credentials.password:
            return schema_user.UserGet.from_orm(db_user)
        raise fastapi.HTTPException(status_code=404, detail="User not found")


@router.get("/user/{mail}/", response_model=schema_user.User)
def get_user_by_mail(mail: str):
    with session.get_db_session() as db_session:
        db_user = crud_user.get_user_by_mail(db_session, mail)
        if db_user:
            return schema_user.User.from_orm(db_user)
        raise fastapi.HTTPException(status_code=404, detail="User not found")
