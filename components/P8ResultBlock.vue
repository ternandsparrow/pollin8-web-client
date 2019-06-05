<template>
  <div>
    <div class="headline">Season: {{season}}</div>
    <p8-line-chart :chartdata="chartData"></p8-line-chart>
    <p class="text-muted"><small @click="isShowTable = true"
       v-if="!isShowTable">Show data table</small></p>
    <div v-if="isShowTable">
      <v-data-table
        :headers="headers"
        :items="relevantRecords"
        class="elevation-1"
        :pagination.sync="pagination"
        >
        <template v-slot:items="props">
          <td>{{ props.item.year }}</td>
          <td>{{ props.item.season }}</td>
          <td>{{ props.item.p_abund }}</td>
          <td>{{ props.item.pdep_y_w }}</td>
          <td>{{ props.item.y_tot }}</td>
          <td>{{ props.item.y_wild }}</td>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import P8LineChart from '~/components/P8LineChart'

export default {
  name: 'P8ResultBlock',
  components: {P8LineChart},
  props: {
    season: {
      type: String,
      required: true,
    },
    records: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isShowTable: false,
      pagination: {rowsPerPage: 25},
      headers: [
        { text: 'Year', value: 'year' },
        { text: 'Season', value: 'season' },
        { text: 'p_abund', value: 'p_abund' },
        { text: 'pdep_y_w', value: 'pdep_y_w' },
        { text: 'y_tot', value: 'y_tot' },
        { text: 'y_wild', value: 'y_wild' },
      ],
    }
  },
  computed: {
    relevantRecords () {
      return this.records.filter(e => e.season === this.season)
    },
    chartData() {
  return {
    labels: this.relevantRecords.map((e) => e.year),
    datasets: [
      buildDataset(
        'Total yield index (y_tot)',
        this.relevantRecords.map((e) => e.y_tot),
        '#FC2525',
      ),
      buildDataset(
        'Index of total yield attributable to wild pollinators (y_wild)',
        this.relevantRecords.map((e) => e.y_wild),
        '#05CBE1',
      ),
      buildDataset(
        'Average pollinator abundance on farm (p_abund)',
        this.relevantRecords.map((e) => e.p_abund),
        '#E15D05',
      ),
      buildDataset(
        'Index of potential pollination dependent yield attributable ' + 'to wild pollinators (pdep_y_w)',
        this.relevantRecords.map((e) => e.pdep_y_w),
        '#3105E1',
      ),
    ],
  }
    },
  },
}

function buildDataset(label, data, colour) {
  return {
    label,
    data,
    borderWidth: 1,
    borderColor: colour,
    pointBackgroundColor: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
  }
}
</script>
