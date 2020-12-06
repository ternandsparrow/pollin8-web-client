import VueScrollTo from 'vue-scrollto'
import { mapState } from 'vuex'
import io from 'socket.io-client'
import transformScale from '@turf/transform-scale'
import { pageTitle } from '~/util/helpers'
import P8Logging from '~/mixins/P8Logging'
import P8Map from '~/components/P8Map'
import P8ResultBlock from '~/components/P8ResultBlock'

export default {
  head: pageTitle('Run simulation'),
  name: 'Simulation',
  components: { P8Map, P8ResultBlock },
  data() {
    return {
      isShowRaster: false,
      cropTypes: [
        { code: 'apple', label: 'Apples' },
        { code: 'canola', label: 'Canola' },
        { code: 'lucerne', label: 'Lucerne' },
      ],
      minZoom: 8,
      mapBounds: buildLatLngBounds(
        this.$L,
        // FIXME set based on user location?
        { lat: -34.958, lng: 138.574 },
        { lat: -35.012, lng: 138.735 },
      ),
      maxMapBounds: buildLatLngBounds(
        // These bounds are manually copied from the Landcover raster on the
        // server. Ideally we would read these dyanmically from the server.
        // Let's call that a TODO item.
        this.$L,
        { lat: -38.1693392, lng: 134.6313833 },
        { lat: -32.2179644, lng: 140.626525 },
      ),
      farmColour: '#ff6100',
      revegColour: '#00ff9d',
      revegPct: 1,
      minRevegPct: 0.1,
      maxYears: 30,
    }
  },
  watch: {
    years(newVal) {
      if (newVal <= this.varroaYear) {
        this.varroaYear = newVal - 1
      }
    },
    varroaYear(newVal) {
      if (newVal >= this.years) {
        this.years = newVal + 1
      }
    },
  },
  mounted() {
    const socket = io()
    socket.on('connect', () => {
      const sid = socket.id
      console.debug(`socket connected! SID='${sid}'`)
      this.$store.commit('updateSocketioSid', sid)
    })
    socket.on('year-complete', payload => {
      console.debug('Marking another year as done', payload)
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
    isGatheringProcessingResults() {
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
    varroaYear: {
      get() {
        return this.$store.state.varroaYear
      },
      set(v) {
        this.$store.commit('updateVarroaYear', v)
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
      // FIXME add validation that zoom isn't too far out (i.e. shape is too large)
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
    revegPctErrorMsg() {
      const v = this.revegPct
      if (v >= this.minRevegPct) {
        return null
      }
      return `Reveg percentage must be greater than ${this.minRevegPct}`
    },
  },
  mixins: [P8Logging],
  methods: {
    async doRun() {
      const clearExistingToasts = () => {
        this.$toast.destroy()
      }
      try {
        this.$store.commit('resetProcessedYearsCount', {})
        this.$store.dispatch('runSimulation')
        clearExistingToasts()
        setTimeout(() => {
          VueScrollTo.scrollTo('#bottom', 1000)
        }, 1000)
      } catch (err) {
        const msg = 'Failed to run simulation'
        this.consoleError(msg, err)
        clearExistingToasts()
        this.$toast.error(msg, 'Error', { timeout: 0 })
      }
    },
    onFarmChange(theGeojson) {
      this.$store.commit('updateFarm', theGeojson)
      this.onSetScaledReveg()
    },
    onRevegChange(theGeojson) {
      this.$store.commit('updateReveg', theGeojson)
    },
    onMapMove(latLngBounds) {
      this.mapBounds = latLngBounds
    },
    onSetScaledReveg() {
      const farmVector = this.farmFeatureCollection
      const val = this.revegPct
      if (!farmVector || val < this.minRevegPct) {
        return
      }
      // the vector is scaled is both directions. If we want 50% of the area,
      // we can't just scale by 0.5 because that would work out to be
      // (0.5*0.5=0.25) 25% of the area. Square root is the answer!
      const revegScalingFactor = Math.sqrt(val / 100)
      const scaled = transformScale(farmVector, revegScalingFactor)
      this.onRevegChange(scaled)
    },
  },
}

function buildLatLngBounds(L, sw, ne) {
  if (L) {
    // there's a race condition here, L isn't always defined
    return L.latLngBounds(L.latLng(sw.lat, sw.lng), L.latLng(ne.lat, ne.lng))
  }
  console.debug("this.$L let us down. It's hard to find good help")
  return {
    _southWest: { lat: sw.lat, lng: sw.lng },
    _northEast: { lat: ne.lat, lng: ne.lng },
  }
}
