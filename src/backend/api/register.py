import fastapi
from schema import schema_user

router = fastapi.APIRouter()


@router.post("/register/", include_in_schema=False)
def index(user: schema_user.UserCreate):
    return {"message": f"User {user} created"}
