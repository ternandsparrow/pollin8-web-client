/* @ngInject */
function config ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('define', {
    url: '/define',
    views: {
      '': {
        template: require('./define.html'),
        controller: 'DefineController',
        controllerAs: 'vm'
      }
    }
  })
}
export { config }
