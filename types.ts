
export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sector: string;
  weight: number;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  timestamp: string;
  category: 'Macro' | 'Industry' | 'Micro' | 'Sentiment';
  relatedStocks: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
  impactScore: number;
  reliability: number;
  isFact: boolean;
  hasConflict: boolean;
  conflictNote?: string;
  assetImpact?: {
    equity: string;
    bond: string;
    fx: string;
  };
}

export interface TrendPoint {
  date: string;
  volume: number;
  sentiment: number;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  significance: string;
  url?: string;
}

export interface ConceptIntelligence {
  concept: string;
  description: string;
  history: TimelineEvent[];
  trends: TrendPoint[];
}

export interface SocialComment {
  id: string;
  author: string;
  content: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  platform: 'X' | 'Reddit' | 'StockTwits' | 'WeChat';
  likes: number;
  timestamp: string;
  url: string;
}

export interface SocialSignal {
  symbol: string;
  bullishPercent: number;
  buzzScore: number;
  topComments: SocialComment[];
}

export interface SocialUserHistory {
  author: string;
  platform: string;
  trustScore: number;
  trustSummary: string;
  pastPosts: TimelineEvent[];
}

export interface CorrelationNode {
  id: string;
  label: string;
  group: 'stock' | 'sector' | 'event' | 'competitor' | 'supplier' | 'customer' | 'market-trend' | 'regulator' | 'KOL-Opinion' | 'Supportive-Post' | 'Opposing-Post';
}

export interface CorrelationLink {
  source: string;
  target: string;
  strength: number;
  reason: string;
}

export interface EconomicIndicator {
  id: string;
  name: string;
  region: string;
  actual: string;
  forecast: string;
  previous: string;
  status: 'beat' | 'miss' | 'neutral';
  insight: string;
}

export interface CalendarEvent {
  id: string;
  date: string;
  name: string;
  importance: 'High' | 'Medium' | 'Low';
  region: string;
  forecast: string;
}

export type ViewType = 'Dashboard' | 'Timeline' | 'Correlations' | 'Intelligence' | 'RiskConfig';
