import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ChatContextProvider,
  type ChatContext,
} from "@/shared/chat-context-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Chat",
  description: "AI-powered chat application",
};

// Mock context for standalone development
// Note: actions are not included here because functions cannot be passed
// from Server Components to Client Components. When loaded via host app,
// the host provides the actions through the shared context.
const mockContext: ChatContext = {
  page: {
    itemId: "standalone",
    name: "Standalone",
    displayName: "Standalone Mode",
    path: "/",
    locale: "en",
    site: "chat",
    isEditing: false,
    timestamp: Date.now(),
  },
  user: {
    id: "dev-user",
    name: "Developer",
    firstName: "Dev",
    lastName: "User",
    role: "Developer",
    department: "Engineering",
    location: "Local",
    email: "dev@example.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ChatContextProvider value={mockContext}>
          {children}
        </ChatContextProvider>
      </body>
    </html>
  );
}
