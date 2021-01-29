<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6 class="vw-100">
      <v-card>
        <v-card-title class="display-2">Run simulation</v-card-title>
        <v-card-text>
          <h3>What is this tool?</h3>
          <p>
            Here you can run a simulation to see how planting pollinator
            friendly revegetation adjacent to your crop will influence yield.
            The simulation will show you the effect of this revegetation for two
            future scenarios: both with and without varroa mite.
          </p>
          <p>
            The assumption is that varroa mite will have a negative impact on
            crop yields. This negative impact can be reduced by converting a
            portion of the farm into revegetation that is pollinator friendly.
            This revegetation will support and promote other pollinators that
            can step in when varroa mite affects feral honey bees. We assume
            varroa mite will reduce the abundance of the Apis genus (feral honey
            bees) by 60%.
          </p>
          <p>
            The revegetation will take time to grow and reach its full benefit
            to the pollinators. The output of a simulation will show a chart
            that plots crop yield over time so you can see how the revegetation
            improves over time.
          </p>
          <h3>How do I use the tool?</h3>
          <p>
            To run a simulation, fill in the required data at each step and
            press the run button at the end of this page. Feel free to tweak the
            inputs and re-run the simulation as many times as needed.
          </p>
          <h3>More details</h3>
          <p>
            If you're interested in the details of the model that runs the
            simulations, you can read the
            <a
              href="https://github.com/ternandsparrow/natcap-invest-docker-flask"
              >source code for the server</a
            >. The
            <a href="https://github.com/ternandsparrow/pollin8-web-client"
              >source code for <em>this</em> webapp</a
            >
            is also available. The underlying model software used by the server
            is
            <a href="https://naturalcapitalproject.stanford.edu/software/invest"
              >NatCap's InVEST</a
            >.
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
          <p>
            The model needs to know where your farm is located as the
            surrounding land will differ in how well it supports pollinators
            depending if that land is, for example: industrial or conservation
            park.
          </p>
          <p>
            This tool only support farms located in a subset of South Australia.
            The map will stop you from scrolling outside the supported area.
          </p>
          <p>
            Move the map until you can see your farm. Then use the drawing tools
            (rectangle or polygon) in the top left of the map window to draw
            around the border of your farm on the map. There are also controls
            to edit or delete existing shapes.
          </p>
          <p>
            You may only draw <em>one</em> farm shape. If your farm consists of
            multiple non-contiguous shapes, run the tool separately for each
            piece. Alternatively, draw one shape that encloses all parts of the
            farm and accept that the extra, non-farm, land will have some impact
            on the accuracy of the results.
          </p>
          <p8-map
            :bounds="mapBounds"
            :max-map-bounds="maxMapBounds"
            :min-zoom="minZoom"
            :draw-layer-colour="farmColour"
            :initial-draw-value="farmFeatureCollection"
            @change="onFarmChange"
            @moved="onMapMove"
          ></p8-map>
          <p>
            Area of farm: {{ farmAreaKm }} km² / {{ farmAreaHa }} ha /
            {{ farmAreaAc }} acres
          </p>
          <p>
            Note: the area reported by the map whilst drawing is an
            approximation, the values here have better accuracy.
          </p>
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline"
          >Step 3: revegetation location</v-card-title
        >
        <v-card-text>
          <p>
            Now you need to define how much of the farm will be
            <em>converted</em> to pollinator friendly revegetation. You can also
            change the position of the revegetation within the farm, but note
            that this usually has only a small impact on the result.
          </p>
          <p>
            Note: you cannot edit the farm here. If you need to make a change to
            the farm shape, go back to the previous step and edit it there.
          </p>
          <p class="reveg-pct-input text-center">
            <label>
              Percentage of farm to use for reveg:
              <input
                v-model="revegPct"
                type="number"
                :min="minRevegPct"
                :step="minRevegPct"
                class="text-center emphasised-input"
                @change="onSetScaledReveg"
              />
              %
            </label>
            <span v-if="revegPctErrorMsg" class="error-msg">{{
              revegPctErrorMsg
            }}</span>
          </p>
          <p class="text-center">
            <label>
              Position of reveg:
              <select
                v-model="revegPosition"
                class="emphasised-input"
                @change="onSetScaledReveg"
              >
                <option
                  v-for="curr of Object.entries(revegPositionOptions)"
                  :key="curr[0]"
                  :value="curr[0]"
                  >{{ curr[1] }}</option
                >
              </select>
            </label>
          </p>
          <p8-map
            :bounds="mapBounds"
            :max-map-bounds="maxMapBounds"
            :min-zoom="minZoom"
            :geojson-guide="farmFeatureCollection"
            :geojson-predrawn="revegFeatureCollection"
            :draw-layer-colour="revegColour"
            :guide-layer-colour="farmColour"
            :is-disable-draw="true"
            @change="onRevegChange"
          ></p8-map>
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline">Run it!</v-card-title>
        <v-card-text>
          <p>
            Lastly, set how many years you would like to run the simulation for
            (how many years to predict into the future). This simulation will
            also model the impact that varroa mite will have. You can adjust
            which year varroa mite impacts.
          </p>
          <p class="headline text-center">Year varroa mite impacts:</p>
          <v-container fluid grid-list-lg class="year-container">
            <v-layout row>
              <v-flex xs10>
                <v-slider
                  v-model="varroaYear"
                  :min="2"
                  :max="maxYears - 1"
                  always-dirty
                  label="Varroa mite year"
                  thumb-label="always"
                ></v-slider>
              </v-flex>

              <v-flex xs2>
                <v-text-field
                  v-model="varroaYear"
                  class="mt-0"
                  type="number"
                  :min="2"
                  :max="maxYears - 1"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <p class="headline text-center">Year to simulate:</p>
          <v-container fluid grid-list-lg class="year-container">
            <v-layout row>
              <v-flex xs10>
                <v-slider
                  v-model="years"
                  :min="3"
                  :max="maxYears"
                  always-dirty
                  label="Years to simulate"
                  thumb-label="always"
                ></v-slider>
              </v-flex>

              <v-flex xs2>
                <v-text-field
                  v-model="years"
                  class="mt-0"
                  type="number"
                  :min="3"
                  :max="maxYears"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <div class="text-center">
            <v-btn
              large
              color="primary"
              :disabled="!isInputValid"
              @click="doRun"
              >Run the simulation</v-btn
            >
            <div v-if="!isInputValid">
              <small class="text-danger">
                Please draw your farm before running the simulation.
              </small>
            </div>
          </div>
        </v-card-text>
      </v-card>
      <v-card v-if="isShowResultSection" class="mt-4">
        <v-card-title class="display-2 text-center">Results</v-card-title>
        <v-card-text v-if="isShowLoading && !totalSimulationCount">
          <p class="text-center">Starting simulation...</p>
          <v-progress-linear :indeterminate="true" />
        </v-card-text>
        <v-card-text v-if="isShowLoading && totalSimulationCount">
          <p class="text-center">
            Processed {{ processedSimsCount }} of
            {{ totalSimulationCount }} simulations
            <span v-if="isGatheringProcessingResults"
              >(gathering results...)</span
            >
          </p>
          <v-progress-linear v-model="processedYearsPercent" />
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
          <h3>How to intepret the results</h3>
          <p>
            This chart shows the change in yield, as a percentage from now (year
            0). By default, two datasets are visible: one where varroa mite is
            present (labelled "with varroa") and another without (labelled "no
            varroa"). Both of these datasets are "with reveg", that is they show
            the effect planting revegetation has over time. The purpose of
            showing both scenarios is to highlight the impact varroa mite will
            have. Two more datasets, that are not visible by default (see below
            for how to make them visible), simulate future scenarios where
            revegetation has <em>not</em> been planted (labelled as "no reveg").
            These datasets serve as a baseline to compare the "with reveg"
            scenarios.
          </p>
          <p>
            Year 0 is right now, as your farm currently stands. This gives us
            the baseline to compare to so the benefit of the revegetation can be
            seen. Year 1 is the first year that revegetation has an effect on
            farm yield. See the
            <router-link to="/science#the-curve">About the science</router-link>
            page.
          </p>

          <p>
            Be sure to read the scale of the y-axis as it will be automatically
            set to values that make the chart the most readable, so it maybe be
            different for different simulation runs.
          </p>
          <h3>Interacting with the chart</h3>
          <p>
            You can turn datasets on and off by clicking their name in the
            legend at the top of the chart. The exact values for datapoints can
            be seen my hovering your cursor over them.
          </p>
          <p8-result-block :records="lastRunResultRecords" />
          <p class="text-muted">
            <small v-if="!isShowRaster" @click="isShowRaster = true"
              >Show clipped raster</small
            >
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

<style lang="css" scoped>
.year-container {
  width: 50vw;
}

.error-msg {
  color: red;
  border: 1px solid red;
  background: #ffc6c6;
}

.reveg-pct-input {
  font-size: 1.5em;
}

.reveg-pct-input * .emphasised-input {
  width: 3em;
}

.emphasised-input {
  border: 3px solid green;
  border-radius: 5px;
  padding: 0.25em;
  background-color: #eaf0ea;
}
</style>
