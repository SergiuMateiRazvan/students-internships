from common.singleton import Singleton
import redis
from settings import settings


@Singleton
class RedisClient:
    client = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT)

    def redis(self):
        return self.client


client = RedisClient().redis()
