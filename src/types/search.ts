export type SearchTab = 'all' | 'images' | 'videos' | 'news' | 'maps' | 'shopping';

export interface WebResult {
  id: string;
  title: string;
  url: string;
  displayUrl: string;
  snippet: string;
  favicon?: string;
  sitelinks?: { title: string; snippet: string; url: string }[];
  date?: string;
}

export interface ImageResult {
  id: string;
  title: string;
  imageUrl: string;
  sourceUrl: string;
  sourceDomain: string;
  width?: number;
  height?: number;
}

export interface VideoResult {
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  channel: string;
  duration: string;
  views: string;
  uploadedAt: string;
}

export interface NewsResult {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  snippet: string;
  imageUrl?: string;
}

export interface MapResult {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewsCount: number;
  address: string;
  status: string;
  hours: string;
  coordinates: { lat: number; lng: number };
}

export interface KnowledgeGraph {
  title: string;
  subtitle: string;
  description: string;
  wikipediaUrl?: string;
  images: string[];
  attributes: { label: string; value: string }[];
  socialLinks?: { platform: string; url: string }[];
  relatedEntities?: { name: string; subtitle: string; imageUrl?: string }[];
}

export interface PeopleAlsoAskItem {
  question: string;
  answer: string;
  sourceTitle: string;
  sourceUrl: string;
}

export interface AiOverview {
  summary: string;
  bullets: string[];
  sources: { title: string; url: string; domain: string; favicon?: string }[];
  additionalNote?: string;
}

export interface SearchResponse {
  query: string;
  totalResults: string;
  searchTime: string;
  aiOverview?: AiOverview;
  knowledgeGraph?: KnowledgeGraph;
  peopleAlsoAsk?: PeopleAlsoAskItem[];
  webResults: WebResult[];
  imageResults: ImageResult[];
  videoResults: VideoResult[];
  newsResults: NewsResult[];
  mapResults: MapResult[];
  relatedSearches: string[];
  specialWidget?: 'calculator' | 'weather' | 'converter' | 'timer' | 'dictionary' | 'coin_flip' | 'roll_die';
  widgetData?: any;
}
