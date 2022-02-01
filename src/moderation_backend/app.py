import json
import logging

from crud import crud_students_descriptions
from flask import Flask, request
from flask_cors import CORS

LOGGER = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return "Hello, World!"


@app.route("/healthcheck")
def healthcheck():
    return "OK"


@app.route(
    "/api/students-descriptions/<student_mail>/", methods=["GET", "POST", "DELETE"]
)
def get_descriptions_by_email(student_mail: str):
    if request.method == "POST":
        description = request.json["description"]
        return json.dumps(
            crud_students_descriptions.set_student_description(
                student_mail, description
            )
        )
    elif request.method == "DELETE":
        description = request.json["description"]
        return json.dumps(
            crud_students_descriptions.delete_by_email_and_description(
                student_mail, description
            )
        )
    return json.dumps(crud_students_descriptions.get_by_email(student_mail))


@app.route("/api/students-descriptions/", methods=["GET"])
def get_students():
    return json.dumps(crud_students_descriptions.get_all())


if __name__ == "__main__":
    try:
        app.run(port=5005)
    except Exception as ex:
        LOGGER.exception(f"Exception running moderation_backend: {ex}")
