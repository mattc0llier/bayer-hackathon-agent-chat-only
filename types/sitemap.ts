export interface SitemapEntry {
  path: string;
  title?: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  locale?: string;
}

export interface NavigationContext {
  sitemap: SitemapEntry[];
  currentPath: string;
  locale: string;
  siteName: string;
}
