import { Component, OnInit } from '@angular/core'
import * as L from 'leaflet'

import { P8EngineService, ScenarioModel } from './p8-engine'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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
    { value: 'ha', title: 'hectares'},
    { value: 'a', title: 'acres'},
    { value: 'm2', title: 'metres squared'}
  ]
  vegTypes = [
    { value: 'roadside', title: 'Road side'},
    { value: 'o2', title: 'Option 2'},
    { value: 'o3', title: 'Option 3'},
    { value: 'o4', title: 'Option 4'},
    { value: 'super', title: 'Super pollination habitat'}
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
      units: this.areaUnits.filter(v => {return v.value === 'a'})[0].value,
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
		layer: L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
			maxZoom: 18,
			attribution: 'ESRi'
		})
	};
	LAYER_OSM = {
		id: 'openstreetmap',
		layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Open Street Map'
		})
	}
	layersControlOptions = { position: 'bottomright' }
	baseLayers = {
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
        { radius: radiusInMetres }
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
  }
}
