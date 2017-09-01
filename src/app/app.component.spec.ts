import { TestBed, async } from '@angular/core/testing'
import { Component, Input, Injectable } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MdInputModule, MdMenuModule, MdButtonModule, MdSelectModule, MdCardModule, MdToolbarModule } from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
let mdComponents = [
  MdInputModule,
  MdMenuModule,
  MdButtonModule,
  MdSelectModule,
  MdCardModule,
  MdToolbarModule,
  BrowserAnimationsModule
]
import { LeafletModule } from '@asymmetrik/ngx-leaflet'

import { P8EngineService } from './p8-engine'

@Injectable()
class MockP8EngineService {}

@Component({
  selector: 'p8-card',
  template: '<p>mock</p>'
})
class MockP8CardComponent {}
@Component({
  selector: 'p8-chart-card',
  template: '<p>mock</p>'
})
class MockP8ChartCardComponent {
  @Input() data
  @Input() yTickFormatter
}

import { AppComponent } from './app.component'

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockP8CardComponent,
        MockP8ChartCardComponent
      ],
      imports: [
        FormsModule,
        mdComponents,
        LeafletModule.forRoot()
      ]
    })
    .overrideComponent(AppComponent, {
      set: {
        providers: [
          { provide: P8EngineService, useClass: MockP8EngineService }
        ]
      }
    })
    .compileComponents()
  }))

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  }))
})
