
import React, { useState, useMemo, useEffect } from 'react';
import Layout from './components/Layout';
import PortfolioSummary from './components/PortfolioSummary';
import MacroIntelligence from './components/MacroIntelligence';
import IndustryIntelligence from './components/IndustryIntelligence';
import NewsFeed from './components/NewsFeed';
import Timeline from './components/Timeline';
import CorrelationGraph from './components/CorrelationGraph';
import SocialSentiment from './components/SocialSentiment';
import { ViewType, Stock, NewsItem, TimelineEvent, CorrelationNode, CorrelationLink, SocialSignal, SocialComment, ConceptIntelligence } from './types';
import { geminiService } from './services/gemini';

const INITIAL_STOCKS: Stock[] = [
  { symbol: 'NVDA', name: 'NVIDIA', price: 924.79, change: 12.45, changePercent: 1.36, sector: 'Technology', weight: 40 },
  { symbol: 'TSLA', name: 'Tesla', price: 175.22, change: -4.30, changePercent: -2.39, sector: 'Automotive', weight: 15 },
  { symbol: 'AAPL', name: 'Apple', price: 183.63, change: 0.82, changePercent: 0.45, sector: 'Technology', weight: 20 },
  { symbol: 'MSFT', name: 'Microsoft', price: 415.50, change: 3.10, changePercent: 0.75, sector: 'Technology', weight: 25 },
];

const MOCK_NEWS: NewsItem[] = [
  {
    id: 'm1',
    title: 'US Department of Commerce to Announce New AI Export Framework',
    summary: 'The upcoming directive is expected to redefine compute thresholds for cross-border AI acceleration deployment, impacting all major chip designers and cloud providers.',
    source: 'PolicyWatch',
    timestamp: '1 hour ago',
    category: 'Macro',
    relatedStocks: ['NVDA', 'TSMC', 'BABA'],
    sentiment: 'negative',
    impactScore: 88,
    reliability: 92,
    isFact: true,
    hasConflict: true,
    assetImpact: { equity: 'Bearish Semi', bond: 'Neutral', fx: 'USD Volatility' }
  },
  {
    id: 'm2',
    title: 'PBOC Signals Potential Liquidity Injection via RRR Cut',
    summary: 'High-level officials suggest more aggressive monetary easing may be required to stabilize domestic industrial output and housing sentiment.',
    source: 'MacroBrief',
    timestamp: '3 hours ago',
    category: 'Macro',
    relatedStocks: ['BABA', 'PDD', 'FXI'],
    sentiment: 'positive',
    impactScore: 72,
    reliability: 99,
    isFact: true,
    hasConflict: false,
  },
  {
    id: 'i1',
    title: 'Global Semiconductor Foundries Report 15% Utilization Jump',
    summary: 'Strong demand from automotive and AI data center sectors is driving a rapid recovery in foundry utilization rates, suggesting a shift in the inventory cycle.',
    source: 'SemiDaily',
    timestamp: '2 hours ago',
    category: 'Industry',
    relatedStocks: ['TSMC', 'NVDA', 'INTC'],
    sentiment: 'positive',
    impactScore: 85,
    reliability: 95,
    isFact: true,
    hasConflict: false,
  },
  {
    id: 'i2',
    title: 'EV Charging Standards Convergence Accelerated by New EU Mandate',
    summary: 'New regulations forcing uniform connector standards across the European Union could reduce infrastructure fragmentation but pressure proprietary network operators.',
    source: 'PowerLink',
    timestamp: '5 hours ago',
    category: 'Industry',
    relatedStocks: ['TSLA', 'VWAGY'],
    sentiment: 'neutral',
    impactScore: 65,
    reliability: 88,
    isFact: true,
    hasConflict: true,
  }
];

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('Dashboard');
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [timelineTopic, setTimelineTopic] = useState<string | null>(null);
  const [correlationTopic, setCorrelationTopic] = useState<string | null>(null);
  const [correlations, setCorrelations] = useState<{nodes: CorrelationNode[], links: CorrelationLink[]}>({ nodes: [], links: [] });
  const [concepts, setConcepts] = useState<ConceptIntelligence[]>([]);
  const [socialSignal, setSocialSignal] = useState<SocialSignal | null>(null);

  const macroNews = useMemo(() => MOCK_NEWS.filter(n => n.category === 'Macro'), []);
  const industryNews = useMemo(() => MOCK_NEWS.filter(n => n.category === 'Industry'), []);

  const filteredNews = useMemo(() => {
    if (!selectedStock) {
      return MOCK_NEWS;
    }
    return MOCK_NEWS.filter(n => n.relatedStocks.includes(selectedStock));
  }, [selectedStock]);

  useEffect(() => {
    if (selectedStock) {
      loadSocialSignal(selectedStock);
    } else {
      setSocialSignal(null);
    }
  }, [selectedStock]);

  const loadSocialSignal = async (symbol: string) => {
    setIsSocialLoading(true);
    try {
      const signal = await geminiService.getSocialIntelligence(symbol);
      setSocialSignal(signal);
    } catch (e) {
      console.error("Failed to load social signal", e);
    } finally {
      setIsSocialLoading(false);
    }
  };

  const handleAnalyze = async (news: NewsItem) => {
    setIsAnalyzing(true);
    try {
      const result = await geminiService.analyzeNewsImpact(news, INITIAL_STOCKS.map(s => s.symbol));
      setAnalysisResult(result);
    } catch (e) {
      setAnalysisResult("Intelligence terminal timeout.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleViewNetwork = async (news: NewsItem) => {
    setIsAnalyzing(true);
    setCorrelationTopic(news.title);
    try {
      const network = await geminiService.getFactorCorrelations(news.title);
      setCorrelations(network);
      setActiveView('Correlations');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleViewHistory = async (news: NewsItem) => {
    setIsAnalyzing(true);
    setTimelineTopic(news.title);
    setConcepts([]); // Clear previous
    setActiveView('Timeline');
    try {
      const historyConcepts = await geminiService.getHistoricalAnalogy(news.title);
      setConcepts(historyConcepts);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleViewUserHistory = async (comment: SocialComment) => {
    setIsAnalyzing(true);
    try {
      const historyData = await geminiService.getSocialUserHistory(comment.author, comment.platform);
      // Map social history to concept structure for unified Timeline view
      setConcepts([{
        concept: "User Trace",
        description: `${comment.author} History Trace - Trust: ${historyData.trustScore}/100. ${historyData.trustSummary}`,
        history: historyData.pastPosts,
        trends: []
      }]);
      setTimelineTopic(`${comment.author} Profile Analysis`);
      setActiveView('Timeline');
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleViewOpinionCluster = async (comment: SocialComment) => {
    setIsAnalyzing(true);
    setCorrelationTopic(`Opinion Clusters: "${comment.content.substring(0, 30)}..."`);
    try {
      const clusterData = await geminiService.getSocialOpinionCorrelations(comment.content);
      setCorrelations(clusterData);
      setActiveView('Correlations');
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Layout activeView={activeView} setActiveView={setActiveView}>
      {activeView === 'Dashboard' && (
        <div className="space-y-10 animate-in fade-in duration-700 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[440px]">
             <div className="lg:col-span-2">
                <MacroIntelligence 
                  macroNews={macroNews} 
                  onAnalyze={handleAnalyze} 
                  onViewHistory={handleViewHistory}
                  onViewNetwork={handleViewNetwork}
                />
             </div>
             <div className="h-full">
                <PortfolioSummary 
                  stocks={INITIAL_STOCKS} 
                  selectedSymbol={selectedStock}
                  onSelectStock={setSelectedStock}
                />
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <NewsFeed 
                news={filteredNews} 
                filterLabel={selectedStock}
                onAnalyze={handleAnalyze} 
                onViewHistory={handleViewHistory} 
                onViewNetwork={handleViewNetwork}
              />
            </div>
            <div className="space-y-6">
              <div className="bg-[#121212] p-8 rounded-[32px] border border-white/5 shadow-2xl bg-gradient-to-b from-[#121212] to-[#0a0a0a]">
                <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6">Market Mood Node</h3>
                <div className="space-y-6">
                   <div className="flex justify-between items-center text-xs font-bold uppercase">
                      <span className="text-gray-400">Policy Support</span>
                      <span className="text-emerald-500 font-black italic">STABLE</span>
                   </div>
                   <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[65%]"></div>
                   </div>
                   <p className="text-[10px] text-gray-500 leading-relaxed italic">
                     Analyzing cross-border regulatory shifts and liquidity cues. Overall risk appetite is cautiously constructive.
                   </p>
                </div>
              </div>
            </div>
          </div>

          <div className="min-h-[440px]">
            <IndustryIntelligence 
              industryNews={industryNews} 
              onAnalyze={handleAnalyze} 
              onViewHistory={handleViewHistory}
              onViewNetwork={handleViewNetwork}
            />
          </div>

          {selectedStock && (
            <div className="h-[420px] animate-in slide-in-from-bottom duration-700">
              <SocialSentiment 
                signal={socialSignal} 
                isLoading={isSocialLoading} 
                onViewUserHistory={handleViewUserHistory}
                onViewOpinionCluster={handleViewOpinionCluster}
              />
            </div>
          )}
        </div>
      )}

      {activeView === 'Timeline' && (
        <Timeline concepts={concepts} topic={timelineTopic || undefined} onClear={() => setActiveView('Dashboard')} />
      )}
      
      {activeView === 'Correlations' && (
        <CorrelationGraph nodes={correlations.nodes} links={correlations.links} topic={correlationTopic || undefined} />
      )}

      {analysisResult && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[100] flex items-center justify-center p-8">
           <div className="bg-[#0d0d0d] w-full max-w-4xl rounded-[48px] border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-10 border-b border-white/5 flex items-center justify-between">
               <div>
                 <h3 className="text-2xl font-black uppercase italic tracking-tighter">Intelligence Node Output</h3>
               </div>
               <button onClick={() => setAnalysisResult(null)} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
               </button>
            </div>
            <div className="p-12 overflow-y-auto custom-scrollbar text-gray-300 leading-relaxed italic whitespace-pre-wrap">
              {analysisResult}
            </div>
          </div>
        </div>
      )}

      {isAnalyzing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[200] flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-[4px] border-blue-600/20 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="mt-8 text-blue-500 font-black tracking-[0.4em] uppercase text-[11px] animate-pulse">Neural Node Sync...</p>
        </div>
      )}
    </Layout>
  );
};

export default App;
