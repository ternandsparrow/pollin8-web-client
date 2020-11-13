// thanks https://github.com/alibaba-aero/nuxt-leaflet-example/commit/4f954a0c312f5da0731c5d86201333fc193d652f
export default {
  name: 'LControlDraw',
  props: {
    options: {
      type: Object,
      required: true,
    },
    initialGeojson: {
      type: Object,
    },
  },
  mounted() {
    require('leaflet-draw')
    require('leaflet-draw/dist/leaflet.draw.css')
    const map = this.$parent.$parent.mapObject
    const editableLayers = this.$parent.mapObject
    const options = {
      ...this.options,
      edit: {
        featureGroup: editableLayers,
        ...this.options.edit,
      },
    }
    this.mapObject = new this.$L.Control.Draw(options)
    this.mapObject.addTo(map)
    if (this.initialGeojson) {
      const layerGroup = this.$L.geoJSON(this.initialGeojson, {
        style: this.options.draw.rectangle.shapeOptions,
      })
      for (const curr of layerGroup.getLayers()) {
        curr.addTo(editableLayers)
      }
    }
    map.on(this.$L.Draw.Event.CREATED, e => {
      editableLayers.addLayer(e.layer)
      this.$emit('change', editableLayers.toGeoJSON())
    })
    map.on(this.$L.Draw.Event.EDITED, e => {
      const layers = e.layers
      layers.eachLayer(function(layer) {
        editableLayers.removeLayer(layer)
        editableLayers.addLayer(layer)
      })
      this.$emit('change', editableLayers.toGeoJSON())
    })
    map.on(this.$L.Draw.Event.DELETED, e => {
      editableLayers.removeLayer(e.layer)
      this.$emit('change', editableLayers.toGeoJSON())
    })
  },
  beforeDestroy() {
    if (this.mapObject) {
      this.mapObject.remove()
    }
  },
  render() {
    return null
  },
}
