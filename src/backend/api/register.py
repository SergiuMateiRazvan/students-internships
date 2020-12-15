import fastapi
from schema import schema_common, schema_user

router = fastapi.APIRouter()


@router.post("/register/", response_model=schema_common.Response)
def register(user: schema_user.UserCreate):
    return schema_common.Response(message=f"User {user} created")
