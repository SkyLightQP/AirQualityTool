FROM node:10
MAINTAINER SkyLightQP <me@skylightqp.kr>

EXPOSE 80

WORKDIR /
COPY / /

RUN npm install typescript ts-loader
RUN npm install

VOLUME ["/src/server/config.ts"]

CMD ["bash", "run.sh"]