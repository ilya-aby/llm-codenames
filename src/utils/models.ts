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

const kimiK2_6: LLMModel = {
  openrouter_model_id: 'moonshotai/kimi-k2.6',
  model_name: 'Kimi K2.6',
  short_name: 'K2.6',
  logo: moonshotLogo,
};

const gemini3_1Pro: LLMModel = {
  openrouter_model_id: 'google/gemini-3.1-pro-preview',
  model_name: 'Gemini 3.1 Pro',
  short_name: '3.1 Pro',
  logo: geminiLogo,
};

// Disabled models are kept here so re-enabling them does not lose ID or logo wiring.
export const disabledAgents: LLMModel[] = [kimiK2_6, gemini3_1Pro];

export const agents: LLMModel[] = [
  {
    openrouter_model_id: 'openai/gpt-5.6-sol',
    model_name: 'GPT-5.6 Sol',
    short_name: '5.6 Sol',
    logo: openaiLogo,
  },
  {
    openrouter_model_id: 'openai/gpt-5.6-terra',
    model_name: 'GPT-5.6 Terra',
    short_name: '5.6 Terra',
    logo: openaiLogo,
  },
  {
    openrouter_model_id: 'google/gemini-3.6-flash',
    model_name: 'Gemini 3.6 Flash',
    short_name: '3.6 Flash',
    logo: geminiLogo,
  },
  {
    openrouter_model_id: 'anthropic/claude-sonnet-5',
    model_name: 'Claude Sonnet 5',
    short_name: 'Sonnet 5',
    logo: anthropicLogo,
  },
  {
    openrouter_model_id: 'anthropic/claude-opus-5',
    model_name: 'Claude Opus 5',
    short_name: 'Opus 5',
    logo: anthropicLogo,
  },
  {
    openrouter_model_id: 'anthropic/claude-haiku-4.5',
    model_name: 'Claude Haiku 4.5',
    short_name: 'Haiku 4.5',
    logo: anthropicLogo,
  },
  {
    openrouter_model_id: 'x-ai/grok-4.5',
    model_name: 'Grok 4.5',
    short_name: 'Grok 4.5',
    logo: xaiLogo,
  },
  {
    openrouter_model_id: 'deepseek/deepseek-v4-pro',
    model_name: 'DeepSeek V4 Pro',
    short_name: 'V4 Pro',
    logo: deepseekLogo,
  },
  {
    openrouter_model_id: 'moonshotai/kimi-k3',
    model_name: 'Kimi K3',
    short_name: 'K3',
    logo: moonshotLogo,
  },
];
