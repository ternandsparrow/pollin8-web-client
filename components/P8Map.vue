<template>
  <div id="map-wrap">
    <no-ssr>
      <l-map :zoom="zoom" :center="center" ref="map" id="the-map">
        <l-tile-layer :url="hereMapsUrl()"></l-tile-layer>
        <l-feature-group>
          <l-control-draw :options="drawOptions" @change="onDrawChange" />
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
    center: { // [lat, lon]
      type: Array,
      required: true
    }
  },
  data() {
    return {
      zoom:13,
    }
  },
  computed: {
    drawOptions() {
      return {
        position: 'topleft',
        draw: {
          polyline: false,
          polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons
            drawError: {
              color: '#e1e100',
              message: '<strong>Oh snap!</strong> You can\'t<br />draw a shape that intersects itself!'
            }
          },
          circle: true,
          rectangle: true,
          marker: false,
          circlemarker: false,
        },
        edit: {
          remove: true
        }
      }
    }
  },
  methods: {
    hereMapsUrl () {
      // FIXME inject keys from env
      const appId = 'zM6cic4akir1Yp2L2eXF'
      const appCode = 'aEbtMxj4GbBX-3pvDgOMkQ'
      const template = 'https://1.aerial.maps.api.here.com/maptile/2.1/maptile/newest/hybrid.day/{z}/{x}/{y}/256/png8'
        + '?app_id={app_id}&app_code={app_code}&lg=eng'
      return template.replace('{app_id}', appId).replace('{app_code}', appCode)
    },
    onDrawChange (geojson) {
      this.$emit('change', geojson)
    },
  }
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
