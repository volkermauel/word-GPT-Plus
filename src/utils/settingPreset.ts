import { i18n } from '@/i18n'
import { forceNumber, optionLists } from './common'
import { availableModelsForOpenweb } from './constant'
import { localStorageKey } from './enum'
import { setCookie, getCookie } from './cookie'

type componentType = 'input' | 'select' | 'inputNum'

interface ISettingOption {
  defaultValue: string | number
  saveKey?: string
  type?: componentType
  stepStyle?: 'temperature' | 'maxTokens'
  optionList?: { label: string; value: string }[]
  saveFunc?: (value: any) => void
  getFunc?: () => any
}

export type SettingNames =
  | 'api'
  | 'localLanguage'
  | 'replyLanguage'
  | 'openwebEndpoint'
  | 'openwebModelSelect'
  | 'openwebTemperature'
  | 'openwebCollections'
  | 'openwebToken'

const createStorageFuncs = (key: string, defaultValue: any) => ({
  getFunc: () => forceNumber(localStorage.getItem(key)) || defaultValue,
  saveFunc: (value: any) => localStorage.setItem(key, value.toString())
})

const inputSetting = (
  defaultValue: string,
  saveKey?: keyof typeof localStorageKey
): ISettingOption => ({
  defaultValue,
  saveKey,
  type: 'input'
})

const inputNumSetting = (
  defaultValue: number,
  saveKey: keyof typeof localStorageKey,
  stepStyle: 'temperature' | 'maxTokens'
) => ({
  defaultValue,
  saveKey,
  type: 'inputNum' as componentType,
  stepStyle,
  ...createStorageFuncs(localStorageKey[saveKey], defaultValue)
})

const selectSetting = (
  defaultValue: string,
  saveKey: keyof typeof localStorageKey,
  optionList: { label: string; value: string }[],
  availableModels: Record<string, string> = {}
) => ({
  defaultValue,
  saveKey,
  type: 'select' as componentType,
  optionList,
  getFunc: () => {
    const modelTemp =
      localStorage.getItem(localStorageKey[saveKey]) || defaultValue
    return Object.keys(availableModels).includes(modelTemp)
      ? availableModels[modelTemp]
      : Object.values(availableModels).includes(modelTemp)
        ? modelTemp
        : defaultValue
  }
})

const defaultInputSetting = inputSetting('')

export const settingPreset: Record<SettingNames, ISettingOption> = {
  api: {
    ...inputSetting('open-webui'),
    type: 'select',
    optionList: optionLists.apiList
  },
  localLanguage: {
    ...inputSetting('en'),
    type: 'select',
    optionList: optionLists.localLanguageList,
    saveFunc: (value: string) => {
      i18n.global.locale.value = value as 'en' | 'zh-cn'
      localStorage.setItem(localStorageKey.localLanguage, value)
    }
  },
  replyLanguage: {
    ...inputSetting('English'),
    type: 'select',
    optionList: optionLists.replyLanguageList
  },
  openwebEndpoint: {
    ...defaultInputSetting,
    getFunc: () =>
      getCookie(localStorageKey.openwebEndpoint) ||
      localStorage.getItem(localStorageKey.openwebEndpoint) ||
      '',
    saveFunc: (value: string) => {
      localStorage.setItem(localStorageKey.openwebEndpoint, value)
      setCookie(localStorageKey.openwebEndpoint, value)
    }
  },
  openwebModelSelect: selectSetting(
    '',
    'openwebModel',
    optionLists.openwebModelList,
    availableModelsForOpenweb
  ),
  openwebTemperature: inputNumSetting(0.7, 'openwebTemperature', 'temperature'),
  openwebCollections: defaultInputSetting,
  openwebToken: {
    ...defaultInputSetting,
    getFunc: () =>
      getCookie(localStorageKey.openwebToken) ||
      localStorage.getItem(localStorageKey.openwebToken) ||
      '',
    saveFunc: (value: string) => {
      localStorage.setItem(localStorageKey.openwebToken, value)
      setCookie(localStorageKey.openwebToken, value)
    }
  }
}
