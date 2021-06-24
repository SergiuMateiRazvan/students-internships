from config import settings
import pika


def get_connection():
    return pika.BlockingConnection(pika.ConnectionParameters(settings.queue_url))


def consume(channel, callback):
    channel.basic_consume(
        queue=settings.queue_name, on_message_callback=callback, auto_ack=True
    )
