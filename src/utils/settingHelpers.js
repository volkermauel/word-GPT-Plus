function getPrefixesForPlatform(platform) {
  const cleaned = platform.replace(/-/g, '')
  const list = [platform, cleaned]
  if (platform === 'open-webui') {
    list.push('openweb')
  }
  return list
}

function filterSettingsByType(form, preset, platform, type) {
  const prefixes = getPrefixesForPlatform(platform)
  return Object.keys(form).filter(
    key => prefixes.some(p => key.startsWith(p)) && preset[key].type === type
  )
}

function getApiInputSettings(form, preset, platform) {
  return filterSettingsByType(form, preset, platform, 'input')
}

function getApiNumSettings(form, preset, platform) {
  return filterSettingsByType(form, preset, platform, 'inputNum')
}

function getApiSelectSettings(form, preset, platform) {
  return filterSettingsByType(form, preset, platform, 'select')
}

module.exports = {
  getPrefixesForPlatform,
  filterSettingsByType,
  getApiInputSettings,
  getApiNumSettings,
  getApiSelectSettings
}
