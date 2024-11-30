import { jsonrepair } from 'jsonrepair';
import { OperativeMove, SpymasterMove } from './game';

type LLMRequest = {
  prompt: string; // The user prompt for the model
  modelName: string; // The OpenRouter model string (e.g. "openai/gpt4o")
  stream?: boolean; // Whether to stream the response
  referer?: string; // Optional referer URL for OpenRouter identification (e.g. "https://mysite.com")
  title?: string; // Optional title header for OpenRouter identification (e.g. "Codenames AI")
};

const REFERRER = 'https://llmcodenames.com';
const TITLE = 'LLM Codenames';

export async function fetchLLMResponse(
  request: LLMRequest,
): Promise<SpymasterMove | OperativeMove> {
  const CLOUDFLARE_WORKER_URL = import.meta.env.VITE_CLOUDFLARE_WORKER_URL || '';
  if (!CLOUDFLARE_WORKER_URL) {
    throw new Error(
      'Cloudflare Worker URL is not configured. Add VITE_CLOUDFLARE_WORKER_URL to .env',
    );
  }
  try {
    const response = await fetch(CLOUDFLARE_WORKER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: request.prompt,
        modelName: request.modelName,
        stream: false,
        referer: request.referer || REFERRER,
        title: request.title || TITLE,
      }),
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Response:', data);

    if (data.error) {
      throw new Error(data.error);
    }

    // Extract the actual content from the OpenRouter response format
    const rawContent = data.choices[0].message.content;

    // Clean and repair JSON (keeping this from the old proxy)
    const cleanContent = rawContent.substring(
      rawContent.indexOf('{'),
      rawContent.lastIndexOf('}') + 1,
    );
    const repairedContent = jsonrepair(cleanContent);
    return JSON.parse(repairedContent);
  } catch (error) {
    console.error('Error fetching LLM response:', error);
    throw error;
  }
}
