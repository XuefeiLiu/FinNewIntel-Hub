
import React from 'react';
import { EconomicIndicator, CalendarEvent } from '../types';

interface EconomicIndicatorsProps {
  recentIndicators: EconomicIndicator[];
  upcomingEvents: CalendarEvent[];
}

const EconomicIndicators: React.FC<EconomicIndicatorsProps> = ({ recentIndicators, upcomingEvents }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Indicators Section */}
      <div className="bg-[#121212] p-6 rounded-[32px] border border-white/5 shadow-xl flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-black tracking-tight text-white uppercase italic">Macro Data: Beat/Miss Terminal</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Real-time Surprise Index Tracking</p>
          </div>
          <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
            <span className="text-[9px] font-bold text-gray-400">LATENCY: 120ms</span>
          </div>
        </div>

        <div className="space-y-4 flex-1">
          {recentIndicators.map((indicator) => (
            <div key={indicator.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${indicator.region === 'US' ? 'bg-red-500' : 'bg-blue-500'}`}></span>
                  <span className="text-xs font-bold text-gray-200">{indicator.name}</span>
                </div>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                  indicator.status === 'beat' ? 'bg-green-500/10 text-green-500' : 
                  indicator.status === 'miss' ? 'bg-red-500/10 text-red-500' : 'bg-gray-500/10 text-gray-500'
                }`}>
                  {indicator.status}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center">
                  <div className="text-[8px] text-gray-500 font-bold uppercase">Actual</div>
                  <div className="text-sm font-mono font-bold text-white">{indicator.actual}</div>
                </div>
                <div className="text-center border-x border-white/5">
                  <div className="text-[8px] text-gray-500 font-bold uppercase">Forecast</div>
                  <div className="text-sm font-mono font-bold text-gray-400">{indicator.forecast}</div>
                </div>
                <div className="text-center">
                  <div className="text-[8px] text-gray-500 font-bold uppercase">Previous</div>
                  <div className="text-sm font-mono font-bold text-gray-500">{indicator.previous}</div>
                </div>
              </div>
              <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                <p className="text-[10px] text-gray-400 leading-relaxed italic">
                  <span className="text-blue-400 font-bold not-italic mr-1">AI INSIGHT:</span>
                  {indicator.insight}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Section */}
      <div className="bg-[#121212] p-6 rounded-[32px] border border-white/5 shadow-xl flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-black tracking-tight text-white uppercase italic">Economic Calendar</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Scheduled High-Impact Triggers</p>
          </div>
          <button className="text-[10px] font-bold text-blue-500 uppercase hover:underline">Full Outlook →</button>
        </div>

        <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="flex items-center space-x-4 p-3 rounded-2xl bg-white/5 border border-transparent hover:border-white/10 transition-all group">
              <div className="flex flex-col items-center justify-center w-12 h-12 bg-black/40 rounded-xl border border-white/5">
                <div className="text-[10px] font-black text-gray-500 uppercase">{event.date.split(' ')[1]}</div>
                <div className="text-xs font-mono font-bold text-white">{event.date.split(' ')[0]}</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${
                    event.importance === 'High' ? 'bg-red-500 text-white' : 
                    event.importance === 'Medium' ? 'bg-amber-500 text-black' : 'bg-gray-700 text-gray-300'
                  }`}>
                    {event.importance}
                  </span>
                  <span className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors">{event.name}</span>
                </div>
                <div className="flex items-center mt-1 space-x-4">
                  <span className="text-[10px] text-gray-500 font-bold">{event.region}</span>
                  <div className="flex items-center text-[10px] text-gray-400 font-mono">
                    <span className="mr-1">EXPECTING:</span>
                    <span className="text-blue-400">{event.forecast}</span>
                  </div>
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EconomicIndicators;
