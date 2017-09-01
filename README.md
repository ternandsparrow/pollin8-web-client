# Pollin8-web-client
The web client for the pollin8 service. You can access the production version at https://www.pollin8.org.au/.

Pollin8 is a web app to help Australian farmers see the impact of changes to pollinator populations over the next 10 years. It asks the user a few questions and then calculates the impact for them under a number of different scenarios, e.g: Veroa mite coming to Australia or adding a patch of pollinator friendly plants to their land.

## Getting started

### Requirements
 - NodeJS >= 7
 - [yarn](https://yarnpkg.com/en/)

### Dev quick start
```
# clone this repo
cd pollin8-web-client/
yarn
ng serve # open http://localhost:4200 in browser
```

## Building a production release
```
cd pollin8-web-client/
ng build -prod
# build will be in dist/
```

## Building AND deploying a production release
```
cd pollin8-web-client/
./aws-deploy-prod.sh # builds and deploys
```
