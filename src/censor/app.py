from censor_worker import Worker
from flask import Flask

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "Hello, World!"


if __name__ == "__main__":
    try:
        Worker.work()
    except Exception as ex:
        print(f"Exception trying to censor {ex}")
