# Vivek Vishal’s portfolio

Share: **https://max-keviv.github.io/**

The root `index.html` redirects visitors to the live Cortana portfolio:
https://vivek-voice-portfolio.entrupreneur-vivek.chatgpt.site/

## Current application

The complete voice portfolio, hosted AI backend, build script, résumé, and tests are in [`portfolio/`](portfolio/README.md).

```sh
cd portfolio
cp .env.example .env
# Set GROQ_API_KEY in .env, then:
npm start
```

Requires Node.js 24+. Run `npm test` to check the backend and `npm run build` to create the Worker deployment artifact. Never commit `.env` or API keys.

GitHub Pages serves the redirect. The live application and its server-side Groq secret are hosted separately; pushing this repository does not redeploy that backend.

The previous portfolio’s source remains in the root `src/` and `public/` directories for reference.
