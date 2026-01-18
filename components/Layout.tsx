
import React from 'react';
import { ViewType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView }) => {
  const navItems: { label: ViewType; icon: string; desc: string }[] = [
    { label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', desc: 'Main Console' },
    { label: 'Timeline', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', desc: 'Causality Map' },
    { label: 'Correlations', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01', desc: 'Ripple Analysis' },
    { label: 'Intelligence', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', desc: 'Factor Search' },
    { label: 'RiskConfig', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', desc: 'Risk Settings' },
  ];

  return (
    <div className="flex h-screen w-full bg-[#070707] text-gray-100 selection:bg-blue-500/30">
      <aside className="w-20 lg:w-72 border-r border-white/5 flex flex-col py-8 bg-[#0a0a0a]">
        <div className="px-8 flex items-center space-x-4 mb-12">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20 rotate-3 transition-transform hover:rotate-0">
            <span className="text-2xl font-black italic">F</span>
          </div>
          <div className="hidden lg:block">
             <h1 className="text-lg font-black tracking-tight leading-none">FININTEL</h1>
             <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">Institutional Grade</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveView(item.label)}
              className={`w-full flex items-center p-4 rounded-2xl transition-all group relative ${
                activeView === item.label
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10'
                  : 'text-gray-500 hover:bg-white/5 hover:text-white'
              }`}
            >
              <svg className={`w-6 h-6 ${activeView === item.label ? '' : 'group-hover:scale-110 transition-transform'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <div className="hidden lg:block ml-4 text-left">
                <div className="text-sm font-bold leading-none">{item.label}</div>
                <div className={`text-[10px] mt-1 ${activeView === item.label ? 'text-blue-200' : 'text-gray-600 group-hover:text-gray-400'}`}>{item.desc}</div>
              </div>
              {activeView === item.label && (
                <div className="absolute right-4 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              )}
            </button>
          ))}
        </nav>

        <div className="px-6 mt-auto">
          <div className="p-6 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-3xl border border-white/5 relative overflow-hidden hidden lg:block">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl"></div>
            <h4 className="text-xs font-bold mb-2 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              CORE AI ENGINE
            </h4>
            <p className="text-[10px] text-gray-500 leading-relaxed mb-4">Scanning 5k+ regulators & 500+ KOL signals globally.</p>
            <div className="text-[9px] font-mono text-blue-400 bg-blue-400/10 p-2 rounded-lg">LAST SYNC: 2m AGO</div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden bg-[#070707]">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-[#070707]/60 backdrop-blur-2xl z-20">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500 uppercase font-black tracking-[0.2em]">Live Intelligence Terminal</span>
            <div className="h-4 w-[1px] bg-white/10"></div>
            <span className="text-sm font-bold text-gray-300">{activeView}</span>
          </div>
          <div className="flex items-center space-x-8">
             <div className="hidden md:flex items-center space-x-3 text-xs font-bold">
               <span className="text-gray-500">MARKET STATUS:</span>
               <span className="flex items-center text-green-500">
                 <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                 OPEN
               </span>
             </div>
             <div className="flex items-center space-x-4 border-l border-white/10 pl-8">
               <div className="text-right hidden sm:block">
                 <div className="text-xs font-black tracking-tight">ANALYSIS MODE</div>
                 <div className="text-[10px] text-blue-500 font-bold">INSTITUTIONAL</div>
               </div>
               <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-xl">
                 <div className="w-full h-full rounded-[14px] bg-[#070707] flex items-center justify-center">
                   <span className="text-xs font-black">AD</span>
                 </div>
               </div>
             </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
