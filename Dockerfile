FROM node:10
MAINTAINER SkyLightQP <me@skylightqp.kr>

EXPOSE 80

WORKDIR /
COPY / /

RUN npm install -g typescript ts-loader
RUN npm install

VOLUME ["/src/server/config"]

CMD ["bash", "run.sh"]