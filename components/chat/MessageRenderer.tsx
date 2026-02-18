"use client";

import { useNavigation } from "@/hooks/useNavigation";
import { ReactNode } from "react";

interface MessageRendererProps {
  content: string;
}

export function MessageRenderer({ content }: MessageRendererProps) {
  const { navigate, findPageByPath } = useNavigation();

  // Parse markdown links: [text](path)
  const renderWithLinks = (text: string): ReactNode[] => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: ReactNode[] = [];
    let lastIndex = 0;
    let match;
    let key = 0;

    while ((match = linkRegex.exec(text)) !== null) {
      // Add text before link
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${key++}`}>
            {text.slice(lastIndex, match.index)}
          </span>,
        );
      }

      const linkText = match[1];
      const linkPath = match[2];

      // Check if it's an internal path (starts with /)
      const isInternalLink = linkPath.startsWith("/");
      const pageExists = isInternalLink && findPageByPath(linkPath);

      if (isInternalLink && pageExists) {
        // Render as navigation button with card-like styling
        parts.push(
          <button
            key={`link-${key++}`}
            onClick={() => navigate(linkPath)}
            className="inline-flex items-center gap-1 px-1.5 py-0.5 mx-0.5 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded transition-colors cursor-pointer group"
            title={`Navigate to ${linkPath}`}
          >
            <span>{linkText}</span>
            <svg
              className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>,
        );
      } else if (isInternalLink) {
        // Invalid internal link - show as disabled
        parts.push(
          <span
            key={`invalid-${key++}`}
            className="inline-flex items-center gap-1 px-1.5 py-0.5 mx-0.5 text-sm font-medium text-gray-400 bg-gray-50 border border-gray-200 rounded cursor-not-allowed"
            title="Page not found"
          >
            {linkText}
          </span>,
        );
      } else {
        // External link - render with external icon
        parts.push(
          <a
            key={`external-${key++}`}
            href={linkPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-1.5 py-0.5 mx-0.5 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded transition-colors group"
          >
            <span>{linkText}</span>
            <svg
              className="w-3 h-3 opacity-60 group-hover:opacity-100"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>,
        );
      }

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(<span key={`text-${key++}`}>{text.slice(lastIndex)}</span>);
    }

    return parts;
  };

  return (
    <div className="prose prose-sm max-w-none">{renderWithLinks(content)}</div>
  );
}
