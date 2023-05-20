docker buildx build --platform linux/amd64 -t gcr.io/stranasum-inference/inference-server -f inference-server/Dockerfile.cloud inference-server
docker push gcr.io/stranasum-inference/inference-server

docker buildx build --platform linux/amd64 -t gcr.io/stranasum-inference/model-server model-server
docker push gcr.io/stranasum-inference/model-server

