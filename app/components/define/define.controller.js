/* @ngInject */
class DefineController {
  constructor ($scope) {
    this.$scope = $scope
    this.configureScope()
  }

  configureScope () {
    this.$scope.title = 'Define Baseline'
    this.$scope.map = {
      center: {
        lat: -28.071980301779845,
        lng: 134.208984375,
        zoom: 4
      },
      layers: {
        baselayers: {
          xyz: {
            name: 'OpenStreetMap (XYZ)',
            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            type: 'xyz'
          }
        }
      }
    }
  }
}

export {DefineController}
