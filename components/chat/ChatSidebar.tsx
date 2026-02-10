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
  PromptInputButton,
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
import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { CopyIcon, RefreshCcwIcon, Plus } from "lucide-react";
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
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from "@/components/ai-elements/tool";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const models = [
  {
    name: "Gemini 2.5 Flash Lite (Default)",
    value: "google/gemini-2.5-flash-lite",
  },
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
  {
    name: "GPT 4.1 Mini",
    value: "openai/gpt-4.1-mini",
  },
  {
    name: "GPT 5.2",
    value: "openai/gpt-5.2",
  },
  {
    name: "Gemini 3 Pro Preview",
    value: "google/gemini-3-pro-preview",
  },
  {
    name: "Grok 4.1 Fast Non-Reasoning",
    value: "xai/grok-4.1-fast-non-reasoning",
  },
  {
    name: "Grok Code Fast 1 Thinking",
    value: "xai/grok-code-fast-1-thinking",
  },
];

const suggestedPrompts = [
  "What tasks do I have for today?",
  "Apply for company credit card",
  "What is happening in Bayer?",
  "Weather in London?",
];

export default function ChatSidebar() {
  const [input, setInput] = useState("");
  const [model, setModel] = useState<string>(models[0].value);
  const [devMode, setDevMode] = useState(false);
  const { messages, sendMessage, status, regenerate } = useChat();

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
        },
      }
    );
    setInput("");
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt);
    sendMessage(
      { text: prompt },
      {
        body: {
          model: model,
        },
      }
    );
    setInput("");
  };

  return (
    <Sidebar side="left" variant="sidebar" collapsible="offcanvas">
      <SidebarHeader className="border-b">
        <div className="flex items-center justify-between px-2 py-3">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold">Bayer Assistant</h2>
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="text-xs">
                Demo
              </Badge>
              <Button
                variant={devMode ? "default" : "ghost"}
                onClick={() => setDevMode(!devMode)}
                size="sm"
                className="h-6 px-2 text-xs"
              >
                Dev
              </Button>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {messages.length === 0 && (
          <div className="px-4 py-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium">M</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Maya Schmidt</div>
                <div className="text-xs text-muted-foreground">
                  Senior Product Manager • Product Development
                </div>
              </div>
            </div>

            <div className="space-y-1 mb-4">
              <h3 className="text-lg font-semibold">Hello Maya!</h3>
              <p className="text-sm text-muted-foreground">
                How can I help you today?
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
              <span>London</span>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>🔗</span>
                <span>Bayer Intranet Homepage</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {suggestedPrompts.map((prompt, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    className="h-auto py-2 px-3 text-xs text-left whitespace-normal justify-start"
                    onClick={() => handleSuggestedPrompt(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-2">
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
                            (part) => part.type === "source-url"
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
                      if (!devMode) return null;
                      return (
                        <Tool key={`${message.id}-${i}`}>
                          <ToolHeader
                            title={part.toolName}
                            type="tool-call"
                            state="output-available"
                          />
                          <ToolContent>
                            <ToolInput input={part.args} />
                            <ToolOutput
                              output={part.result}
                              errorText={part.error}
                            />
                          </ToolContent>
                        </Tool>
                      );
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
      </SidebarContent>

      <SidebarFooter className="border-t p-2">
        <PromptInput onSubmit={handleSubmit} globalDrop multiple>
          <PromptInputHeader>
            <PromptInputAttachments>
              {(attachment) => <PromptInputAttachment data={attachment} />}
            </PromptInputAttachments>
          </PromptInputHeader>
          <PromptInputBody>
            <PromptInputTextarea
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Send a message..."
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
      </SidebarFooter>
    </Sidebar>
  );
}
