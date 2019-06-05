import VueScrollTo from 'vue-scrollto'
import {mapState} from 'vuex'
import io from 'socket.io-client'
import {pageTitle} from '~/util/helpers'
import P8Logging from '~/mixins/P8Logging'
import P8Map from '~/components/P8Map'
import P8ResultBlock from '~/components/P8ResultBlock'

export default {
  head: pageTitle('Run simulation'),
  components: {P8Map, P8ResultBlock},
  data() {
    return {
      // processedYearsCount: 0,
      isShowRaster: false,
      cropTypes: [
        {code: 'apple', label: 'Apples'},
        {code: 'canola', label: 'Canola'},
        {code: 'lucerne', label: 'Lucerne'},
      ],
      minZoom: 8,
      mapBounds: this.$L.latLngBounds(
        // FIXME set based on user location?
        this.$L.latLng(-34.958, 138.574),
        this.$L.latLng(-35.012, 138.735),
      ),
      // These bounds are manually copied from the Landcover raster on the
      // server. Ideally we would read these dyanmically from the server.
      // Let's call that a TODO item.
      maxMapBounds: this.$L.latLngBounds(
        this.$L.latLng(-38.1693392, 134.6313833),
        this.$L.latLng(-32.2179644, 140.626525),
      ),
      farmColour: '#ff6100',
      revegColour: '#00ff9d',
    }
  },
  mounted() {
    // FIXME don't connect for SSR
    const socket = io('http://localhost:5000') // FIXME try to get nuxt-proxy working
    socket.on('connect', () => {
      const sid = socket.id
      console.debug(`socket connected! SID='${sid}'`)
      this.$store.commit('updateSocketioSid', sid)
    })
    socket.on('year-complete', (payload) => {
      console.log('Marking another year as done', payload)
      // this.processedYearsCount += 1
      this.$store.commit('incrementProcessedYearsCount', {})
    })
  },
  computed: {
    ...mapState([
      'lastRunResult',
      'farmFeatureCollection',
      'revegFeatureCollection',
      'processedYearsCount',
    ]),
    totalYearsToProcess() {
      return this.years + 1
    },
    processedYearsPercent() {
      return (this.processedYearsCount / this.totalYearsToProcess) * 100
    },
    isGatheringProcesingResults() {
      return this.processedYearsCount === this.totalYearsToProcess
    },
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
    lastRunResultRecords() {
      if (!this.lastRunResult) {
        return []
      }
      return this.lastRunResult.records
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
        // this.processedYearsCount = 0
        this.$store.commit('resetProcessedYearsCount', {})
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
    },
    onRevegChange(theGeojson) {
      this.$store.commit('updateReveg', theGeojson)
    },
    onMapMove(latLngBounds) {
      this.mapBounds = latLngBounds
    },
  },
}
