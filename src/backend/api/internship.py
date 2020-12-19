import typing

from crud import crud_internship
from db import session
import fastapi
from schema import schema_internship

router = fastapi.APIRouter()


@router.post("/internship/", response_model=schema_internship.Internship)
def add_internship(internship: schema_internship.InternshipCreate):
    with session.get_db_session() as db_session:
        try:
            db_internship = crud_internship.create_internship(db_session, internship)
            db_internship.start_date = str(db_internship.start_date)
            return schema_internship.Internship.from_orm(db_internship)
        except Exception:
            raise fastapi.HTTPException(status_code=400, detail="Invalid data")


@router.get("/internship/", response_model=typing.List[schema_internship.Internship])
def get_internships():
    with session.get_db_session() as db_session:
        db_internships = crud_internship.get_all(db_session)
        response_internships = []
        for db_internship in db_internships:
            db_internship.start_date = str(db_internship.start_date)
            response_internships.append(
                schema_internship.Internship.from_orm(db_internship)
            )
        return response_internships
