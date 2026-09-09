// frontend/src/components/Navbar.jsx
import React from 'react';
import { ShieldAlert, Cpu, Activity, RefreshCw } from 'lucide-react';

export default function Navbar({ onScan, scanning }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
          <Activity className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
            EcoSentinel <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">Bangalore Zone 8</span>
          </h1>
          <p className="text-xs text-slate-400">Satellite AI & Bio-Remediation Management System</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/50">
          <Cpu className="w-4 h-4 text-emerald-400" />
          <span>Region: Shanthi Nagar / Double Road</span>
        </div>
        <button 
          onClick={onScan}
          disabled={scanning}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-emerald-900/20 disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${scanning ? 'animate-spin' : ''}`} />
          {scanning ? 'Analyzing Feed...' : 'Trigger Satellite Scan'}
        </button>
      </div>
    </header>
  );
}