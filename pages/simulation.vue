<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6 class="vw-100">
      <v-card>
        <v-card-title class="display-2">Run simulation</v-card-title>
        <v-card-text>
          <p>TODO add instructions</p>
          <hr class="my-3" />
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline">Step 1: crop type</v-card-title>
        <v-card-text>
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
        <v-card-title class="headline">Step 2: farm location</v-card-title>
        <v-card-text>
          <p>TODO add instructions</p>
          <p>Feature count = {{ farmFeatureCount }}</p>
          <p8-map @change="onFarmChange" :center="mapCenter" :drawLayerColour="farmColour"></p8-map>
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline"
          >Step 3: revegtation location</v-card-title
        >
        <v-card-text>
          <p>TODO add instructions</p>
          <p>Feature count = {{ revegFeatureCount }}</p>
          <p8-map @change="onRevegChange" :center="mapCenter"
            :geojsonGuide="farmFeatureCollection"
            :drawLayerColour="revegColour" :guideLayerColour="farmColour"></p8-map>
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline">Run it!</v-card-title>
        <v-card-text>
          <p>
            Lastly, set how many years you would like to run the simulation for.
            Running for more years will take longer.
          </p>
          <v-container fluid grid-list-lg class="year-container">
            <v-layout row>
              <v-flex xs11>
                <v-slider
                  v-model="years"
                  :min="1"
                  :max="15"
                  always-dirty
                  label="Years"
                  thumb-label="always"
                ></v-slider>
              </v-flex>

              <v-flex xs1>
                <!-- FIXME add min/max validation -->
                <v-text-field
                  v-model="years"
                  class="mt-0"
                  type="number"
                  max="15"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <div class="text-center">
            <v-btn
              large
              color="primary"
              @click="doRun"
              :disabled="!isInputValid"
              >Run the simulation</v-btn
            >
          </div>
        </v-card-text>
      </v-card>
      <!-- TODO create some sort of separator here for results -->
      <v-card class="mt-4">
        <v-card-title class="headline">Results</v-card-title>
        <v-card-text>
          <p>elaspsed time = {{ elapsedMs }}</p>
          <img :src="farmRaster" />
          <img :src="revegRaster" />
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapState} from 'vuex'
import {pageTitle} from '~/util/helpers'
import P8Logging from '~/mixins/P8Logging'
import P8Map from '~/components/P8Map'

export default {
  head: pageTitle('Run simulation'),
  components: {P8Map},
  data() {
    return {
      cropTypes: [
        {code: 'apple', label: 'Apples'},
        {code: 'canola', label: 'Canola'},
        {code: 'lucerne', label: 'Lucerne'},
      ],
      // FIXME make map show features from store
      mapCenter: [-34.970635, 138.638178], // FIXME get dynamically
      farmColour: '#ff6100',
      revegColour: '#00ff9d',
    }
  },
  computed: {
    ...mapState([
      'lastRunResult',
      'farmFeatureCollection',
      'revegFeatureCollection',
    ]),
    years: {
      get() {
        return this.$store.state.years
      },
      set(v) {
        this.$store.commit('updateYears', v)
      },
    },
    cropType: {
      get() {
        return this.$store.state.cropType
      },
      set(v) {
        this.$store.commit('updateCropType', v)
      },
    },
    elapsedMs() {
      const lrr = this.lastRunResult
      if (!lrr) {
        return 0
      }
      return lrr.elapsed_ms
    },
    farmRaster() {
      const lrr = this.lastRunResult
      if (!lrr) {
        return ''
      }
      return 'data:image/png;base64,' + lrr.images.base
    },
    revegRaster() {
      const lrr = this.lastRunResult
      if (!lrr) {
        return ''
      }
      return 'data:image/png;base64,' + lrr.images.reveg
    },
    farmFeatureCount() {
      if (!this.farmFeatureCollection || !this.farmFeatureCollection.features) {
        return 0
      }
      return this.farmFeatureCollection.features.length
    },
    revegFeatureCount() {
      if (
        !this.revegFeatureCollection ||
        !this.revegFeatureCollection.features
      ) {
        return 0
      }
      return this.revegFeatureCollection.features.length
    },
    isInputValid() {
      // FIXME add validation that reveg is close enough to farm (almost touching)
      // FIXME add validation that zoom isn't too far out
      // FIXME limit drawing to the area of SA that we have a raster for
      return (
        this.years &&
        this.cropType &&
        this.farmFeatureCount &&
        this.revegFeatureCount
      )
    },
  },
  mixins: [P8Logging],
  methods: {
    async doRun() {
      try {
        await this.$store.dispatch('runSimulation')
        this.$toast.destroy() // clear existing toasts
      } catch (err) {
        const msg = 'Failed to run simulation'
        this.consoleError(msg, err)
        this.$toast.destroy() // clear existing toasts
        this.$toast.error(msg, 'Error', {timeout: 0})
      }
    },
    onFarmChange(theGeojson) {
      this.$store.commit('updateFarm', theGeojson)
      // FIXME move the reveg map to focus the farm
    },
    onRevegChange(theGeojson) {
      this.$store.commit('updateReveg', theGeojson)
    },
  },
}
</script>

<style scoped>
.year-container {
  width: 50vw;
}
</style>
