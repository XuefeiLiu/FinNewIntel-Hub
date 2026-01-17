
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import PortfolioSummary from './components/PortfolioSummary';
import NewsFeed from './components/NewsFeed';
import Timeline from './components/Timeline';
import CorrelationGraph from './components/CorrelationGraph';
import { ViewType, Stock, NewsItem, TimelineEvent, CorrelationNode, CorrelationLink } from './types';
import { geminiService } from './services/gemini';

const MOCK_STOCKS: Stock[] = [
  { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 924.79, change: 12.45, changePercent: 1.36, sector: 'Technology' },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 175.22, change: -4.30, changePercent: -2.39, sector: 'Automotive' },
  { symbol: 'AAPL', name: 'Apple Inc.', price: 183.63, change: 0.82, changePercent: 0.45, sector: 'Technology' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 415.50, change: 3.10, changePercent: 0.75, sector: 'Technology' },
  { symbol: 'BABA', name: 'Alibaba Group', price: 73.40, change: -1.20, changePercent: -1.61, sector: 'Consumer' },
];

const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'NVIDIA Announces New Blackwell GPU Architecture',
    summary: 'The Blackwell B200 GPU features 208 billion transistors and offers 20 petaflops of AI performance. Analysts expect significant uplift in data center revenue.',
    source: 'TechAnalytics',
    timestamp: '2 hours ago',
    category: 'Micro',
    relatedStocks: ['NVDA', 'TSMC', 'ASML'],
    sentiment: 'positive',
    impactScore: 92
  },
  {
    id: '2',
    title: 'Federal Reserve Signals Interest Rate Plateau',
    summary: 'FOMC meeting minutes suggest inflation is cooling, leading to potential rate cuts in late 2024. Markets react positively to the stability.',
    source: 'MacroBrief',
    timestamp: '5 hours ago',
    category: 'Macro',
    relatedStocks: ['AAPL', 'MSFT', 'TSLA'],
    sentiment: 'neutral',
    impactScore: 78
  },
  {
    id: '3',
    title: 'EV Demand Slowdown Hits European Markets',
    summary: 'Registration data for new electric vehicles in Germany and France show a 15% YoY decline as subsidies wind down and consumers wait for cheaper models.',
    source: 'AutoMonitor',
    timestamp: '1 day ago',
    category: 'Industry',
    relatedStocks: ['TSLA', 'BMWYY', 'VWAGY'],
    sentiment: 'negative',
    impactScore: 85
  },
  {
    id: '4',
    title: 'China Semiconductor Fund Raising $27B',
    summary: 'Phase 3 of the National Integrated Circuit Industry Investment Fund targets the localization of the chip supply chain amid global trade tensions.',
    source: 'SinoTech',
    timestamp: '1 day ago',
    category: 'Macro',
    relatedStocks: ['BABA', 'TCEHY'],
    sentiment: 'positive',
    impactScore: 65
  }
];

const DEFAULT_TIMELINE: TimelineEvent[] = [
  { date: '2022 NOV', title: 'ChatGPT Release', description: 'OpenAI launches ChatGPT, triggering a global generative AI arms race.', significance: 'Shifted corporate focus toward large language models.' },
  { date: '2023 MAR', title: 'H100 Shortage', description: 'Massive wait times for NVIDIA GPUs become the bottleneck for tech companies.', significance: 'Proven pricing power for semiconductor manufacturers.' },
  { date: '2024 FEB', title: 'Blackwell Reveal', description: 'The next generation of AI compute is announced, significantly lowering cost-to-train.', significance: 'Defines the efficiency roadmap for the next 24 months.' },
];

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('Dashboard');
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [timelineTopic, setTimelineTopic] = useState<string | null>(null);
  const [correlationTopic, setCorrelationTopic] = useState<string | null>(null);
  
  const [correlations, setCorrelations] = useState<{nodes: CorrelationNode[], links: CorrelationLink[]}>({
    nodes: [
      { id: '1', label: 'AI Compute Demand', group: 'market-trend' },
      { id: '2', label: 'AMD MI300X', group: 'competitor' },
      { id: '3', label: 'TSMC CoWoS Capacity', group: 'supplier' },
      { id: '4', label: 'Intel Gaudi 3', group: 'competitor' },
    ],
    links: [
      { source: 'AI Compute Demand', target: 'AMD MI300X', strength: 0.85, reason: 'High demand overflow leads customers to AMD as an alternative.' },
      { source: 'TSMC CoWoS Capacity', target: 'AI Compute Demand', strength: 0.9, reason: 'Packaging bottlenecks are the primary constraint for news-driven growth.' },
    ]
  });

  const [timeline, setTimeline] = useState<TimelineEvent[]>(DEFAULT_TIMELINE);

  const handleAnalyze = async (news: NewsItem) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    try {
      const result = await geminiService.analyzeNewsImpact(news.title, MOCK_STOCKS.map(s => s.symbol));
      setAnalysisResult(result || "Analysis failed.");
    } catch (error) {
      console.error(error);
      setAnalysisResult("An error occurred during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleViewHistory = async (news: NewsItem) => {
    setIsAnalyzing(true);
    try {
      const historyData = await geminiService.generateTimeline(`History of ${news.relatedStocks[0] || ''} specifically related to ${news.title}`);
      setTimeline(historyData);
      setTimelineTopic(news.title);
      setActiveView('Timeline');
    } catch (error) {
      console.error("Failed to generate history:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleViewNetwork = async (news: NewsItem) => {
    setIsAnalyzing(true);
    try {
      const networkData = await geminiService.getCorrelations(news.title + " - " + news.summary);
      setCorrelations(networkData);
      setCorrelationTopic(news.title);
      setActiveView('Correlations');
    } catch (error) {
      console.error("Failed to generate correlation network:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClearTimeline = () => {
    setTimeline(DEFAULT_TIMELINE);
    setTimelineTopic(null);
  };

  return (
    <Layout activeView={activeView} setActiveView={setActiveView}>
      {activeView === 'Dashboard' && (
        <div className="animate-in fade-in duration-500">
          <PortfolioSummary stocks={MOCK_STOCKS} />
          <NewsFeed 
            news={MOCK_NEWS} 
            onAnalyze={handleAnalyze} 
            onViewHistory={handleViewHistory}
            onViewNetwork={handleViewNetwork}
          />
        </div>
      )}

      {activeView === 'Timeline' && (
        <div className="animate-in slide-in-from-bottom duration-500">
          <Timeline 
            events={timeline} 
            topic={timelineTopic || undefined} 
            onClear={handleClearTimeline} 
          />
        </div>
      )}

      {activeView === 'Correlations' && (
        <div className="animate-in zoom-in duration-500">
          <CorrelationGraph 
            nodes={correlations.nodes} 
            links={correlations.links} 
            topic={correlationTopic || undefined} 
          />
        </div>
      )}

      {activeView === 'Intelligence' && (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
          <div className="p-8 bg-[#121212] rounded-3xl border border-white/5">
             <h2 className="text-2xl font-bold mb-6">AI Intelligence Terminal</h2>
             <div className="space-y-4">
               <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                 <p className="text-sm text-gray-300">"How will the recent semiconductor export restrictions affect my tech portfolio holdings specifically?"</p>
                 <div className="mt-4 flex items-center space-x-2">
                   <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
                   <span className="text-xs font-mono text-blue-400">Processing complex vector embeddings...</span>
                 </div>
               </div>
               <div className="p-6 bg-blue-600/10 rounded-2xl border border-blue-500/20 text-gray-200 leading-relaxed text-sm">
                 <p className="mb-4">Based on your portfolio composition (40% NVDA, 15% TSLA), the primary risk factor is the decoupling of the supply chain. While NVDA has strong alternative markets, the logistics overhead for TSLA's battery supply could increase by 12%.</p>
                 <div className="flex space-x-2">
                   <button className="px-3 py-1 bg-white/5 rounded-lg text-xs hover:bg-white/10">Show Source Documents</button>
                   <button className="px-3 py-1 bg-white/5 rounded-lg text-xs hover:bg-white/10">Simulate Stress Test</button>
                 </div>
               </div>
             </div>
          </div>
        </div>
      )}

      {/* Analysis Modal */}
      {analysisResult && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121212] w-full max-w-2xl rounded-3xl border border-white/10 shadow-2xl flex flex-col max-h-[80vh]">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-xl font-bold">Gemini Intelligence Analysis</h3>
              <button onClick={() => setAnalysisResult(null)} className="p-2 hover:bg-white/5 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-8 overflow-y-auto text-gray-300 leading-loose">
              <div className="prose prose-invert prose-blue">
                {analysisResult.split('\n').map((line, i) => (
                  <p key={i} className="mb-4">{line}</p>
                ))}
              </div>
            </div>
            <div className="p-6 border-t border-white/5 flex justify-end">
              <button onClick={() => setAnalysisResult(null)} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl font-bold transition-all">
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isAnalyzing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl font-medium tracking-wide">Synthesizing Market Ripples...</p>
          <p className="text-gray-500 text-sm">Identifying news correlations via Gemini 3 Flash</p>
        </div>
      )}
    </Layout>
  );
};

export default App;
