<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6 class="vw-100">
      <v-card>
        <v-card-title class="display-2">Planting Guide for Native Bees</v-card-title>
        <v-card-text>
          <p>This Planting guide can be used to work out what plants you should consider planting (to help native bees) and where.</p>
          <pdf src="./planting/SL_TSBF.pdf"></pdf>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
import { pageTitle } from '~/util/helpers'
import pdf from 'vue-pdf'

export default {
  head: pageTitle('Planting Guide'),
  components: {
    pdf
  }
}
</script>

<style scoped>
</style>
