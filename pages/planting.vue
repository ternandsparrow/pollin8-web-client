<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6 class="vw-100">
      <v-card>
        <v-card-title class="display-2">Planting Guide for Native Bees</v-card-title>
        <v-card-text>
          <p>This Planting guide can be used to work out what plants you should consider planting (to help native bees) and where.  Developed by Nick Gellie.</p>
          <p>TODO - write some more.  This is more..</p>
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline">Food for Native bees in the Adelaide and Mount Lofty Ranges Region</v-card-title>
        <v-card-text>
          <p>Developed by Katja Hogendoorn<p/>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { pageTitle } from '~/util/helpers'

export default {
  head: pageTitle('Planting Guide'),
}
</script>

<style scoped>
</style>
