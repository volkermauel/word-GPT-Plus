interface IStringKeyMap {
  [propName: string]: any
}

type supportedPlatforms = 'official' | 'azure' | 'gemini' | 'ollama' | 'groq' | 'openweb'

type insertTypes = 'replace' |  'append' |  'newLine' | 'NoAction'