FROM node:alpine

RUN apk add g++ make py3-pip

COPY . .

RUN npm ci
EXPOSE 1234

CMD ["npm", "run", "start"]
