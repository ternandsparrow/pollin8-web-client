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

## Adding/Updating Swagger UI to the project
Follow instructions at https://cloud.google.com/endpoints/docs/adding-swagger

Basically:
```
git clone https://github.com/swagger-api/swagger-ui.git
cp -R swagger-ui/dist /your/project/docs
#update index.html with url="your url"
#update the app config to serve up swagger.json and the docs/ dir statically
```
