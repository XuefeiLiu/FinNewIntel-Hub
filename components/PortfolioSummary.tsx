
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Stock } from '../types';

const data = [
  { time: '09:30', value: 4000 },
  { time: '10:30', value: 4200 },
  { time: '11:30', value: 4100 },
  { time: '13:30', value: 4400 },
  { time: '14:30', value: 4600 },
  { time: '15:30', value: 4550 },
];

const PortfolioSummary: React.FC<{ stocks: Stock[] }> = ({ stocks }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Chart Section */}
      <div className="lg:col-span-2 bg-[#121212] p-6 rounded-3xl border border-white/5 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Net Portfolio Value</h3>
            <div className="flex items-baseline space-x-3 mt-1">
              <span className="text-3xl font-bold font-mono">$1,284,592.40</span>
              <span className="text-green-500 font-semibold">+2.45%</span>
            </div>
          </div>
          <div className="flex space-x-2">
            {['1D', '1W', '1M', '1Y'].map(t => (
              <button key={t} className={`px-3 py-1 text-xs rounded-full border border-white/10 ${t === '1D' ? 'bg-white/10 text-white' : 'text-gray-500'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis dataKey="time" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Watchlist Section */}
      <div className="bg-[#121212] p-6 rounded-3xl border border-white/5 flex flex-col shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-lg">Active Watchlist</h3>
          <button className="text-blue-500 text-sm font-medium hover:underline">Manage</button>
        </div>
        <div className="space-y-4 flex-1 overflow-y-auto pr-2">
          {stocks.map((stock) => (
            <div key={stock.symbol} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500 font-bold text-xs">
                  {stock.symbol.substring(0, 2)}
                </div>
                <div>
                  <div className="font-bold">{stock.symbol}</div>
                  <div className="text-[10px] text-gray-500 truncate w-24">{stock.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono font-medium">${stock.price.toFixed(2)}</div>
                <div className={`text-xs ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.changePercent}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;
