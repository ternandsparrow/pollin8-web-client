/* @ngInject */
class SidebarController {
  constructor ($mdSidenav, $mdMedia, $log, $scope) {
    this.$mdSidenav = $mdSidenav
    this.$mdMedia = $mdMedia
    this.$log = $log
    this.$scope = $scope
    this.configureScope()
  }

  configureScope () {
    this.$scope.menuItems = [
      {
        icon: 'home',
        title: 'Home',
        notes: "Let's get you up and running",
        view: 'home'
      },
      {
        icon: 'edit_location',
        title: 'Define property',
        notes: 'Define your current property',
        view: 'define'
      },
      {
        icon: 'library_books',
        title: 'Scenario library',
        notes: 'Manage your saved scenarios',
        view: 'scenario-lib'
      },
      {
        icon: 'pie_chart_outlined',
        title: 'Run calculation',
        notes: 'Calculate change to profit',
        view: 'calc'
      }
    ]
  }

  close () {
    let vm = this
    this.$mdSidenav('left').close().then(function () {
      vm.$log.debug('close LEFT is done')
    })
  }
}

export {SidebarController}
