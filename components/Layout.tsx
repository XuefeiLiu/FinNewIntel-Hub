
import React from 'react';
import { ViewType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView }) => {
  const navItems: { label: ViewType; icon: string }[] = [
    { label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { label: 'Timeline', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Correlations', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
    { label: 'Intelligence', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  ];

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] text-gray-100">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 border-r border-white/10 flex flex-col items-center lg:items-stretch py-6 space-y-8 bg-[#0d0d0d]">
        <div className="px-6 flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-xl font-bold">FI</span>
          </div>
          <span className="hidden lg:block text-xl font-bold tracking-tight">FinIntel Hub</span>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveView(item.label)}
              className={`w-full flex items-center justify-center lg:justify-start p-3 rounded-xl transition-all duration-200 group ${
                activeView === item.label
                  ? 'bg-blue-600/10 text-blue-500'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <span className="hidden lg:block ml-4 font-medium">{item.label}</span>
              {activeView === item.label && (
                <div className="hidden lg:block ml-auto w-1.5 h-1.5 bg-blue-500 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="px-4 mt-auto">
          <div className="p-4 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-2xl border border-blue-500/20 hidden lg:block">
            <h4 className="text-sm font-semibold mb-1">PRO Analysis</h4>
            <p className="text-xs text-gray-400 mb-3">AI Engine is analyzing the current market sentiment.</p>
            <div className="flex items-center space-x-2 text-xs text-blue-400">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
              <span>System Optimal</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-[#0a0a0a]/80 backdrop-blur-md z-10">
          <h2 className="text-lg font-semibold">{activeView}</h2>
          <div className="flex items-center space-x-6">
             <div className="hidden md:flex items-center px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input type="text" placeholder="Global Search..." className="bg-transparent border-none focus:ring-0 text-sm w-48" />
             </div>
             <div className="flex items-center space-x-3">
               <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500 border border-white/20"></div>
               <span className="text-sm font-medium">Senior Analyst</span>
             </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto bg-[#0a0a0a] p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
