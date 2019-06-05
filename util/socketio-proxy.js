const proxy = require('http-proxy-middleware')

// We shouldn't even need to do this. We *should* be able to rely on
// nuxt-proxy by defining something like the following in nuxt.config.js:
// {
//   proxy: {
//     '/socket.io/': {
//       target: 'http://localhost:5000',
//       changeOrigin: false,
//       ws: true,
//     },
//   }
// }
// Doing that only sort of works. The proxy is proxying requests
// but the client will see "Invalid frame header" errors and the
// WebSocket connection won't work. This is a workaround (that works!).

module.exports = function buildProxyMiddleware(targetUrl) {
  const options = {
    target: targetUrl,
    changeOrigin: false,
    ws: true,
    logLevel: 'warn',
  }
  return proxy(options)
}
