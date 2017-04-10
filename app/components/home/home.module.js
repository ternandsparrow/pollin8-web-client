
import { HomeConfig } from './home.config'
import { AppController } from './home.controller'

angular
  .module('home', [])
  .config(HomeConfig)
  .controller('AppController', AppController)
