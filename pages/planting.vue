<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6 class="vw-100">
      <v-card>
        <v-card-title class="display-2">Revegetation Planting Guide</v-card-title>
        <v-card-text>
          <p>Here you can ... Nick to supply text..</p>
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline">Step 1: Region</v-card-title>
        <v-card-text>
          <p>What is your agricultural setting?</p>
          <v-radio-group v-model="agSettingType" :mandatory="true">
            <v-radio
              v-for="curr in agSettingTypes"
              :key="curr.code"
              :label="curr.label"
              :value="curr.code"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline">Step 2: Application Type</v-card-title>
        <v-card-text>
          <p>What is your application?</p>
          <v-radio-group v-model="applicationType" :mandatory="true">
            <v-radio
              v-for="curr in applicationTypes"
              :key="curr.code"
              :label="curr.label"
              :value="curr.code"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline">Step 3: Ecosystem Service</v-card-title>
        <v-card-text>
          <p>Which Ecosystem Service is most important?</p>
          <v-radio-group v-model="ecosystemServiceType" :mandatory="true">
            <v-radio
              v-for="curr in ecosystemServiceTypes"
              :key="curr.code"
              :label="curr.label"
              :value="curr.code"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title v-if="isInputValid" class="headline">Run it!</v-card-title>
        <v-card-text>
          <div v-if="isInputValid">
            Agricultural Setting = {{ agSettingType }}
            <br />
            Planting Application Type Setting = {{ applicationType }}
            <br />
            Ecosystem Service Type Setting = {{ ecosystemServiceType }}
          </div>
          <p></p>
          <div class="text-center">
            <v-btn
              large
              color="primary"
              @click="doPlantingGuideSearch"
              :disabled="!isInputValid"
            >Search for planting advice</v-btn>
            <div v-if="!isInputValid">
              <small
                class="text-danger"
              >Please make sure you have selected an option for all three of the criteria.</small>
            </div>
          </div>
        </v-card-text>
      </v-card>
      <v-card class="mt-4" v-if="isShowResultSection">
        <v-card-title class="display-2 text-center">Planting Advice</v-card-title>
        <div id="results">
          <v-data-table
            :headers="headers"
            :items="plantData"
            :pagination.sync="pagination"
            item-key="FAMILY"
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <tr @click="rowClick(props.item.name)">
                <td>{{ props.item.FAMILY }}</td>
                <td class="text-xs-right">{{ props.item.GENUS }}</td>
                <td class="text-xs-right">{{ props.item.SPECIES }}</td>
                <td class="text-xs-right">{{ props.item.common_name }}</td>
                <td class="text-xs-right">{{ props.item.ES_rank }}</td>
                <td class="text-xs-right">{{ props.item.iron }}</td>
              </tr>
            </template>
          </v-data-table>
        </div>
      </v-card>
    </v-flex>
    <div id="bottom"></div>
  </v-layout>
</template>


<script>
import { pageTitle } from '~/util/helpers'
import * as d3 from 'd3'

export default {
  head: pageTitle('Planting Guide'),
  data() {
    return {
      currentPage: 0,
      pageCount: 0,
      numPages: undefined,
      agSettingTypes: [
        { code: 'SL', label: 'Southern Lofty' },
        { code: 'SE', label: 'South East' },
        { code: 'SYP', label: 'Southern Yorke Peninsula' },
        { code: 'NYP', label: 'Northern Yorke Peninsula' },
        { code: 'EP', label: 'Eyre Peninsula' },
      ],
      applicationTypes: [
        { code: 'LT2HA', label: 'Less than 2ha' },
        { code: 'MT2HA', label: 'Less than 2ha' },
        { code: 'EO', label: 'Existing over-story' },
        { code: 'SH', label: 'Shelterbelt' },
        { code: 'HE', label: 'Hedge' },
        { code: 'ME', label: 'Meadow' },
      ],
      ecosystemServiceTypes: [
        { code: 'DR', label: 'Drought tolerance' },
        { code: 'ST', label: 'Salt tolerance' },
        { code: 'ER', label: 'Erosion' },
        { code: 'FT', label: 'Fire tolerance' },
        { code: 'ALL', label: 'All' },
      ],
      // Nick Planting advice table
      pagination: {
        sortBy: 'name',
      },
      plantData: [],
      headers: [
        {
          text: 'Family',
          align: 'left',
          value: 'FAMILY',
          width: '20%',
        },
        { text: 'Genus', align: 'right', value: 'GENUS', width: '16%' },
        { text: 'Species', align: 'right', value: 'SPECIES', width: '16%' },
        { text: 'Common Name', align: 'right', value: 'carbs', width: '16%' },
        { text: 'ES Rank', align: 'right', value: 'protein', width: '16%' },
        { text: '<TBD>', align: 'right', value: 'iron', width: '16%' },
      ],
    }
  },
  mounted() {
    d3.csv('/Plant_selector_rareandrangeltd_removed_ver1.0.csv', data => {
      this.plantData.push(data)
    })
  },
  computed: {
    agSettingType: {
      get() {
        return this.$store.state.agSettingType
      },
      set(v) {
        this.$store.commit('updateAgSettingType', v)
      },
    },
    applicationType: {
      get() {
        return this.$store.state.applicationType
      },
      set(v) {
        this.$store.commit('updateApplicationType', v)
      },
    },
    ecosystemServiceType: {
      get() {
        return this.$store.state.ecosystemServiceType
      },
      set(v) {
        this.$store.commit('updateEcosystemServiceType', v)
      },
    },
    isInputValid() {
      return (
        this.agSettingType && true // this.applicationType && this.ecosystemServiceType
      )
    },
    isShowResultSection() {
      return this.$store.plantingAdviceResult !== null
    },
  },
  methods: {
    async doPlantingGuideSearch() {
      var result = {
        species: [
          {
            family: 'Pittosporaceae',
            genus: 'Bursaria',
            species: 'spinosa ssp spinosa',
            common_name: 'christmas bush',
            uuid: 'PSsp110',
            es_rank: '14',
          },
          {
            family: 'Myrtaceae',
            genus: 'Callistemon',
            species: 'rugulosus',
            common_name: 'scarlet bottlebrush',
            uuid: 'PSsp80',
            es_rank: '14',
          },
        ],
      }
      this.$store.commit('plantingAdviceResult', result)
    },
  },
}
</script>

<style scoped>
</style>
