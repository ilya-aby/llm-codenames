# Codenames AI

![Codenames AI Screenshot](/public/codenames-screenshot.png)

An implementation of the board game [Codenames](<https://en.wikipedia.org/wiki/Codenames_(board_game)>), with all four players replaced with LLM agents.

## Features

- Uses Cloudflare Workers as a proxy to make LLM calls. Proxy we're using is defined [here](https://github.com/ilya-aby/llm-proxy) with instructions on how to deploy it to Cloudflare
- Uses OpenRouter to enable hot-swapping of LLM models from different providers

## Technologies Used

- HTML
- CSS
- TS
- React
- Vite
- Cloudflare Workers
- OpenRouter
- Tailwind

## Installation

- `bun install`
- dev server: `bun run dev`
- for dev, add `VITE_CLOUDFLARE_WORKER_URL=` to `.env` and set it to the URL of the proxy worker that will relay the LLM API calls
- prod: `bun run build`
- for prod, provide an `VITE_CLOUDFLARE_WORKER_URL` as a build variable
