import json

import requests

from config import settings


def upload_profanity_description(student_mail, description):
    try:
        requests.post(
            f"{settings.moderation_url}/api/students-descriptions/{student_mail}/",
            data=json.dumps({"description": description}),
            headers={"content-type": "application/json"},
        )
    except Exception as ex:
        print(f"Exception updating description {ex}")
