import { ToolbarController } from './toolbar.controller'

angular
  .module('toolbar', [])
  .component('pollin8Toolbar', {
    template: require('./toolbar.html'),
    controller: ToolbarController,
    controllerAs: 'vm'
  })
