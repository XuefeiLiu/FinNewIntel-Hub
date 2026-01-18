
import React from 'react';
import { NewsItem } from '../types';

interface IndustryIntelligenceProps {
  industryNews: NewsItem[];
  onAnalyze: (news: NewsItem) => void;
  onViewHistory: (news: NewsItem) => void;
  onViewNetwork: (news: NewsItem) => void;
}

const IndustryIntelligence: React.FC<IndustryIntelligenceProps> = ({ industryNews, onAnalyze, onViewHistory, onViewNetwork }) => {
  return (
    <div className="bg-[#121212] p-8 rounded-[48px] border border-white/5 shadow-2xl h-full flex flex-col bg-gradient-to-br from-[#121212] to-[#0a0a0a]">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-2xl font-black tracking-tighter text-white uppercase italic">Industry Vertical Intelligence</h3>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Real-time Sector Rotation & Supply Chain Pulse</p>
        </div>
        <div className="bg-emerald-500/10 px-6 py-2.5 rounded-2xl border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-tighter italic">Signal Status: Expansionary</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        {industryNews.length === 0 ? (
           <div className="col-span-2 flex flex-col items-center justify-center text-gray-600 italic text-xs border border-dashed border-white/10 rounded-[40px] py-20">
              <svg className="w-10 h-10 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              <p className="font-bold tracking-widest uppercase text-[10px]">Scanning for vertical industry signals...</p>
           </div>
        ) : (
          industryNews.slice(0, 2).map((item) => (
            <div key={item.id} className="bg-white/5 p-8 rounded-[40px] border border-white/5 hover:border-emerald-500/20 transition-all flex flex-col group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <div className="flex justify-between items-start mb-6 relative z-10">
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black rounded-xl border border-emerald-500/20 uppercase tracking-tighter">
                  {item.relatedStocks[0] || 'Sector'} Vertical Node
                </span>
                <div className="flex space-x-3">
                   <button 
                    onClick={() => onViewHistory(item)}
                    className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 text-gray-500 hover:text-white transition-all border border-white/5"
                    title="Historical Lineage"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </button>
                  <button 
                    onClick={() => onViewNetwork(item)}
                    className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 text-gray-500 hover:text-white transition-all border border-white/5"
                    title="Ripple Mapping"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                  </button>
                </div>
              </div>
              
              <h4 className="text-lg font-black leading-tight mb-4 text-gray-100 line-clamp-2 uppercase italic tracking-tighter relative z-10">
                {item.title}
              </h4>
              
              <div className="flex-1 space-y-4 mb-8 relative z-10">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-gray-500 font-bold uppercase tracking-widest">Industry Exposure Depth:</span>
                  <div className="flex -space-x-2">
                    {item.relatedStocks.map(s => (
                      <div key={s} className="w-6 h-6 rounded-full bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-[8px] font-black text-emerald-400 shadow-md">
                        {s.substring(0,2)}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2 font-medium italic">
                  {item.summary}
                </p>
              </div>

              <button 
                onClick={() => onAnalyze(item)}
                className="w-full py-3.5 bg-emerald-500/5 text-emerald-400 text-[10px] font-black rounded-2xl hover:bg-emerald-500 hover:text-white border border-emerald-500/20 transition-all uppercase tracking-widest relative z-10 shadow-lg"
              >
                Inspect Supply Chain Ripples
              </button>
            </div>
          ))
        )}
      </div>
      
      <div className="mt-10 flex items-center justify-between bg-black/40 p-6 rounded-[32px] border border-white/5">
        <div className="flex items-center space-x-10">
          <div className="text-center border-r border-white/10 pr-10">
            <div className="text-[9px] text-gray-500 font-black uppercase mb-1 tracking-widest">Sector Vola</div>
            <div className="text-xs font-mono text-white uppercase font-bold">Low-Alpha</div>
          </div>
          <div className="text-center">
            <div className="text-[9px] text-gray-500 font-black uppercase mb-1 tracking-widest">Capex Pulse</div>
            <div className="text-xs font-mono text-emerald-500 uppercase font-bold">Strong Rebound</div>
          </div>
        </div>
        <div className="text-[10px] text-gray-600 font-black italic tracking-tighter uppercase">Last Sector Sync: 12m ago</div>
      </div>
    </div>
  );
};

export default IndustryIntelligence;
