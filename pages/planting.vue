<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6 class="vw-100">
      <v-card class="mt-4">
        <v-card-title class="headline">Step 1: Region</v-card-title>
        <v-card-text>
          <p>In which of these regions do you plan to grow some re-veg?</p>
          <v-radio-group v-model="cropType" :mandatory="true">
            <v-radio
              v-for="curr in cropTypes"
              :key="curr.code"
              :label="curr.label"
              :value="curr.code"
            >
            </v-radio>
          </v-radio-group>
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline">Step 2: XXXX</v-card-title>
        <v-card-text>
          <p>In which of these regions do you plan to grow some re-veg?</p>
          <v-radio-group v-model="cropType" :mandatory="true">
            <v-radio
              v-for="curr in cropTypes"
              :key="curr.code"
              :label="curr.label"
              :value="curr.code"
            >
            </v-radio>
          </v-radio-group>
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline">Step 3: YYY</v-card-title>
        <v-card-text>
          <p>In which of these regions do you plan to grow some re-veg?</p>
          <v-radio-group v-model="cropType" :mandatory="true">
            <v-radio
              v-for="curr in cropTypes"
              :key="curr.code"
              :label="curr.label"
              :value="curr.code"
            >
            </v-radio>
          </v-radio-group>
        </v-card-text>
      </v-card>      
      <v-card>
        <v-card-title class="display-2">Planting Guide for Native Bees</v-card-title>
        <v-card-text>
          <p>This Planting guide can be used to work out what plants you should consider planting (to help native bees) and where.</p>
           <div>
            <pdf
              v-for="i in numPages"
              :key="i"
              :src="src"
              :page="i"
              style="height: 100%"
        		></pdf>
           </div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
import { pageTitle } from '~/util/helpers'
import pdf from 'vue-pdf'

var loadingTask = pdf.createLoadingTask('./planting/SL_TSBF.pdf');

export default {
  head: pageTitle('Planting Guide'),
  components: {
    pdf
  },
  data() {
    return {
      src: loadingTask,
      currentPage: 0,
      pageCount: 0,
      numPages: undefined,
      cropTypes: [
        {code: 'SML', label: 'Southern Mount Lofty'},
        {code: 'canola', label: 'Canola'},
        {code: 'lucerne', label: 'Lucerne'},
      ]
    }
  },
  mounted() {
    this.src.then(pdf => {
      this.numPages = pdf.numPages;
      });
    }
}
</script>

<style scoped>
</style>
