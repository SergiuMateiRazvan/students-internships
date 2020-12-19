from db import base


def get_all(db):
    return db.query(base.Internship).all()


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
