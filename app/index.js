require('./index.scss')
require('./images/favicon.ico')

const components = {
  app: ['home', 'sidebar', 'calculate', 'toolbar', 'scenario-library',
    'define', 'config-checker'],
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

let pollin8Dependencies = ['pollin8.config'].concat(components.vendor.concat(components.app))
let pollin8Module = angular.module('pollin8', pollin8Dependencies)
pollin8Module.config(['$mdThemingProvider', function ($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('orange')
    .accentPalette('cyan')

  $mdThemingProvider.theme('somethingWrong')
    .primaryPalette('deep-orange')
}])

angular.element(document).ready(function () {
  angular.bootstrap(document, [pollin8Module.name], {
    // strictDi: true // FIXME had to turn this off for leaflet-ui
  })
})
