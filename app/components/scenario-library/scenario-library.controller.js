/* @ngInject */
class ScenarioLibController {
  constructor ($scope) {
    this.$scope = $scope
    this.configureScope()
  }

  configureScope () {
    this.$scope.title = 'Scenario Library'
    this.$scope.items = [
      {
        title: 'More scrub along north fence',
        area: {
          pollinator: 9,
          production: 83
        },
        lastSaved: new Date(),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum' +
          ' id placerat ipsum, a vulputate turpis. Sed est dolor, ullamcorper ac luctus nec'
      },
      {
        title: 'More scrub along west fence',
        area: {
          pollinator: 15,
          production: 77
        },
        lastSaved: new Date(),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum' +
          ' id placerat ipsum, a vulputate turpis. Sed est dolor, ullamcorper ac luctus nec'
      },
      {
        title: 'More scrub along east fence',
        area: {
          pollinator: 8,
          production: 84
        },
        lastSaved: new Date(),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum' +
          ' id placerat ipsum, a vulputate turpis. Sed est dolor, ullamcorper ac luctus nec'
      },
      {
        title: 'Super-pollinator in centre paddock',
        area: {
          pollinator: 3,
          production: 91
        },
        lastSaved: new Date(),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum' +
          ' id placerat ipsum, a vulputate turpis. Sed est dolor, ullamcorper ac luctus nec'
      },
      {
        title: 'Scrub on south neighbour',
        area: {
          pollinator: 0,
          production: 94
        },
        lastSaved: new Date(),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum' +
          ' id placerat ipsum, a vulputate turpis. Sed est dolor, ullamcorper ac luctus nec'
      }
    ]
  }
}

export {ScenarioLibController}
