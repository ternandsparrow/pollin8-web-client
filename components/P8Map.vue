<template>
  <div id="map-wrap">
    <no-ssr>
      <l-map
        :zoom="zoom"
        :center="center"
        ref="map"
        id="the-map"
        :options="mapOptions"
      >
        <l-tile-layer :url="hereMapsUrl()"></l-tile-layer>
        <l-geo-json
          v-if="geojsonGuide"
          :geojson="geojsonGuide"
          :optionsStyle="geojsonGuideStyle"
        ></l-geo-json>
        <l-feature-group>
          <l-control-draw
            :options="drawOptions"
            @change="onDrawChange"
            :initialGeojson="initialDrawValue"
          />
        </l-feature-group>
      </l-map>
    </no-ssr>
  </div>
</template>

<script>
import LControlDraw from '~/components/LControlDraw'

export default {
  components: {
    LControlDraw,
  },
  props: {
    center: {
      // [lat, lon]
      type: Array,
      required: true,
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
      zoom: 13,
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
  mounted() {
    require('leaflet-sleep')
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
  methods: {
    hereMapsUrl() {
      // FIXME inject keys from env
      const appId = 'zM6cic4akir1Yp2L2eXF'
      const appCode = 'aEbtMxj4GbBX-3pvDgOMkQ'
      const template =
        'https://1.aerial.maps.api.here.com/maptile/2.1/maptile/newest/hybrid.day/{z}/{x}/{y}/256/png8' +
        '?app_id={app_id}&app_code={app_code}&lg=eng'
      return template.replace('{app_id}', appId).replace('{app_code}', appCode)
    },
    onDrawChange(geojson) {
      this.$emit('change', geojson)
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
