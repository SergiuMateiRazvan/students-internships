from db import base
from sqlalchemy import Column, String


class User(base.Base):
    mail = base.RequiredColumn(String, primary_key=True)
    password = base.RequiredColumn(String)
    user_type = Column(String, default="student")
