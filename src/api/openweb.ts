import axios from 'axios'
import { BaseChatCompletionOptions } from './types'
import { updateResult, handleError, finishLoading } from './utils'

interface ChatCompletionStreamOptions extends BaseChatCompletionOptions {
  openwebEndpoint: string
  openwebAPIKey?: string
  openwebModel: string
  openwebCollection?: string
}

async function createChatCompletionStream(
  options: ChatCompletionStreamOptions
): Promise<void> {
  try {
    const endpoint = options.openwebEndpoint.replace(/\/$/, '')
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (options.openwebAPIKey) headers['Authorization'] = `Bearer ${options.openwebAPIKey}`
    const body: any = {
      model: options.openwebModel,
      stream: false,
      messages: options.messages,
      ...(options.temperature ? { temperature: options.temperature } : {})
    }
    if (options.openwebCollection) {
      body.metadata = { collection_names: [options.openwebCollection] }
    }
    const response = await axios.post(`${endpoint}/api/chat/completions`, body, { headers })
    if (response.status !== 200) {
      throw new Error(`Status code: ${response.status}`)
    }
    const content =
      response.data?.choices?.[0]?.message?.content?.replace(/\\n/g, '\n') ?? ''
    updateResult({ content }, options.result, options.historyDialog)
  } catch (error) {
    handleError(error as Error, options.result, options.errorIssue)
  } finally {
    finishLoading(options.loading)
  }
}

async function listModels(
  openwebEndpoint: string,
  openwebAPIKey?: string
): Promise<string[]> {
  try {
    const endpoint = openwebEndpoint.replace(/\/$/, '')
    const headers: Record<string, string> = {}
    if (openwebAPIKey) headers['Authorization'] = `Bearer ${openwebAPIKey}`
    const response = await axios.get(`${endpoint}/api/models`, { headers })
    if (response.status !== 200) {
      throw new Error(`Status code: ${response.status}`)
    }
    return response.data?.data?.map((item: { id: string }) => item.id) || []
  } catch (error) {
    console.error(error)
    return []
  }
}

async function listCollections(
  openwebEndpoint: string,
  openwebAPIKey?: string
): Promise<string[]> {
  try {
    const endpoint = openwebEndpoint.replace(/\/$/, '')
    const headers: Record<string, string> = {}
    if (openwebAPIKey) headers['Authorization'] = `Bearer ${openwebAPIKey}`
    const response = await axios.get(`${endpoint}/api/v1/knowledge`, { headers })
    if (response.status !== 200) {
      throw new Error(`Status code: ${response.status}`)
    }
    return (response.data || []).map((item: { id?: string; name?: string }) =>
      item.name || item.id
    )
  } catch (error) {
    console.error(error)
    return []
  }
}

export default { createChatCompletionStream, listModels, listCollections }
