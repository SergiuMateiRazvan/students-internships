from api import index
from fastapi import FastAPI

app = FastAPI()

app.include_router(index.router)
