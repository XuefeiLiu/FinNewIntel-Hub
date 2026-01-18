
import React, { useState } from 'react';
import { ConceptIntelligence } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TimelineProps {
  concepts: ConceptIntelligence[];
  topic?: string;
  onClear?: () => void;
}

const Timeline: React.FC<TimelineProps> = ({ concepts, topic, onClear }) => {
  const [activeTab, setActiveTab] = useState(0);
  const currentConcept = concepts[activeTab];

  const renderDescription = (desc: string) => {
    const lines = desc.split('\n').filter(l => l.trim() !== '');
    if (lines.length <= 1) return <p className="text-gray-400 text-lg leading-relaxed italic font-medium opacity-90">{desc}</p>;

    return (
      <div className="space-y-4">
        <p className="text-gray-200 text-lg font-bold leading-relaxed italic opacity-100">
          {lines[0]}
        </p>
        <ul className="space-y-2 pl-2">
          {lines.slice(1).map((line, i) => (
            <li key={i} className="text-gray-400 text-sm leading-relaxed italic font-medium flex items-start">
              <span className="text-blue-500 mr-2 mt-1">•</span>
              {line.replace(/^•\s*/, '')}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const handleEventClick = (url?: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="mb-12 text-center">
        <div className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
          <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] italic font-mono-data">5-Year Intelligence Deep Trace</span>
        </div>
        <h2 className="text-5xl font-black tracking-tighter mb-4 uppercase italic text-white leading-none">
          {topic || 'Causality Architecture'}
        </h2>
        
        {onClear && (
          <button 
            onClick={onClear}
            className="mt-6 px-8 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:border-blue-500/30 hover:text-blue-400"
          >
            ← Back to Command Center
          </button>
        )}
      </div>

      {concepts.length > 0 ? (
        <div className="space-y-12">
          {/* Concept Sub-tabs */}
          <div className="flex flex-wrap justify-center gap-3 p-3 bg-white/5 rounded-[40px] border border-white/5 backdrop-blur-md">
            {concepts.map((c, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-10 py-3.5 rounded-[30px] text-xs font-black uppercase tracking-tighter transition-all duration-300 ${
                  activeTab === idx 
                  ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/40' 
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                {c.concept}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Hotness & Sentiment Trend Column */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-8">
              <div className="bg-[#121212] p-10 rounded-[56px] border border-white/5 shadow-2xl bg-gradient-to-br from-[#121212] to-[#0a0a0a] relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/5 rounded-full blur-[60px]"></div>
                
                <h3 className="text-sm font-black text-white uppercase italic mb-8 flex items-center tracking-widest">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 shadow-[0_0_12px_rgba(59,130,246,0.9)]"></span>
                  Concept Discussion Pulse
                </h3>
                
                <div className="h-56 w-full font-mono-data">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={currentConcept.trends}>
                      <defs>
                        <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                      <XAxis dataKey="date" hide />
                      <YAxis hide domain={[0, 100]} />
                      <Tooltip 
                        contentStyle={{ background: '#0a0a0a', border: '1px solid #ffffff15', borderRadius: '16px', backdropFilter: 'blur(10px)' }}
                        itemStyle={{ color: '#3b82f6', fontSize: '11px', fontWeight: 'bold' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="volume" 
                        stroke="#3b82f6" 
                        fillOpacity={1} 
                        fill="url(#colorVolume)" 
                        strokeWidth={3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-10 space-y-4">
                  <div className="flex justify-between items-center text-[11px] font-black uppercase text-gray-500 tracking-wider">
                    <span>5-Year Evolution</span>
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20 italic">Alpha Sync</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium italic opacity-80">
                    Tracing mentions across global institutional networks. Data points represent systemic volatility and mention frequency.
                  </p>
                </div>
              </div>

              <div className="bg-blue-600/5 p-10 rounded-[48px] border border-blue-500/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors duration-500"></div>
                <h4 className="text-[12px] font-black text-blue-400 uppercase tracking-widest mb-5 italic relative z-10">Concept Intelligence Brief</h4>
                <p className="text-[15px] text-blue-100/80 italic leading-relaxed font-medium relative z-10">
                  {currentConcept.description}
                </p>
              </div>
            </div>

            {/* Timeline Scroll Column */}
            <div className="lg:col-span-8 relative border-l-2 border-white/5 ml-6 pl-16 space-y-12">
              {currentConcept.history.map((event, idx) => (
                <div 
                  key={idx} 
                  onClick={() => handleEventClick(event.url)}
                  className={`relative group animate-in slide-in-from-bottom-8 duration-700 cursor-pointer transition-transform hover:-translate-y-1`} 
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div className="absolute -left-[73px] top-8 w-[16px] h-[16px] rounded-full bg-[#0a0a0a] border-[4px] border-blue-600 group-hover:scale-150 transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.5)] z-20"></div>
                  
                  <div className="timeline-glass p-12 rounded-[56px] border border-white/5 group-hover:border-blue-500/40 transition-all duration-500 shadow-2xl bg-gradient-to-br from-[#121212] to-[#0a0a0a] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-[60px] -mr-24 -mt-24 group-hover:bg-blue-500/15 transition-all duration-700"></div>
                    
                    <div className="flex justify-between items-start mb-8 relative z-10">
                      <div className="text-blue-500 font-mono-data font-black text-sm uppercase tracking-tighter italic">
                        {event.date}
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="px-4 py-1.5 bg-white/5 rounded-full border border-white/10 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                          Historical Record
                        </span>
                        {event.url && (
                          <div className="w-8 h-8 rounded-full bg-blue-600/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <h4 className="text-3xl font-black text-white italic tracking-tighter mb-6 group-hover:text-blue-400 transition-colors leading-tight relative z-10">
                      {event.title}
                    </h4>
                    
                    <div className="mb-10 relative z-10">
                      {renderDescription(event.description)}
                    </div>
                    
                    <div className="bg-blue-500/5 p-8 rounded-[40px] border border-blue-500/15 shadow-inner group-hover:bg-blue-500/10 transition-colors duration-500 relative z-10">
                      <div className="flex items-center mb-4">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                        <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.3em] font-mono-data">Market Implication Insight</span>
                      </div>
                      <p className="text-[16px] text-blue-100 font-bold italic leading-relaxed tracking-tight">
                        {event.significance}
                      </p>
                    </div>
                    
                    <div className="mt-8 flex justify-end relative z-10">
                      <span className="text-[9px] font-black text-gray-600 uppercase tracking-[0.4em] italic group-hover:text-blue-500/50 transition-colors">
                        Click to Trace Source
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="py-48 text-center flex flex-col items-center">
           <div className="w-20 h-20 border-[3px] border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-8 shadow-[0_0_30px_rgba(59,130,246,0.1)]"></div>
           <p className="text-sm font-black uppercase tracking-[0.5em] text-blue-500 animate-pulse">Neural Decryption in Progress...</p>
           <p className="mt-4 text-[10px] text-gray-600 font-bold uppercase tracking-widest italic opacity-60">Synchronizing 5-year macro conceptual nodes</p>
        </div>
      )}
    </div>
  );
};

export default Timeline;
