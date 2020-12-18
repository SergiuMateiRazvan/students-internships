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
            raise errors.ForbiddenValueError(msg="Phone number needs to have 10 digits")
        return value


class UserDetailsCreate(UserDetailsBase):
    pass


class UserDetailsUpdate(UserDetailsBase):
    user_mail: str = None
    phone: str = None
    education: typing.Dict[str, str or int] = None

    @pydantic.validator("user_mail")
    def user_mail_con_not_be_update(cls, value):
        if value:
            raise errors.ForbiddenValueError(msg="User mail can't be changed")
        return value


class UserDetails(UserDetailsBase):
    class Config:
        orm_mode = True
