
import React from 'react';
import { NewsItem } from '../types';

interface MacroIntelligenceProps {
  macroNews: NewsItem[];
  onAnalyze: (news: NewsItem) => void;
  onViewHistory: (news: NewsItem) => void;
  onViewNetwork: (news: NewsItem) => void;
}

const MacroIntelligence: React.FC<MacroIntelligenceProps> = ({ macroNews, onAnalyze, onViewHistory, onViewNetwork }) => {
  return (
    <div className="bg-[#121212] p-6 rounded-[32px] border border-white/5 shadow-xl h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black tracking-tight text-white uppercase italic">Policy Intelligence Radar</h3>
          <div className="flex items-center space-x-4 mt-1">
             <span className="flex items-center text-[10px] font-bold text-gray-500 uppercase">
               <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5"></span>
               US Policy
             </span>
             <span className="flex items-center text-[10px] font-bold text-gray-500 uppercase">
               <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5"></span>
               China Directives
             </span>
          </div>
        </div>
        <div className="bg-white/5 px-4 py-2 rounded-2xl border border-white/10">
          <span className="text-[10px] font-black text-blue-400 uppercase tracking-tighter">Market Driver: Fed Path</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {macroNews.slice(0, 2).map((item) => (
          <div key={item.id} className="bg-white/5 p-5 rounded-3xl border border-white/5 hover:border-blue-500/20 transition-all flex flex-col group">
            <div className="flex justify-between items-start mb-4">
              <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] font-bold rounded border border-blue-500/20">
                TOP IMPACT
              </span>
              <div className="flex space-x-2">
                 <button 
                  onClick={() => onViewHistory(item)}
                  className="p-1.5 bg-white/5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
                  title="Historical Timeline"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </button>
                <button 
                  onClick={() => onViewNetwork(item)}
                  className="p-1.5 bg-white/5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
                  title="Correlation Network"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                </button>
              </div>
            </div>
            
            <h4 className="text-sm font-bold leading-tight mb-3 text-gray-100 line-clamp-2">
              {item.title}
            </h4>
            
            <div className="flex-1 space-y-3 mb-6">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-gray-500">Asset Ripple:</span>
                <div className="flex space-x-2">
                   <span className="text-emerald-500 font-bold uppercase tracking-tighter">Equity ↑</span>
                   <span className="text-red-500 font-bold uppercase tracking-tighter">FX ↓</span>
                </div>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2">
                {item.summary}
              </p>
            </div>

            <button 
              onClick={() => onAnalyze(item)}
              className="w-full py-2.5 bg-white text-black text-[10px] font-black rounded-xl hover:bg-blue-600 hover:text-white transition-all uppercase"
            >
              Analyze Macro Linkage
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex items-center justify-between bg-black/40 p-4 rounded-2xl border border-white/5">
        <div className="flex items-center space-x-6">
          <div className="text-center border-r border-white/10 pr-6">
            <div className="text-[9px] text-gray-500 font-bold uppercase mb-0.5">Yield Sensitivity</div>
            <div className="text-xs font-mono text-white">HIGH</div>
          </div>
          <div className="text-center">
            <div className="text-[9px] text-gray-500 font-bold uppercase mb-0.5">Liquidity Pulse</div>
            <div className="text-xs font-mono text-green-500">NEUTRAL+</div>
          </div>
        </div>
        <div className="text-[10px] text-gray-500 font-bold italic">Source: AI Policy Agent Node-1</div>
      </div>
    </div>
  );
};

export default MacroIntelligence;
