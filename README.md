# Pollin8-web-client
The web client for the pollin8 service. You can access the production version at https://www.pollin8.org.au/.

## Getting started

### Requirements
 - NodeJS >= 6.10
 - Docker (optional. For testing prod build)

### Quick start
```
# clone this repo
cd pollin8-web-client/
npm install
npm run start # runs dev server
```

## Building a production release
```
cd pollin8-web-client/
./build-prod.sh
# deploy the output directory to production server
```

## Serve up the production build for testing
```
# build production build as per above
cd pollin8-web-client/
./serve-prod-build.sh
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
[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
