import logging
from typing import Dict, List

from redis_client import client

LOGGER = logging.getLogger(__name__)


def get_all() -> List[Dict[str, List[str]]]:
    data = []
    for key in client.scan_iter():
        data.append(
            {
                "student": key.decode("utf-8"),
                "descriptions": get_by_email(key.decode("utf-8")),
            }
        )
    return data


def set_student_description(student_email: str, description: str) -> None:
    client.lpush(student_email, description)


def get_by_email(student_email: str) -> List[str]:
    return [
        description.decode("utf-8")
        for description in client.lrange(student_email, 0, -1)
    ]


def delete_by_email_and_description(student_email: str, description: str) -> str:
    return client.lrem(student_email, 0, description)
