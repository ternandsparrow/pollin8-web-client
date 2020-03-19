<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6 class="vw-100">
      <v-card>
        <v-card-title class="display-2">Run simulation</v-card-title>
        <v-card-text>
          <p>
            Here you can run a simulation to see the effect pollinator friendly
            revegetation will have on your crop. Fill in the required data at
            each step and press the run button at the end of this page.
          </p>
          <p>
            Feel free to tweak the inputs and re-run the simulation as many
            times as needed.
          </p>
          <hr class="my-3" />
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline">Step 1: crop type</v-card-title>
        <v-card-text>
          <p>What type of crop are you growing?</p>
          <v-radio-group v-model="cropType" :mandatory="true">
            <v-radio
              v-for="curr in cropTypes"
              :key="curr.code"
              :label="curr.label"
              :value="curr.code"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline">Step 2: farm location</v-card-title>
        <v-card-text>
          <p>We need to know where you farm is located.</p>
          <p>
            Currently we only support farms in a subset of South Australia. The
            map will stop you from scroll outside the supported area.
          </p>
          <p>
            Move the map until you can see your farm. Then use the drawing tools
            (rectangle or polygon) in the top left of the map window to draw
            around the border of your farm on the map.
          </p>
          <p>
            If you farm is not one continuous shape, you can draw multiple
            shapes to capture the whole property.
          </p>
          <p>There are also controls to edit or delete existing shapes.</p>
          <p8-map
            @change="onFarmChange"
            :bounds="mapBounds"
            :maxMapBounds="maxMapBounds"
            :minZoom="minZoom"
            :drawLayerColour="farmColour"
            :initialDrawValue="farmFeatureCollection"
            @moved="onMapMove"
          ></p8-map>
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline">Step 3: revegtation location</v-card-title>
        <v-card-text>
          <p>
            This step is very similar to the previous but the difference is that
            you're drawing
            <strong>where you will be planting the revegetation area</strong>.
            You'll be able to see where you drew the farm in the previous step
            as a guide for drawing the reveg.
          </p>
          <p>
            Note: you cannot edit the farm here. If you need to make a change to
            the farm shape, go back to the previous step and edit it there.
          </p>
          <p8-map
            @change="onRevegChange"
            :bounds="mapBounds"
            :maxMapBounds="maxMapBounds"
            :minZoom="minZoom"
            :geojsonGuide="farmFeatureCollection"
            :initialDrawValue="revegFeatureCollection"
            :drawLayerColour="revegColour"
            :guideLayerColour="farmColour"
          ></p8-map>
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline">Run it!</v-card-title>
        <v-card-text>
          <p>
            Lastly, set how many years you would like to run the simulation for
            (how many years to predict into the future). Running for more years
            will take longer.
          </p>
          <v-container fluid grid-list-lg class="year-container">
            <v-layout row>
              <v-flex xs11>
                <v-slider
                  v-model="years"
                  :min="1"
                  :max="15"
                  always-dirty
                  label="Years"
                  thumb-label="always"
                ></v-slider>
              </v-flex>

              <v-flex xs1>
                <!-- FIXME add min/max validation -->
                <v-text-field v-model="years" class="mt-0" type="number" max="15"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <div class="text-center">
            <v-btn large color="primary" @click="doRun" :disabled="!isInputValid">Run the simulation</v-btn>
            <div v-if="!isInputValid">
              <small class="text-danger">
                Enter at least one shape for the farm and one for the reveg
                before running the simulation
              </small>
            </div>
          </div>
        </v-card-text>
      </v-card>
      <v-card class="mt-4" v-if="isShowResultSection">
        <v-card-title class="display-2 text-center">Results</v-card-title>
        <v-card-text v-if="isShowLoading">
          <p class="text-center">
            Processed {{ processedYearsCount }} of
            {{ totalYearsToProcess }} simulations
            <span
              v-if="isGatheringProcessingResults"
            >(gathering results...)</span>
          </p>
          <v-progress-linear v-model="processedYearsPercent"></v-progress-linear>
        </v-card-text>
        <v-card-text v-if="isShowError" class="text-center">
          <b-alert show variant="danger">
            Failed while running the simulation
            <!-- FIXME add something more to help user here -->
          </b-alert>
        </v-card-text>
        <v-card-text v-if="isShowChart">
          <p class="text-right">
            <small class="text-muted">Elaspsed time: {{ elapsedMs }}ms</small>
          </p>
          <p8-result-block season="spring" :records="lastRunResultRecords" />
          <p8-result-block season="summer" :records="lastRunResultRecords" />
          <p>
            Further reading on interpreting these results
            <a
              href="http://data.naturalcapitalproject.org/nightly-build/invest-users-guide/html/croppollination.html#final-results"
              target="_blank"
            >in the NatCap InVEST documentation</a>.
          </p>
          <p class="text-muted">
            <small @click="isShowRaster = true" v-if="!isShowRaster">Show clipped raster</small>
          </p>
          <div v-if="isShowRaster">
            <img :src="farmRaster" />
            <img :src="revegRaster" />
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
    <div id="bottom"></div>
  </v-layout>
</template>

<script>
import SimulationComponent from './simulation.js'
export default SimulationComponent
</script>

<style scoped>
.year-container {
  width: 50vw;
}
</style>
