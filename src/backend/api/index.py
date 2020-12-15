import fastapi
from schema import schema_common

router = fastapi.APIRouter()


@router.get("/", response_model=schema_common.Response)
def index():
    return schema_common.Response(message="Hello World")
