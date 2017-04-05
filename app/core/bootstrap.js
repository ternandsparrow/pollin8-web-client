'use strict'
import './vendor'

const components = {
  app: ['home'],
  vendor: ['ui.router', 'ngMessages',
    'ng', 'ngAnimate', 'ngAria', 'material.core', 'material.core.gestures', 'material.core.layout', 'material.core.theming.palette', 'material.core.theming', 'material.core.animate', 'material.components.autocomplete', 'material.components.backdrop', 'material.components.button', 'material.components.card', 'material.components.checkbox', 'material.components.bottomSheet', 'material.components.chips', 'material.components.dialog', 'material.components.divider', 'material.components.datepicker', 'material.components.content', 'material.components.fabActions', 'material.components.fabShared', 'material.components.fabSpeedDial', 'material.components.fabToolbar', 'material.components.gridList', 'material.components.icon', 'material.components.input', 'material.components.menuBar', 'material.components.list', 'material.components.menu', 'material.components.progressCircular', 'material.components.progressLinear', 'material.components.radioButton', 'material.components.select', 'material.components.showHide', 'material.components.sidenav', 'material.components.slider', 'material.components.sticky', 'material.components.subheader', 'material.components.swipe', 'material.components.switch', 'material.components.toast', 'material.components.tabs', 'material.components.toolbar', 'material.components.tooltip', 'material.components.virtualRepeat', 'material.components.whiteframe'
  ]
}

require('./app')(components)

// load the main app file
const appModule = require('../index')(components)

// replaces ng-app="appName"
angular.element(document).ready(function () {
  angular.bootstrap(document, [appModule.name], {
    strictDi: true
  })
})
