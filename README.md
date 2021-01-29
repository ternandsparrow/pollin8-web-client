> Web client for the Pollin8 engine (which runs simulations of revegetation
> effects on pollinators)

This is only the frontend/UI. The simulation is run on the backend:
[natcap-invest-docker-flask](https://github.com/ternandsparrow/natcap-invest-docker-flask).

## Quickstart for local dev

  1. ensure you have the required toolchain: `yarn 1.15`, `nodejs 10.x`, `docker
     19.x`, `docker-compose 1.24`
  1. clone the repo
  1. install the dependencies

         yarn install

  1. copy the runner script (a thin wrapper that sets some env vars) and make
     changes to the vars if needed

         cp local-dev.sh.example local-dev.sh
         chmod +x local-dev.sh
         vim local-dev.sh

  1. serve with hot reload at localhost:3000

         ./local-dev.sh

## Running with Docker in production

  1. clone the repo
  1. copy the runner script

         cp start-or-restart-stack.sh.example start-or-restart-stack.sh
         chmod +x start-or-restart-stack.sh

  1. edit the runner script `start-or-restart-stack.sh` to define the needed
     sensitive environmental variables

         vim start-or-restart-stack.sh

  1. start the stack

         ./start-or-restart-stack.sh
         # or if you need to force a rebuild of the app
         ./start-or-restart-stack.sh --build


## Debugging

We use Ava for testing, so following their
[advice](https://github.com/avajs/ava/blob/master/docs/recipes/debugging-with-chrome-devtools.md):
```bash
yarn global add inspect-process
# edit your code to add a 'debugger' statement
inspect node_modules/ava/profile.js test/specs/welcome.test.js
```

This is a pretty good experience as it will launch the Chrome window for you
and you don't have to mess with breaking at the start of a run when the script
you care about isn't loaded, or deal with forking processes for tests.

## Architecture
TODO add reasoning.

  - VueJS
  - Nuxt.js
  - Docker
  - docker-compose
  - Vuetify *and* Bootstrap-vue, so we have the best of both
