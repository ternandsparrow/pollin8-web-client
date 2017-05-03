/* @ngInject */
class CalcController {
  constructor ($scope, $http, $mdDialog, pollin8_algoEndpointUrl) {
    this.$scope = $scope
    this.$http = $http
    this.$mdDialog = $mdDialog
    this.pollin8_algoEndpointUrl = pollin8_algoEndpointUrl
    this.configureScope()
  }

  configureScope () {
    let defaultAmount = {
      isPositive: true,
      value: 0
    }
    this.$scope.response = {
      profit: defaultAmount,
      efficiency: defaultAmount,
      yield: defaultAmount
    }
    this.$scope.isLoading = false
    this.$scope.baselines = [
      'Baseline saved on 10 March 2017',
      'Baseline saved on 03 April 2017'
    ]
    this.$scope.selectedBaseline = ''
    this.$scope.scenarios = [
      'More scrub along north fence',
      'More scrub along west fence',
      'More scrub along east fence',
      'Scrub on south neighbour',
      'Super-pollinator in centre paddock'
    ]
    this.$scope.selectedScenario = ''
    this.$scope.commoditityValueUnits = [
      'per ton',
      'per kilogram'
    ]
    this.$scope.overheadValueUnits = [
      'per hectare',
      'per square metre'
    ]
  }

  hitApi () {
    this.$scope.isLoading = true
    this.$http({
      url: this.pollin8_algoEndpointUrl + '/v1/run-scenario',
      method: 'POST',
      data: {
        baseline: {
          // TODO add details
        },
        scenario: {
          // TODO add details
        }
      }
    }).then((resp) => {
      this.$scope.response = resp.data
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
