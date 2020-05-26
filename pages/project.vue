<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6 class="vw-100">
      <v-card>
        <v-card-title class="display-2">Secure pollination for More Productive Agriculture</v-card-title>
        <v-card-text>
          <p>The project will realise significant productivity and yield gains for producers through improved rates of pollination. The project will assess the contribution of pollinators to nine crops, will re-establish native vegetation to support pollinator food and nesting resources and use new technology to communicate the findings to primary producers.</p>
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline">Project Overview</v-card-title>
        <v-card-text>
          <p>A video that presents the project.</p>
        </v-card-text>
        <client-only>
          <vimeo-player ref="player" :video-id="videoID1" @ready="onReady" :player-height="height"></vimeo-player>
        </client-only>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline">Project Animation</v-card-title>
        <v-card-text>
          <p>An animation on the project.</p>
        </v-card-text>
        <client-only>
          <vimeo-player ref="player" :video-id="videoID2" @ready="onReady" :player-height="height"></vimeo-player>
        </client-only>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { pageTitle } from '~/util/helpers'
import { vueVimeoPlayer } from 'vue-vimeo-player'

export default {
  head: pageTitle('About the science'),
  components: { vueVimeoPlayer },
  data() {
    return {
      videoID1: '271022981',
      videoID2: '422668869',
      height: 600,
      options: {},
      playerReady: false,
    }
  },
  methods: {
    onReady() {
      this.playerReady = true
    },
    play() {
      this.$refs.player.play()
    },
    stop() {
      this.$refs.player.stop()
    },
  },
}
</script>

<style scoped>
</style>
