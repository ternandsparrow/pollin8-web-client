import { config } from './scenario-library.config'
import { ScenarioLibController } from './scenario-library.controller'

angular
  .module('scenario-library', [])
  .config(config)
  .controller('ScenarioLibController', ScenarioLibController)
