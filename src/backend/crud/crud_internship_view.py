from db import base


def add_internship_view(db, internship_view):
    db_internship_view = base.InternshipView(
        internship_id=internship_view.internship_id, user_mail=internship_view.user_mail
    )
    db.add(db_internship_view)
    db.flush()
    db.refresh(db_internship_view)
    return db_internship_view


def get_count_for_internship(db, internship_id):
    return (
        db.query(base.InternshipView)
        .filter(base.InternshipView.internship_id == internship_id)
        .count()
    )
