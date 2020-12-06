// thanks https://github.com/alibaba-aero/nuxt-leaflet-example/commit/4f954a0c312f5da0731c5d86201333fc193d652f
export default {
  name: 'LControlDraw',
  props: {
    drawLayerColour: {
      type: String,
      required: true,
    },
    initialGeojson: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      drawToolbarFull: null,
      drawToolbarEditOnly: null,
      editableLayers: null,
      map: null,
    }
  },
  mounted() {
    require('leaflet-draw')
    require('leaflet-draw/dist/leaflet.draw.css')
    // TODO this is brittle but I can't find another way to get a reference to
    // the map.
    const map = this.$parent.mapObject
    this.map = map
    this.editableLayers = this.$L.featureGroup().addTo(map)
    const options = {
      position: 'topleft',
      draw: {
        polygon: {
          allowIntersection: false, // Restricts shapes to simple polygons
          drawError: {
            color: '#e1e100',
            message:
              "<strong>Oh snap!</strong> You can't<br />draw a " +
              'shape that intersects itself!',
          },
          shapeOptions: this.commonShapeOptions,
        },
        rectangle: {
          shapeOptions: this.commonShapeOptions,
        },
        circle: false,
        marker: false,
        circlemarker: false,
        polyline: false,
      },
      edit: {
        remove: true,
        featureGroup: this.editableLayers,
      },
    }
    this.drawToolbarFull = new this.$L.Control.Draw(options)
    // thanks https://github.com/Leaflet/Leaflet.draw/issues/315#issuecomment-500246272
    this.drawToolbarEditOnly = new this.$L.Control.Draw({
      ...options,
      draw: false,
    })
    this.drawToolbarFull.addTo(map)
    this.addInitialDrawingToMap()
    map.on(this.$L.Draw.Event.CREATED, e => {
      this.editableLayers.addLayer(e.layer)
      this.sendChangeEvent()
      this.drawToolbarFull.remove(this.map)
      this.drawToolbarEditOnly.addTo(this.map)
    })
    map.on(this.$L.Draw.Event.EDITED, e => {
      const editedLayersCount = e.layers.getLayers().length
      if (!editedLayersCount) {
        // nothing edited
        return
      }
      this.sendChangeEvent()
    })
    map.on(this.$L.Draw.Event.DELETED, () => {
      this.sendChangeEvent()
      if (this.editableLayers.getLayers().length === 0) {
        this.drawToolbarEditOnly.remove(this.map)
        this.drawToolbarFull.addTo(this.map)
      }
    })
  },
  beforeDestroy() {
    if (this.drawToolbar) {
      this.drawToolbar.remove()
    }
  },
  computed: {
    commonShapeOptions() {
      return {
        color: this.drawLayerColour,
      }
    },
  },
  methods: {
    sendChangeEvent() {
      const data = this.editableLayers.toGeoJSON()
      this.$emit('change', data)
    },
    addInitialDrawingToMap() {
      const layerGroup = this.$L.geoJSON(this.initialGeojson, {
        style: this.commonShapeOptions,
      })
      for (const curr of layerGroup.getLayers()) {
        curr.addTo(this.editableLayers)
      }
    },
  },
  render() {
    // we have no template (not a .vue file) so we have to at least define this
    // method.
    return null
  },
}
