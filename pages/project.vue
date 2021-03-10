<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6 class="vw-100">
      <v-card>
        <v-card-title class="display-2"
          >Securing crop pollination through vegetation</v-card-title
        >
        <v-card-text>
          <p>
            Researchers from the University of Adelaide will collaborate with
            grower organisations, state government partners, NRM boards and
            non-government organisations to design revegetation strategies for
            crop pollinators. This will involve identification of useful crop
            pollinators, their seasonality and the native plants that support
            them. The revegetation advice will be targeted to South Australian
            pollination dependent crops and cropping regions. Demonstration
            projects will be developed around pollinators of canola, lucerne and
            apple and pear.
          </p>
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline">Project Overview</v-card-title>
        <v-card-text>
          <p>
            A video that presents the project's goals, outlining some of the
            research activities and expected outcomes.
          </p>
        </v-card-text>
        <client-only>
          <vimeo-player
            ref="player"
            :video-id="videoID1"
            :options="video1Options"
            :player-height="height"
            @ready="onReady"
          ></vimeo-player>
        </client-only>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline">Project Animation</v-card-title>
        <v-card-text>
          <p>
            An animation on the project which offers insight into why the
            project is of relevance for growers.
          </p>
        </v-card-text>
        <client-only>
          <vimeo-player
            ref="player"
            :video-id="videoID2"
            :options="video2Options"
            :player-height="height"
            @ready="onReady"
          ></vimeo-player>
        </client-only>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline"
          >Strategies to increase almond pollination in South
          Australia</v-card-title
        >
        <v-card-text>
          <p>
            Some information for Almond Growers on the project's results and how to make use of them.
          </p>
        </v-card-text>
        <client-only>
          <vuePdf
            src="/flowering/AgriFutures Almond Pollination A4 82544_WEB.pdf"
          ></vuePdf>
        </client-only>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { pageTitle } from '~/util/helpers'
let vuePdf
if (process.browser) {
  vuePdf = require('vue-pdf').default
}

export default {
  components: {
    vuePdf,
  },
  data() {
    return {
      videoID1: '271022981',
      videoID2: '472471214',
      height: 600,
      video1Options: {
        title: true,
        autopause: true,
        portrait: true,
        byline: true,
        responsive: true,
      },
      video2Options: {
        title: false,
        autopause: true,
        portrait: false,
        byline: false,
        responsive: true,
      },
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
  head: pageTitle('About the science'),
}
</script>

<style scoped></style>
