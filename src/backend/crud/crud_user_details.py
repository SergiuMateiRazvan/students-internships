from db import base


def create_user_details(db, details, user):
    db_user_details = base.UserDetails(user=user, **details.__dict__)
    db.add(db_user_details)
    db.flush()
    db.refresh(db_user_details)
    return db_user_details


def get_by_mail(db, mail):
    return db.query(base.UserDetails).filter(base.UserDetails.user_mail == mail).first()


def update_user_details(db, mail, update_data):
    if (
        not db.query(base.UserDetails)
        .filter(base.UserDetails.user_mail == mail)
        .update(update_data)
    ):
        return None
    return get_by_mail(db, mail)
