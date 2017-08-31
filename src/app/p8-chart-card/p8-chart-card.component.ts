import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'p8-chart-card',
  templateUrl: './p8-chart-card.component.html',
  styleUrls: ['./p8-chart-card.component.css']
})
export class P8ChartCardComponent implements OnInit {

  @Input() data:{scenario:string, yearNum:number}[]
  @Input() yFieldName:string
  @Input() title:string
  @Input() yTickFormatter:(v:number) => string = v => {return '' + v}
  @Input() yUnitSymbol:string = ''

  yearDimension = null
  yearGroup = null
  cardTitle:string = null
  yAxisLabel:string = null
  x = window['d3'].scale.linear().domain([0,10])
  legend = window['dc'].legend().x(90).y(10).itemHeight(13).gap(5)
  ngOnInit() {
    let ndx = crossfilter(this.data)
    this.yearDimension = ndx.dimension((d) => {
      return [d.scenario, d.yearNum]
    })
    this.yearGroup = this.yearDimension.group().reduceSum((d) => {
      return d[this.yFieldName]
    })
    this.cardTitle = 'Results - ' + this.title
    let unitSymbol = this.yUnitSymbol.length ? ` (${this.yUnitSymbol})` : ''
    this.yAxisLabel = this.title + unitSymbol
  }

  chartCallback = (theChart:dc.SeriesChart, dc, d3) => {
    theChart
    .chart(c => {
      var radius = 4
      return dc.lineChart(c)
        .interpolate('cardinal')
        .renderDataPoints({radius: radius, fillOpacity: 0.8, strokeOpacity: 0.8})
        .dotRadius(radius * 1.4)
    })
    .seriesAccessor((d) => {
      let seriesNames = {
        wsp: 'With super pollinator habitat',
        wosp: 'Without super pollinator habitat'
      }
      return seriesNames[d.key[0]]
    })
    .keyAccessor((d) => {
      return d.key[1]
    })
    .valueAccessor((d) => {
      return d.value
    })
    .yAxis()
      .tickFormat(this.yTickFormatter)
    theChart.margins().left += 20
  }
}
