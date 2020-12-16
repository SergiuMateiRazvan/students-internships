import pydantic


class Settings(pydantic.BaseSettings):
    db_name: str = "students_internships_db"
    db_dsn: str = f"postgresql://postgres:postgres@localhost:5432/{db_name}"


settings = Settings()
