<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6 class="vw-100">
      <v-card>
        <v-card-title class="display-2">About the science</v-card-title>
        <v-card-text>
          <p>Built on the <a
            href="https://naturalcapitalproject.stanford.edu/invest/">NatCap
            InVEST</a> software.</p>
          <p>TODO - write some more.  This is more..</p>
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline">Plant Selector tool</v-card-title>
        <v-card-text>
          <h5>Bees and agriculture</h5>
            Crops vary considerably in their reliance on animal pollination. Some crops, such as almonds, apples and pears and lucerne depend almost entirely on insect pollination for fruit, nut and seed production. Intensive agriculture and landscape fragmentation have reduced support for insects and connectivity in the landscape. As a result, crop pollination is increasingly relying on services from a single species: the European honey bee – in both managed and feral hives. 
            <p/>
              This reliance on a single species is risky. Feral honey bee hives will decimate after incursion of the Varroa mite, which has already invaded all countries except Australia. This will result in pollination deficits and drive up the prices for managed hives. 
            <p/>
              In preparation for this, we promote sustainable management of native pollinator in agricultural landscapes. We aim to achieve this through bolstering native crop pollinating species through providing them with food and shelter.
            <p/>
          <h5>Setting realistic goals</h5>
            <p/>
            This web tool can assist in selecting plant species that are locally adapted and provide food for crop pollinating bees. Such plantings may also help to realise co-benefits such as fire abatement, shade and shelter for livestock, biological control of insect pests, erosion control, salinity mitigation and drought resistance, or simply just to increase to biodiversity at a site level. Plantings for co-benefits are not the same as ecosystem restoration. If the latter is your goal, please consult experts organisations (Land care, NRM, Local community groups)
            <p/>
          <h5>A diverse range of plants</h5>
            <p/>
            Planting a broader range of species is important to provide pollinators with sustenance. Smaller plants may provide resources and co-benefits within the first couple of seasons, but bushes and trees will create the microclimate in which these smaller plants can thrive, and provide more ecosystem services in the long run. So our advice is aim for structural and species diversity. Locality and soil are important to assist in plant selection. Existing remnant vegetation can be informative, but not all plants are easy to grow! Our advice focuses on plants that can be obtained and are locally adapted.
            <p/>
          <h5>Resource provision for pollinators</h5>
            All crops except almonds are visited by a wide variety of native bee species.  Some species are present year-round (feral honey bees), others often have multiple generations per year (furrow and blue-banded bees). This implies that bees need sustenance from early spring through to late autumn. Bees rely completely on flowers for food, as they only eat nectar and pollen. Nectar provides energy (carbohydrate), whilst pollen gives vital proteins and fats required to rear offspring. As a general aim, three pollen and three nectar resources should be present at any one time.
            <p/>
          <h5>Using the Tool</h5>
            This plant selector encompasses six Natural Resources Management regions in the temperate agricultural regions of South Australia. These regions have diverse range of vegetation communities, and at the farm level, many revegetation scenarios are possible. While the pollinator selector is prescriptive, we recommend working with local restoration professionals from an early stage when undertaking a revegetation project. Such collaboration will also ensure that the proposed revegetation is suitable for the chosen site.
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title class="headline">Revegetation resource accumulation curve</v-card-title>
        <v-card-text>
          <p>Plant form (e.g. understorey, midstorey and overstorey), flowering onset and flowing abundance are important factors for the provision of pollinator resources so understanding the trade-offs between these factors is important for planning the best mix of species for a site.  
          <p/>  For example, overstorey species will produce the greatest amount of habitat and flowering per plant and will therefore have the greatest effect on crop pollinators however, overstorey plants may not be reproductive (e.g. producing flowers) for 6-10 years and possibly won’t produce nesting cavities for 20 years. 
          <p/>   Mid story shrub layers will establish nesting and flowering resources within 1-2 years although planting them too closely will cause competition between plants reducing the overall fitness along with decreasing available ground nesting bee habitat. 
          <p/>   Understory species have the ability to produce resources very quickly however they are small, and due to their often short lifespans might require seasonal replanting. Selecting a diverse  mix of plant species and forms that are suited to the site is the most likely way of ensuring a sustainable revegetation project.</p>
          <img src="/reveg-curve.png?years=25" />
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { pageTitle } from '~/util/helpers'

export default {
  head: pageTitle('About the science'),
}
</script>

<style scoped>
</style>
