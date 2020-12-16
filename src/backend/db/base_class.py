import functools

import inflection
import sqlalchemy
from sqlalchemy.ext import declarative

RequiredColumn = functools.partial(sqlalchemy.Column, nullable=False)


@declarative.as_declarative()
class Base:

    __name__: str

    @declarative.declared_attr
    def __tablename__(cls) -> str:
        return inflection.pluralize(inflection.underscore(cls.__name__))
