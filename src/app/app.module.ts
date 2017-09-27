import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MdInputModule, MdMenuModule, MdButtonModule, MdSelectModule, MdCardModule, MdToolbarModule, MdRadioModule } from '@angular/material'
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import 'hammerjs'
import { LeafletModule } from '@asymmetrik/ngx-leaflet'

let mdComponents = [
  MdInputModule,
  MdMenuModule,
  MdButtonModule,
  MdSelectModule,
  MdRadioModule,
  MdCardModule,
  MdToolbarModule,
  BrowserAnimationsModule
]

import { AppComponent } from './app.component'
import { P8CardComponent } from './p8-card/p8-card.component'
import { DcChartModule } from './dc-chart'
import { P8ChartCardComponent } from './p8-chart-card/p8-chart-card.component'
import { P8EngineService } from './p8-engine';
import { P8AboutComponent } from './p8-about/p8-about.component'
import { P8HelpComponent } from './p8-help/p8-help.component';
import { P8CalculatorComponent } from './p8-calculator/p8-calculator.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

const appRoutes: Routes = [
  { path: 'app', component: P8CalculatorComponent },
  { path: 'help', component: P8HelpComponent },
  { path: 'about', component: P8AboutComponent },
  { path: '',
    redirectTo: '/app',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    P8CardComponent,
    P8ChartCardComponent,
    P8AboutComponent,
    P8HelpComponent,
    P8CalculatorComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    mdComponents,
    DcChartModule,
    LeafletModule.forRoot(),
    FormsModule,
    RouterModule.forRoot(appRoutes, {
      useHash: true // TODO change back to html5mode when we figure out how to config CloudFront to not intercept the URLs
    })
  ],
  providers: [
    P8EngineService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
