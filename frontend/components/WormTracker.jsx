// frontend/src/components/WormTracker.jsx
import React from 'react';
import { Bug, ArrowUpRight, Zap, ShieldCheck } from 'lucide-react';

export default function WormTracker({ landfills, onDeploy }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-white flex items-center gap-2">
          <Bug className="w-5 h-5 text-emerald-400" />
          Bio-Remediation & Worm Depo Units
        </h2>
        <span className="text-xs text-slate-400">Biological Plastic Digest</span>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-1">
        {landfills.map((lf) => (
          <div key={lf.id} className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-white">{lf.location}</h3>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                {lf.digestion_rate} Digested
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 my-3 text-xs">
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Active Worm Colony</span>
                <span className="text-white font-bold text-sm flex items-center gap-1 mt-0.5">
                  <Bug className="w-3.5 h-3.5 text-emerald-400" /> {lf.worms_deployed.toLocaleString()}
                </span>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Plastic Residue</span>
                <span className="text-white font-bold text-sm flex items-center gap-1 mt-0.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> {lf.plastic_tonnes} Tonnes
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-900">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> BBMP Alert Dispatch Active
              </span>
              <button 
                onClick={() => onDeploy(lf.id)}
                className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 text-xs font-semibold rounded-lg border border-emerald-500/30 cursor-pointer flex items-center gap-1"
              >
                Deploy +5k Worms <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}