<script>
// thanks https://github.com/alibaba-aero/nuxt-leaflet-example/commit/4f954a0c312f5da0731c5d86201333fc193d652f
export default {
  name: 'LControlDraw',
  props: {
    options: {
      type: Object,
      required: true
    }
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
        ...this.options.edit
      }
    }
    this.mapObject = new this.$L.Control.Draw(options)
    this.mapObject.addTo(map)
    map.on(this.$L.Draw.Event.CREATED, (e) => {
      editableLayers.addLayer(e.layer)
      this.$emit('change', editableLayers.toGeoJSON())
    })
    map.on(this.$L.Draw.Event.EDITED, (e) => {
      const layers = e.layers
      layers.eachLayer(function (layer) {
        editableLayers.removeLayer(layer)
        editableLayers.addLayer(layer)
      })
      this.$emit('change', editableLayers.toGeoJSON())
    })
    map.on(this.$L.Draw.Event.DELETED, (e) => {
      editableLayers.removeLayer(e.layer)
      this.$emit('change', editableLayers.toGeoJSON())
    })
  },
  beforeDestroy() {
    this.mapObject.remove()
  },
  render() {
    return null
  }
}
</script>
