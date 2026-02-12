"use client";

import { createContext, useContext, type ReactNode } from "react";

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
  contentType?: string;
  content?: string;
  metadata?: Record<string, unknown>;
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

interface ChatActions {
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

export interface ChatContext {
  page: PageContext;
  user: UserContext;
  actions?: ChatActions;
}

const ChatContextContext = createContext<ChatContext | null>(null);

export function ChatContextProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: ChatContext | null;
}) {
  return (
    <ChatContextContext.Provider value={value}>
      {children}
    </ChatContextContext.Provider>
  );
}

export function useChatContext() {
  return useContext(ChatContextContext);
}
