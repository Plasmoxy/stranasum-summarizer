FROM tensorflow/serving:latest


COPY ./models.config /models

# each model copied as version
COPY ./models/lyric-snow /models/lyric-snow/1

EXPOSE 8500
EXPOSE 8501

CMD ["tensorflow_model_server", "--port=8500", "--rest_api_port=8501", "--model_config_file=/models/models.config"]
