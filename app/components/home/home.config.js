/* @ngInject */
function HomeConfig ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('home', {
    url: '/home',
    views: {
      '': {
        templateUrl: 'components/home/home.html',
        controller: 'AppController',
        controllerAs: 'vm'
      }
    }
  })

  $urlRouterProvider.otherwise('/home')
}
export { HomeConfig }
