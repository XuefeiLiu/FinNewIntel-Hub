
export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sector: string;
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
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  significance: string;
}

// Fix: Expanded group type to include all categories used in the intelligence network and mock data
export interface CorrelationNode {
  id: string;
  label: string;
  group: 'stock' | 'sector' | 'event' | 'competitor' | 'supplier' | 'customer' | 'market-trend' | 'regulator';
}

export interface CorrelationLink {
  source: string;
  target: string;
  strength: number;
  reason: string;
}

export type ViewType = 'Dashboard' | 'Timeline' | 'Correlations' | 'Intelligence';
