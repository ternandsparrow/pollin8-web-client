export const state = () => ({
  isProd: false,
  lastRunResult: null,
  years: 3,
  cropType: 'apple',
  farmFeatureCollection: null,
  revegFeatureCollection: null,
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
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({commit}, {}) {
    const isProd = this.$env.DEPLOYED_TO_ENV === 'production'
    commit('updateIsProd', isProd)
  },

  async runSimulation({commit, state}) {
    const postBody = {
      crop_type: state.cropType,
      years: state.years,
      farm: state.farmFeatureCollection,
      reveg: state.revegFeatureCollection,
    }
    commit('updateRunResult', null)
    const {data} = await this.$axios.post(`pollination`, postBody)
    commit('updateRunResult', data)
    // FIXME loading bar doesn't stay visible for whole time
  },
}
