<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6 class="vw-100">
      <v-card class="card-background-header">
        <v-card-title class="display-2">Revegetation Planting Guide</v-card-title>
        <v-card-text class="card-text">
          <p>
            The three focal crops for this plant selector are apple, canola and
            lucerne because of their pollinator dependency. By selecting the
            agricultural region and then choosing the best type of pollination
            planting for your site a list of plants will be generated that can
            then be refined by additional ecosystem services that they will
            provide. Though the selector is themed towards these agricultural
            crops the fundamental logic behind this guide can suitably be used
            for alternative agriculture within the same area.
          </p>
        </v-card-text>
      </v-card>
      <v-card class="mt-4 card-background">
        <v-card-title class="headline">Step 1: Agricultural Region</v-card-title>
        <v-card-text class="card-text">
          <p>
            The regional areas associated with this agriculture are the southern
            Mount Lofty ranges, Northern Yorke Peninsula, Southern Yorke
            Peninsula Eyre Peninsula, and the South East.
          </p>
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
          <p>
            Available land area, site access and existing vegetation will impact
            on species selection and how they are applied. For example unless
            careful planning and appropriate resources are available it would be
            ill advised to attempt tube-stock planting in areas more than 2ha.
            Tubestock is also recommended for areas that have existing
            over-story and linear shelterbelt plantings. In areas greater than 2
            hectares, sown meadows and linear hedges the use of direct seeding
            of species that propagate easily is more appropriate.
          </p>
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
        <v-card-title class="headline">Step 3: Select additional plant attributes</v-card-title>
        <v-card-text class="card-text">
          <p>
            Along with the pollination benefits to agriculture, the plants used for ecological
            restoration can provide additional benefits to the site.  For example, some plants 
            are excellent at managing erosion, others are capable of thriving in dry/salty soils.
          </p>
          <p>
            Along with pollination services, what other attributes of the ecological restoration are
            important at your site?  These attributes guide which plants are most appropriate for your application.
          </p>
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
        </v-card-text>
      </v-card>
      <v-container>
        <div class="display-2 text-center">Planting Advice</div>
        <v-card class="mt-4 card-background" v-if="isShowOverstoreyResultSection">
          <v-card-title class="headline">Overstorey</v-card-title>
          <div id="results">
            <v-data-table
              :headers="headers"
              :items="filteredPlants(this.storeyCodes.upper)"
              :pagination.sync="pagination"
              item-key="common_name"
              class="elevation-1"
            >

              <template slot="items" slot-scope="props">
                <tr @click="props.expanded = !props.expanded">
                  <td class="text-xs-right">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <div v-bind="attrs" v-on="on">{{ props.item.FAMILY }}</div>
                      </template>
                      <span>{{ familyCommentShort(props.item.FAMILY) }}</span>
                    </v-tooltip>
                  </td>
                  <td class="text-xs-right">{{ props.item.GENUS }}</td>
                  <td class="text-xs-right">{{ props.item.SPECIES }}</td>
                  <td class="text-xs-right">{{ props.item.common_name }}</td>
                  <td class="text-xs-right">{{ props.item.Rainfall }}</td>
                  <td class="text-xs-right">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on">
                          {{
                          props.item.Standard_tube == '1'
                          ? 'mdi-checkbox-marked'
                          : 'mdi-checkbox-blank-outline'
                          }}
                        </v-icon>
                      </template>
                      <span>{{ tubeStockStandardComment() }}</span>
                    </v-tooltip>
                  </td>
                </tr>
              </template>
              <template v-slot:expand="props">
                <v-container grid-list-md text-xs-center>
                  <span>{{ familyCommentLong(props.item.FAMILY) }}</span>

                  <v-layout row justify-space-around>
                    <v-flex d-flex xs3>
                      <v-card>
                        <v-card-title class="h5">Floristics</v-card-title>
                        <span class="grey--text subtitle-1">This species flowers in:</span>
                        <v-card-text>
                          <div v-if="props.item.Summer == '1'">Summer</div>
                          <div v-if="props.item.Autumn == '1'">Autumn</div>
                          <div v-if="props.item.Winter == '1'">Winter</div>
                          <div v-if="props.item.Spring == '1'">Spring</div>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex d-flex xs3>
                      <v-card dark color="primary">
                        <v-card-title class="h5">Soils</v-card-title>
                        <span class="grey--text subtitle-1">
                          This species will grow well in the following
                          soils:
                        </span>
                        <v-card-text>
                          <div v-if="props.item.Sand == '1'">Sand</div>
                          <div v-if="props.item.Loam == '1'">Loam</div>
                          <div v-if="props.item.Clay == '1'">Clay</div>
                          <div v-if="props.item.Calcareous == '1'">Calcareous soil</div>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex d-flex xs3>
                      <v-card>
                        <v-card-title class="h5">Where to obtain</v-card-title>
                        <span class="grey--text subtitle-1">
                          This species can be obtained from nurseries and service providers such as:
                        </span>
                        <v-card-text>
                          <div><a href="https://treesforlife.org.au/order-seedlings" target="_blank">Trees For Life</a></div>
                          <div><a href="https://www.stateflora.sa.gov.au/buy-plants/how-to-order" target="_blank">State Flora</a></div>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
              </template>
            </v-data-table>
          </div>
        </v-card>

        <v-card class="mt-4 card-background" v-if="isShowMidstoreyResultSection">
          <v-card-title class="headline">Midstorey</v-card-title>
          <div id="results">
            <v-data-table
              :headers="headers"
              :items="filteredPlants(this.storeyCodes.mid)"
              :pagination.sync="pagination"
              item-key="common_name"
              class="elevation-1"
            >

              <template slot="items" slot-scope="props">
                <tr @click="props.expanded = !props.expanded">
                  <td class="text-xs-right">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <div v-bind="attrs" v-on="on">{{ props.item.FAMILY }}</div>
                      </template>
                      <span>{{ familyCommentShort(props.item.FAMILY) }}</span>
                    </v-tooltip>
                  </td>
                  <td class="text-xs-right">{{ props.item.GENUS }}</td>
                  <td class="text-xs-right">{{ props.item.SPECIES }}</td>
                  <td class="text-xs-right">{{ props.item.common_name }}</td>
                  <td class="text-xs-right">{{ props.item.Rainfall }}</td>
                  <td class="text-xs-right">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on">
                          {{
                          props.item.Standard_tube == '1'
                          ? 'mdi-checkbox-marked'
                          : 'mdi-checkbox-blank-outline'
                          }}
                        </v-icon>
                      </template>
                      <span>{{ tubeStockStandardComment() }}</span>
                    </v-tooltip>
                  </td>
                </tr>
              </template>
              <template v-slot:expand="props">
                <v-container grid-list-md text-xs-center>
                  <span>{{ familyCommentLong(props.item.FAMILY) }}</span>

                  <v-layout row justify-space-around>
                    <v-flex d-flex xs3>
                      <v-card>
                        <v-card-title class="h5">Floristics</v-card-title>
                        <span class="grey--text subtitle-1">This species flowers in:</span>
                        <v-card-text>
                          <div v-if="props.item.Summer == '1'">Summer</div>
                          <div v-if="props.item.Autumn == '1'">Autumn</div>
                          <div v-if="props.item.Winter == '1'">Winter</div>
                          <div v-if="props.item.Spring == '1'">Spring</div>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex d-flex xs3>
                      <v-card dark color="primary">
                        <v-card-title class="h5">Soils</v-card-title>
                        <span class="grey--text subtitle-1">
                          This species will grow well in the following
                          soils:
                        </span>
                        <v-card-text>
                          <div v-if="props.item.Sand == '1'">Sand</div>
                          <div v-if="props.item.Loam == '1'">Loam</div>
                          <div v-if="props.item.Clay == '1'">Clay</div>
                          <div v-if="props.item.Calcareous == '1'">Calcareous soil</div>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex d-flex xs3>
                      <v-card>
                        <v-card-title class="h5">Where to obtain</v-card-title>
                        <span class="grey--text subtitle-1">
                          This species can be obtained from nurseries and service providers such as:
                        </span>
                        <v-card-text>
                          <div><a href="https://treesforlife.org.au/order-seedlings" target="_blank">Trees For Life</a></div>
                          <div><a href="https://www.stateflora.sa.gov.au/buy-plants/how-to-order" target="_blank">State Flora</a></div>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
              </template>
            </v-data-table>
          </div>
        </v-card>
        
        <v-card class="mt-4 card-background" v-if="isShowUnderstoreyResultSection">
          <v-card-title class="headline">Understorey</v-card-title>
          <div id="results">
            <v-data-table
              :headers="headers"
              :items="filteredPlants(this.storeyCodes.under)"
              :pagination.sync="pagination"
              item-key="common_name"
              class="elevation-1"
            >

              <template slot="items" slot-scope="props">
                <tr @click="props.expanded = !props.expanded">
                  <td class="text-xs-right">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <div v-bind="attrs" v-on="on">{{ props.item.FAMILY }}</div>
                      </template>
                      <span>{{ familyCommentShort(props.item.FAMILY) }}</span>
                    </v-tooltip>
                  </td>
                  <td class="text-xs-right">{{ props.item.GENUS }}</td>
                  <td class="text-xs-right">{{ props.item.SPECIES }}</td>
                  <td class="text-xs-right">{{ props.item.common_name }}</td>
                  <td class="text-xs-right">{{ props.item.Rainfall }}</td>
                  <td class="text-xs-right">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on">
                          {{
                          props.item.Standard_tube == '1'
                          ? 'mdi-checkbox-marked'
                          : 'mdi-checkbox-blank-outline'
                          }}
                        </v-icon>
                      </template>
                      <span>{{ tubeStockStandardComment() }}</span>
                    </v-tooltip>
                  </td>
                </tr>
              </template>
              <template v-slot:expand="props">
                <v-container grid-list-md text-xs-center>
                  <span>{{ familyCommentLong(props.item.FAMILY) }}</span>

                  <v-layout row justify-space-around>
                    <v-flex d-flex xs3>
                      <v-card>
                        <v-card-title class="h5">Floristics</v-card-title>
                        <span class="grey--text subtitle-1">This species flowers in:</span>
                        <v-card-text>
                          <div v-if="props.item.Summer == '1'">Summer</div>
                          <div v-if="props.item.Autumn == '1'">Autumn</div>
                          <div v-if="props.item.Winter == '1'">Winter</div>
                          <div v-if="props.item.Spring == '1'">Spring</div>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex d-flex xs3>
                      <v-card dark color="primary">
                        <v-card-title class="h5">Soils</v-card-title>
                        <span class="grey--text subtitle-1">
                          This species will grow well in the following
                          soils:
                        </span>
                        <v-card-text>
                          <div v-if="props.item.Sand == '1'">Sand</div>
                          <div v-if="props.item.Loam == '1'">Loam</div>
                          <div v-if="props.item.Clay == '1'">Clay</div>
                          <div v-if="props.item.Calcareous == '1'">Calcareous soil</div>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex d-flex xs3>
                      <v-card>
                        <v-card-title class="h5">Where to obtain</v-card-title>
                        <span class="grey--text subtitle-1">
                          This species can be obtained from nurseries and service providers such as:
                        </span>
                        <v-card-text>
                          <div><a href="https://treesforlife.org.au/order-seedlings" target="_blank">Trees For Life</a></div>
                          <div><a href="https://www.stateflora.sa.gov.au/buy-plants/how-to-order" target="_blank">State Flora</a></div>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
              </template>
            </v-data-table>
          </div>
        </v-card>
      </v-container>
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
        { code: 'Standard_tube_LT', label: 'Bare Field (less than 2ha)' },
        { code: 'Standard_tube', label: 'Bare Field (more than 2ha)' },
        { code: 'Existing_overstorey', label: 'Existing over-story' },
        { code: 'Shelter_TS', label: 'Shelterbelt' },
        { code: 'Hedge_TS', label: 'Hedge' },
        { code: 'Meadow_DS', label: 'Meadow' },
      ],
      ecosystemServiceTypes: [
        { code: 'ALL', label: 'All' },
        { code: 'Drought_tolerant', label: 'Drought tolerance' },
        { code: 'Salt_tolerant', label: 'Salt tolerance' },
        { code: 'Erosion_control', label: 'Erosion control' },
        { code: 'Fire_resistance', label: 'Fire tolerance' },
        { code: 'None', label: 'No additional attributes (just Pollination)' },
      ],
      storeyCodes: {
        upper: 'Over over 5m',
        mid: 'Mid 2-5m',
        under: 'Under 2m'
      },
      // Nick Planting advice table
      pagination: {
        sortBy: 'name',
        rowsPerPage: 20,
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
          text: 'Available as standard tube stock',
          align: 'right',
          value: 'Standard_tube',
          width: '16%',
        },
      ],
    }
  },
  mounted() {
    d3.csv(
      '/planting/Plant_selector_rareandrangeltd_removed_ver1.0.csv',
      data => {
        this.plantData.push(data)
        console.log('this.plantData = ' + this.plantData)
      },
    )
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
    isShowOverstoreyResultSection() {
      //return this.$store.plantingAdviceResult.overStorey.length > 0
      return true
    },
    isShowMidstoreyResultSection() {
      //return this.$store.plantingAdviceResult.overStorey.length > 0
      return true
    },
    isShowUnderstoreyResultSection() {
      //return this.$store.plantingAdviceResult.overStorey.length > 0
      return true
    },
   
  },
  methods: {
    // async doPlantingGuideSearch() {
    //   var result = {
    //     species: [
    //       {
    //         family: 'Pittosporaceae',
    //         genus: 'Bursaria',
    //         species: 'spinosa ssp spinosa',
    //         common_name: 'christmas bush',
    //         uuid: 'PSsp110',
    //         es_rank: '14',
    //       },
    //       {
    //         family: 'Myrtaceae',
    //         genus: 'Callistemon',
    //         species: 'rugulosus',
    //         common_name: 'scarlet bottlebrush',
    //         uuid: 'PSsp80',
    //         es_rank: '14',
    //       },
    //     ],
    //   }
    //   this.$store.commit('plantingAdviceResult', result)
    // },
    rowClick() {
      console.log('TODO - handle the click')
    },
    filteredPlants: function(storey) {
      const settingTypeVar = this.agSettingType
      const applicationTypeVar = this.applicationType
      const ecosystemServicesTypeVar = this.ecosystemServiceType

      console.log('storey = ' + storey)
      console.log('settingTypeVar = ' + settingTypeVar)
      console.log('applicationTypeVar = ' + applicationTypeVar)
      console.log('ecosystemServicesTypeVar = ' + ecosystemServicesTypeVar)

      if (this.plantData.length > 0) {
        //console.log('this.plantData[0] = ' + JSON.stringify(this.plantData[0]))
        // console.log(
        //   'plantData[0][settingTypeVar] = ' + this.plantData[0][settingTypeVar],
        // )
        // console.log(
        //   'plantData[0][applicationTypeVar] = ' +
        //     this.plantData[0][applicationTypeVar],
        // )
        // console.log(
        //   'plantData[0][ecosystemServicesTypeVar] = ' +
        //     this.plantData[0][ecosystemServicesTypeVar],
        // )
        const settingMatches = this.plantData.filter(
          plant => plant[settingTypeVar] === '1',
        )

        var applicationMatches = undefined;
        if (applicationTypeVar == "Standard_tube_LT") {
          console.log("Munging <2HA selection")
          applicationMatches = settingMatches;
        } else {
          console.log("Applying application filters..")
          applicationMatches = settingMatches.filter(
            plant => plant[applicationTypeVar] === '1',
          )
        }
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
        // Apply storey match
        var storeyMatches = ecosystemServicesMatches.filter(
            plant => plant[storey] === '1',
          )
        return storeyMatches
      } else {
        return []
      }
    },
    familyCommentLong(family) {
      var comment = 'No further Family information'
      if (family == 'Asteraceae' || family == 'Compositae') {
        comment =
          'Asteraceae and Compositae (Daisies and Asters). Native daisies such as Chrysocephalum and Helichrysum have shallow flowers that provide accessible nectar and pollen to pollinators. Some daisies such as Brachycomes also have long flowering periods, are widely available in nurseries and are compact and hardy. These families are generally well suited to complimentary understory planting but may require intensive weed management (mulch, herbicides) and herbivore management (fencing, guarding) during their establishment.'
      } else if (family == 'Dilleniaceae') {
        comment =
          'The Hibbertias (Guinea flowers) come from this family and they can deal with a wide variety of soil types that occur across the focal agricultural regions. The hibbertia flower requires buzz pollination that excludes honey bees for pollination. Flowering is short, turnover is high and they only produce pollen so planting hibbertias will need to be supplemented with nectar producing species for native bees.'
      } else if (family == 'Goodeniaceae') {
        comment =
          'Goodeniaceae includes many small herbaceous plants such as Scaevola, Dampiera and Goodenia. This family are often pioneer species that establish well but can have short generation times. They are suited well to a broad variety of soil types, including disturbed sites. They are generally non-standard tubestock (e.g. striking’s from vegetative growth) because of a physical dormancy of seeds and therefore are not suitable for direct seeding.'
      } else if (family == 'Lilliaceae') {
        comment =
          'Lilliaceae includes a wide variety of plants. Generally this family is defined by herbaceous perennials which have evolved to be reasonably shade tolerant such as Arthropodium, Chamaescilla and Dianella. Pollen and nectar rewards are common in the family especially in spring and they are reasonably ubiquitous to many soil types throughout the focal agricultural regions of South Australia. Best applied at a site where some overstorey is present or as a follow up planting as the over story becomes established. '
      } else if (family == 'Leguminosae' || family == 'Fabaceae') {
        comment =
          'Leguminoceae and Fabaceae (Legumes and peas). Along with providing additional soil benefits like being efficient nitrogen fixers (e.g. the legumes) this family include many core restoration plants that are very important for pollinators. A wide variety of plants from these families such as Acacia, Eutaxia, Daviesia, Dilwynia, Hardenbergia, Kennedia, Pultanaea and Templetonia species are all attractive to native pollinators. The wide diversity of growth forms and soil associations makes many plants from this family drought and/or salinity tolerant.'
      } else if (family == 'Myrtaceae') {
        comment =
          'Myrtaceae (Callistemon, Gums, Myrtles and Tea trees). Many species from this family propagate well and produce prolific seed that are suited well to broader scale areas (>2ha) via direct seeding. Myrtaceaeous species also include many tight compact forms that flower profusely (e.g. tea trees and myrtles) and are ideally suited for screening or hedgerow or soil stabilisation applications in an agricultural setting.'
      } else if (family == 'Melaleuca') {
        comment =
          'Melaleuca (Myrtle). The abundant brush-like flowers of the Melaleuca attract numerous native bees as well as birds. Varieties suit a broad range of soil types and are often drought and salinity tolerant. The species present in the agricultural districts of South Australia grow from small shrubs to small trees. They are also generally easily propagated for use in direct seeding of broad-acre restoration (>2ha).'
      } else if (family == 'Leptospermum') {
        comment =
          'Leptospermum (Tea Tree) are attractive to native bees as well as many other wild pollinators that will flock to the cup-shaped flowers for the volumes of nectar available. With papery layered bark, tea trees range in size from small trees to prostrate shrubs and generally occur on nutrient poor skeletal soils and higher rainfall areas of the Adelaide hills and south-east agricultural districts.'
      } else if (family == 'Proteaceae') {
        comment =
          'Proteaceae (Hakeas, Proteas and Grevilleas). This family have some species in flower at most times of the year, although flowering between late winter and early summer is the most common. Grevilleas in particular attract a wide range of native bees, along with nectar-feeding birds. The family ranges in size from tall shrubs to prostrate varieties that are readily available at nurseries, are hardy and low maintenance and can help to stabilise soil for degraded land in an agricultural setting. '
      }
      return comment
    },
    familyCommentShort(family) {
      var comment = 'No further Family information'
      if (family == 'Asteraceae' || family == 'Compositae') {
        comment =
          'Asteraceae and Compositae (Daisies and Asters). Native daisies such as Chrysocephalum and Helichrysum have shallow flowers that provide accessible nectar and pollen to pollinators.'
      } else if (family == 'Dilleniaceae') {
        comment =
          'The Hibbertias (Guinea flowers) come from this family and they can deal with a wide variety of soil types that occur across the focal agricultural regions.'
      } else if (family == 'Goodeniaceae') {
        comment =
          'Goodeniaceae includes many small herbaceous plants such as Scaevola, Dampiera and Goodenia. This family are often pioneer species that establish well but can have short generation times.'
      } else if (family == 'Lilliaceae') {
        comment =
          'Lilliaceae includes a wide variety of plants. Generally this family is defined by herbaceous perennials which have evolved to be reasonably shade tolerant such as Arthropodium, Chamaescilla and Dianella.'
      } else if (family == 'Leguminosae' || family == 'Fabaceae') {
        comment =
          'Leguminoceae and Fabaceae (Legumes and peas). Along with providing additional soil benefits like being efficient nitrogen fixers (e.g. the legumes) this family include many core restoration plants that are very important for pollinators.'
      } else if (family == 'Myrtaceae') {
        comment =
          'Myrtaceae (Callistemon, Gums, Myrtles and Tea trees). Many species from this family propagate well and produce prolific seed that are suited well to broader scale areas (>2ha) via direct seeding.'
      } else if (family == 'Melaleuca') {
        comment =
          'Melaleuca (Myrtle). The abundant brush-like flowers of the Melaleuca attract numerous native bees as well as birds. Varieties suit a broad range of soil types and are often drought and salinity tolerant. '
      } else if (family == 'Leptospermum') {
        comment =
          'Leptospermum (Tea Tree) are attractive to native bees as well as many other wild pollinators that will flock to the cup-shaped flowers for the volumes of nectar available.'
      } else if (family == 'Proteaceae') {
        comment =
          'Proteaceae (Hakeas, Proteas and Grevilleas). This family have some species in flower at most times of the year, although flowering between late winter and early summer is the most common.'
      }
      return comment
    },
    tubeStockStandardComment() {
      return 'For seedlings purchased commercially the rule of thumb is that seed that propagates easily will be sold as the cheapest tubestock (referred to as standard in guide) and available for approximately $2-$3 at a commercial nursery (50 tubes to a tray for transporting). Plants that don’t propagate easily from seed because they need to be grown from vegetative growth or produce low quantities of seed are more expensive $3-$4 per tube (referred to as non-standard).'
    },
    tubeStockDirectComment() {
      return ''
    },
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
