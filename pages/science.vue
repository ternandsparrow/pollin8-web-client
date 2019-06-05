<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6 class="vw-100">
      <v-card>
        <v-card-title class="display-2">About the science</v-card-title>
        <v-card-text>
          <p>Built on the <a
            href="https://naturalcapitalproject.stanford.edu/invest/">NatCap
            InVEST</a> software.</p>
          <p>TODO - write some more</p>
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline">Revegetation curve</v-card-title>
        <v-card-text>
          <p>This is the curve that we use to model how revegetation progresses over the years.</p>
          <img src="/reveg-curve.png?years=25" />
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { pageTitle } from '~/util/helpers'

export default {
  head: pageTitle('About the science'),
}
</script>

<style scoped>
</style>
