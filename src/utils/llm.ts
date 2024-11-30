import { jsonrepair } from 'jsonrepair';
import { opSysPrompt } from '../prompts/opSysPrompt';
import { spySysPrompt } from '../prompts/spySysPrompt';
import { createUserPrompt } from '../prompts/userPrompt';
import { GameState, OperativeMove, SpymasterMove } from './game';

type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

type LLMRequest = {
  messages: Message[]; // Array of messages in the conversation
  modelName: string; // OpenRouter model string (e.g. "openai/gpt-4o")
  stream?: boolean; // Whether to stream the response
  referer?: string; // Optional referer URL for OpenRouter identification (e.g. "https://mysite.com")
  title?: string; // Optional title header for OpenRouter identification (e.g. "My AI App")
};

const REFERRER = 'https://llmcodenames.com';
const TITLE = 'LLM Codenames';

export function createMessagesFromGameState(gameState: GameState): Message[] {
  const messages: Message[] = [];
  messages.push({
    role: 'system',
    content: gameState.currentRole === 'spymaster' ? spySysPrompt : opSysPrompt,
  });

  messages.push({
    role: 'user',
    content: createUserPrompt(gameState),
  });

  return messages;
}

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
    console.log('Messages:', request.messages);

    // 1 second delay to make the game less hectic
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch(CLOUDFLARE_WORKER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: request.messages,
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
