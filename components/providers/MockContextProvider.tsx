'use client';

import { ReactNode } from 'react';
import {
  ChatContextProvider,
  type ChatContext,
} from '@/shared/chat-context-provider';

// Mock sitemap for standalone development
const mockSitemap = [
  {
    path: '/',
    title: 'Home',
    priority: 1.0,
    changeFrequency: 'daily' as const,
  },
  {
    path: '/news',
    title: 'News Dashboard',
    priority: 0.9,
    changeFrequency: 'daily' as const,
  },
  {
    path: '/news/article-1',
    title: 'Latest Company Update',
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  },
  {
    path: '/departments',
    title: 'Departments',
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  },
  {
    path: '/resources',
    title: 'Resources',
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  },
];

// Mock context for standalone development
const mockContext: ChatContext = {
  page: {
    itemId: 'standalone',
    name: 'Standalone',
    displayName: 'Standalone Mode',
    path: '/',
    locale: 'en',
    site: 'chat',
    isEditing: false,
    timestamp: Date.now(),
  },
  user: {
    id: 'dev-user',
    name: 'Developer',
    firstName: 'Dev',
    lastName: 'User',
    role: 'Developer',
    department: 'Engineering',
    location: 'Local',
    email: 'dev@example.com',
  },
  navigation: {
    sitemap: mockSitemap,
    currentPath: '/',
    locale: 'en',
    siteName: 'intranet',
  },
  actions: {
    setSidebarOpen: (open: boolean) => {
      console.log('Mock: setSidebarOpen', open);
    },
    toggleSidebar: () => {
      console.log('Mock: toggleSidebar');
    },
    navigate: (path: string) => {
      console.log('Mock: navigate to', path);
    },
  },
};

export function MockContextProvider({ children }: { children: ReactNode }) {
  return <ChatContextProvider value={mockContext}>{children}</ChatContextProvider>;
}
