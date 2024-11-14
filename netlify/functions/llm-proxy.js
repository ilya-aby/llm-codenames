import dotenv from 'dotenv';
import { jsonrepair } from 'jsonrepair';
import OpenAI from 'openai';
import process from 'process';

const SITE_URL = 'https://codenames-ai.abyzov.com';
const SITE_NAME = 'Codenames AI';

export async function handler(event) {
  dotenv.config();
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

  if (!OPENROUTER_API_KEY) {
    console.error('Missing OpenRouter API Key');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error: missing API key' }),
    };
  }

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'No request provided for LLM' }),
    };
  }

  const { prompt, model_name } = JSON.parse(event.body);

  const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: OPENROUTER_API_KEY,
    defaultHeaders: {
      'HTTP-Referer': SITE_URL,
      'X-Title': SITE_NAME,
    },
  });

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: prompt,
        },
      ],
      // Not supported by Grok, so disabling for now:
      // response_format: { type: 'json_object' },
      model: model_name,
    });

    console.log('LLM response headers:', completion);
    console.log('Raw LLM message:', completion.choices[0].message.content);

    if (completion.error) {
      throw new Error(completion.error.message || 'Unknown error from LLM');
    }

    const rawContent = completion.choices[0].message.content;

    // Sometimes LLMs like Gemini and Grok return markdown code blocks starting with ```json
    // We attempt to be defensive by discarding anything outside of the first and last curly braces
    const cleanContent = rawContent.substring(
      rawContent.indexOf('{'),
      rawContent.lastIndexOf('}') + 1
    );
    const repairedContent = jsonrepair(cleanContent);
    console.log('Cleaned & Repaired LLM response:', repairedContent);
    const responseArray = JSON.parse(repairedContent);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Netlify-CDN-Cache-Control': `public, s-maxage=${60 * 60 * 24}, stale-while-revalidate=${
          60 * 60 * 48
        }, durable`,
        'Netlify-Cache-Tag': 'codenames-ai',
      },
      body: JSON.stringify(responseArray),
    };
  } catch (error) {
    console.error('LLM Proxy Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to generate message',
        details: error.message,
      }),
    };
  }
}
