import pydantic


class Settings(pydantic.BaseSettings):
    students_internships_url: str = "http://0.0.0.0:8000"
    moderation_url: str = "http://0.0.0.0:5005"
    queue_url: str = "0.0.0.0"
    queue_name: str = "Students-Descriptions"


settings = Settings()
