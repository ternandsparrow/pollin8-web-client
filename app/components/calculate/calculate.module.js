import { config } from './calculate.config'
import { CalcController } from './calculate.controller'

angular
  .module('calculate', ['md.data.table'])
  .config(config)
  .controller('CalcController', CalcController)
