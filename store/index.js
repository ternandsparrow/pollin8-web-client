import {consoleError} from '~/mixins/P8Logging'

export const state = () => ({
  isProd: false,
  lastRunResult: null,
  years: 3,
  cropType: 'apple',
  farmFeatureCollection: null,
  revegFeatureCollection: null,
  simulationState: 'initial',
  socketioSid: null,
  processedYearsCount: 0,
  // Nick's Planting Selector
  agSettingType: 'SL',
  applicationType: 'LT2HA',
  ecosystemServiceType: 'DR',
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
  updateSimState: function(state, data) {
    state.simulationState = data
  },
  updateSocketioSid: function(state, data) {
    state.socketioSid = data
  },
  incrementProcessedYearsCount: function(state) {
    state.processedYearsCount += 1
  },
  resetProcessedYearsCount: function(state) {
    state.processedYearsCount = 0
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
  nuxtServerInit({commit}, {}) {
    const isProd = this.$env.DEPLOYED_TO_ENV === 'production'
    commit('updateIsProd', isProd)
  },

  async runSimulation({commit, state}) {
    commit('updateSimState', 'processing')
    const postBody = {
      crop_type: state.cropType,
      years: state.years,
      farm: state.farmFeatureCollection,
      reveg: state.revegFeatureCollection,
      socketio_sid: state.socketioSid,
    }
    try {
      commit('updateRunResult', null)
      const {data} = await this.$axios.post(`pollination`, postBody)
      commit('updateRunResult', data)
      commit('updateSimState', 'success')
    } catch (err) {
      commit('updateSimState', 'failed')
      consoleError(
        this.rollbar,
        `Failed to run simulation with model=${JSON.stringify(postBody)}`,
        err,
      )
    }
  },

}
