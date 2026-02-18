import { useChatContext } from '@/shared/chat-context-provider';
import type { SitemapEntry } from '@/types/sitemap';

export function useNavigation() {
  const context = useChatContext();

  const navigate = (path: string) => {
    if (!context?.actions?.navigate) {
      console.warn('Navigation action not available');
      return;
    }

    // Validate path format
    if (!path.startsWith('/')) {
      console.warn(`Path must start with /. Received: ${path}`);
      path = `/${path}`;
    }

    context.actions.navigate(path);
  };

  const findPageByPath = (path: string): SitemapEntry | undefined => {
    return context?.navigation?.sitemap.find(
      (entry) => entry.path === path
    );
  };

  const searchPages = (query: string): SitemapEntry[] => {
    if (!context?.navigation?.sitemap) return [];

    const lowerQuery = query.toLowerCase();
    return context.navigation.sitemap.filter((entry) => {
      const title = entry.title?.toLowerCase() || '';
      const path = entry.path.toLowerCase();
      return title.includes(lowerQuery) || path.includes(lowerQuery);
    });
  };

  return {
    navigate,
    findPageByPath,
    searchPages,
    sitemap: context?.navigation?.sitemap || [],
    currentPath: context?.navigation?.currentPath,
    locale: context?.navigation?.locale,
    siteName: context?.navigation?.siteName,
  };
}
