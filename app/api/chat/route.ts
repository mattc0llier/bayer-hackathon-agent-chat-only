import { streamText, convertToModelMessages, UIMessage } from 'ai';
import { gateway } from '@vercel/ai-sdk-gateway';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  console.log('[Chat API] Request received');

  const body = await req.json();

  const {
    messages,
    model,
    webSearch,
  }: {
    messages: UIMessage[];
    model: string;
    webSearch: boolean;
  } = body;

  // Use the built-in converter for proper message transformation
  const modelMessages = await convertToModelMessages(messages);

  // Use Vercel AI Gateway with the specified model
  const selectedModel = webSearch ? 'perplexity/sonar' : (model || 'google/gemini-2.5-flash-lite');

  console.log('[Chat API] Using model:', selectedModel);
  console.log('[Chat API] Messages count:', modelMessages.length);

  const result = await streamText({
    model: gateway(selectedModel),
    messages: modelMessages,
    system: 'You are a helpful assistant that can answer questions and help with tasks',
  });

  // send sources and reasoning back to the client
  return result.toUIMessageStreamResponse({
    sendSources: true,
    sendReasoning: true,
  });
}
