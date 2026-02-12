import { streamText, UIMessage, convertToModelMessages } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

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

function buildSystemPrompt(context: ChatContext | null): string {
  let prompt =
    "You are a helpful assistant that can answer questions and help with tasks.";

  if (context) {
    const { user, page } = context;

    if (user) {
      prompt += `\n\n## Current User
- Name: ${user.firstName} ${user.lastName}
- Role: ${user.role}
- Department: ${user.department}
- Location: ${user.location}
- Email: ${user.email}`;
      if (user.team) {
        prompt += `\n- Team: ${user.team}`;
      }
    }

    if (page) {
      prompt += `\n\n## Current Page Context
- Page: ${page.displayName || page.name}
- Path: ${page.path}
- Site: ${page.site}
- Locale: ${page.locale}`;
      if (page.title) {
        prompt += `\n- Title: ${page.title}`;
      }
      prompt += `\n- Editing Mode: ${page.isEditing ? "Yes" : "No"}`;
    }

    prompt +=
      "\n\nUse this context to provide personalized and relevant responses to the user.";
  }

  return prompt;
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
  const transformedMessages = messages.map((message) => ({
    role: message.role,
    content: message.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("\n"),
  }));

  const result = await streamText({
    model: webSearch ? "perplexity/sonar" : model,
    messages: transformedMessages,
    system: buildSystemPrompt(context),
  });
  // send sources and reasoning back to the client
  return result.toUIMessageStreamResponse({
    sendSources: true,
    sendReasoning: true,
  });
}
