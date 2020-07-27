<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6 class="vw-100">
      <v-card class="card-background-header">
        <v-card-title class="display-2">Revegetation Planting Guide</v-card-title>
        <v-card-text class="card-text">
          <p>The three focal crops for this plant selector are apple, canola and lucerne because of their pollinator dependency. By selecting the agricultural region and then choosing the best type of pollination planting for your site a list of plants will be generated that can then be refined by additional ecosystem services that they will provide. Though the selector is themed towards these agricultural crops the fundamental logic behind this guide can suitably be used for alternative agriculture within the same area.</p>
        </v-card-text>
      </v-card>
      <v-card class="mt-4 card-background">
        <v-card-title class="headline">Step 1: Agricultural Region</v-card-title>
        <v-card-text class="card-text">
          <p>The regional areas associated with this agriculture are the southern Mount Lofty ranges, Northern Yorke Peninsula, Southern Yorke Peninsula Eyre Peninsula, and the South East.</p>
          <p></p>
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
      <v-card class="mt-4 card-background">
        <v-card-title class="headline">Step 2: Site-specific application</v-card-title>
        <v-card-text class="card-text">
          <p>Available land area, site access and existing vegetation will impact on species selection and how they are applied. For example unless careful planning and appropriate resources are available it would be ill advised to attempt tube-stock planting in areas more than 2ha. Tubestock is also recommended for areas that have existing over-story and linear shelterbelt plantings. In areas greater than 2 hectares, sown meadows and linear hedges the use of direct seeding of species that propagate easily is more appropriate.</p>
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
      <v-card class="mt-4 card-background">
        <v-card-title class="headline">Step 3: Refining Ecosystem Service</v-card-title>
        <v-card-text class="card-text">
          <p>Along with the pollination benefits to agriculture, ecological restoration can conserve biodiversity and provide essential ecosystem services. Ecosystem services reflect the ecological, social and economic dimensions of natural resources. By refining the plant selection by choosing specific ecosystem services, not only can you prioritise pollination services to the focal crop (by providing resources and habitat to pollinators throughout the year), you can also gain additional benefits. For example, these may include drought tolerance, salt tolerance, erosion control and fire mitigation.</p>
          <p>Along with pollination services, what other ecosystem services are important at your site?</p>
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
      <v-card class="mt-4 card-background">
        <v-card-title v-if="isInputValid" class="headline">Your selections</v-card-title>
        <v-card-text class="card-text">
          <div v-if="isInputValid">
            Agricultural Setting = {{ agSettingType }}
            <br />
            Planting Application Type Setting = {{ applicationType }}
            <br />
            Ecosystem Service Type Setting = {{ ecosystemServiceType }}
          </div>
          <!-- p></p>
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
          </div-->
        </v-card-text>
      </v-card>
      <v-card class="mt-4 card-background" v-if="isShowResultSection">
        <v-card-title class="display-2 text-center">Planting Advice</v-card-title>
        <v-card-title class="headline">Overstorey</v-card-title>
        <div id="results">
          <v-data-table
            :headers="headers"
            :items="filteredPlants"
            :pagination.sync="pagination"
            item-key="common_name"
            class="elevation-1"
          >
            <!-- Why does this need to be here? Other examples auto-work -->
            <template slot="items" slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td class="text-xs-right">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">{{ props.item.FAMILY }}</span>
                    </template>
                    <span>          
                      {{ familyComment(props.item.FAMILY) }}
                    </span>
                  </v-tooltip>
                </td>
                <td class="text-xs-right">{{ props.item.GENUS }}</td>
                <td class="text-xs-right">{{ props.item.SPECIES }}</td>
                <td class="text-xs-right">{{ props.item.common_name }}</td>
                <td class="text-xs-right">{{ props.item.Rainfall }}</td>
                <td class="text-xs-right">{{ props.item.Standard_tube }}</td>
                <td class="text-xs-right">{{ props.item.Direct_seed }}</td>
                <td class="text-xs-right">{{ props.item.Sand}}</td>
                <td class="text-xs-right">{{ props.item.Loam }}</td>
                <td class="text-xs-right">{{ props.item.Clay }}</td>
                <td class="text-xs-right">{{ props.item.Calcareous }}</td>
              </tr>
            </template>
            <template v-slot:expand="props">
              <v-card flat>
                <v-card-text>
                  <div>
                    Flowers in Summer? {{ props.item.Summer == '1' }}
                  </div>
                  <div>
                    Flowers in Autumn? {{ props.item.Autumn == '1' }}
                  </div>
                  <div>
                    Flowers in Winter? {{ props.item.Winter == '1' }}
                  </div>
                  <div>
                    Flowers in Spring? {{ props.item.Spring == '1' }}
                  </div>
                </v-card-text>

              </v-card>
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
      expanded: [],
      singleExpand: true,
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
        { code: 'Standard_tube', label: 'Less than 2ha' },
        { code: 'Standard_tube_MT', label: 'More than 2ha' },
        { code: 'Existing_overstorey', label: 'Existing over-story' },
        { code: 'Shelter_TS', label: 'Shelterbelt' },
        { code: 'Hedge_TS', label: 'Hedge' },
        { code: 'Meadow_DS', label: 'Meadow' },
      ],
      ecosystemServiceTypes: [
        { code: 'Drought_tolerant', label: 'Drought tolerance' },
        { code: 'Salt_tolerant', label: 'Salt tolerance' },
        { code: 'Erosion_control', label: 'Erosion' },
        { code: 'Fire_resistance', label: 'Fire tolerance' },
        { code: 'None', label: 'None' },
        { code: 'ALL', label: 'All' },
      ],
      // Nick Planting advice table
      pagination: {
        sortBy: 'name',
        rowsPerPage: 15
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
        {
          text: 'Common Name',
          align: 'right',
          value: 'common_name',
          width: '16%',
        },
        {
          text: 'Rainfall (mm)',
          align: 'right',
          value: 'rainfall',
          width: '16%',
        },
        {
          text: 'Is standard tube stock?',
          align: 'right',
          value: 'Standard_tube',
          width: '16%',
        },
        {
          text: 'Is direct seeding?',
          align: 'right',
          value: 'Direct_seed',
          width: '16%',
        },
        {
          text: 'Grows in Sandy soil?',
          align: 'right',
          value: 'Sand',
          width: '16%',
        },
        {
          text: 'Grows in Loamy soil?',
          align: 'right',
          value: 'Loam',
          width: '16%',
        },
        {
          text: 'Grows in Clayish soil?',
          align: 'right',
          value: 'Clay',
          width: '16%',
        },
        {
          text: 'Grows in Calcareous soil?',
          align: 'right',
          value: 'Calcareous',
          width: '16%',
        },
        ],
    }
  },
  mounted() {
    d3.csv('/planting/Plant_selector_rareandrangeltd_removed_ver1.0.csv', data => {
      this.plantData.push(data)
      console.log('this.plantData = ' + this.plantData)
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

    filteredPlants: function() {
      const settingTypeVar = this.agSettingType
      const applicationTypeVar = this.applicationType
      const ecosystemServicesTypeVar = this.ecosystemServiceType

      console.log('settingTypeVar = ' + settingTypeVar)
      console.log('applicationTypeVar = ' + applicationTypeVar)
      console.log('ecosystemServicesTypeVar = ' + ecosystemServicesTypeVar)

      if (this.plantData.length > 0) {
        console.log('this.plantData[0] = ' + JSON.stringify(this.plantData[0]))
        console.log(
          'plantData[0][settingTypeVar] = ' + this.plantData[0][settingTypeVar],
        )
        console.log(
          'plantData[0][applicationTypeVar] = ' +
            this.plantData[0][applicationTypeVar],
        )
        console.log(
          'plantData[0][ecosystemServicesTypeVar] = ' +
            this.plantData[0][ecosystemServicesTypeVar],
        )
        const settingMatches = this.plantData.filter(
          plant => plant[settingTypeVar] === '1',
        )
        const applicationMatches = settingMatches.filter(
          plant => plant[applicationTypeVar] === '1',
        )
        var ecosystemServicesMatches = undefined
        if (ecosystemServicesTypeVar == 'ALL') {
          // Apply all filters
          ecosystemServicesMatches = applicationMatches.filter(
            plant => plant['Drought_tolerant'] === '1',
          )
          ecosystemServicesMatches = ecosystemServicesMatches.filter(
            plant => plant['Salt_tolerant'] === '1',
          )
          ecosystemServicesMatches = ecosystemServicesMatches.filter(
            plant => plant['Erosion_control'] === '1',
          )
          ecosystemServicesMatches = ecosystemServicesMatches.filter(
            plant => plant['Fire_resistance'] === '1',
          )
        } else if (ecosystemServicesTypeVar == 'None') {
          ecosystemServicesMatches = applicationMatches
        } else {
          // Apply the specified filter
          ecosystemServicesMatches = applicationMatches.filter(
            plant => plant[ecosystemServicesTypeVar] === '1',
          )
        }
        return ecosystemServicesMatches
      } else {
        return []
      }
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
    rowClick() {
      console.log('TODO - handle the click')
    },
    familyComment(family) {
      var comment = 'placeholder comment'
      if (family == 'Asteraceae' || family == 'Compositae') {
        comment = 'Asteraceae and Compositae (Daisies and Asters). Native daisies such as Chrysocephalum and Helichrysum have shallow flowers that provide accessible nectar and pollen to pollinators. Some daisies such as Brachycomes also have long flowering periods, are widely available in nurseries and are compact and hardy. These families are generally well suited to complimentary understory planting but may require intensive weed management (mulch, herbicides) and herbivore management (fencing, guarding) during their establishment.'
      } else if (family == 'Dilleniaceae') {
        comment = 'The Hibbertias (Guinea flowers) come from this family and they can deal with a wide variety of soil types that occur across the focal agricultural regions. The hibbertia flower requires buzz pollination that excludes honey bees for pollination. Flowering is short, turnover is high and they only produce pollen so planting hibbertias will need to be supplemented with nectar producing species for native bees.'
      }

      else if (family == 'Leguminosae' || family == 'Fabaceae') {

        comment = 'Leguminoceae and Fabaceae (Legumes and peas). Along with providing additional soil benefits like being efficient nitrogen fixers (e.g. the legumes) this family include many core restoration plants that are very important for pollinators. A wide variety of plants from these families such as Acacia, Eutaxia, Daviesia, Dilwynia, Hardenbergia, Kennedia, Pultanaea and Templetonia species are all attractive to native pollinators. The wide diversity of growth forms and soil associations makes many plants from this family drought and/or salinity tolerant.'
      }
      else if (family == 'Melaleuca') {
        comment = 'Melaleuca (Myrtle). The abundant brush-like flowers of the Melaleuca attract numerous native bees as well as birds. Varieties suit a broad range of soil types and are often drought and salinity tolerant. The species present in the agricultural districts of South Australia grow from small shrubs to small trees. They are also generally easily propagated for use in direct seeding of broad-acre restoration (>2ha).'
      }
      return(comment)
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
.card-text {
  font-family: 'Montserrat', sans-serif;
}
.card-header {
  background-color: #a5d6a7;
}
.card-background-header {
  background-color: #b2ebf2;
}
.card-background {
  background-color: #e5ffff;
}
</style>
