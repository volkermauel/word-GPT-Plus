const assert = require('node:assert/strict');
const { test } = require('node:test');
const {
  createChatCompletion,
  listPrompts,
  listCharacters
} = require('../src/api/open-webui');

test('createChatCompletion sends correct request and parses result', async () => {
  let calledUrl = '';
  let calledOptions;
  const mockResponse = {
    ok: true,
    status: 200,
    json: async () => ({ choices: [{ message: { content: 'hello\\nworld' } }] })
  };
  global.fetch = async (url, options) => {
    calledUrl = url;
    calledOptions = options;
    return mockResponse;
  };

  const result = await createChatCompletion({
    openwebEndpoint: 'http://test/',
    openwebModel: 'm',
    messages: [{ role: 'user', content: 'c' }],
    temperature: 1,
    collections: ['a', 'b'],
    openwebToken: 't'
  });

  assert.equal(calledUrl, 'http://test/api/chat/completions');
  assert.equal(calledOptions.method, 'POST');
  const body = JSON.parse(calledOptions.body);
  assert.equal(body.model, 'm');
  assert.deepEqual(body.metadata, { collections: ['a', 'b'] });
  assert.equal(calledOptions.headers.Authorization, 'Bearer t');
  assert.equal(result, 'hello\nworld');
});


test('listPrompts fetches prompt list', async () => {
  let calledUrl = '';
  let calledOptions;
  const mockResponse = {
    ok: true,
    status: 200,
    json: async () => [{ command: '/a', title: 'A', content: 'B' }]
  };
  global.fetch = async (url, options) => {
    calledUrl = url;
    calledOptions = options;
    return mockResponse;
  };

  const result = await listPrompts('http://test/', 't');

  assert.equal(calledUrl, 'http://test/api/prompts');
  assert.equal(calledOptions.method, 'GET');
  assert.equal(calledOptions.headers.Authorization, 'Bearer t');
  assert.deepEqual(result, [{ command: '/a', title: 'A', content: 'B' }]);
});

test('listCharacters fetches character list', async () => {
  let calledUrl = '';
  let calledOptions;
  const mockResponse = {
    ok: true,
    status: 200,
    json: async () => [{ name: 'Alice', prompt: 'hello' }]
  };
  global.fetch = async (url, options) => {
    calledUrl = url;
    calledOptions = options;
    return mockResponse;
  };

  const result = await listCharacters('http://test/', 't');

  assert.equal(calledUrl, 'http://test/api/characters');
  assert.equal(calledOptions.method, 'GET');
  assert.equal(calledOptions.headers.Authorization, 'Bearer t');
  assert.deepEqual(result, [{ name: 'Alice', prompt: 'hello' }]);
});
