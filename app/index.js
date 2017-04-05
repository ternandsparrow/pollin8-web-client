module.exports = function (components) {
  return angular.module('pollin8', components.vendor.concat(components.app))
}
