import typing

import pydantic
from schema import schema_user


class InternshipBase(pydantic.BaseModel):
    start_date: str
    title: str
    description: typing.Dict[str, typing.List[str]]
    location: str
    company_mail: str
    company: typing.Optional[schema_user.User]


class InternshipCreate(InternshipBase):
    pass


class Internship(InternshipBase):
    pass

    class Config:
        orm_mode = True
