// frontend/src/components/SatelliteView.jsx
import React from 'react';
import { Eye, MapPin, AlertTriangle } from 'lucide-react';

export default function SatelliteView({ landfills }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-white flex items-center gap-2">
          <Eye className="w-5 h-5 text-emerald-400" />
          Live Satellite Grid — Shanthi Nagar
        </h2>
        <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
          ● Active Sentinel Feed
        </span>
      </div>
      
      <div className="relative flex-1 min-h-[320px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
        {/* Simulated Satellite Image Grid Background */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        {/* Map Vector Mock Layout */}
        <div className="absolute inset-6 border border-slate-800 rounded-lg flex flex-col justify-between p-4">
          <div className="flex justify-between text-xs text-slate-500 font-mono">
            <span>LAT: 12.9569° N</span>
            <span>LON: 77.5946° E</span>
          </div>
          <div className="text-center">
            <p className="text-slate-600 text-xs font-mono uppercase tracking-widest">Double Road Corridor Map Mesh</p>
          </div>
        </div>

        {/* Dynamic Landfill Hotspots */}
        {landfills.map((lf, index) => (
          <div 
            key={lf.id} 
            className="absolute p-3 bg-slate-900/90 border border-slate-700 rounded-xl shadow-2xl backdrop-blur-md max-w-xs animate-bounce duration-1000"
            style={{ top: `${30 + index * 35}%`, left: `${25 + index * 40}%` }}
          >
            <div className="flex items-start gap-2">
              <div className="p-1.5 bg-rose-500/20 text-rose-400 rounded-lg mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">{lf.location}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">{lf.status}</p>
                <div className="mt-2 flex items-center gap-2 text-[10px]">
                  <span className="text-rose-400 font-semibold">{lf.plastic_tonnes}T Waste</span>
                  <span className="text-emerald-400 font-semibold">{lf.severity}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}