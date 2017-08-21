#!/usr/bin/env node
let deps = {
  'angular': '1.5.0',
  'angular-animate': '1.5.0',
  'angular-aria': '1.5.0',
  'angular-material': '1.1.3',
  'angular-material-data-table': '0.10.10',
  'angular-messages': '1.5.0',
  'angular-ui-router': '0.4.2',
  'jquery': '3.2.1',
  'ui-leaflet': '1.0.3',
  'ui-leaflet-draw': 'tomsaleeba/ui-leaflet-draw#issue-8'
}
for (let depName in deps) {
  let depVersion = deps[depName]
  let depDir = getDepDir(depName)
  console.log(`<script src="https://cdnjs.cloudflare.com/ajax/libs/${depDir}/${depVersion}/${depName}.min.js"></script>`)
}

function getDepDir (depName) {
  const dirMappings = {
    angular: 'angular.js'
  }
  let result = dirMappings[depName]
  if (typeof result !== 'undefined') {
    return result
  }
  return depName
}
