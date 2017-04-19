/* @ngInject */
function config ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('scenario-lib', {
    url: '/scenario-lib',
    views: {
      '': {
        template: require('./scenario-library.html'),
        controller: 'ScenarioLibController',
        controllerAs: 'vm'
      }
    }
  })
}
export { config }
