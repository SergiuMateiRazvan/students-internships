from db import base


def get_user_by_mail(db, mail):
    return db.query(base.User).filter(base.User.mail == mail).first()


def create_user(db, user):
    db_user = base.User(
        mail=user.mail, password=user.password, user_type=user.user_type
    )
    db.add(db_user)
    db.flush()
    db.refresh(db_user)
    return db_user
