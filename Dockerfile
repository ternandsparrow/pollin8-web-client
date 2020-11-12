FROM node:12-alpine

ENV NODE_ENV=production \
    NUXT_HOST=0.0.0.0 \
    NUXT_PORT=3000

COPY . /usr/src/app
WORKDIR /usr/src/app
RUN sh docker/setup.sh

RUN yarn cache clean

EXPOSE 3000
CMD [ "sh", "docker/entrypoint.sh" ]
