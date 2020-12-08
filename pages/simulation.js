import VueScrollTo from 'vue-scrollto'
import { mapState } from 'vuex'
import io from 'socket.io-client'
import turfArea from '@turf/area'
import turfBooleanContains from '@turf/boolean-contains'
import transformScale from '@turf/transform-scale'
import transformTranslate from '@turf/transform-translate'
import { pageTitle } from '~/util/helpers'
import P8Logging from '~/mixins/P8Logging'
import P8Map from '~/components/P8Map'
import P8ResultBlock from '~/components/P8ResultBlock'

const centre = 'centre'

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
      revegPct: 1.5,
      minRevegPct: 0.1,
      maxYears: 30,
      farmAreaKm: 0,
      farmAreaHa: 0,
      farmAreaAc: 0,
      revegPosition: centre,
      revegPositionOptions: {
        [centre]: 'Centre',
        '0': 'North',
        '45': 'North East',
        '90': 'East',
        '135': 'South East',
        '180': 'South',
        '225': 'South West',
        '270': 'West',
        '315': 'North West',
      },
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
    socket.on('sim-count', payload => {
      const count = payload.count
      console.debug(`Setting total year/sim count to ${count}`)
      this.$store.commit('setTotalSimCount', count)
    })
    socket.on('year-complete', payload => {
      console.debug('Marking another year as done', payload)
      this.$store.commit('incrementProcessedSimsCount', {})
    })
  },
  computed: {
    ...mapState([
      'lastRunResult',
      'farmFeatureCollection',
      'revegFeatureCollection',
      'processedSimsCount',
      'totalSimulationCount',
    ]),
    processedYearsPercent() {
      return (this.processedSimsCount / this.totalSimulationCount) * 100
    },
    isGatheringProcessingResults() {
      return this.processedSimsCount === this.totalSimulationCount
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
      // TODO add validation that zoom isn't too far out (i.e. shape is too large)
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
        this.$store.commit('resetProcessedSimsCount')
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
      const farmAreaMetres = turfArea(theGeojson)
      this.farmAreaHa = (farmAreaMetres / 10000).toFixed(2)
      this.farmAreaKm = (this.farmAreaHa / 10).toFixed(2)
      this.farmAreaAc = (farmAreaMetres / 4046.8564224).toFixed(2)
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
      if (
        !farmVector ||
        !(farmVector.features || []).length ||
        val < this.minRevegPct
      ) {
        this.onRevegChange(null)
        return
      }
      // the vector is scaled is both directions. If we want 50% of the area,
      // we can't just scale by 0.5 because that would work out to be
      // (0.5*0.5=0.25) 25% of the area. Square root is the answer!
      const revegScalingFactor = Math.sqrt(val / 100)
      const scaled = transformScale(farmVector, revegScalingFactor)
      const pos = this.revegPosition
      if (pos === centre) {
        this.onRevegChange(scaled)
        return
      }
      // turfjs doesn't offer a tool to move the scaled vector whilst keeping
      // it inside the farm. Computing up front seems hard so we'll just brute
      // force it by creeping up on the limit.
      const moveDistance = 50
      const directionDegrees = pos
      let isContained
      let moved = scaled
      let lastMoved
      do {
        lastMoved = moved
        moved = transformTranslate(moved, moveDistance, directionDegrees, {
          units: 'metres',
        })
        // yeah, it's O^2 but we aren't expecting big numbers
        isContained = farmVector.features.every(farmFeature =>
          moved.features.every(revegFeature =>
            turfBooleanContains(farmFeature, revegFeature),
          ),
        )
      } while (isContained)
      this.onRevegChange(lastMoved)
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
