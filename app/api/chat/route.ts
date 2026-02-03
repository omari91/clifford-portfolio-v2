import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { queryResearch } from '@/lib/vector-store';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const tools = {
    searchKnowledgeBase: tool({
      description: "Search Clifford's IEEE research and power system projects.",
      inputSchema: z.object({ query: z.string() }),
      execute: async ({ query }: { query: string }) => await queryResearch(query),
    }),
  };

  const result = await streamText({
    model: openai('gpt-4o'), // Or gpt-4-turbo
    system: `You are Clifford's Personal AI Agent. 
    Clifford is a Power Systems Engineer in Germany with an IEEE award for EV research.
    Be professional, technical, and concise. 
    If a user asks about his research or specific projects, use the 'searchKnowledgeBase' tool.
    When you use results from 'searchKnowledgeBase', cite sources like (source: filename#chunkIndex).`,
    messages,
    tools,
  });

  return result.toTextStreamResponse();
}
