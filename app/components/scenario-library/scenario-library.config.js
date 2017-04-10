/* @ngInject */
function config ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('scenario-lib', {
    url: '/scenario-lib',
    views: {
      '': {
        templateUrl: 'components/scenario-library/scenario-library.html',
        controller: 'ScenarioLibController',
        controllerAs: 'vm'
      }
    }
  })
}
export { config }
