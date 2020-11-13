<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6 class="vw-100">
      <v-card>
        <v-card-title class="display-2"
          >Food for Native bees in the Adelaide and Mount Lofty Ranges
          Region</v-card-title
        >
        <v-card-text>
          <p>Developed by Katja Hogendoorn.</p>
          <p />
          <client-only>
            <vuePdf src="/flowering/plants.pdf"></vuePdf>
          </client-only>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { pageTitle } from '~/util/helpers'
let vuePdf
if (process.browser) {
  vuePdf = require('vue-pdf').default
}
export default {
  components: {
    vuePdf,
  },
  head: pageTitle('Planting Guide'),
}
</script>

<style scoped></style>
