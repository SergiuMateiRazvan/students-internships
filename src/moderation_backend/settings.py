from common.singleton import Singleton


@Singleton
class Settings:
    REDIS_HOST = "localhost"
    REDIS_PORT = 6379


settings = Settings()
