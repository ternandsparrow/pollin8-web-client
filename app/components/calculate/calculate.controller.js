/* @ngInject */
class CalcController {
  constructor ($scope, $http, $mdDialog, pollin8serverUrl) {
    this.$scope = $scope
    this.$http = $http
    this.$mdDialog = $mdDialog
    this.serverUrl = pollin8serverUrl
    this.configureScope()
  }

  configureScope () {
    this.$scope.response = "(nothing yet, click 'calculate')"
    this.$scope.isLoading = false
  }

  hitApi () {
    this.$scope.isLoading = true
    this.$http({
      url: this.serverUrl,
      method: 'POST',
      data: {'message': 'result from server'}
    }).then((resp) => {
      this.$scope.response = resp.data.message
      this.$scope.isLoading = false
    }, (reason) => {
      this.$scope.isLoading = false
      this.handleError(reason)
      throw reason
    })
  }

  handleError (reason) {
    this.$mdDialog.show(
      this.$mdDialog.alert()
        .clickOutsideToClose(true)
        .title("That didn't work like we planned")
        .textContent("Something has gone wrong. Check that you're still connected to the internet." +
          " If you are then the problem is on our side and we're working on it.")
        .ariaLabel('Action failed dialog')
        .ok('Got it!')
        .theme('somethingWrong')
    )
  }
}

export {CalcController}
