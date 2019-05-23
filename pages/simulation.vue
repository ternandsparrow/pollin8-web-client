<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
      class="vw-100"
    >
    <v-card>
        <v-card-title class="display-2">Run simulation</v-card-title>
        <v-card-text>
          <p>TODO add instructions</p>
          <hr class="my-3">
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline">Step 1: crop type</v-card-title>
        <v-card-text>
          <p>TODO add instructions</p>
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline">Step 2: farm location</v-card-title>
        <v-card-text>
          <p>TODO add instructions</p>
          <p>Feature count = {{farmFeatureCount}}</p>
          <p8-map @change="onFarmChange" :center="mapCenter"></p8-map>
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline">Step 3: revegtation location</v-card-title>
        <v-card-text>
          <p>TODO add instructions</p>
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline">Run it!</v-card-title>
        <v-card-text>
          <v-btn large color="primary" @click="doRun">Run the simulation</v-btn>
        </v-card-text>
      </v-card>
      <!-- TODO create some sort of separator here for results -->
      <v-card class="mt-4">
        <v-card-title class="headline">Results</v-card-title>
        <v-card-text>
          <p>elaspsed time = {{elapsedMs}}</p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import { pageTitle } from '~/util/helpers'
import P8Logging from '~/mixins/P8Logging'
import P8Map from '~/components/P8Map'

export default {
  head: pageTitle('Run simulation'),
  components: { P8Map },
  data () {
    return {
      farmGeojson: null,
      mapCenter: [-34.970635, 138.638178], // FIXME get dynamically
    }
  },
  computed: {
    ...mapState(['lastRunResult']),
    elapsedMs () {
      const lrr = this.lastRunResult
      if (!lrr) {
        return 0
      }
      return lrr.elapsed_ms
    },
    farmFeatureCount () {
      if (!this.farmGeojson || !this.farmGeojson.features) {
        return 0
      }
      return this.farmGeojson.features.length
    },
  },
  mixins: [P8Logging],
  methods: {
    async doRun () {
      try {
        await this.$store.dispatch('runSimulation')
      } catch (err) {
        const msg = 'Failed to run simulation'
        this.consoleError(msg, err)
        this.$toast.error(msg, 'Error', { timeout: 0 })
      }
    },
    onFarmChange (farmGeojson) {
      this.farmGeojson = farmGeojson
    },
  },
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
