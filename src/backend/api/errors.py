import pydantic


class ForbiddenAttributeError(pydantic.PydanticValueError):
    msg_template = "{msg}"


class ForbiddenValueError(pydantic.PydanticValueError):
    msg_template = "{msg}"
