// Import logos
import anthropicLogo from '../assets/logos/anthropic.svg';
import deepseekLogo from '../assets/logos/deepseek.svg';
import geminiLogo from '../assets/logos/gemini.svg';
import moonshotLogo from '../assets/logos/moonshotLogo.png';
import openaiLogo from '../assets/logos/openai.svg';
import xaiLogo from '../assets/logos/xai.svg';

export type LLMModel = {
  openrouter_model_id: string;
  model_name: string;
  short_name: string;
  logo: string;
};

export const agents: LLMModel[] = [
  {
    openrouter_model_id: 'openai/gpt-5.4',
    model_name: 'GPT-5.4',
    short_name: '5.4',
    logo: openaiLogo,
  },
  {
    openrouter_model_id: 'openai/gpt-5.3-chat',
    model_name: 'GPT-5.3 Chat',
    short_name: '5.3 Chat',
    logo: openaiLogo,
  },
  {
    openrouter_model_id: 'google/gemini-3-pro-preview',
    model_name: 'Gemini 3 Pro',
    short_name: '3 Pro',
    logo: geminiLogo,
  },
  {
    openrouter_model_id: 'google/gemini-3-flash-preview',
    model_name: 'Gemini 3 Flash',
    short_name: '3 Flash',
    logo: geminiLogo,
  },
  {
    openrouter_model_id: 'anthropic/claude-sonnet-4.6',
    model_name: 'Claude Sonnet 4.6',
    short_name: 'Sonnet 4.6',
    logo: anthropicLogo,
  },
  {
    openrouter_model_id: 'anthropic/claude-opus-4.5',
    model_name: 'Claude Opus 4.5',
    short_name: 'Opus 4.5',
    logo: anthropicLogo,
  },
  {
    openrouter_model_id: 'anthropic/claude-haiku-4.5',
    model_name: 'Claude Haiku 4.5',
    short_name: 'Haiku 4.5',
    logo: anthropicLogo,
  },
  {
    openrouter_model_id: 'x-ai/grok-4.1-fast',
    model_name: 'Grok 4.1 Fast',
    short_name: 'Grok 4.1',
    logo: xaiLogo,
  },
  {
    openrouter_model_id: 'deepseek/deepseek-v3.2',
    model_name: 'DeepSeek V3.2',
    short_name: 'V3.2',
    logo: deepseekLogo,
  },
  {
    openrouter_model_id: 'moonshotai/kimi-k2.5',
    model_name: 'Kimi K2.5',
    short_name: 'K2.5',
    logo: moonshotLogo,
  },
];
