import Vue from 'vue'
import { consoleError } from '~/mixins/P8Logging'

Vue.config.errorHandler = function (err, vm) {
  const msg = 'Caught an error in Vue global error handler'
  const consoleErrorFn = vm.consoleError // pulling from the P8Logging mixin
  if (consoleErrorFn) { // FIXME does this work?
    consoleErrorFn(msg, err)
    return
  }
  const rollbar = vm.rollbar // mixin wasn't present, so go direct
  if (rollbar) { // FIXME does this work?
    consoleError(rollbar, msg, err)
    return
  }
  // no rollbar is available, all we have left is the console :'(
  console.error('Could not find Rollbar, so logging to console as last ditch effort: ' + msg, err)
  // TODO should we throw something up to the user here? A toast maybe?
}
