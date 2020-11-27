import { Scatter } from 'vue-chartjs'

export default {
  extends: Scatter,
  props: {
    chartdata: {
      type: Object,
      required: true,
    },
    chartoptions: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.renderChart(this.chartdata, {
      responsive: true,
      maintainAspectRatio: false,
      ...this.chartoptions,
    })
  },
}
