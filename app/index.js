require('./index.scss')
require('./images/favicon.ico')

function applyConfig (angularModule, config) {
  const CONSTANT_NAME_PREFIX = 'pollin8'
  for (var attr in config) {
    if (!config.hasOwnProperty(attr)) {
      continue
    }
    angularModule.constant(CONSTANT_NAME_PREFIX + attr, config[attr])
  }
}

function setupConfig (angularModule) {
  var defaults = {
    serverUrl: 'https://echo-service-dot-pollin8-web-client-162107.appspot.com/_ah/api/echo/v1/echo'
  }
  try {
    var overrides = require('./config-overrides')
    for (var attr in overrides) {
      if (!overrides.hasOwnProperty(attr)) {
        continue
      }
      defaults[attr] = overrides[attr]
    }
  } catch (error) {
    console.log('No config overrides loaded')
  }
  applyConfig(angularModule, defaults)
}

const components = {
  app: ['home', 'sidebar', 'calculate', 'toolbar', 'scenario-library', 'define'],
  vendor: ['ui.router', 'ngMessages',
    'ng', 'ngAnimate', 'ngAria',
    'material.core', 'material.core.gestures', 'material.core.layout',
    'material.core.theming.palette', 'material.core.theming',
    'material.core.animate', 'material.components.autocomplete',
    'material.components.backdrop', 'material.components.button',
    'material.components.card', 'material.components.checkbox',
    'material.components.bottomSheet', 'material.components.chips',
    'material.components.dialog', 'material.components.divider',
    'material.components.datepicker', 'material.components.content',
    'material.components.fabActions', 'material.components.fabShared',
    'material.components.fabSpeedDial', 'material.components.fabToolbar',
    'material.components.gridList', 'material.components.icon',
    'material.components.input', 'material.components.menuBar',
    'material.components.list', 'material.components.menu',
    'material.components.progressCircular', 'material.components.progressLinear',
    'material.components.radioButton', 'material.components.select',
    'material.components.showHide', 'material.components.sidenav',
    'material.components.slider', 'material.components.sticky',
    'material.components.subheader', 'material.components.swipe',
    'material.components.switch', 'material.components.toast',
    'material.components.tabs', 'material.components.toolbar',
    'material.components.tooltip', 'material.components.virtualRepeat',
    'material.components.whiteframe'
  ]
}

let deps = components.app
for (let i = 0; i < deps.length; i++) {
  require('./components/' + deps[i] + '/' + deps[i] + '.module')
}

var pollin8Module = angular.module('pollin8', components.vendor.concat(components.app))
pollin8Module.config(['$mdThemingProvider', function ($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('orange')
    .accentPalette('cyan')

  $mdThemingProvider.theme('somethingWrong')
    .primaryPalette('deep-orange')
}])
setupConfig(pollin8Module)

angular.element(document).ready(function () {
  angular.bootstrap(document, [pollin8Module.name], {
    // strictDi: true // FIXME had to turn this off for leaflet-ui
  })
})
