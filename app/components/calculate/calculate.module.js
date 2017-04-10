import { config } from './calculate.config'
import { CalcController } from './calculate.controller'

angular
  .module('calculate', [])
  .config(config)
  .controller('CalcController', CalcController)
