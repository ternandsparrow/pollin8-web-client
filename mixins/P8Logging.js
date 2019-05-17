// helpful functions for logging to the dev console and rollbar (if required) at the same time.

export default {
  methods: {
    consoleError (msg, err) {
      _consoleError(this.rollbar, msg, err)
    },
    consoleLog (msg) {
      this.rollbar.log(msg)
      console.log(msg)
    },
    consoleWarn (msg) {
      this.rollbar.warn(msg)
      console.warn(msg)
    },
    chainedError (err, msg) {
      err.message = `${msg}\nCaused by: ${err.message}`
      return err
    },
  }
}

export const consoleError = _consoleError

function _consoleError (rollbar, msg, err) {
  if (err) {
    if (err.config) {
      if (err.config.data) {
        msg += `; HTTP request body=${err.config.data}`
      }
      if (err.config.url) {
        msg += `; HTTP request url=${err.config.url}`
      }
      if (err.config.headers) {
        msg += `; HTTP request headers=${JSON.stringify(err.config.headers)}`
      }
    }
    if (err.response && err.response.data) {
      msg += `; HTTP response=${JSON.stringify(err.response.data)}`
    }
  }
  if (rollbar) {
    rollbar.error(msg, err)
  } else { // FIXME why isn't it there? We want it to be!
    console.warn('The following error should be reported to Rollbar but no "rollbar" object was present')
  }
  console.error(msg, err)
  // TODO consider firing a toast here
}
