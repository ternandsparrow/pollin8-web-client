import Vue from 'vue'

// stub the $toast object on the server to keep our code simple
const stubbedFunctions = [
  'show',
  'info',
  'success',
  'warning',
  'error',
  'question',
]

Vue.prototype.$toast = stubbedFunctions.reduce((accum, curr) => {
  accum[curr] = function stub() {}
  return accum
}, {})
