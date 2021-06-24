import typing

from api import errors
import pydantic


class UserDetailsBase(pydantic.BaseModel):
    user_mail: str
    phone: str
    education: typing.Dict[str, str or int]
    name: str
    description: str

    @pydantic.validator("phone")
    def ensure_phone_is_correct(cls, value):
        if len(value) != 10:
            raise errors.ForbiddenValueError(msg="Phone number needs to have 10 digits")
        return value


class UserDetailsCreate(UserDetailsBase):
    pass


class UserDetailsUpdate(pydantic.BaseModel):
    user_mail: typing.Optional[str] = None
    phone: typing.Optional[str] = None
    education: typing.Optional[typing.Dict[str, str or int]] = None
    name: typing.Optional[str] = None
    description: typing.Optional[str] = None

    @pydantic.validator("user_mail")
    def user_mail_can_not_be_update(cls, value):
        if value:
            raise errors.ForbiddenValueError(msg="User mail can't be changed")
        return value


class UserDetails(UserDetailsBase):
    class Config:
        orm_mode = True
