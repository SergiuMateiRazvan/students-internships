FROM python:3.8.5-slim-buster

RUN apt-get update


COPY requirements.txt /tmp/requirements.txt

RUN pip install -r /tmp/requirements.txt && \
    rm -f /tmp/requirements.txt

COPY ./ ./

WORKDIR ./

#CMD ["python3", "-m" , "flask", "run", "--host=0.0.0.0"]
CMD ["python", "app.py"]
