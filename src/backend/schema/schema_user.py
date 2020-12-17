from enum import Enum
import typing

import pydantic
from schema import schema_user_details


class UserType(str, Enum):
    STUDENT = "student"
    COMPANY = "company"


class UserBase(pydantic.BaseModel):
    mail: str
    password: str
    user_type: UserType
    user_details: typing.Optional[schema_user_details.UserDetails]


class UserCreate(UserBase):
    pass


class User(UserBase):
    pass

    class Config:
        orm_mode = True
