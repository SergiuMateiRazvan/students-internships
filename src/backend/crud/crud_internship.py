from db import base
from sqlalchemy import desc


def _sort_internships(internships, sort, sort_direction):
    sort_param = getattr(base.Internship, sort, None)
    if sort_direction == "descending":
        sort_params = map(desc, [sort_param])
        return internships.order_by(*sort_params)
    return internships.order_by(sort_param)


def get_all(db, sort, sort_direction, location, title, date):
    internships = _sort_internships(db.query(base.Internship), sort, sort_direction)

    if location:
        internships = internships.filter(base.Internship.location == location)
    if title:
        internships = internships.filter(base.Internship.title.ilike(f"%{title}%"))
    if date:
        internships = internships.filter(base.Internship.start_date == date)

    return internships.all()


def create_internship(db, internship):
    db_internship = base.Internship(
        start_date=internship.start_date,
        title=internship.title,
        description=internship.description,
        location=internship.location,
        company_mail=internship.company_mail,
    )
    db.add(db_internship)
    db.flush()
    db.refresh(db_internship)
    return db_internship
