import {
  availableAPIs,
  availableModelsForOpenweb,
  languageMap
} from './constant'

export interface Auth {
  type: supportedPlatforms
  [propName: string]: any
}

export function checkAuth(auth: Auth): boolean {
  if (!auth) return false

  switch (auth.type) {
    case 'open-webui':
      return true
    default:
      return false
  }
}

export function forceNumber(val: any): number {
  return Number(val) || 0
}

export function getOptionList(
  map: Record<string, string>,
  from: 'key' | 'value' = 'key',
  isUseValueAsLabel = false
) {
  return from === 'key'
    ? Object.keys(map).map(key => ({
        label: isUseValueAsLabel ? map[key] : key,
        value: map[key]
      }))
    : Object.values(map).map(key => ({
        label: key,
        value: key
      }))
}

const localLanguageList = [
  { label: 'English', value: 'en' },
  { label: 'Simplified Chinese', value: 'zh-cn' }
]

export const optionLists = {
  localLanguageList,
  apiList: getOptionList(availableAPIs),
  replyLanguageList: getOptionList(languageMap, 'value'),
  openwebModelList: getOptionList(availableModelsForOpenweb)
}

export const getLabel = (key: string) => `${key}Label`
export const getPlaceholder = (key: string) => `${key}Placeholder`
