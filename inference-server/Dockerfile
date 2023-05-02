FROM python:alpine

ADD . .

RUN pip install --upgrade pip && \
    pip install flask requests contractions waitress flask-cors

CMD [ "python", "serve.py" ]