```sh

docker buildx build --platform linux/amd64 -t gcr.io/stranasum-inference/model-server model-server
docker push gcr.io/stranasum-inference/model-server


docker buildx build --platform linux/amd64 -t gcr.io/stranasum-inference/inference-server inference-server
docker push gcr.io/stranasum-inference/inference-server

```
