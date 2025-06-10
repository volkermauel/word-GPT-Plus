const axios = require('axios');

async function createChatCompletion(options) {
  const formattedEndpoint = options.ollamaEndpoint.replace(/\/$/, '');
  const response = await axios.post(
    `${formattedEndpoint}/api/chat`,
    {
      model: options.ollamaModel,
      options: { temperature: options.temperature },
      stream: false,
      messages: options.messages,
    },
    { headers: { 'Content-Type': 'application/json' } }
  );

  if (response.status !== 200) {
    throw new Error(`Status code: ${response.status}`);
  }

  return response.data?.message?.content?.replace(/\\n/g, '\n') ?? '';
}

module.exports = { createChatCompletion };
