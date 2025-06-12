const assert = require('node:assert/strict')
const { test } = require('node:test')
const { createChatCompletion } = require('../src/api/open-webui')

test('openwebui returns numbered rewrite array', async () => {
  const endpoint = process.env.OPENWEB_ENDPOINT
  if (!endpoint) {
    console.log('Skipping test because OPENWEB_ENDPOINT is not set')
    return
  }
  const model = process.env.OPENWEB_MODEL || 'gpt-3.5'
  const messages = [
    { role: 'user', content: 'Return the JSON [{"paragraph":1,"rewrittenText":"hello","legalBasisReasoning":"reason"}]' }
  ]
  const result = await createChatCompletion({
    openwebEndpoint: endpoint,
    openwebModel: model,
    messages,
    temperature: 0
  })
  const parsed = JSON.parse(result)
  assert.equal(Array.isArray(parsed), true)
  assert.equal(parsed[0].paragraph, 1)
  assert.equal(parsed[0].rewrittenText, 'hello')
})
