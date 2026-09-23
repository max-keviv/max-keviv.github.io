# Vivek + Cortana

Voice-first portfolio with a hosted Groq chat backend. No model downloads or GPU requirements for visitors.

## Local development
Node.js 24+; no npm dependencies. Copy `.env.example` to `.env`, set `GROQ_API_KEY`, then run `npm start` (default http://localhost:4174). Never commit `.env` or place provider credentials in `dist/`. Use Groq's free plan; do not enable paid auto-upgrades for this zero-budget project.

The default model is `qwen/qwen3.8-27b`, currently listed in Groq's free limits and preview model catalog. Set `GROQ_MODEL` to another available model if availability changes. Account model permissions and limits must be checked with a real key. Open models still require hosted inference resources; free quotas are finite.

## Chat and voice
The backend uses the supplied résumé as system context with up to six recent messages and a short Cortana persona. It uses Groq HTTPS inference, not browser inference. Ordinary greetings and résumé/contact links can be answered immediately without a model. If the service is unconfigured, unavailable, rate-limited, or times out, the UI provides a résumé-based answer and labels it accordingly. Generated answers can still be wrong; source fidelity must be evaluated with a live key.

Speech recognition and speech synthesis remain browser services. English feminine voices are preferred by name, with Samantha selected on the tested Mac. This is not a cloned Cortana/actor voice. Browser transcription may be online. Audio begins only after visitor interaction. Conversations are held in page memory and sent to the inference provider for replies; the app has no chat database.

## Data
`dist/profile.json` contains résumé-backed biography and metrics. `dist/Vivek_Vishal_Resume.pdf` is the unchanged user-provided résumé. LinkedIn and GitHub links are included. Asha Health YC batch omitted because sources disagree; no current employment or availability is inferred.

## Checks and build
`npm test` verifies request validation, role filtering, missing-key behavior, upstream error handling, secret isolation, and request throttling using mocked provider responses. These tests do not prove live model access or model quality.

`npm run build` creates `dist/server/index.js`, a standalone Cloudflare Worker containing only explicit public assets plus the chat handler. `.env` is never bundled. `.openai/hosting.json` identifies the existing Sites project. Production requires `GROQ_API_KEY` as a secret and optional `GROQ_MODEL`, followed by a deployment. Build outputs and deployment archives are ignored.

Throttling is best-effort per Worker isolate (10 requests/minute/client IP); it is not a distributed spending cap. The provider's free-plan quota is the hard limit. Requests are limited to 12 KB, questions to 1,200 characters, history to six messages, and provider calls to 18 seconds. Provider errors and secrets are never sent to visitors. Additional edge abuse protection is recommended if public traffic grows.

Speech replies use short sentence turns, brief pauses, and subtle changes in pace and pitch. Expressiveness depends on the visitor’s installed browser voice; this is not an emotional neural speech model. Muting, ending voice, or starting a new reply cancels pending speech.
