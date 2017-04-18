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

module.exports = function (components) {
  var result = angular.module('pollin8', components.vendor.concat(components.app))
  result.config(['$mdThemingProvider', function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('orange')
      .accentPalette('cyan')

    $mdThemingProvider.theme('somethingWrong')
      .primaryPalette('deep-orange')
  }])
  setupConfig(result)
  return result
}
