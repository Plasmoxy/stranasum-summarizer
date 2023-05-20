FROM python

ADD . .

RUN pip install --upgrade pip && \
    pip install flask requests contractions waitress flask-cors

EXPOSE 8080

CMD [ "python", "serve.py" ]
