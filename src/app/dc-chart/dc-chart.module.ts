import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DcChartDirective } from './dc-chart.directive'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DcChartDirective
  ],
  exports: [
    DcChartDirective
  ]
})
export class DcChartModule { }
