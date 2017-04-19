import { SidebarController } from './sidebar.controller'

angular
  .module('sidebar', [])
  .component('sidebar', {
    controller: SidebarController,
    controllerAs: 'vm',
    restrict: 'E',
    template: require('./sidebar.html'),
    replace: true
  })
