<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6 class="vw-100">
      <v-card>
        <v-card-title class="display-2">Revegetation Planting Guide</v-card-title>
        <v-card-text>
          <p>Here you can ... Nick to supply text</p>
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

        <div id="app">
          <ul>
            <li v-for="(v, key) in plantData" :key="key" v-text="v"></li>
          </ul>
        </div>
        <div id="results">
          <v-data-table
            :headers="headers"
            :items="plantData"
            :pagination.sync="pagination"
            item-key="name"
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <tr @click="rowClick(props.item.name)">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.calories }}</td>
                <td class="text-xs-right">{{ props.item.fat }}</td>
                <td class="text-xs-right">{{ props.item.carbs }}</td>
                <td class="text-xs-right">{{ props.item.protein }}</td>
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
import pdf from 'vue-pdf'
import * as d3 from 'd3'

var loadingTask = pdf.createLoadingTask('./planting/SL_TSBF.pdf')

export default {
  head: pageTitle('Planting Guide'),
  components: {
    pdf,
  },
  data() {
    return {
      src: loadingTask,
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
        { text: 'Genus', align: 'right', value: 'FAMILY', width: '16%' },
        { text: 'Species', align: 'right', value: 'GENUS', width: '16%' },
        { text: 'Common Name', align: 'right', value: 'carbs', width: '16%' },
        { text: 'ES Rank', align: 'right', value: 'protein', width: '16%' },
        { text: '<TBD>', align: 'right', value: 'iron', width: '16%' },
      ],
      desserts: [
        {
          value: false,
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          value: false,
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          value: false,
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        },
        {
          value: false,
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
        },
        {
          value: false,
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
        },
        {
          value: false,
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        {
          value: false,
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
        },
        {
          value: false,
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%',
        },
        {
          value: false,
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%',
        },
        {
          value: false,
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
      ],
    }
  },
  mounted() {
    d3.csv('Plant_selector_rareandrangeltd_removed_ver1.0.csv', data => {
      console.log('mounted loaded an item: ' + JSON.stringify(data))
      this.plantData.push(data)
      console.log('this.plantData is: ' + JSON.stringify(this.plantData))
    }),
      this.src.then(pdf => {
        this.numPages = pdf.numPages
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
