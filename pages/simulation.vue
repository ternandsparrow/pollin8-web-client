<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6 class="vw-100">
      <v-card>
        <v-card-title class="display-2">Run simulation</v-card-title>
        <v-card-text>
          <p>Here you can run a simulation to see the effect pollinator
            friendly revegtation will have on your crop. Fill in the required
            data at each step and press the run button at the end of this
            page.</p>
          <p>Feel free to tweak the inputs and re-run the simulation as many
            times as needed.</p>
          <hr class="my-3" />
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline">Step 1: crop type</v-card-title>
        <v-card-text>
          <p>What type of crop are you growing?</p>
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
          <p>We need to know where you farm is located.</p>
          <p>Move the map until you can see your farm. Then use the drawing
            tools (rectangle or polygon) in the top left of the map window to
            draw around the border of your farm on the map.</p>
          <p>If you farm is not one continuous shape, you can draw multiple
            shapes to capture the whole property.<br /><br />
            There are also controls to edit or delete existing shapes.</p>
          <p8-map
            @change="onFarmChange"
            :center="mapCenter"
            :drawLayerColour="farmColour"
            :initialDrawValue="farmFeatureCollection"
          ></p8-map>
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline"
          >Step 3: revegtation location</v-card-title
        >
        <v-card-text>
          <p>This step is very similar to the previous but the difference is
            that you're drawing <strong>where you will be planting the
              revegetation area</strong>. You'll be able to see where you drew
            the farm in the previous step as a guide for drawing the reveg.</p>
          <p>Note: you cannot edit the farm here. If you need to make a change
          to the farm shape, go back to the previous step and edit it there.</p>
          <p8-map
            @change="onRevegChange"
            :center="mapCenter"
            :geojsonGuide="farmFeatureCollection"
            :initialDrawValue="revegFeatureCollection"
            :drawLayerColour="revegColour"
            :guideLayerColour="farmColour"
          ></p8-map>
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline">Run it!</v-card-title>
        <v-card-text>
          <p>
            Lastly, set how many years you would like to run the simulation for
            (how many years to predict into the future). Running for more
            years will take longer.
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
      <v-card class="mt-4" v-if="isShowResultSection">
        <v-card-title class="display-2 text-center">Results</v-card-title>
        <v-card-text v-if="isShowLoading">
          <v-progress-linear :indeterminate="true"></v-progress-linear>
        </v-card-text>
        <v-card-text v-if="isShowError" class="text-center">
          <b-alert show variant="danger">
            Failed while running the simulation
            <!-- FIXME add something more to help user here -->
          </b-alert>
        </v-card-text>
        <v-card-text v-if="isShowChart">
          <div class="headline">Season: spring</div>
          <p8-line-chart :chartdata="springChartData"></p8-line-chart>
          <div class="headline mt-3">Season: summer</div>
          <p8-line-chart :chartdata="summerChartData"></p8-line-chart>
          <p class="text-right">
            <small class="text-muted">Elaspsed time: {{ elapsedMs }}ms</small>
          </p>
          <p>Further reading on interpreting these results <a
            href="http://data.naturalcapitalproject.org/nightly-build/invest-users-guide/html/croppollination.html#final-results"
            target="_blank">in the NatCap InVEST documentation</a>.</p>
          <p class="text-muted"><small @click="isShowRaster = true"
              v-if="!isShowRaster">Show clipped raster</small></p>
          <div v-if="isShowRaster">
            <!-- FIXME probably get rid of these (and add a flag to opt-out of them) -->
            <img :src="farmRaster" />
            <img :src="revegRaster" />
          </div>
          <!-- FIXME add data table -->
        </v-card-text>
      </v-card>
    </v-flex>
    <div id="bottom"></div>
  </v-layout>
</template>

<script>
import VueScrollTo from 'vue-scrollto'
import {mapState} from 'vuex'
import {pageTitle} from '~/util/helpers'
import P8Logging from '~/mixins/P8Logging'
import P8Map from '~/components/P8Map'
import P8LineChart from '~/components/P8LineChart'


export default {
  head: pageTitle('Run simulation'),
  components: {P8Map, P8LineChart},
  data() {
    return {
      isShowRaster: false,
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
      // FIXME validate that reveg doesn't overlap farm (or can it? It works
      // and will steamroll the farm - like you'd expect)
      return (
        this.years &&
        this.cropType &&
        this.farmFeatureCount &&
        this.revegFeatureCount
      )
    },
    springChartData() {
      if (!this.lastRunResult) {
        return {}
      }
      return buildSeasonChartData('spring', this.lastRunResult.records)
    },
    summerChartData() {
      if (!this.lastRunResult) {
        return {}
      }
      return buildSeasonChartData('summer', this.lastRunResult.records)
    },
    isShowChart() {
      return this.$store.state.simulationState === 'success'
    },
    isShowLoading() {
      return this.$store.state.simulationState === 'processing'
    },
    isShowError() {
      return this.$store.state.simulationState === 'failed'
    },
    isShowResultSection() {
      return this.isShowChart || this.isShowLoading || this.isShowError
    },
  },
  mixins: [P8Logging],
  methods: {
    async doRun() {
      try {
        this.$store.dispatch('runSimulation')
        this.$toast.destroy() // clear existing toasts
        setTimeout(() => {
          VueScrollTo.scrollTo('#bottom', 1000)
        }, 1000)
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

function buildDataset(label, data, colour) {
  return {
    label,
    data,
    borderWidth: 1,
    borderColor: colour,
    pointBackgroundColor: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
  }
}

function buildSeasonChartData(season, records) {
  const recordsForThisSeason = records.filter(
    (e) => e.season === season,
  )
  return {
    labels: recordsForThisSeason.map((e) => e.year),
    datasets: [
      // FIXME handle multiple features
      buildDataset(
        'Total yield index (y_tot)',
        recordsForThisSeason.map((e) => e.y_tot),
        '#FC2525',
      ),
      buildDataset(
        'Index of total yield attributable to wild pollinators (y_wild)',
        recordsForThisSeason.map((e) => e.y_wild),
        '#05CBE1',
      ),
      buildDataset(
        'Average pollinator abundance on farm (p_abund)',
        recordsForThisSeason.map((e) => e.p_abund),
        '#E15D05',
      ),
      buildDataset(
        'Index of potential pollination dependent yield attributable to wild pollinators (pdep_y_w)',
        recordsForThisSeason.map((e) => e.pdep_y_w),
        '#3105E1',
      ),
    ],
  }
}
</script>

<style scoped>
.year-container {
  width: 50vw;
}
</style>
