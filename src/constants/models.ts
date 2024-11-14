// Import logos
import anthropicLogo from '../assets/logos/anthropic.svg';
import geminiLogo from '../assets/logos/gemini.svg';
import metaLogo from '../assets/logos/meta.svg';
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
    openrouter_model_id: 'openai/gpt-4o',
    model_name: 'GPT-4o',
    short_name: '4o',
    logo: openaiLogo,
  },
  {
    openrouter_model_id: 'openai/gpt-4o-mini',
    model_name: 'GPT-4o mini',
    short_name: '4o mini',
    logo: openaiLogo,
  },
  {
    openrouter_model_id: 'openai/o1-mini',
    model_name: 'OpenAI o1-mini',
    short_name: 'o1 mini',
    logo: openaiLogo,
  },
  {
    openrouter_model_id: 'google/gemini-pro-1.5',
    model_name: 'Gemini Pro 1.5',
    short_name: 'Pro 1.5',
    logo: geminiLogo,
  },
  {
    openrouter_model_id: 'google/gemini-flash-1.5-8b',
    model_name: 'Gemini Flash 1.5 8B',
    short_name: 'Flash 1.5 8B',
    logo: geminiLogo,
  },
  {
    openrouter_model_id: 'anthropic/claude-3.5-sonnet',
    model_name: 'Claude 3.5 Sonnet',
    short_name: 'Sonnet 3.5',
    logo: anthropicLogo,
  },
  {
    openrouter_model_id: 'anthropic/claude-3-5-haiku',
    model_name: 'Claude 3.5 Haiku',
    short_name: 'Haiku 3.5',
    logo: anthropicLogo,
  },
  {
    openrouter_model_id: 'meta-llama/llama-3.2-90b-vision-instruct',
    model_name: 'Llama 3.2 90B',
    short_name: '3.2 90B',
    logo: metaLogo,
  },
  {
    openrouter_model_id: 'x-ai/grok-beta',
    model_name: 'Grok Beta',
    short_name: 'Grok',
    logo: xaiLogo,
  },
];