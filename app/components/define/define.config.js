/* @ngInject */
function config ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('define', {
    url: '/define',
    views: {
      '': {
        templateUrl: 'components/define/define.html',
        controller: 'DefineController',
        controllerAs: 'vm'
      }
    }
  })
}
export { config }
