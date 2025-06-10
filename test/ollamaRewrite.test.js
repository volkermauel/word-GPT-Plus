const assert = require('node:assert/strict')
const { test } = require('node:test')
const { createChatCompletion } = require('../src/api/ollama')

test('ollama returns reasoning and text', async () => {
  const endpoint = process.env.OLLAMA_ENDPOINT
  if (!endpoint) {
    console.log('Skipping test because OLLAMA_ENDPOINT is not set')
    return
  }
  const model = process.env.OLLAMA_MODEL || 'llama3'
  const messages = [
    { role: 'user', content: 'Return the JSON {"reason":"test","text":"hello"}'}
  ]
  const result = await createChatCompletion({
    ollamaEndpoint: endpoint,
    ollamaModel: model,
    messages,
    temperature: 0
  })
  const parsed = JSON.parse(result)
  assert.equal(parsed.reason, 'test')
  assert.equal(parsed.text, 'hello')
})
