
import React from 'react';
import { TimelineEvent } from '../types';

interface TimelineProps {
  events: TimelineEvent[];
  topic?: string;
  onClear?: () => void;
}

const Timeline: React.FC<TimelineProps> = ({ events, topic, onClear }) => {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold mb-4">
          {topic ? `Historical Context: ${topic}` : 'Causality Mapping'}
        </h2>
        <p className="text-gray-400">
          {topic ? 'Tracing the lineage and causal chain of this event.' : 'Tracing the historical development of current market shifts.'}
        </p>
        {topic && onClear && (
          <button 
            onClick={onClear}
            className="mt-4 text-sm text-blue-500 hover:text-blue-400 font-medium"
          >
            ← Back to General Timeline
          </button>
        )}
      </div>
      <div className="relative border-l-2 border-white/10 ml-6 space-y-12 pb-10">
        {events.length === 0 && (
          <div className="pl-10 text-gray-500 italic">No historical events found for this topic.</div>
        )}
        {events.map((event, idx) => (
          <div key={idx} className="relative pl-10">
            <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-blue-600 border-4 border-[#0a0a0a]"></div>
            <div className="text-blue-500 font-mono text-sm font-bold mb-1 uppercase">{event.date}</div>
            <div className="bg-[#121212] p-6 rounded-3xl border border-white/5 shadow-xl hover:border-blue-500/40 transition-all">
              <h3 className="text-xl font-bold mb-3">{event.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{event.description}</p>
              <div className="bg-blue-600/5 p-4 rounded-xl border border-blue-500/10">
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block mb-1">Market Significance</span>
                <p className="text-sm italic">"{event.significance}"</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
