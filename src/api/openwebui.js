/**
 * Use the built in fetch API available in modern Node versions instead of
 * relying on axios. This mirrors the functionality of the TypeScript
 * openweb API but keeps it lightweight for tests or simple scripts.
 */

async function createChatCompletion(options) {
  const formattedEndpoint = options.openwebEndpoint.replace(/\/$/, '');
  const payload = {
    model: options.openwebModel,
    messages: options.messages,
    stream: false,
    temperature: options.temperature,
  };
  if (options.collections && options.collections.length) {
    payload.metadata = { collections: options.collections };
  }

  const response = await fetch(`${formattedEndpoint}/api/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(options.openwebToken
        ? { Authorization: `Bearer ${options.openwebToken}` }
        : {})
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Status code: ${response.status}`);
  }

  const data = await response.json();

  return data?.choices?.[0]?.message?.content?.replace(/\\n/g, '\n') ?? '';
}

module.exports = { createChatCompletion };
