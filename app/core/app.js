module.exports = function (components) {
  /* Styles */
  require('../index.scss')

    /* JS */
  let deps = components.app
  for (let i = 0; i < deps.length; i++) {
    require('../components/' + deps[i] + '/' + deps[i] + '.module')
  }
}
