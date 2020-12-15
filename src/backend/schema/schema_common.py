import pydantic


class Response(pydantic.BaseModel):
    message: str = ""
