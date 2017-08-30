import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { MdInputModule, MdMenuModule, MdButtonModule, MdSelectModule, MdCardModule, MdToolbarModule } from '@angular/material'
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import 'hammerjs'
import { LeafletModule } from '@asymmetrik/ngx-leaflet'

let mdComponents = [
  MdInputModule,
  MdMenuModule,
  MdButtonModule,
  MdSelectModule,
  MdCardModule,
  MdToolbarModule,
  BrowserAnimationsModule
]

import { AppComponent } from './app.component';
import { P8CardComponent } from './p8-card/p8-card.component';
import { DcChartModule } from './dc-chart'

@NgModule({
  declarations: [
    AppComponent,
    P8CardComponent
  ],
  imports: [
    BrowserModule,
    mdComponents,
    DcChartModule,
    LeafletModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
