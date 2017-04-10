/* @ngInject */
class AppController {
  constructor ($scope, $mdSidenav, $mdMedia, $http, $log, $timeout) {
    this.$mdMedia = $mdMedia
    this.$mdSidenav = $mdSidenav
    this.$scope = $scope
    this.$http = $http
    this.$log = $log
    this.$timeout = $timeout
    this.toggleLeft = this.buildDelayedToggler('left')
    this.configureScope()
  }

  configureScope () {
    this.$scope.response = "(nothing yet, click 'calculate')"
    this.$scope.isLoading = false
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

  hitApi () {
    this.$scope.isLoading = true
    this.$http({
      url: 'https://echo-service-dot-pollin8-web-client-162107.appspot.com/_ah/api/echo/v1/echo',
      method: 'POST',
      data: {'message': 'result from server'}
    }).then((resp) => {
      this.$scope.response = resp.data.message
      this.$scope.isLoading = false
    }, function (reason) {
      throw reason
    })
  }
}

export {AppController}
