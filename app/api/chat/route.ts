import { streamText, UIMessage, convertToModelMessages } from 'ai';
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
export async function POST(req: Request) {
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
  
  // Transform messages from parts format to content format
  const transformedMessages = messages.map(message => ({
    role: message.role,
    content: message.parts
      .filter(part => part.type === 'text')
      .map(part => part.text)
      .join('\n')
  }));
  
  const result = await streamText({
    model: webSearch ? 'perplexity/sonar' : model,
    messages: transformedMessages,
    system:
      'You are a helpful assistant that can answer questions and help with tasks',
  });
  // send sources and reasoning back to the client
  return result.toUIMessageStreamResponse({
    sendSources: true,
    sendReasoning: true,
  });
}