"use client";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
  MessageActions,
  MessageAction,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputHeader,
  type PromptInputMessage,
  PromptInputSelect,
  PromptInputSelectContent,
  PromptInputSelectItem,
  PromptInputSelectTrigger,
  PromptInputSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { useState, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { useChatContext } from "@/shared/chat-context-provider";
import { ContextPill } from "./ContextPill";
import { CopyIcon, RefreshCcwIcon, XIcon } from "lucide-react";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/components/ai-elements/sources";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning";
import { Loader } from "@/components/ai-elements/loader";

const models = [
  // Default Model
  {
    name: "Gemini 2.5 Flash Lite (Default)",
    value: "google/gemini-2.5-flash-lite",
  },
  // Anthropic Models
  {
    name: "Claude Haiku 4.5",
    value: "anthropic/claude-haiku-4.5",
  },
  {
    name: "Claude Sonnet 4.5",
    value: "anthropic/claude-sonnet-4.5",
  },
  {
    name: "Claude Opus 4.5",
    value: "anthropic/claude-opus-4.5",
  },
  {
    name: "Claude 3.7 Sonnet Thinking",
    value: "anthropic/claude-3.7-sonnet-thinking",
  },
  // OpenAI Models
  {
    name: "GPT 4.1 Mini",
    value: "openai/gpt-4.1-mini",
  },
  {
    name: "GPT 5.2",
    value: "openai/gpt-5.2",
  },
  // Google Models
  {
    name: "Gemini 3 Pro Preview",
    value: "google/gemini-3-pro-preview",
  },
  // xAI Models
  {
    name: "Grok 4.1 Fast Non-Reasoning",
    value: "xai/grok-4.1-fast-non-reasoning",
  },
  {
    name: "Grok Code Fast 1 Thinking",
    value: "xai/grok-code-fast-1-thinking",
  },
];

export default function ChatBotDemo() {
  const [input, setInput] = useState("");
  const [model, setModel] = useState<string>(models[0].value);
  const [includePageContext, setIncludePageContext] = useState(true);
  // Use environment variable for API URL to ensure calls go to the remote chat app
  // In production, set NEXT_PUBLIC_CHAT_API_URL to the deployed remote app URL
  const chatApiUrl = process.env.NEXT_PUBLIC_CHAT_API_URL || "/api/chat";
  const { messages, sendMessage, status, regenerate } = useChat({
    api: chatApiUrl,
  });
  const chatContext = useChatContext();

  // Debug: Log context on mount and whenever it changes
  useEffect(() => {
    console.log("[ChatBotDemo] Context received:", chatContext);
    console.log("[ChatBotDemo] Page context:", chatContext?.page);
    console.log("[ChatBotDemo] User context:", chatContext?.user);
  }, [chatContext]);

  // Reset page context inclusion when navigating to a new page
  useEffect(() => {
    setIncludePageContext(true);
  }, [chatContext?.page?.itemId]);

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);
    if (!(hasText || hasAttachments)) {
      return;
    }
    sendMessage(
      {
        text: message.text || "Sent with attachments",
        files: message.files,
      },
      {
        body: {
          model: model,
          context: {
            user: chatContext?.user || null,
            page: includePageContext ? chatContext?.page : null,
          },
        },
      },
    );
    setInput("");
    // Reset page context inclusion for next message
    setIncludePageContext(true);
  };

  return (
    <div
      className="max-w-4xl mx-auto p-6 relative size-full h-screen"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="flex flex-col h-full">
        {/* Header with close button */}
        {chatContext?.actions && (
          <div className="flex justify-end mb-2">
            <button
              onClick={() => chatContext.actions?.setSidebarOpen(false)}
              className="p-1.5 rounded-md hover:bg-muted transition-colors"
              aria-label="Close chat"
            >
              <XIcon className="size-5 text-muted-foreground" />
            </button>
          </div>
        )}
        <Conversation className="h-full">
          <ConversationContent>
            {messages.map((message) => (
              <div key={message.id}>
                {message.role === "assistant" &&
                  message.parts.filter((part) => part.type === "source-url")
                    .length > 0 && (
                    <Sources>
                      <SourcesTrigger
                        count={
                          message.parts.filter(
                            (part) => part.type === "source-url",
                          ).length
                        }
                      />
                      {message.parts
                        .filter((part) => part.type === "source-url")
                        .map((part, i) => (
                          <SourcesContent key={`${message.id}-${i}`}>
                            <Source
                              key={`${message.id}-${i}`}
                              href={part.url}
                              title={part.url}
                            />
                          </SourcesContent>
                        ))}
                    </Sources>
                  )}
                {message.parts.map((part, i) => {
                  switch (part.type) {
                    case "text":
                      return (
                        <Message key={`${message.id}-${i}`} from={message.role}>
                          <MessageContent>
                            <MessageResponse>{part.text}</MessageResponse>
                          </MessageContent>
                          {message.role === "assistant" &&
                            i === messages.length - 1 && (
                              <MessageActions>
                                <MessageAction
                                  onClick={() => regenerate()}
                                  label="Retry"
                                >
                                  <RefreshCcwIcon className="size-3" />
                                </MessageAction>
                                <MessageAction
                                  onClick={() =>
                                    navigator.clipboard.writeText(part.text)
                                  }
                                  label="Copy"
                                >
                                  <CopyIcon className="size-3" />
                                </MessageAction>
                              </MessageActions>
                            )}
                        </Message>
                      );
                    case "reasoning":
                      return (
                        <Reasoning
                          key={`${message.id}-${i}`}
                          className="w-full"
                          isStreaming={
                            status === "streaming" &&
                            i === message.parts.length - 1 &&
                            message.id === messages.at(-1)?.id
                          }
                        >
                          <ReasoningTrigger />
                          <ReasoningContent>{part.text}</ReasoningContent>
                        </Reasoning>
                      );
                    case "tool-call":
                    case "tool-invocation":
                      return null;
                    default:
                      return null;
                  }
                })}
              </div>
            ))}
            {status === "submitted" && <Loader />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
        <PromptInput
          onSubmit={handleSubmit}
          className="mt-4"
          globalDrop
          multiple
        >
          <PromptInputHeader>
            {includePageContext && chatContext?.page && (
              <ContextPill
                title={chatContext.page.displayName || chatContext.page.name}
                onRemove={() => setIncludePageContext(false)}
              />
            )}
            <PromptInputAttachments>
              {(attachment) => <PromptInputAttachment data={attachment} />}
            </PromptInputAttachments>
          </PromptInputHeader>
          <PromptInputBody>
            <PromptInputTextarea
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputActionMenu>
                <PromptInputActionMenuTrigger />
                <PromptInputActionMenuContent>
                  <PromptInputActionAddAttachments />
                </PromptInputActionMenuContent>
              </PromptInputActionMenu>

              <PromptInputSelect
                onValueChange={(value) => {
                  setModel(value);
                }}
                value={model}
              >
                <PromptInputSelectTrigger>
                  <PromptInputSelectValue />
                </PromptInputSelectTrigger>
                <PromptInputSelectContent>
                  {models.map((model) => (
                    <PromptInputSelectItem
                      key={model.value}
                      value={model.value}
                    >
                      {model.name}
                    </PromptInputSelectItem>
                  ))}
                </PromptInputSelectContent>
              </PromptInputSelect>
            </PromptInputTools>
            <PromptInputSubmit disabled={!input && !status} status={status} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}
