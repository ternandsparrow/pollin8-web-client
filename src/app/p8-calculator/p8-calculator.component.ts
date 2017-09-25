import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet'

import { P8EngineService, ScenarioModel } from '../p8-engine'

@Component({
  templateUrl: './p8-calculator.component.html',
  styleUrls: ['./p8-calculator.component.css']
})
export class P8CalculatorComponent implements OnInit {
  crops = [
    { value: 'lucerne', title: 'Lucerne'},
    { value: 'apple', title: 'Apples'},
    { value: 'pear', title: 'Pears'}
  ]
  nativeVegOptions = [
    { value: 'a', title: '0-5%'},
    { value: 'b', title: '5-10%'},
    { value: 'c', title: '10-20%'},
    { value: 'd', title: '20-40%'},
    { value: 'e', title: '40-80%'},
    { value: 'f', title: '80-100%'}
  ]
  areaUnits = [
    { value: 'ha', title: 'hectares', chartTitle: 'hectare'},
    { value: 'a', title: 'acres', chartTitle: 'acre'},
    { value: 'm2', title: 'metres squared', chartTitle: 'm2'}
  ]
  vegTypes = [
    { value: 'roadside', title: 'Road side', desc: 'no vegetation in fields, only along road sides'},
    { value: 'o2', title: 'Option 2', desc: 'something more than the bottom choice'},
    { value: 'o3', title: 'Option 3', desc: 'the goldilocks choice'},
    { value: 'o4', title: 'Option 4', desc: 'not quite total domination'},
    { value: 'super', title: 'Super pollination habitat', desc: 'specifically designed habitat to promote maximum pollination efficiency'}
  ]
  defaultScenario:ScenarioModel = {
    cropType: this.crops.filter(v => {return v.value === 'apple'})[0].value,
    fieldLocation: {
      lat: -34.97839266420273,
      lng: 138.70934486389163
    },
    nativeVegCover: this.nativeVegOptions.filter(v => {return v.value === 'c'})[0].value,
    fieldArea: {
      value: 123,
      units: this.areaUnits.filter(v => {return v.value === 'ha'})[0].value,
    },
    vegType: this.vegTypes.filter(v => {return v.value === 'roadside'})[0].value,
  }
  scenarioModel:ScenarioModel = {
    cropType: this.defaultScenario.cropType,
    fieldLocation: {
      lat: this.defaultScenario.fieldLocation.lat,
      lng: this.defaultScenario.fieldLocation.lng
    },
    nativeVegCover: this.defaultScenario.nativeVegCover,
    fieldArea: {
      value: this.defaultScenario.fieldArea.value,
      units: this.defaultScenario.fieldArea.units,
    },
    vegType: this.defaultScenario.vegType
  }
  LAYER_ESRI = {
		id: 'esrisat',
		layer: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
			maxZoom: 18,
			attribution: 'ESRi'
		})
	};
	LAYER_OSM = {
		id: 'openstreetmap',
		layer: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Open Street Map'
		})
  }
  HERE_hybridDay = L.tileLayer('https://{s}.{base}.maps.cit.api.here.com/maptile/2.1/{type}/{mapID}/hybrid.day/{z}/{x}/{y}/{size}/{format}?app_id={app_id}&app_code={app_code}&lg={language}', {
    attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
    subdomains: '1234',
    mapID: 'newest',
    app_id: 'zM6cic4akir1Yp2L2eXF',
    app_code: 'aEbtMxj4GbBX-3pvDgOMkQ',
    base: 'aerial',
    maxZoom: 20,
    type: 'maptile',
    language: 'eng',
    format: 'png8',
    size: '256'
  })
	layersControlOptions = { position: 'bottomright' }
	baseLayers = {
    'HERE Satellite': this.HERE_hybridDay,
		'ESRi Satellite': this.LAYER_ESRI.layer,
		'Open Street Map': this.LAYER_OSM.layer,
	}
	options = {
    zoom: 5,
    center: L.latLng([
      this.defaultScenario.fieldLocation.lat,
      this.defaultScenario.fieldLocation.lng 
    ])
  }
  currMapCentreLat:number = this.options.center.lat
  currMapCentreLng:number = this.options.center.lng
  getLat () {
    return this.currMapCentreLat
  }
  getLng () {
    return this.currMapCentreLng
  }
  mapRef:L.Map = null
  onMapReady (map: L.Map) {
    this.mapRef = map
    map.on('move', (event) => {
      let c = map.getCenter()
      this.currMapCentreLat = c.lat
      this.currMapCentreLng = c.lng
      if (!this.circle) {
        return
      }
      map.removeLayer(this.circle)
    })
  }
  circle:L.Layer = null
  showNativeVegCircle () {
    const requiredZoom = 15
    this.mapRef.setZoomAround(
      L.latLng([this.currMapCentreLat, this.currMapCentreLng]), requiredZoom
    )
    let addLayer = () => {
      let radiusInMetres = 1000
      this.circle = L.circle(
        [ this.currMapCentreLat, this.currMapCentreLng ],
        {
          radius: radiusInMetres,
          color: '#ffbbee'
        }
      )
      this.mapRef.addLayer(this.circle)
    }
    if (this.mapRef.getZoom() === requiredZoom) {
      addLayer()
      return
    }
    this.mapRef.on('zoomend', () => {
      addLayer()
      this.mapRef.off('zoomend')
    })
  }
  thousandDollarTickFormatter (v:number) {
    return '$' + (v / 1000) + 'k'
  }
  percentTickFormatter (v:number) {
    return v + '%'
  }

  constructor (private engine:P8EngineService) { }

  chartData = []
  ngOnInit() {
    this.updateCharts()
  }

  updateCharts () {
    this.chartData = this.engine.compute(this.scenarioModel)
    // TODO get charts to redraw
  }

  getSelectedAreaUnits () {
    let selectedUnits = this.scenarioModel.fieldArea.units
    let selectedUnitObj = this.areaUnits.find(item => {
      return item.value === selectedUnits
    })
    return selectedUnitObj.chartTitle
  }
}
