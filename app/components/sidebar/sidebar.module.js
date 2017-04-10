import { SidebarController } from './sidebar.controller'

angular
  .module('sidebar', [])
  .component('sidebar', {
    controller: SidebarController,
    controllerAs: 'vm',
    restrict: 'E',
    templateUrl: 'components/sidebar/sidebar.html',
    replace: true
  })
