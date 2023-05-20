docker buildx build --platform linux/amd64 -t gcr.io/stranasum-inference/model-server model-server/Dockerfile
docker push gcr.io/stranasum-inference/model-server
docker buildx build --platform linux/amd64 -t gcr.io/stranasum-inference/inference-server inference-server/Dockerfile.cloud
docker push gcr.io/stranasum-inference/inference-server
