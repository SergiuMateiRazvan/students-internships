import json
import logging

from better_profanity import profanity

import rabbitmq
from moderation import upload_profanity_description
from students_internships import update_description

LOGGER = logging.getLogger(__name__)


class NotEnoughDataProvided(Exception):
    pass


class Worker:
    @staticmethod
    def work():
        with rabbitmq.get_connection() as connection:
            with connection.channel() as channel:
                rabbitmq.consume(channel, Worker.on_message_callback)
                channel.start_consuming()

    @staticmethod
    def on_message_callback(ch, method, properties, body):
        message = json.loads(body)
        user_mail, description = message.get("user_mail"), message.get("description")
        if not user_mail or not description:
            raise NotEnoughDataProvided("Not enough data provided for censoring")
        LOGGER.info(f"Uploading {description} to moderation")
        upload_profanity_description(user_mail, description)

        censored_description = profanity.censor(description)
        update_description(censored_description, user_mail)
