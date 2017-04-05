/* @ngInject */
class AppController {
  constructor ($scope, $timeout, $mdSidenav, $mdMedia, $log, $http) {
    this.$mdMedia = $mdMedia
    this.$scope = $scope
    this.$timeout = $timeout
    this.$mdSidenav = $mdSidenav
    this.$log = $log
    this.$http = $http
    this.toggleLeft = this.buildDelayedToggler('left')
    this.configureScope()
  }

  configureScope () {
    this.$scope.response = "(nothing yet, click 'calculate')"
    this.$scope.isLoading = false
    this.$scope.menuItems = [
      {
        initial: 'GS',
        title: 'Getting started',
        notes: "Let's get you up and running"
      },
      {
        initial: 'SL',
        title: 'Scenario library',
        notes: 'Manage your saved scenarios'
      },
    ]
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

  buildToggler (navID) {
    let vm = this
    return function () {
      vm.$mdSidenav(navID).toggle().then(function () {
        vm.$log.debug('toggle ' + navID + ' is done')
      })
    }
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

/* @ngInject */
class LeftController {
  constructor ($mdSidenav, $log) {
    this.$mdSidenav = $mdSidenav
    this.$log = $log
  }

  close () {
    let vm = this
    this.$mdSidenav('left').close().then(function () {
      vm.$log.debug('close LEFT is done')
    })
  }
}

export {AppController, LeftController}
