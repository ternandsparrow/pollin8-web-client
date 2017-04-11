/* @ngInject */
class CalcController {
  constructor ($scope, $http, pollin8serverUrl) {
    this.$scope = $scope
    this.$http = $http
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
    }, function (reason) {
      throw reason
    })
  }
}

export {CalcController}
