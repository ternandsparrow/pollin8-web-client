/* @ngInject */
function config ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('calc', {
    url: '/calc',
    views: {
      '': {
        templateUrl: 'components/calculate/calculate.html',
        controller: 'CalcController',
        controllerAs: 'vm'
      }
    }
  })
}
export { config }
