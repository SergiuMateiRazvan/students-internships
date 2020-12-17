from contextlib import contextmanager

from config import settings
import sqlalchemy
from sqlalchemy import orm


class Engines:
    ENGINES = {}

    @classmethod
    def get(cls, url):
        if url not in cls.ENGINES:
            cls.ENGINES[url] = sqlalchemy.create_engine(
                url,
                convert_unicode=True,
                pool_pre_ping=True,
                pool_size=30,
                max_overflow=120,
            )
        return cls.ENGINES[url]

    @classmethod
    def dispose_all(cls):
        for engine in cls.ENGINES.values():
            engine.dispose()


db_url = settings.db_dsn

engine = Engines.get(db_url)

SessionLocal = orm.sessionmaker(autocommit=False, autoflush=False, bind=engine)


@contextmanager
def get_db_session():
    session = SessionLocal()
    try:
        yield session
        session.commit()
    except Exception:
        try:
            session.rollback()
        except Exception:
            pass
        raise
    finally:
        session.close()
