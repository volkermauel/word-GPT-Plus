function checkAuth(auth) {
  if (!auth) return false;
  switch (auth.type) {
    case 'official':
      return !!auth.apiKey;
    case 'azure':
      return !!auth.azureAPIKey;
    case 'gemini':
      return !!auth.geminiAPIKey;
    case 'groq':
      return !!auth.groqAPIKey;
    case 'ollama':
      return true;
    case 'openweb':
      return true;
    default:
      return false;
  }
}

function forceNumber(val) {
  return Number(val) || 0;
}

function getOptionList(map, from = 'key', isUseValueAsLabel = false) {
  return from === 'key'
    ? Object.keys(map).map(key => ({
        label: isUseValueAsLabel ? map[key] : key,
        value: map[key]
      }))
    : Object.values(map).map(key => ({
        label: key,
        value: key
      }));
}

const localLanguageList = [
  { label: 'English', value: 'en' },
  { label: '简体中文', value: 'zh-cn' }
];

// optionLists from the original TypeScript module are omitted here since the
// tests only rely on the helper functions themselves.

const getLabel = key => `${key}Label`;
const getPlaceholder = key => `${key}Placeholder`;

module.exports = {
  checkAuth,
  forceNumber,
  getOptionList,
  getLabel,
  getPlaceholder
};
