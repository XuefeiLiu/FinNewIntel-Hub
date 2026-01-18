
import React from 'react';
import { NewsItem } from '../types';

interface NewsFeedProps {
  news: NewsItem[];
  filterLabel?: string | null;
  onAnalyze: (news: NewsItem) => void;
  onViewHistory: (news: NewsItem) => void;
  onViewNetwork: (news: NewsItem) => void;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ news, filterLabel, onAnalyze, onViewHistory, onViewNetwork }) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div>
          <h3 className="text-2xl font-black tracking-tighter flex items-center uppercase italic">
            <svg className="w-6 h-6 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            {filterLabel ? `Asset Intelligence: ${filterLabel}` : 'Global Macro Intel'}
          </h3>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Aggregating cross-sector alpha signals</p>
        </div>
        <div className="flex items-center space-x-3">
           <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-400 font-black uppercase tracking-tighter">
             Source: Terminal Node Alpha
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {news.length === 0 && (
          <div className="col-span-2 py-32 text-center text-gray-500 italic bg-white/[0.02] rounded-[48px] border border-dashed border-white/10">
            <div className="flex flex-col items-center">
              <svg className="w-10 h-10 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              <p className="font-bold tracking-widest uppercase text-xs">No specific intelligence matches current scope.</p>
            </div>
          </div>
        )}
        {news.map((item) => (
          <div key={item.id} className="bg-[#121212] p-8 rounded-[40px] border border-white/5 hover:border-blue-500/30 transition-all group relative bg-gradient-to-br from-[#121212] to-[#0a0a0a] shadow-xl">
            {item.hasConflict && (
              <div className="absolute -top-3 -right-3 bg-amber-500 text-black text-[10px] font-black px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center z-10 animate-pulse tracking-tighter uppercase italic">
                Causality Conflict
              </div>
            )}
            
            <div className="flex justify-between items-start mb-6">
              <div className="flex space-x-3">
                <span className={`px-3 py-1 text-[9px] font-black rounded-xl ${item.isFact ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-purple-500/10 text-purple-500 border-purple-500/20'} border uppercase tracking-tighter`}>
                  {item.isFact ? 'Verified Fact' : 'Market Speculation'}
                </span>
                <span className="px-3 py-1 text-[9px] font-black bg-white/5 text-gray-500 rounded-xl border border-white/10 uppercase tracking-tighter">
                  {item.category}
                </span>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-black text-blue-500 italic tracking-tighter uppercase">{item.reliability}% Accuracy Node</div>
              </div>
            </div>

            <h4 className="text-xl font-black mb-4 leading-tight group-hover:text-blue-400 transition-colors uppercase italic tracking-tighter">
              {item.title}
            </h4>
            <p className="text-gray-400 text-sm mb-8 line-clamp-2 leading-relaxed font-medium italic">
              {item.summary}
            </p>
            
            <div className="flex items-center justify-between border-t border-white/5 pt-6">
              <div className="flex -space-x-3">
                {item.relatedStocks.map(s => (
                  <div key={s} className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 border-[3px] border-[#0a0a0a] flex items-center justify-center text-[10px] font-black text-white shadow-lg">
                    {s.substring(0,2)}
                  </div>
                ))}
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => onViewHistory(item)}
                  className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 text-gray-500 hover:text-white transition-all border border-white/5"
                  title="Trace Causality"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </button>
                <button 
                  onClick={() => onViewNetwork(item)}
                  className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 text-gray-500 hover:text-white transition-all border border-white/5"
                  title="Ripple Analysis"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                </button>
                <button 
                  onClick={() => onAnalyze(item)}
                  className="px-6 py-3 bg-white text-black text-[10px] font-black rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-xl uppercase tracking-tighter"
                >
                  Investigate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
