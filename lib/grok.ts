import { createGroq } from '@ai-sdk/groq';

if (!process.env.GROK_API_KEY) {
  throw new Error('Missing GROK_API_KEY');
}

export const groq = createGroq({
  apiKey: process.env.GROK_API_KEY ?? "",
});