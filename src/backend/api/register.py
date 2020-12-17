from crud import crud_user
from db import session
import fastapi
from schema import schema_common, schema_user

router = fastapi.APIRouter()


@router.post("/register/", response_model=schema_common.Response)
def register(user: schema_user.UserCreate):
    with session.get_db_session() as db_session:
        db_user = crud_user.get_user_by_mail(db_session, user.mail)
        if db_user:
            raise fastapi.HTTPException(
                status_code=400, detail="Mail already bound to another user"
            )
        db_user = crud_user.create_user(db_session, user)
        return schema_common.Response(message=f"User {db_user.mail} created")
