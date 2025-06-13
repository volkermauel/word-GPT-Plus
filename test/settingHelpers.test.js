const assert = require('node:assert/strict')
const { test } = require('node:test')

const {
  getApiInputSettings,
  getApiSelectSettings,
  getApiNumSettings
} = require('../src/utils/settingHelpers.js')

test('getApiInputSettings returns endpoint and token for open-webui', () => {
  const form = {
    openwebEndpoint: '',
    openwebToken: '',
    openwebTemperature: 1,
    openwebModelSelect: 'm'
  }
  const preset = {
    openwebEndpoint: { type: 'input' },
    openwebToken: { type: 'input' },
    openwebTemperature: { type: 'inputNum' },
    openwebModelSelect: { type: 'select' }
  }
  assert.deepEqual(
    getApiInputSettings(form, preset, 'open-webui'),
    ['openwebEndpoint', 'openwebToken']
  )
  assert.deepEqual(
    getApiNumSettings(form, preset, 'open-webui'),
    ['openwebTemperature']
  )
  assert.deepEqual(
    getApiSelectSettings(form, preset, 'open-webui'),
    ['openwebModelSelect']
  )
})
