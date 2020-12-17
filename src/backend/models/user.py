from db import base
from sqlalchemy import Column, ForeignKey, String
from sqlalchemy.dialects import postgresql
from sqlalchemy.orm import relationship


class User(base.Base):
    mail = base.RequiredColumn(String, primary_key=True)
    password = base.RequiredColumn(String)
    user_type = Column(String, default="student")
    user_details = relationship("UserDetails", uselist=False)


class UserDetails(base.Base):
    user_mail = Column(String, ForeignKey(User.mail), primary_key=True)
    phone = Column(String)
    education = Column(postgresql.JSONB)
    user = relationship("User", back_populates="user_details")
