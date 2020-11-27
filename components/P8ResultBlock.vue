<template>
  <div>
    <div class="headline">Yield and pollination</div>
    <p8-line-chart :chartdata="chartData" :chartoptions="chartOptions" />
    <p class="text-muted">
      <small v-if="!isShowTable" @click="isShowTable = true"
        >Show data table</small
      >
    </p>
    <div v-if="isShowTable">
      <v-data-table
        :headers="headers"
        :items="records"
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

const yTotLabel = 'Total yield index (y_tot)'
const yTotId = 'y_tot_axis'
const yWildLabel =
  'Index of total yield attributable to wild pollinators (y_wild)'
const yWildId = 'y_wild_axis'

export default {
  name: 'P8ResultBlock',
  components: { P8LineChart },
  props: {
    records: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isShowTable: false,
      pagination: { rowsPerPage: 25 },
      headers: [
        { text: 'Year', value: 'year' },
        { text: 'Season', value: 'season' },
        { text: 'p_abund', value: 'p_abund' },
        { text: 'pdep_y_w', value: 'pdep_y_w' },
        { text: 'y_tot', value: 'y_tot' },
        { text: 'y_wild', value: 'y_wild' },
      ],
      chartOptions: {
        scales: {
          yAxes: [
            {
              type: 'linear',
              display: true,
              position: 'left',
              scaleLabel: {
                display: true,
                labelString: yTotLabel,
              },
              id: yTotId,
            },
            {
              type: 'linear',
              display: true,
              position: 'right',
              scaleLabel: {
                display: true,
                labelString: yWildLabel,
              },
              id: yWildId,
              gridLines: {
                // only want the grid lines for one axis to show up
                drawOnChartArea: false,
              },
            },
          ],
        },
      },
    }
  },
  computed: {
    chartData() {
      return {
        datasets: [
          buildDataset(
            yTotLabel,
            this.records.map(e => ({ x: e.year, y: e.y_tot })),
            '#FC2525',
            yTotId,
          ),
          buildDataset(
            yWildLabel,
            this.records.map(e => ({ x: e.year, y: e.y_wild })),
            '#05CBE1',
            yWildId,
          ),
        ],
      }
    },
  },
}

function buildDataset(label, data, colour, axisId) {
  return {
    label,
    data,
    borderWidth: 1,
    borderColor: colour,
    pointBackgroundColor: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    showLine: true,
    yAxisID: axisId,
  }
}
</script>
