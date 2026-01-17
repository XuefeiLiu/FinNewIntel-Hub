
import React from 'react';
import { CorrelationNode, CorrelationLink } from '../types';

interface CorrelationGraphProps {
  nodes: CorrelationNode[];
  links: CorrelationLink[];
  topic?: string;
}

const CorrelationGraph: React.FC<CorrelationGraphProps> = ({ nodes, links, topic }) => {
  const getGroupColor = (group: string) => {
    switch (group.toLowerCase()) {
      case 'competitor': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'supplier': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'customer': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'market-trend': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'regulator': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="p-8 bg-[#121212] rounded-3xl border border-white/5 min-h-[600px] relative overflow-hidden flex flex-col">
      <div className="mb-10">
        <h3 className="text-2xl font-bold mb-2">
          {topic ? `News Correlation: ${topic}` : 'Market Intelligence Network'}
        </h3>
        <p className="text-gray-500 text-sm">AI-mapped ripples: How this news affects competitors, suppliers, and global trends.</p>
      </div>

      <div className="flex-1 flex flex-wrap justify-center items-center gap-6 py-10">
        {nodes.map(node => (
          <div 
            key={node.id} 
            className={`p-5 rounded-2xl border flex flex-col items-center justify-center space-y-2 min-w-[140px] transition-all hover:scale-105 cursor-default ${getGroupColor(node.group)} shadow-lg shadow-black/40`}
          >
             <span className="text-[10px] font-bold uppercase tracking-tighter opacity-70">{node.group}</span>
             <div className="font-bold text-sm text-center line-clamp-2">{node.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-auto border-t border-white/5 pt-8">
        <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          Correlation Insights
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link, idx) => (
            <div key={idx} className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-blue-400 mb-2 flex items-center">
                  <span className="truncate max-w-[100px]">{link.source}</span>
                  <svg className="w-3 h-3 mx-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  <span className="truncate max-w-[100px]">{link.target}</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed italic">"{link.reason}"</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] text-gray-500">Correlation Strength</span>
                <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${link.strength * 100}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CorrelationGraph;
