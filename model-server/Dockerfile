FROM tensorflow/serving:2.11.0


COPY ./models.config /models

# each model copied as a v1 version

# xsum demo
COPY ./models/lyric-snow /models/lyric-snow/1

# stranasum gigaword models
COPY ./models/copper-haze-38 /models/copper-haze-38/1
# COPY ./models/avid-yogurt-33 /models/avid-yogurt-33/1
# COPY ./models/dulcet-resonance-34 /models/dulcet-resonance-34/1
# COPY ./models/gallant-serenity-31 /models/gallant-serenity-31/1
# COPY ./models/sparkling-pond-37 /models/sparkling-pond-37/1
# COPY ./models/wobbly-meadow-36 /models/wobbly-meadow-36/1
# COPY ./models/crisp-snow-40 /models/crisp-snow-40/1
# COPY ./models/elated-donkey-30 /models/elated-donkey-30/1
# COPY ./models/dauntless-disco-29 /models/dauntless-disco-29/1
COPY ./models/rural-star-32 /models/rural-star-32/1

EXPOSE 8500
EXPOSE 8501

ENTRYPOINT ["tensorflow_model_server", "--port=8500", "--rest_api_port=8501", "--model_config_file=/models/models.config"]
