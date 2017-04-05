
import { HomeConfig } from './home.config'
import { AppController, LeftController } from './home.controller'

angular
  .module('home', [])
  .config(HomeConfig)
  .controller('AppController', AppController)
  .controller('LeftController', LeftController)
