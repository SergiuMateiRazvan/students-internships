from config import settings
import requests
import json


def update_description(description: str, user_mail: str):
    try:
        requests.patch(
            f"{settings.students_internships_url}/user/details/{user_mail}/",
            data=json.dumps({"description": description}),
        )
    except Exception as ex:
        print(f"Exception updating description {ex}")
