'use client';

import { useNavigation } from '@/hooks/useNavigation';
import { FileTextIcon } from 'lucide-react';

interface PageSuggestionsProps {
  query?: string;
  maxResults?: number;
  onNavigate?: () => void;
}

export function PageSuggestions({
  query,
  maxResults = 5,
  onNavigate,
}: PageSuggestionsProps) {
  const { sitemap, navigate, searchPages } = useNavigation();

  const suggestions = query
    ? searchPages(query).slice(0, maxResults)
    : sitemap
        .filter((page) => page.priority && page.priority >= 0.7)
        .slice(0, maxResults);

  if (suggestions.length === 0) {
    return null;
  }

  const handleNavigate = (path: string) => {
    navigate(path);
    onNavigate?.();
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground">
        {query ? 'Search Results' : 'Suggested Pages'}
      </h3>
      <div className="grid gap-2">
        {suggestions.map((page) => (
          <button
            key={page.path}
            onClick={() => handleNavigate(page.path)}
            className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-accent hover:border-accent-foreground/20 transition-colors text-left group"
          >
            <FileTextIcon className="w-4 h-4 text-muted-foreground group-hover:text-foreground flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate group-hover:text-foreground">
                {page.title || page.path}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {page.path}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
