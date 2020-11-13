<template>
  <div id="map-wrap">
    <client-only>
      <l-map
        id="the-map"
        :bounds="bounds"
        :max-bounds="maxMapBounds"
        :min-zoom="minZoom"
        :options="mapOptions"
        @update:bounds="onBoundsUpdate"
      >
        <l-tile-layer :url="hereMapsUrl()"></l-tile-layer>
        <l-geo-json
          v-if="geojsonGuide"
          :geojson="geojsonGuide"
          :options-style="geojsonGuideStyle"
        ></l-geo-json>
        <l-feature-group>
          <l-control-draw
            :options="drawOptions"
            :initial-geojson="initialDrawValue"
            @change="onDrawChange"
          />
        </l-feature-group>
      </l-map>
    </client-only>
  </div>
</template>

<script>
import LControlDraw from '~/components/LControlDraw'

export default {
  components: {
    LControlDraw,
  },
  props: {
    bounds: {
      type: Object,
      required: true,
    },
    maxMapBounds: {
      type: Object,
      required: true,
    },
    minZoom: {
      type: Number,
      default: 13,
    },
    geojsonGuide: {
      // geojson to draw on the map as a guide, it will *not* be interactive
      type: Object,
      required: false,
    },
    drawLayerColour: {
      type: String,
      default: '#00e5ff',
    },
    guideLayerColour: {
      type: String,
      default: '#ff7800',
    },
    initialDrawValue: {
      type: Object,
    },
  },
  data() {
    return {
      mapOptions: {
        sleep: true,
        wakeTime: 1500,
        wakeMessage: 'Click or hover (for 1.5s) to wake',
        sleepNoteStyle: {
          opacity: '0.9',
        },
      },
      geojsonGuideStyle: {
        // TODO consider doing something to the guide layer to indicate it
        // can't be edited here
        color: this.guideLayerColour,
      },
    }
  },
  computed: {
    drawOptions() {
      return {
        position: 'topleft',
        draw: {
          polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons
            drawError: {
              color: '#e1e100',
              message:
                "<strong>Oh snap!</strong> You can't<br />draw a shape that intersects itself!",
            },
            shapeOptions: {
              color: this.drawLayerColour,
            },
          },
          rectangle: {
            shapeOptions: {
              color: this.drawLayerColour,
            },
          },
          circle: false,
          marker: false,
          circlemarker: false,
          polyline: false,
        },
        edit: {
          remove: true,
        },
      }
    },
  },
  mounted() {
    require('leaflet-sleep')
  },
  methods: {
    hereMapsUrl() {
      const appId = process.env.HEREMAPS_APP_ID
      const appCode = process.env.HEREMAPS_APP_CODE
      const template =
        'https://1.aerial.maps.api.here.com/maptile/2.1/maptile/newest/hybrid.day/{z}/{x}/{y}/256/png8' +
        '?app_id={app_id}&app_code={app_code}&lg=eng'
      return template.replace('{app_id}', appId).replace('{app_code}', appCode)
    },
    onDrawChange(geojson) {
      this.$emit('change', geojson)
    },
    onBoundsUpdate(latLngBounds) {
      this.$emit('moved', latLngBounds)
    },
  },
}
</script>

<style scoped>
#the-map {
  /* stop the map sitting on top of the navbar */
  z-index: 0;
  position: relative;
}

#map-wrap {
  height: 60vh;
}
</style>
