from api import errors
from crud import crud_user, crud_user_details
from db import session
import fastapi
from schema import schema_common, schema_user_details

router = fastapi.APIRouter()


@router.post("/user/details/", response_model=schema_user_details.UserDetails)
def add_user_details(details: schema_user_details.UserDetailsCreate):
    with session.get_db_session() as db_session:
        db_user = crud_user.get_user_by_mail(db_session, details.user_mail)
        if not db_user:
            raise fastapi.HTTPException(
                status_code=404, detail="User with this mail not found"
            )
        db_user_details = crud_user_details.get_by_mail(db_session, details.user_mail)
        if db_user_details:
            raise fastapi.HTTPException(
                status_code=400, detail="Details already exist for this user"
            )
        db_user_details = crud_user_details.create_user_details(
            db_session, details, db_user
        )
        return schema_user_details.UserDetails.from_orm(db_user_details)


@router.get("/user/details/{mail}/", response_model=schema_user_details.UserDetails)
def get_user_details_by_mail(mail: str):
    with session.get_db_session() as db_session:
        db_user_details = crud_user_details.get_by_mail(db_session, mail)
        if not db_user_details:
            raise fastapi.HTTPException(
                status_code=404, detail="User details not found"
            )
        return schema_user_details.UserDetails.from_orm(db_user_details)


@router.patch("/user/details/{mail}/", response_model=schema_user_details.UserDetails)
def update_user_details(user_details: schema_user_details.UserDetailsUpdate, mail: str):
    try:
        with session.get_db_session() as db_session:
            db_user_details = crud_user_details.update_user_details(
                db_session, mail=mail, update_data=user_details.dict(exclude_unset=True)
            )

            if db_user_details is None:
                raise fastapi.HTTPException(status_code=404, detail="User not found")
            return schema_user_details.UserDetails.from_orm(db_user_details)
    except errors.ForbiddenValueError as error:
        raise fastapi.HTTPException(status_code=422, detail=error.msg)
