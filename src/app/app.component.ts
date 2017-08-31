import { Component, OnInit } from '@angular/core'
import * as L from 'leaflet'

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
    zoom: 4,
    center: L.latLng([-28.071980301779845, 134.208984375])
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
    const requiredZoom = 14
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
  ngOnInit() {}

  data = [
    {
      "yearNum": 1,
      "scenario": "wsp",
      "cost": "10000",
      "pollEff": "10",
      "profit": "10000",
      "yield": "8800"
    },
    {
      "yearNum": 1,
      "scenario": "wosp",
      "cost": "100",
      "pollEff": "10",
      "profit": "19900",
      "yield": "10000"
    },
    {
      "yearNum": 2,
      "scenario": "wsp",
      "cost": "8000",
      "pollEff": "13",
      "profit": "12000",
      "yield": "11440"
    },
    {
      "yearNum": 2,
      "scenario": "wosp",
      "cost": "130",
      "pollEff": "11",
      "profit": "19870",
      "yield": "9800"
    },
    {
      "yearNum": 3,
      "scenario": "wsp",
      "cost": "6400",
      "pollEff": "17",
      "profit": "13600",
      "yield": "14960"
    },
    {
      "yearNum": 3,
      "scenario": "wosp",
      "cost": "169",
      "pollEff": "12",
      "profit": "19831",
      "yield": "9604"
    },
    {
      "yearNum": 4,
      "scenario": "wsp",
      "cost": "5120",
      "pollEff": "22",
      "profit": "14880",
      "yield": "19360"
    },
    {
      "yearNum": 4,
      "scenario": "wosp",
      "cost": "220",
      "pollEff": "13",
      "profit": "19780",
      "yield": "9412"
    },
    {
      "yearNum": 5,
      "scenario": "wsp",
      "cost": "4096",
      "pollEff": "28",
      "profit": "15904",
      "yield": "24640"
    },
    {
      "yearNum": 5,
      "scenario": "wosp",
      "cost": "418",
      "pollEff": "14",
      "profit": "19582",
      "yield": "9224"
    },
    {
      "yearNum": 6,
      "scenario": "wsp",
      "cost": "3277",
      "pollEff": "36",
      "profit": "16723",
      "yield": "31680"
    },
    {
      "yearNum": 6,
      "scenario": "wosp",
      "cost": "794",
      "pollEff": "15",
      "profit": "19206",
      "yield": "9040"
    },
    {
      "yearNum": 7,
      "scenario": "wsp",
      "cost": "2622",
      "pollEff": "46",
      "profit": "17378",
      "yield": "40480"
    },
    {
      "yearNum": 7,
      "scenario": "wosp",
      "cost": "1509",
      "pollEff": "16",
      "profit": "18491",
      "yield": "8859"
    },
    {
      "yearNum": 8,
      "scenario": "wsp",
      "cost": "2098",
      "pollEff": "59",
      "profit": "17902",
      "yield": "51920"
    },
    {
      "yearNum": 8,
      "scenario": "wosp",
      "cost": "2867",
      "pollEff": "17",
      "profit": "17133",
      "yield": "8682"
    },
    {
      "yearNum": 9,
      "scenario": "wsp",
      "cost": "1678",
      "pollEff": "76",
      "profit": "18322",
      "yield": "66880"
    },
    {
      "yearNum": 9,
      "scenario": "wosp",
      "cost": "5447",
      "pollEff": "18",
      "profit": "14553",
      "yield": "8508"
    },
    {
      "yearNum": 10,
      "scenario": "wsp",
      "cost": "1342",
      "pollEff": "97",
      "profit": "18658",
      "yield": "85360"
    },
    {
      "yearNum": 10,
      "scenario": "wosp",
      "cost": "10349",
      "pollEff": "19",
      "profit": "9651",
      "yield": "8338"
    }
  ]
}
