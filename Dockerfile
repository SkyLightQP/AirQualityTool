FROM node:10

EXPOSE 80

COPY / /workspace
WORKDIR /workspace

RUN npm install

VOLUME ["/src/server/config"]

CMD ["bash", "run.sh"]