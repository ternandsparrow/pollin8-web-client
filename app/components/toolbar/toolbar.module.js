import { ToolbarController } from './toolbar.controller'

angular
  .module('toolbar', [])
  .component('pollin8Toolbar', {
    templateUrl: 'components/toolbar/toolbar.html',
    controller: ToolbarController,
    controllerAs: 'vm'
  })
