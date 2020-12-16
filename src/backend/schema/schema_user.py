from enum import Enum

import pydantic


class UserType(str, Enum):
    STUDENT = "student"
    COMPANY = "company"


class UserBase(pydantic.BaseModel):
    mail: str
    password: str
    user_type: UserType


class UserCreate(UserBase):
    pass


class User(UserBase):
    pass

    class Config:
        orm_mode = True
