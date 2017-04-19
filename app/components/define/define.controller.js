/* @ngInject */
class DefineController {
  constructor ($scope, leafletDrawEvents, leafletData) {
    this.$scope = $scope
    this.leafletDrawEvents = leafletDrawEvents
    this.leafletData = leafletData
    this.configureScope()
  }

  configureScope () {
    L.Icon.Default.imagePath = 'https://unpkg.com/leaflet@0.7.7/dist/images' // pretty sure minification forces us to do this. It works in any case
    this.$scope.title = 'Define Baseline'
    var drawnItems = new L.FeatureGroup()
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
      },
      drawOptions: {
        position: 'bottomright',
        draw: {
          polyline: false,
          polygon: {
            allowIntersection: false,
            metric: true,
            showArea: true,
            drawError: {
              color: '#b00b00',
              timeout: 1000
            },
            shapeOptions: {
              color: 'blue'
            }
          },
          circle: false,
          marker: true
        },
        edit: {
          featureGroup: drawnItems,
          edit: true,
          remove: true
        }
      }
    }

    this.$scope.drawnItemsCount = () => {
      return drawnItems.getLayers().length
    }
    function noop () { }
    function created (e, leafletEvent, leafletObject, model, modelName) {
      drawnItems.addLayer(leafletEvent.layer)
    }

    var handle = {
      created: created,
      edited: noop,
      deleted: noop,
      drawstart: noop,
      drawstop: noop,
      editstart: noop,
      editstop: noop,
      deletestart: noop,
      deletestop: noop
    }

    var drawEvents = this.leafletDrawEvents.getAvailableEvents()
    drawEvents.forEach((eventName) => {
      this.$scope.$on('leafletDirectiveDraw.' + eventName, (e, payload) => {
        var leafletEvent = payload.leafletEvent
        var leafletObject = payload.leafletObject
        var model = payload.model
        var modelName = payload.modelName
        handle[eventName.replace('draw:', '')](e, leafletEvent, leafletObject, model, modelName)
      })
    })
  }
}

export { DefineController }
