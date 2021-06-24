from dataclasses import dataclass
import json

from config import settings
import pika


@dataclass
class Message(object):
    user_mail: str
    description: str

    def toJson(self) -> str:
        return json.dumps(self, default=lambda o: o.__dict__)


def publish_message(message: Message):
    try:
        connection = pika.BlockingConnection(
            pika.ConnectionParameters(settings.queue_url)
        )
        with connection.channel() as channel:
            channel.basic_publish(
                exchange="",
                routing_key=settings.queue_name,
                body=message.toJson().encode(),
            )
        connection.close()
    except Exception as ex:
        print(f"Exception publishing message {ex}")
