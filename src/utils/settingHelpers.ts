export type ComponentType = 'input' | 'select' | 'inputNum'

export function getPrefixesForPlatform(platform: string): string[] {
  const cleaned = platform.replace(/-/g, '')
  const list = [platform, cleaned]
  if (platform === 'open-webui') {
    list.push('openweb')
  }
  return list
}

export function filterSettingsByType(
  form: Record<string, any>,
  preset: Record<string, { type?: ComponentType }>,
  platform: string,
  type: ComponentType
): string[] {
  const prefixes = getPrefixesForPlatform(platform)
  return Object.keys(form).filter(
    key => prefixes.some(p => key.startsWith(p)) && preset[key].type === type
  )
}

export function getApiInputSettings(
  form: Record<string, any>,
  preset: Record<string, { type?: ComponentType }>,
  platform: string
): string[] {
  return filterSettingsByType(form, preset, platform, 'input')
}

export function getApiNumSettings(
  form: Record<string, any>,
  preset: Record<string, { type?: ComponentType }>,
  platform: string
): string[] {
  return filterSettingsByType(form, preset, platform, 'inputNum')
}

export function getApiSelectSettings(
  form: Record<string, any>,
  preset: Record<string, { type?: ComponentType }>,
  platform: string
): string[] {
  return filterSettingsByType(form, preset, platform, 'select')
}
