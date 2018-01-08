FROM node:8.6.0

ADD . /app
WORKDIR /app/service

RUN npm i

EXPOSE 3000

ENTRYPOINT ["node", "index"]

