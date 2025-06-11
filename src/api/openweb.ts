import axios from 'axios'
import { BaseChatCompletionOptions } from './types'
import { updateResult, handleError, finishLoading } from './utils'

interface ChatCompletionStreamOptions extends BaseChatCompletionOptions {
  openwebEndpoint: string
  openwebModel: string
  collections?: string[]
  openwebToken?: string
}

async function createChatCompletionStream(
  options: ChatCompletionStreamOptions
): Promise<void> {
  try {
    const endpoint = options.openwebEndpoint.replace(/\/$/, '')
    const response = await axios.post(
      `${endpoint}/openai/chat/completions`,
      {
        model: options.openwebModel,
        messages: options.messages,
        stream: false,
        temperature: options.temperature,
        ...(options.collections && options.collections.length
          ? { metadata: { collections: options.collections } }
          : {})
      },
      {
        headers: {
          'Content-Type': 'application/json',
          ...(options.openwebToken
            ? { Authorization: `Bearer ${options.openwebToken}` }
            : {})
        }
      }
    )

    if (response.status !== 200) {
      throw new Error(`Status code: ${response.status}`)
    }

    updateResult(
      {
        content:
          response.data?.choices?.[0]?.message?.content?.replace(
            /\\n/g,
            '\n'
          ) ?? ''
      },
      options.result,
      options.historyDialog
    )
  } catch (error) {
    handleError(error as Error, options.result, options.errorIssue)
  } finally {
    finishLoading(options.loading)
  }
}

async function listModels(
  openwebEndpoint: string,
  openwebToken?: string
): Promise<string[]> {
  try {
    const endpoint = openwebEndpoint.replace(/\/$/, '')
    const response = await axios.get(`${endpoint}/api/v1/models`, {
      headers: {
        ...(openwebToken ? { Authorization: `Bearer ${openwebToken}` } : {})
      }
    })
    if (response.status !== 200) {
      throw new Error(`Status code: ${response.status}`)
    }
    return response.data?.map((item: { id: string }) => item.id) || []
  } catch (error) {
    console.error(error)
    return []
  }
}

async function queryCollections(
  openwebEndpoint: string,
  collections: string[],
  query: string,
  openwebToken?: string
): Promise<any> {
  try {
    const endpoint = openwebEndpoint.replace(/\/$/, '')
    const response = await axios.post(
      `${endpoint}/api/v1/retrieval/query/collection`,
      {
        collection_names: collections,
        query
      },
      {
        headers: {
          'Content-Type': 'application/json',
          ...(openwebToken ? { Authorization: `Bearer ${openwebToken}` } : {})
        }
      }
    )
    if (response.status !== 200) {
      throw new Error(`Status code: ${response.status}`)
    }
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

interface ChatCompletionOptions {
  openwebEndpoint: string
  openwebModel: string
  messages: { role: string; content: string }[]
  temperature: number
  collections?: string[]
  openwebToken?: string
}

async function createChatCompletion(
  options: ChatCompletionOptions
): Promise<string> {
  const endpoint = options.openwebEndpoint.replace(/\/$/, '')
  const response = await axios.post(
    `${endpoint}/openai/chat/completions`,
    {
      model: options.openwebModel,
      messages: options.messages,
      stream: false,
      temperature: options.temperature,
      ...(options.collections && options.collections.length
        ? { metadata: { collections: options.collections } }
        : {})
    },
    {
      headers: {
        'Content-Type': 'application/json',
        ...(options.openwebToken
          ? { Authorization: `Bearer ${options.openwebToken}` }
          : {})
      }
    }
  )

  if (response.status !== 200) {
    throw new Error(`Status code: ${response.status}`)
  }

  return (
    response.data?.choices?.[0]?.message?.content?.replace(/\\n/g, '\n') ?? ''
  )
}

export default {
  createChatCompletionStream,
  createChatCompletion,
  listModels,
  queryCollections
}
