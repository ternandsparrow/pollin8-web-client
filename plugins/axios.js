export default function ({ $axios, store }) {
  $axios.onError(err => {
    const statusCode = err.response && err.response.status
    if (statusCode === 401) {
      console.debug('Request returned 401, clearing token and retrying call without auth')
      // TODO could refresh token and try again if using the Standard Flow, not Implicit
      const msg = 'Your session has expired and you need to login again.\nClose this notification to login again.'
      store._vm.$toast.warning(msg, 'Session expired', {
        timeout: 0,
        onClosing: () => {
          store.$auth.loginWith('keycloak')
        }
      })
      return
    }
  })
}
