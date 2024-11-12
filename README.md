# Codenames AI

An implementation of the board game [Codenames](<https://en.wikipedia.org/wiki/Codenames_(board_game)>), with all four players replaced with LLM agents.

## Features

- Uses Netlify Functions as a proxy to make LLM calls
- Uses OpenRouter to enable hot-swapping of LLM models from different providers

## Technologies Used

- HTML
- CSS
- TS
- React
- Vite
- Netlify Functions
- OpenRouter & OpenAI JS client
- Tailwind

## Installation

- `npm install`
- dev server: `npx netlify dev` to run Netlify dev server along with llm proxy or `npm run dev` without the proxy
- for dev, add `OPENROUTER_API_KEY=` to `.env`
- prod: `npm run build`
- for prod, provide an `OPENROUTER_API_KEY` as a build variable
