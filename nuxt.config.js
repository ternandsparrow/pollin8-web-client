const pkg = require('./package')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const buildProxyMiddleware = require('./util/socketio-proxy')

const isRollbarEnabled = process.env.NODE_ENV === 'production'
if (!isRollbarEnabled) {
  console.log(
    `[INFO] Rollbar is disabled because process.env.NODE_ENV=${
      process.env.NODE_ENV
    } (not 'production')`,
  )
}

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: pkg.description},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
      },
    ],
    debug: true
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {color: '#333'},

  /*
   ** Global CSS
   */
  css: ['~/assets/style/app.styl'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/vuetify',
    '~/plugins/GlobalErrorHandler',
    {src: '~/plugins/VueNotifications.client', mode: 'client'},
    {src: '~/plugins/VueNotifications.server', mode: 'server'},
    { src: `~plugins/vimeo-player`, ssr: false },
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'nuxt-leaflet',
    'vue-scrollto/nuxt',
    [
      'nuxt-env',
      {
        keys: [
          {key: 'API_BASE_URL', default: getRequiredEnvVar('API_BASE_URL')},
          {key: 'DEPLOYED_TO_ENV', default: getDeployedToEnv()},
        ],
      },
    ],
    [
      'nuxt-rollbar-module',
      {
        serverAccessToken: isRollbarEnabled
          ? getRequiredEnvVar('ROLLBAR_SERVER_TOKEN')
          : '(not set)', // uses post_server_item token
        clientAccessToken: isRollbarEnabled
          ? getRequiredEnvVar('ROLLBAR_CLIENT_TOKEN')
          : '(not set)', // uses post_client_item token
        config: {
          environment: getDeployedToEnv(),
          captureUncaught: true,
          captureUnhandledRejections: true,
          enabled: isRollbarEnabled,
        },
      },
    ],
  ],

  axios: {
    proxy: true,
    prefix: '/api/',
  },

  proxy: {
    '/api/': {
      target: getRequiredEnvVar('API_BASE_URL'),
      pathRewrite: {'^/api/': ''},
    },
    // we should be able to proxy /socket.io/ here but I couldn't
    // get it to work without seeing "Invalid frame header" errors
    // in the client. So we register our own serverMiddleware below.
    '/reveg-curve.png': {
      target: getRequiredEnvVar('API_BASE_URL'),
    },
  },

  serverMiddleware: [
    {
      path: '/socket.io/',
      handler: buildProxyMiddleware(getRequiredEnvVar('API_BASE_URL')),
    },
  ],

  bootstrapVue: {
    bootstrapCSS: true,
    bootstrapVueCSS: true,
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl'],
      },
    },
    extend(config, ctx) {
      if (ctx.isClient) {
        config.devtool = '#source-map'
      }
    },
    vendor: [
      'vue-pdf', 'vue-vimeo-player'
    ],
  },
}

function getRequiredEnvVar(key) {
  const result = process.env[key]
  const resultType = typeof result
  if (resultType === 'undefined' || resultType === 'null') {
    throw new Error(
      `Config problem: required env var '${key}' could not be found!`,
    )
  }
  return result
}

function getDeployedToEnv() {
  // the environment that we're *deployed* to, not like NODE_ENV=production
  const result = process.env.DEPLOYED_TO_ENV || 'dev'
  const userFacingValidEnvs = ['dev', 'staging', 'production']
  const validEnvs = ['%%DEPLOYED_TO_ENV%%'].concat(userFacingValidEnvs)
  if (validEnvs.indexOf(result) < 0) {
    throw new Error(
      `[ERROR] invalid deployment env name='${result}', valid values=${JSON.stringify(
        userFacingValidEnvs,
      )}`,
    )
  }
  return result
}
