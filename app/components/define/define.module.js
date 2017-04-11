import { config } from './define.config'
import { DefineController } from './define.controller'

angular
  .module('define', ['ui-leaflet'])
  .config(config)
  .controller('DefineController', DefineController)
