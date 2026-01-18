
import React from 'react';
import { SocialSignal, SocialComment } from '../types';

interface SocialSentimentProps {
  signal: SocialSignal | null;
  isLoading: boolean;
  onViewUserHistory: (comment: SocialComment) => void;
  onViewOpinionCluster: (comment: SocialComment) => void;
}

const SocialSentiment: React.FC<SocialSentimentProps> = ({ signal, isLoading, onViewUserHistory, onViewOpinionCluster }) => {
  if (isLoading) {
    return (
      <div className="bg-[#121212] p-8 rounded-[32px] border border-white/5 shadow-xl h-full flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Aggregating Social Signal...</p>
      </div>
    );
  }

  if (!signal) {
    return (
      <div className="bg-[#121212] p-8 rounded-[32px] border border-white/5 shadow-xl h-full flex flex-col items-center justify-center opacity-40">
        <svg className="w-10 h-10 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Select a Stock to Load Sentiment</p>
      </div>
    );
  }

  return (
    <div className="bg-[#121212] p-6 rounded-[32px] border border-white/5 shadow-xl h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-black tracking-tight text-white uppercase italic">Social Ripple & Sentiment</h3>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Real-time KOL & Community Tracking</p>
        </div>
        <div className="flex space-x-4">
           <div className="text-center">
              <div className="text-[9px] text-gray-500 font-bold uppercase mb-0.5">Buzz Score</div>
              <div className="text-sm font-mono text-blue-400 font-black">{signal.buzzScore}/100</div>
           </div>
           <div className="text-center">
              <div className="text-[9px] text-gray-500 font-bold uppercase mb-0.5">Bullishness</div>
              <div className={`text-sm font-mono font-black ${signal.bullishPercent > 50 ? 'text-green-500' : 'text-red-500'}`}>
                {signal.bullishPercent}%
              </div>
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
        {signal.topComments.map((comment) => (
          <div 
            key={comment.id} 
            className="group p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all relative"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-2">
                <div className={`w-1.5 h-1.5 rounded-full ${comment.sentiment === 'positive' ? 'bg-green-500' : comment.sentiment === 'negative' ? 'bg-red-500' : 'bg-gray-500'}`}></div>
                <span className="text-[11px] font-bold text-gray-300">@{comment.author}</span>
                <span className="text-[9px] px-1.5 py-0.5 bg-blue-500/10 text-blue-400 rounded-md font-bold border border-blue-500/20">{comment.platform}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => onViewUserHistory(comment)}
                  className="p-1.5 bg-white/5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-blue-400 transition-colors"
                  title="User Profile History & Trust"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </button>
                <button 
                  onClick={() => onViewOpinionCluster(comment)}
                  className="p-1.5 bg-white/5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-emerald-400 transition-colors"
                  title="Opinion Clustering & Ripples"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                </button>
                <span className="text-[9px] text-gray-600 font-mono uppercase">{comment.timestamp}</span>
              </div>
            </div>
            <p className="text-[12px] text-gray-400 leading-relaxed mb-3 line-clamp-2 italic">
              "{comment.content}"
            </p>
            <div className="flex items-center justify-between">
               <div className="flex items-center space-x-1 text-gray-500 text-[10px]">
                 <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" /></svg>
                 <span>{comment.likes}</span>
               </div>
               <button 
                onClick={() => window.open(comment.url, '_blank')}
                className="text-[9px] font-bold text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest"
               >
                 View Source →
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialSentiment;
