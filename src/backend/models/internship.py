from db import base
from models import user
from sqlalchemy import Column, Date, ForeignKey, Integer, PrimaryKeyConstraint, String
from sqlalchemy.dialects import postgresql
from sqlalchemy.orm import relationship


class Internship(base.Base):
    internship_id = Column(Integer, primary_key=True, autoincrement=True)
    start_date = base.RequiredColumn(Date)
    title = base.RequiredColumn(String)
    description = Column(postgresql.JSONB)
    location = Column(String)
    company_mail = Column(String, ForeignKey(user.User.mail))

    company = relationship("User", back_populates="internship")


class InternshipView(base.Base):
    internship_id = base.RequiredColumn(Integer, ForeignKey(Internship.internship_id))
    user_mail = base.RequiredColumn(String, ForeignKey(user.User.mail))

    __table_args__ = (
        PrimaryKeyConstraint("internship_id", "user_mail"),
        {},
    )
