/* @ngInject */
class ToolbarController {
  constructor ($scope, $http, $mdSidenav, $log, $timeout) {
    this.$scope = $scope
    this.$mdSidenav = $mdSidenav
    this.$log = $log
    this.$timeout = $timeout
    this.$http = $http
    this.toggleLeft = this.buildDelayedToggler('left')
    this.configureScope()
  }

  configureScope () {
    this.$scope.menuIcon = require('../../images/menu.svg')
    this.$scope.moreVertIcon = require('../../images/more_vert.svg')
  }

  /**
   * Supplies a function that will continue to operate until the
   * time is up.
   */
  debounce (func, wait, context) {
    var timer

    return function debounced () {
      var context = this.$scope
      var args = Array.prototype.slice.call(arguments)
      this.$timeout.cancel(timer)
      timer = this.$timeout(function () {
        timer = undefined
        func.apply(context, args)
      }, wait || 10)
    }
  }

  /**
   * Build handler to open/close a SideNav; when animation finishes
   * report completion in console
   */
  buildDelayedToggler (navID) {
    let vm = this
    return this.debounce(function () {
      vm.$mdSidenav(navID).toggle().then(function () {
        vm.$log.debug('toggle ' + navID + ' is done')
      })
    }, 200)
  }
}

export {ToolbarController}
