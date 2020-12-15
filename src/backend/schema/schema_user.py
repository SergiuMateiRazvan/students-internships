import pydantic


class UserBase(pydantic.BaseModel):
    name: str


class UserCreate(UserBase):
    pass


class User(UserBase):
    pass

    class Config:
        orm_mode = True
