
import React from 'react';
import { CorrelationNode, CorrelationLink } from '../types';

interface CorrelationGraphProps {
  nodes: CorrelationNode[];
  links: CorrelationLink[];
  topic?: string;
}

const CorrelationGraph: React.FC<CorrelationGraphProps> = ({ nodes, links, topic }) => {
  const getGroupStyles = (group: string) => {
    const g = group.toLowerCase();
    switch (g) {
      case 'supportive-post': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-emerald-500/10';
      case 'opposing-post': return 'bg-red-500/20 text-red-400 border-red-500/30 shadow-red-500/10';
      case 'competitor': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'supplier': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'regulator': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="p-10 bg-[#121212] rounded-[48px] border border-white/5 min-h-[700px] relative overflow-hidden flex flex-col bg-gradient-to-br from-[#121212] to-[#0a0a0a] shadow-2xl">
      <div className="mb-12">
        <div className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
          <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] italic">Cluster Mapping Engine</span>
        </div>
        <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-3">
          {topic ? topic : 'Global Intelligence Network'}
        </h3>
        <p className="text-gray-500 text-sm font-medium italic">Mapping cross-sector ripples and social opinion clusters via neural sync.</p>
      </div>

      <div className="flex-1 flex flex-wrap justify-center items-center gap-8 py-12 relative">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {nodes.map(node => (
          <div 
            key={node.id} 
            className={`p-6 rounded-[32px] border flex flex-col items-center justify-center space-y-3 min-w-[160px] max-w-[220px] transition-all hover:scale-110 hover:z-10 cursor-default ${getGroupStyles(node.group)} shadow-2xl backdrop-blur-sm relative group`}
          >
             <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[32px]"></div>
             <span className="text-[9px] font-black uppercase tracking-[0.1em] opacity-60 italic">{node.group.replace('-', ' ')}</span>
             <div className="font-black text-sm text-center line-clamp-2 uppercase italic tracking-tighter">{node.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-auto border-t border-white/5 pt-10">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-8 flex items-center">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>
          Ripple Insight Matrix
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {links.map((link, idx) => (
            <div key={idx} className="bg-white/5 p-6 rounded-[32px] border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between group">
              <div>
                <div className="text-[10px] font-black text-blue-400 mb-4 flex items-center justify-between italic uppercase tracking-tighter">
                  <span className="truncate max-w-[100px] border-b border-blue-500/20">{link.source}</span>
                  <div className="flex items-center space-x-1 px-3">
                    <div className="w-1 h-1 bg-blue-500/50 rounded-full"></div>
                    <div className="w-4 h-[1px] bg-blue-500/30"></div>
                    <div className="w-1 h-1 bg-blue-500/50 rounded-full"></div>
                  </div>
                  <span className="truncate max-w-[100px] border-b border-blue-500/20 text-right">{link.target}</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed italic font-medium">"{link.reason}"</p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest italic">Signal Strength</span>
                <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400" style={{ width: `${link.strength * 100}%` }}></div>
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
