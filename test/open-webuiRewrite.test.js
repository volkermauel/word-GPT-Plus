const assert = require('node:assert/strict')
const { test } = require('node:test')
const { createChatCompletion } = require('../src/api/open-webui')

test('openwebui returns reasoning and text', async () => {
  const endpoint = process.env.OPENWEB_ENDPOINT
  if (!endpoint) {
    console.log('Skipping test because OPENWEB_ENDPOINT is not set')
    return
  }
  const model = process.env.OPENWEB_MODEL || 'gpt-3.5'
  const messages = [
    { role: 'user', content: 'Return the JSON {"reason":"test","text":"hello"}'}
  ]
  const result = await createChatCompletion({
    openwebEndpoint: endpoint,
    openwebModel: model,
    messages,
    temperature: 0
  })
  const parsed = JSON.parse(result)
  assert.equal(parsed.reason, 'test')
  assert.equal(parsed.text, 'hello')
})
