import typing

from crud import crud_internship, crud_internship_view
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
def get_internships(
    location: typing.Optional[str] = fastapi.Query(""),
    title: typing.Optional[str] = fastapi.Query(""),
    date: typing.Optional[str] = fastapi.Query(""),
    sort: typing.Optional[str] = fastapi.Query("start_date"),
    sort_direction: str = fastapi.Query(None, regex="(^ascending$|^descending$)"),
):
    with session.get_db_session() as db_session:
        db_internships = crud_internship.get_all(
            db_session, sort, sort_direction, location, title, date
        )
        response_internships = []
        for db_internship in db_internships:
            db_internship.start_date = str(db_internship.start_date)
            response_internships.append(
                schema_internship.Internship.from_orm(db_internship)
            )
        return response_internships


@router.post("/internship/view/", response_model=schema_internship.InternshipView)
def add_internship_view(view: schema_internship.InternshipView):
    with session.get_db_session() as db_session:
        try:
            db_internship_view = crud_internship_view.add_internship_view(
                db_session, view
            )
            return schema_internship.InternshipView.from_orm(db_internship_view)
        except Exception:
            raise fastapi.HTTPException(
                status_code=404, detail="Internship or user not found"
            )


@router.get("/internship/view/{internship_id}/count/", response_model=int)
def get_internship_count(internship_id: int):
    with session.get_db_session() as db_session:
        return crud_internship_view.get_count_for_internship(db_session, internship_id)
