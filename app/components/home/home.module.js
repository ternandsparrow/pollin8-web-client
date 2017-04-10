import { config } from './home.config'
import { AppController } from './home.controller'

angular
  .module('home', [])
  .config(config)
  .controller('AppController', AppController)
