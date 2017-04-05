# Pollin8-web-client
[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Getting started
```
# clone this repo
cd pollin8-web-client
npm install
npm run start # runs dev server
```

## Building a production release
```
npm run build
# deploy the target/ dir
```

## Serve up the /target folder to test the production build (requires docker)
```
docker run -v $(pwd)/target:/usr/share/nginx/html:ro --rm -p 8080:80 nginx
```
