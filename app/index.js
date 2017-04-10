module.exports = function (components) {
  var module = angular.module('pollin8', components.vendor.concat(components.app))
  module.config(['$mdThemingProvider', function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('orange')
      .accentPalette('cyan')
  }])
  return module
}
