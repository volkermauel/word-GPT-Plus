/**
 * Use the built in fetch API available in modern Node versions instead of
 * relying on axios. This keeps the module lightweight and avoids additional
 * runtime dependencies for the tests.
 */

async function createChatCompletion(options) {
  const formattedEndpoint = options.ollamaEndpoint.replace(/\/$/, '');
  const response = await fetch(`${formattedEndpoint}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: options.ollamaModel,
      options: { temperature: options.temperature },
      stream: false,
      messages: options.messages,
    })
  });

  if (!response.ok) {
    throw new Error(`Status code: ${response.status}`);
  }

  const data = await response.json();

  return data?.message?.content?.replace(/\\n/g, '\n') ?? '';
}

module.exports = { createChatCompletion };
