const assert = require('node:assert/strict');
const { test } = require('node:test');
const { createChatCompletion } = require('../src/api/ollama');

test('createChatCompletion sends correct request and parses result', async () => {
  let calledUrl = '';
  let calledOptions;
  const mockResponse = {
    ok: true,
    status: 200,
    json: async () => ({ message: { content: 'hello\\nworld' } })
  };
  global.fetch = async (url, options) => {
    calledUrl = url;
    calledOptions = options;
    return mockResponse;
  };

  const result = await createChatCompletion({
    ollamaEndpoint: 'http://test/',
    ollamaModel: 'm',
    messages: [{ role: 'user', content: 'c' }],
    temperature: 1
  });

  assert.equal(calledUrl, 'http://test/api/chat');
  assert.equal(calledOptions.method, 'POST');
  const body = JSON.parse(calledOptions.body);
  assert.equal(body.model, 'm');
  assert.equal(result, 'hello\nworld');
});
