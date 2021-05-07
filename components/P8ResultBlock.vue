<template>
  <div>
    <div class="headline">Total yield attributable to wild pollinators</div>
    <p8-line-chart :chartdata="yieldChartData" :chartoptions="chartOptions" />
    <p class="text-muted">
      <small v-if="!isShowYWildChart" @click="isShowYWildChart = true"
        >Show "yield attributable to wild pollinators" chart</small
      >
    </p>
    <template v-if="isShowYWildChart">
      <div class="headline">Yield attributable to wild pollinators</div>
      <p8-line-chart :chartdata="wildChartData" :chartoptions="chartOptions" />
    </template>
    <p class="text-muted">
      <small v-if="!isShowTable" @click="isShowTable = true"
        >Show data table</small
      >
    </p>
    <div v-if="isShowTable">
      <p>
        All of the numbers in this table are the outputs of the NatCap InVEST
        model. For definitions and explanations, read
        <a
          href="http://data.naturalcapitalproject.org/nightly-build/invest-users-guide/html/croppollination.html#final-results"
          target="_blank"
          >the NatCap InVEST documentation</a
        >.
      </p>
      <v-data-table
        :headers="headers"
        :items="rescaledRecords"
        class="elevation-1"
        :pagination.sync="pagination"
      >
        <template v-slot:items="props">
          <td v-for="curr of headers" :key="curr.value">
            {{ props.item[curr.value] }}
          </td>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import P8LineChart from '~/components/P8LineChart'

const noRevegNoVarroa = x => !x.has_reveg && !x.is_varroa
const revegNoVarroa = x => x.has_reveg && !x.is_varroa
const revegVarroa = x => x.has_reveg && x.is_varroa
const noRevegVarroa = x => !x.has_reveg && x.is_varroa

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
      isShowYWildChart: false,
      isShowTable: false,
      pagination: { rowsPerPage: 50 },
      headers: [
        { text: 'Year', value: 'year' },
        { text: 'Season', value: 'season' },
        { text: 'Reveg?', value: 'has_reveg' },
        { text: 'Varroa?', value: 'is_varroa' },
        { text: 'p_abund', value: 'p_abund' },
        { text: 'pdep_y_w', value: 'pdep_y_w' },
        { text: 'y_tot', value: 'y_tot' },
        { text: 'scaled_y_tot', value: 'scaled_y_tot' },
        { text: 'y_wild', value: 'y_wild' },
        { text: 'scaled_y_wild', value: 'scaled_y_wild' },
      ],
      chartOptions: {
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Years from now',
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Percentage (%) change from now (year 0)',
              },
            },
          ],
        },
      },
    }
  },
  computed: {
    yieldChartData() {
      const yTotMapper = e => ({ x: e.year, y: e.scaled_y_tot })
      return this.buildAllDatasetsForChart(yTotMapper)
    },
    wildChartData() {
      const yWildMapper = e => ({ x: e.year, y: e.scaled_y_wild })
      return this.buildAllDatasetsForChart(yWildMapper)
    },
    rescaledRecords() {
      const referenceRecord = this.records.find(e => e.year === 0)
      const initialYTot = referenceRecord.y_tot
      const initialYWild = referenceRecord.y_wild
      return this.records.map(e => ({
        ...e,
        scaled_y_tot: scale(initialYTot, e.y_tot),
        scaled_y_wild: scale(initialYWild, e.y_wild),
      }))
    },
  },
  methods: {
    buildAllDatasetsForChart(mapper) {
      const dashed = true
      return {
        datasets: [
          buildDataset(
            this.rescaledRecords,
            noRevegNoVarroa,
            mapper,
            'F15BB5',
            'no reveg, no varroa',
            dashed,
          ),
          buildDataset(
            this.rescaledRecords,
            noRevegVarroa,
            mapper,
            '5E548E',
            'no reveg, with varroa',
            dashed,
          ),
          buildDataset(
            this.rescaledRecords,
            revegNoVarroa,
            mapper,
            'F25F5C',
            'with reveg, no varroa',
          ),
          buildDataset(
            this.rescaledRecords,
            revegVarroa,
            mapper,
            '0EAD69',
            'with reveg, with varroa',
          ),
        ],
      }
    },
  },
}

function buildDataset(
  allRecords,
  filter,
  mapper,
  colour,
  label,
  isDashed = false,
) {
  const data = allRecords.filter(filter).map(mapper)
  return {
    label,
    data,
    borderWidth: 3,
    borderDash: isDashed ? [5, 5] : [],
    borderColor: '#' + colour,
    pointBackgroundColor: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    showLine: true,
    lineTension: 0, // no curves
    hidden: isDashed,
  }
}

function scale(ref, v) {
  return ((v - ref) / ref) * 100
}
</script>
