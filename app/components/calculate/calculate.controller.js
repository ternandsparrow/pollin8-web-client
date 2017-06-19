/* @ngInject */
class CalcController {
  constructor ($scope, $http, $mdDialog, $anchorScroll, $timeout, pollin8_algoEndpointUrl) {
    this.$scope = $scope
    this.$http = $http
    this.$mdDialog = $mdDialog
    this.$anchorScroll = $anchorScroll
    this.$timeout = $timeout
    this.pollin8_algoEndpointUrl = pollin8_algoEndpointUrl
    this.configureScope()
  }

  configureScope () {
    this.$scope.selectedResult = []
    this.$scope.response = []
    this.$scope.isResponseAvailable = () => {
      return this.$scope.response.length > 0
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

  getDisplayValue (item) {
    let isMoney = item.units === '$'
    if (isMoney) {
      return item.units + item.value
    }
    return item.value + item.units
  }

  getChangeDisplayValue (item) {
    let value = this.getDisplayValue(item)
    if (item.isNegative) {
      return '-' + value
    }
    return '+' + value
  }

  hitApi () {
    this.$scope.isLoading = true
    this.$scope.doingCalc = this.$http({
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
      this.$timeout(() => {
        this.$anchorScroll('anchor')
      }, 300)
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
