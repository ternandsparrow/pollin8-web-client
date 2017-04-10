/* @ngInject */
class ScenarioLibController {
  constructor ($scope) {
    this.$scope = $scope
    this.configureScope()
  }

  configureScope () {
    this.$scope.title = 'Scenario Library'
  }
}

export {ScenarioLibController}
