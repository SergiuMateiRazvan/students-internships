FROM python:3.8.5-buster

RUN apt-get update

COPY requirements.txt /tmp/requirements.txt

RUN pip install -r /tmp/requirements.txt && \
    rm -f /tmp/requirements.txt

COPY ./src/backend ./
WORKDIR ./

CMD ["uvicorn", "--host", "0.0.0.0", "--reload", "--reload-dir", ".", "main:app"]
