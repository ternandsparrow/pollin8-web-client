function assertDefined (msg, val) {
  if (typeof val !== 'undefined') {
    return
  }
  // TODO check if val is empty
  throw new Error('Config problem: expected "' + msg +
    '" to be defined, but it wasn\'t. Cannot continue.')
}
function assertConfig (pollin8_userEndpointUrl, pollin8_algoEndpointUrl) {
  assertDefined('algorithm endpoint URL', pollin8_algoEndpointUrl)
  assertDefined('user endpoint URL', pollin8_userEndpointUrl)
}
export {assertConfig}
