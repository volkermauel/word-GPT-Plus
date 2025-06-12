export const languageMap: IStringKeyMap = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  hi: 'हिन्दी',
  ar: 'العربية',
  'zh-cn': '简体中文',
  'zh-tw': '繁體中文',
  ja: '日本語',
  ko: '한국어',
  ru: 'Русский',
  nl: 'Nederlands',
  sv: 'Svenska',
  fi: 'Suomi',
  no: 'Norsk',
  da: 'Dansk',
  pl: 'Polski',
  tr: 'Türkçe',
  el: 'Ελληνικά',
  he: 'עברית',
  hu: 'Magyar',
  id: 'Bahasa Indonesia',
  ms: 'Bahasa Melayu',
  th: 'ไทย',
  vi: 'Tiếng Việt',
  uk: 'Українська',
  bg: 'Български',
  cs: 'Čeština',
  ro: 'Română',
  sk: 'Slovenčina',
  sl: 'Slovenščina',
  hr: 'Hrvatski',
  sr: 'Српски',
  bn: 'বাংলা',
  gu: 'ગુજરાતી',
  kn: 'ಕನ್ನಡ',
  mr: 'मराठी',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  ur: 'اردو'
}

export const availableAPIs: IStringKeyMap = {
  'open-webui': 'open-webui'
}

// official API 可用的模型
export const availableModelsForOpenweb: IStringKeyMap = {}

export const buildInPrompt = {
  translate: {
    system: (language: string) =>
      `You are a professional ${language} translator focused on accuracy and natural-sounding translations.`,
    user: (
      text: string,
      language: string
    ) => `Translate the following text into ${language}. Maintain the original meaning while using natural, 
    elegant expressions appropriate for native ${language} speakers. Improve the language quality 
    from basic to sophisticated where appropriate. Provide only the translation without explanations.

    Text to translate: ${text}`
  },
  polish: {
    system: (language: string) =>
      `You are a professional writing improvement assistant. Respond in ${language}.`,
    user: (
      text: string,
      language: string
    ) => `Improve this text in ${language} for clarity, concision, and readability:
    - Fix spelling and grammar
    - Break down overly long sentences
    - Reduce repetition
    - Enhance overall flow
    
    Provide only the improved version without explanations and any additional information: ${text}`
  },
  academic: {
    system: (language: string) =>
      `You are an expert academic editor specializing in scholarly publications. Respond in ${language}.`,
    user: (
      text: string,
      language: string
    ) => `Transform the following text into academic-quality writing suitable for a high-impact scientific journal:
    - Elevate vocabulary and phrasing while preserving meaning
    - Apply formal academic tone consistent with scholarly publications
    - Structure sentences and paragraphs for logical flow
    - Use precise terminology appropriate for scientific literature

    Provide only the revised text without explanations and Reply in ${language}: ${text}`
  },
  summary: {
    system: (language: string) =>
      `You are a professional text summarization expert. Respond in ${language}.`,
    user: (
      text: string,
      language: string
    ) => `Create a concise 100-word summary of this text that:
    - Captures the main points and key information
    - Is easy to read and understand
    - Maintains the core message
    - Uses clear, straightforward language
    Respond in ${language}.
    Text to summarize: ${text}`
  },
  grammar: {
    system: (language: string) =>
      `You are an expert grammar checker with exceptional attention to detail. Respond in ${language}.`,
    user: (
      text: string,
      language: string
    ) => `Review and correct any grammatical issues in this text:
    - Fix punctuation, spelling, and syntax errors
    - Ensure proper sentence structure and flow
    - Correct subject-verb agreement issues
    - Improve overall readability
      Respond in ${language}.
      If the text is already grammatically correct, respond only with "Sounds good."
      Otherwise, provide the corrected version: ${text}`
  },
  review: {
    system: (language: string) =>
      `You are an experienced editor who provides constructive feedback. Respond in ${language}.`,
    user: (
      text: string,
      language: string
    ) => `Review the following text and offer brief suggestions to improve clarity, structure, and tone.
    Reply in ${language} using bullet points.

    Text to review: ${text}`
  }
}
