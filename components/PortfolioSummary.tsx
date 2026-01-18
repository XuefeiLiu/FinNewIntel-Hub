
import React from 'react';
import { Stock } from '../types';

interface PortfolioSummaryProps {
  stocks: Stock[];
  selectedSymbol: string | null;
  onSelectStock: (symbol: string | null) => void;
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ stocks, selectedSymbol, onSelectStock }) => {
  return (
    <div className="bg-[#121212] p-6 rounded-3xl border border-white/5 flex flex-col shadow-xl h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-lg">My Portfolio</h3>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Watchlist & Exposure</p>
        </div>
        {selectedSymbol && (
           <button 
            onClick={() => onSelectStock(null)}
            className="text-blue-500 text-[10px] font-black hover:underline uppercase tracking-widest"
           >
             Clear Select
           </button>
        )}
      </div>
      <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {stocks.map((stock) => (
          <div 
            key={stock.symbol} 
            onClick={() => onSelectStock(stock.symbol)}
            className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer group ${
              selectedSymbol === stock.symbol 
              ? 'bg-blue-600/20 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
              : 'bg-white/5 border-white/5 hover:border-white/20'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-[10px] transition-colors ${
                selectedSymbol === stock.symbol ? 'bg-blue-600 text-white' : 'bg-white/5 text-blue-500'
              }`}>
                {stock.symbol.substring(0, 2)}
              </div>
              <div>
                <div className="font-bold text-xs">{stock.symbol}</div>
                <div className="text-[10px] text-gray-500 truncate w-20">{stock.name}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono font-medium text-xs">${stock.price.toFixed(2)}</div>
              <div className={`text-[10px] font-bold ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {stock.change >= 0 ? '+' : ''}{stock.changePercent}%
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-white/5">
        <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold uppercase">
          <span>Total Weight</span>
          <span className="text-white">100%</span>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;
