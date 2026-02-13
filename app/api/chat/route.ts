import { streamText, UIMessage, convertToModelMessages } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// CORS headers for cross-origin requests from host apps
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handle OPTIONS preflight request
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

interface PageContext {
  itemId: string;
  name: string;
  displayName: string;
  path: string;
  locale: string;
  site: string;
  title?: string;
  isEditing: boolean;
  timestamp: number;
}

interface UserContext {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  location: string;
  email: string;
  avatar?: string;
  team?: string;
}

interface ChatContext {
  page: PageContext;
  user: UserContext;
}

function buildSystemPrompt(userContext: UserContext | null): string {
  let prompt =
    "You are a helpful assistant that can answer questions and help with tasks.";

  if (userContext) {
    prompt += `\n\n## Current User
- Name: ${userContext.firstName} ${userContext.lastName}
- Role: ${userContext.role}
- Department: ${userContext.department}
- Location: ${userContext.location}
- Email: ${userContext.email}`;
    if (userContext.team) {
      prompt += `\n- Team: ${userContext.team}`;
    }

    prompt += "\n\nUse this user context to provide personalized responses.";
  }

  return prompt;
}

function buildPageContextPrefix(page: PageContext): string {
  let prefix = `[Context: Viewing "${page.displayName || page.name}"`;
  if (page.path) {
    prefix += ` at ${page.path}`;
  }
  if (page.title) {
    prefix += ` - ${page.title}`;
  }
  prefix += "]\n\n";
  return prefix;
}

export async function POST(req: Request) {
  const body = await req.json();

  const {
    messages,
    model,
    webSearch,
    context,
  }: {
    messages: UIMessage[];
    model: string;
    webSearch: boolean;
    context: ChatContext | null;
  } = body;

  // Transform messages from parts format to content format
  // Inject page context into the latest user message if provided
  const transformedMessages = messages.map((message, index) => {
    let content = message.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("\n");

    // If this is the latest user message and page context exists, prepend it
    if (
      message.role === "user" &&
      index === messages.length - 1 &&
      context?.page
    ) {
      content = buildPageContextPrefix(context.page) + content;
    }

    return { role: message.role, content };
  });

  const result = await streamText({
    model: webSearch ? "perplexity/sonar" : model,
    messages: transformedMessages,
    system: buildSystemPrompt(context?.user || null),
  });

  // send sources and reasoning back to the client
  const response = result.toUIMessageStreamResponse({
    sendSources: true,
    sendReasoning: true,
  });

  // Add CORS headers to the response
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}
