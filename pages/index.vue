<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">Welcome to Pollin8</v-card-title>
        <v-card-text>
          <p>
            A tool to run simulations on revegetating the area around your farm
            to support pollinators and how that affects your crop.
          </p>
          <p>
            Built on the
            <a href="https://naturalcapitalproject.stanford.edu/invest/"
              >NatCap InVEST</a
            >
            software. Specifically
            <a
              href="https://github.com/ternandsparrow/natcap-invest-docker-flask"
              >our wrapper</a
            >
            around the InVEST model.
          </p>
          <p>
            To perform a simulation, use the
            <nuxt-link to="/simulation">Run simulation</nuxt-link> item from the
            menu. The menu will appear on the left for larger screens and on
            smaller ones, use the menu button in the top left of the page.
          </p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { pageTitle } from '~/util/helpers'

export default {
  head: pageTitle('Welcome'),
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
