/* @ngInject */
function config ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('calc', {
    url: '/calc',
    views: {
      '': {
        template: require('./calculate.html'),
        controller: 'CalcController',
        controllerAs: 'vm'
      }
    }
  })
}
export { config }
