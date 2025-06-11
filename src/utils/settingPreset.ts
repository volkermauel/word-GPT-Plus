import { i18n } from '@/i18n'
import { forceNumber, optionLists } from './common'
import {
  availableModels,
  availableModelsForGemini,
  availableModelsForGroq,
  availableModelsForOllama,
  availableModelsForOpenweb
} from './constant'
import { localStorageKey } from './enum'

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
  | 'officialAPIKey'
  | 'officialBasePath'
  | 'officialCustomModel'
  | 'officialTemperature'
  | 'officialMaxTokens'
  | 'officialModelSelect'
  | 'azureAPIKey'
  | 'azureAPIEndpoint'
  | 'azureDeploymentName'
  | 'azureTemperature'
  | 'azureMaxTokens'
  | 'azureAPIVersion'
  | 'geminiAPIKey'
  | 'geminiCustomModel'
  | 'geminiModelSelect'
  | 'geminiTemperature'
  | 'geminiMaxTokens'
  | 'ollamaEndpoint'
  | 'ollamaCustomModel'
  | 'ollamaModelSelect'
  | 'ollamaTemperature'
  | 'openwebEndpoint'
  | 'openwebCustomModel'
  | 'openwebModelSelect'
  | 'openwebTemperature'
  | 'openwebCollections'
  | 'groqAPIKey'
  | 'groqTemperature'
  | 'groqMaxTokens'
  | 'groqModelSelect'
  | 'groqCustomModel'

// Helper functions
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
    ...inputSetting('official'),
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
  officialAPIKey: inputSetting('', 'apiKey'),
  officialBasePath: inputSetting('', 'basePath'),
  officialCustomModel: inputSetting('', 'customModel'),
  officialTemperature: inputNumSetting(0.7, 'temperature', 'temperature'),
  officialMaxTokens: inputNumSetting(800, 'maxTokens', 'maxTokens'),
  officialModelSelect: selectSetting(
    availableModels['gpt-3.5'],
    'model',
    optionLists.officialModelList,
    availableModels
  ),
  azureAPIKey: defaultInputSetting,
  azureAPIEndpoint: defaultInputSetting,
  azureDeploymentName: defaultInputSetting,
  azureTemperature: inputNumSetting(0.7, 'azureTemperature', 'temperature'),
  azureMaxTokens: inputNumSetting(800, 'azureMaxTokens', 'maxTokens'),
  azureAPIVersion: defaultInputSetting,
  geminiAPIKey: defaultInputSetting,
  geminiCustomModel: defaultInputSetting,
  geminiModelSelect: selectSetting(
    availableModelsForGemini['gemini-1.5-pro'],
    'geminiModel',
    optionLists.geminiModelList,
    availableModelsForGemini
  ),
  geminiTemperature: inputNumSetting(0.7, 'geminiTemperature', 'temperature'),
  geminiMaxTokens: inputNumSetting(800, 'geminiMaxTokens', 'maxTokens'),
  ollamaEndpoint: defaultInputSetting,
  ollamaCustomModel: defaultInputSetting,
  ollamaModelSelect: selectSetting(
    availableModelsForOllama.llama2,
    'ollamaModel',
    optionLists.ollamaModelList,
    availableModelsForOllama
  ),
  ollamaTemperature: inputNumSetting(0.7, 'ollamaTemperature', 'temperature'),
  openwebEndpoint: defaultInputSetting,
  openwebCustomModel: defaultInputSetting,
  openwebModelSelect: selectSetting(
    '',
    'openwebModel',
    optionLists.openwebModelList,
    availableModelsForOpenweb
  ),
  openwebTemperature: inputNumSetting(0.7, 'openwebTemperature', 'temperature'),
  openwebCollections: defaultInputSetting,
  groqAPIKey: defaultInputSetting,
  groqTemperature: inputNumSetting(0.5, 'groqTemperature', 'temperature'),
  groqMaxTokens: inputNumSetting(1024, 'groqMaxTokens', 'maxTokens'),
  groqModelSelect: selectSetting(
    availableModelsForGroq['gemma2-9b-it'],
    'groqModel',
    optionLists.groqModelList,
    availableModelsForGroq
  ),
  groqCustomModel: defaultInputSetting
}
