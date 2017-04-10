/* @ngInject */
class CalcController {
  constructor ($scope, $http) {
    this.$scope = $scope
    this.$http = $http
    this.configureScope()
  }

  configureScope () {
    this.$scope.response = "(nothing yet, click 'calculate')"
    this.$scope.isLoading = false
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

export {CalcController}
