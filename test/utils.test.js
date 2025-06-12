const assert = require('node:assert/strict');
const { test } = require('node:test');

const utils = require('../src/utils/common.js');

// checkAuth tests

test('checkAuth returns correct boolean based on auth type', () => {
  assert.equal(utils.checkAuth({ type: 'open-webui' }), true);
  assert.equal(utils.checkAuth(null), false);
});

test('forceNumber converts various inputs to numbers', () => {
  assert.equal(utils.forceNumber('3'), 3);
  assert.equal(utils.forceNumber('0'), 0);
  assert.equal(utils.forceNumber('invalid'), 0);
  assert.equal(utils.forceNumber(null), 0);
});

test('getOptionList works for keys and values', () => {
  const map = { a: 'A', b: 'B' };
  assert.deepEqual(utils.getOptionList(map, 'key'), [
    { label: 'a', value: 'A' },
    { label: 'b', value: 'B' }
  ]);
  assert.deepEqual(utils.getOptionList(map, 'value'), [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' }
  ]);
  assert.deepEqual(utils.getOptionList(map, 'key', true), [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' }
  ]);
});

test('getLabel and getPlaceholder helpers append suffixes', () => {
  assert.equal(utils.getLabel('foo'), 'fooLabel');
  assert.equal(utils.getPlaceholder('foo'), 'fooPlaceholder');
});
