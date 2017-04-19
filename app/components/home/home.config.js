/* @ngInject */
function config ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('home', {
    url: '/home',
    views: {
      '': {
        template: require('./home.html'),
        controller: 'AppController',
        controllerAs: 'vm'
      }
    }
  })

  $urlRouterProvider.otherwise('/home')
}
export { config }
