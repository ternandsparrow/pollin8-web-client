import { consoleError } from '~/mixins/P8Logging'

export const state = () => ({
  isProd: false,
  lastRunResult: null,
  years: 25,
  varroaYear: 7,
  cropType: 'apple',
  farmFeatureCollection: null,
  revegFeatureCollection: null,
  simulationState: 'initial',
  socketioSid: null,
  processedSimsCount: 0,
  totalSimulationCount: 0,
  // Nick's Planting Selector
  // FIXME - get these defaults from a managed datastructure
  agSettingType: 'SL',
  applicationType: 'Standard_tube',
  ecosystemServiceType: [],
  plantingAdviceResult: null,
})

export const mutations = {
  updateIsProd: function(state, isIt) {
    state.isProd = isIt
  },
  updateRunResult: function(state, data) {
    state.lastRunResult = data
  },
  updateFarm: function(state, data) {
    state.farmFeatureCollection = data
  },
  updateReveg: function(state, data) {
    state.revegFeatureCollection = data
  },
  updateCropType: function(state, data) {
    state.cropType = data
  },
  updateYears: function(state, data) {
    state.years = data
  },
  updateVarroaYear: function(state, data) {
    state.varroaYear = data
  },
  updateSimState: function(state, data) {
    state.simulationState = data
  },
  updateSocketioSid: function(state, data) {
    state.socketioSid = data
  },
  incrementProcessedSimsCount: function(state) {
    state.processedSimsCount += 1
  },
  resetProcessedSimsCount: function(state) {
    state.processedSimsCount = 0
  },
  setTotalSimCount: function(state, val) {
    state.totalSimulationCount = val
  },
  resetTotalSimCount: function(state) {
    state.totalSimulationCount = 0
  },
  // Nick's Plant Selector
  updateAgSettingType: function(state, data) {
    state.agSettingType = data
  },
  updateApplicationType: function(state, data) {
    state.applicationType = data
  },
  updateEcosystemServiceType: function(state, data) {
    state.ecosystemServiceType = data
  },
  plantingAdviceResult: function(state, data) {
    state.plantingAdviceResult = data
  },
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }) {
    const isProd = this.$env.DEPLOYED_TO_ENV === 'production'
    commit('updateIsProd', isProd)
  },

  async runSimulation({ commit, state }) {
    commit('updateSimState', 'processing')
    commit('resetTotalSimCount')
    const postBody = {
      crop_type: state.cropType,
      years: state.years,
      varroa_mite_year: state.varroaYear,
      farm: state.farmFeatureCollection,
      reveg: state.revegFeatureCollection,
      socketio_sid: state.socketioSid,
    }
    try {
      commit('updateRunResult', null)
      const { data } = await this.$axios.post(`pollination`, postBody)
      commit('updateRunResult', data)
      commit('updateSimState', 'success')
    } catch (err) {
      commit('updateSimState', 'failed')
      consoleError(
        this.$sentry,
        `Failed to run simulation with model=${JSON.stringify(postBody)}`,
        err,
      )
    }
  },
}
