import { resolve } from 'path'
import { Nuxt, Builder } from 'nuxt'
import test from 'ava'

// We keep the nuxt and server instance
// So we can close them at the end of the test
let nuxt = null

// Init Nuxt.js and create a server listening on localhost:4000
test.before(async () => {
  const config = {
    dev: false,
    rootDir: resolve(__dirname, '../..'),
  }
  nuxt = new Nuxt(config)
  await nuxt.ready()
  await new Builder(nuxt).build()
  await nuxt.server.listen(4000, 'localhost')
}, 30000)

// FIXME test hangs forever, possible fix
// https://github.com/nuxt/nuxt.js/issues/4144
//test('Route / exits and render HTML', async (t) => {
//const context = {}
//debugger
////const { html } = await nuxt.server.renderRoute('/', context)
//const resp = await nuxt.renderRoute('/', context)
//t.true(html.includes('Welcome to Pollin8'))
//})

test('simple test', async t => {
  t.true(2 > 1)
})

// Close server and ask nuxt to stop listening to file changes
test.after('Closing server and nuxt.js', () => {
  nuxt.close()
})
