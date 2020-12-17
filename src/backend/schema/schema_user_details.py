import typing

from api import errors
import pydantic


class UserDetailsBase(pydantic.BaseModel):
    user_mail: str
    phone: str
    education: typing.Dict[str, str or int]

    @pydantic.validator("phone")
    def ensure_phone_is_correct(cls, value):
        if len(value) != 10:
            raise errors.ForbbForbiddenValueError(
                msg="Phone number needs to have 10 digits"
            )
        return value


class UserDetailsCreate(UserDetailsBase):
    pass


class UserDetails(UserDetailsBase):
    class Config:
        orm_mode = True
