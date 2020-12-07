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
        <l-tile-layer :url="mapsUrl()"></l-tile-layer>
        <l-control-scale position="bottomright" />
        <l-geo-json
          v-if="geojsonPredrawn"
          :geojson="geojsonPredrawn"
          :options-style="geojsonPredrawnStyle"
        ></l-geo-json>
        <l-geo-json
          v-if="geojsonGuide"
          :geojson="geojsonGuide"
          :options-style="geojsonGuideStyle"
        ></l-geo-json>
        <l-control-draw
          v-if="!isDisableDraw"
          :draw-layer-colour="drawLayerColour"
          :initial-geojson="initialDrawValue"
          @change="onDrawChange"
        />
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
    geojsonPredrawn: {
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
    isDisableDraw: {
      type: Boolean,
      default: false,
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
        color: this.guideLayerColour,
      },
      geojsonPredrawnStyle: {
        color: this.drawLayerColour,
      },
    }
  },
  mounted() {
    require('leaflet-sleep')
  },
  methods: {
    mapsUrl() {
      // we did use HereMaps for a while. Their satellite images were great but
      // they didn't offer the tiles in the zoom that we expect our users to
      // need. If we need satellite tiles, perhaps checkout Google Maps.
      return 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
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
