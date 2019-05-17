FROM node:10-alpine

ENV NODE_ENV production
ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000

COPY . /usr/src/app
WORKDIR /usr/src/app
RUN \
  NODE_ENV=notprod yarn install && \
  export API_BASE_URL='%%API_BASE_URL%%' && \
  export ROLLBAR_SERVER_TOKEN='%%ROLLBAR_SERVER_TOKEN%%' && \
  export ROLLBAR_CLIENT_TOKEN='%%ROLLBAR_CLIENT_TOKEN%%' && \
  export DEPLOYED_TO_ENV='%%DEPLOYED_TO_ENV%%' && \
  yarn build

RUN yarn cache clean

EXPOSE 3000
CMD [ "sh", "docker/entrypoint.sh" ]
