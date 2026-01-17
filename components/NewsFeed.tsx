
import React from 'react';
import { NewsItem } from '../types';

interface NewsFeedProps {
  news: NewsItem[];
  onAnalyze: (news: NewsItem) => void;
  onViewHistory: (news: NewsItem) => void;
  onViewNetwork: (news: NewsItem) => void;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ news, onAnalyze, onViewHistory, onViewNetwork }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
          Noise-Reduced Insights
        </h3>
        <div className="flex space-x-2">
           <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-all">Filter: My Portfolio</button>
           <button className="px-4 py-2 bg-blue-600 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20">AI Summarize All</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((item) => (
          <div key={item.id} className="bg-[#121212] p-6 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all group relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-2 h-full ${item.sentiment === 'positive' ? 'bg-green-500/30' : item.sentiment === 'negative' ? 'bg-red-500/30' : 'bg-gray-500/30'}`}></div>
            <div className="flex justify-between items-start mb-4">
              <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded bg-white/5 border border-white/10 text-gray-400`}>
                {item.category}
              </span>
              <span className="text-[10px] text-gray-500">{item.timestamp}</span>
            </div>
            <h4 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors leading-snug">
              {item.title}
            </h4>
            <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
              {item.summary}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {item.relatedStocks.map(s => (
                <span key={s} className="px-2 py-1 bg-blue-600/10 text-blue-400 text-[10px] font-mono rounded-md border border-blue-500/20">
                  ${s}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${item.sentiment === 'positive' ? 'bg-green-500' : item.sentiment === 'negative' ? 'bg-red-500' : 'bg-gray-500'}`}></div>
                <span className="text-xs font-semibold capitalize">{item.sentiment} Signal</span>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => onViewNetwork(item)}
                  className="text-xs bg-indigo-600/20 text-indigo-400 font-bold px-3 py-1.5 rounded-lg hover:bg-indigo-600/40 transition-colors flex items-center border border-indigo-500/30"
                >
                  <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                  Network
                </button>
                <button 
                  onClick={() => onViewHistory(item)}
                  className="text-xs bg-white/10 text-white font-bold px-3 py-1.5 rounded-lg hover:bg-white/20 transition-colors flex items-center"
                >
                  <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  History
                </button>
                <button 
                  onClick={() => onAnalyze(item)}
                  className="text-xs bg-white text-black font-bold px-3 py-1.5 rounded-lg hover:bg-blue-500 hover:text-white transition-colors flex items-center"
                >
                  Analyze
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
