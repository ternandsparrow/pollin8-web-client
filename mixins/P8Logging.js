// helpful functions for logging to the dev console and Sentry (if required)
// at the same time.

export default {
  methods: {
    consoleError(msg, err) {
      _consoleError(this.$sentry, msg, err)
    },
    consoleLog(msg) {
      console.log(msg)
      $sentry.withScope(scope => {
        scope.setLevel('info')
        $sentry.captureException(chainedError(msg, err))
      })
    },
    consoleWarn(msg) {
      console.warn(msg)
      $sentry.withScope(scope => {
        scope.setLevel('warning')
        $sentry.captureException(chainedError(msg, err))
      })
    },
    chainedError,
  },
}

export const consoleError = _consoleError

function _consoleError($sentry, msg, err) {
  console.error(msg, err || '(no error object passed)')
  if (!$sentry) {
    console.warn(
      'The preceeding error should be reported to Sentry but no "$sentry" ' +
        'object was present',
    )
    return
  }
  const processedError = chainedError(msg, err)
  $sentry.withScope(function(scope) {
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
      if (err.response) {
        if (err.response.data) {
          msg += `; HTTP response=${JSON.stringify(err.response.data)}`
        }
        if (err.response.status) {
          scope.setTag('http-status', err.response.status)
        }
      }
    }
    $sentry.captureException(processedError)
  })
}

function chainedError(msg, err) {
  if (!err) {
    return new Error(
      `${msg}\nWARNING: chainedError was called without an error to chain`,
    )
  }
  if (typeof err === 'object') {
    // TODO can we detect and handle a ProgressEvent and get details from
    // err.target.error.code (and lookup name of error by getting key for the
    // code on .error)
    const newMsg = `${msg}\nCaused by: ${err.message}`
    if (isImmutableError(err)) {
      // we can't construct a new DOMException because support for the
      // constructor isn't great.
      return new Error(
        newMsg +
          `\nOriginal stack (immutable original error forced ` +
          `creation of a new Error with new stack):\n${err.stack}`,
      )
    }
    try {
      err.message = newMsg
      return err
    } catch (err2) {
      // We get here by trying to modify an immutable Error. DOMException seems
      // to always be but there may be others.
      console.warn(
        `While handling the first error:\n` +
          `  [name=${err.name}, type=${
            (err.constructor || {}).name
          }] ${err.message || '(no message)'}\n` +
          `encountered this error:\n` +
          `  ${err2.message}\n` +
          `but we're working around it! Bubbling original error now.`,
      )
      return new Error(
        newMsg +
          `\nOriginal stack (readonly Error.message forced ` +
          `creation of a new Error with new stack):\n${err.stack}`,
      )
    }
  }
  return new Error(`${msg}\nCaused by: ${err}`)
}

function isImmutableError(err) {
  return self.DOMException && err instanceof DOMException
}
