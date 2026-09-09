// frontend/src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import SatelliteView from './SatelliteView';
import WormTracker from './WormTracker';
import { Bell, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const [data, setData] = useState({ landfills: [], alerts: [] });
  const [scanning, setScanning] = useState(false);

  const fetchStatus = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/status');
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error('Backend offline');
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleScan = async () => {
    setScanning(true);
    try {
      const res = await fetch('http://localhost:5000/api/scan', { method: 'POST' });
      const json = await res.json();
      setData(prev => ({ ...prev, alerts: json.alerts }));
    } catch (e) {}
    setTimeout(() => setScanning(false), 1200);
  };

  const handleDeployWorms = async (id) => {
    try {
      const res = await fetch('http://localhost:5000/api/deploy-worms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const json = await res.json();
      setData(json);
    } catch (e) {
      setData(prev => ({
        ...prev,
        landfills: prev.landfills.map(lf => lf.id === id ? { ...lf, worms_deployed: lf.worms_deployed + 5000 } : lf)
      }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar onScan={handleScan} scanning={scanning} />
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
            <span className="text-slate-400 text-xs font-medium">Target Region</span>
            <h3 className="text-lg font-bold text-white mt-1">Shanthi Nagar, BLR</h3>
            <span className="text-[10px] text-emerald-400 mt-1 block">● Sector Active</span>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
            <span className="text-slate-400 text-xs font-medium">Active Minor Landfills</span>
            <h3 className="text-lg font-bold text-white mt-1">{data.landfills.length} Monitored</h3>
            <span className="text-[10px] text-amber-400 mt-1 block">Requires Bio-Remediation</span>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
            <span className="text-slate-400 text-xs font-medium">BBMP Auto-Alert Status</span>
            <h3 className="text-lg font-bold text-white mt-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Dispatched
            </h3>
            <span className="text-[10px] text-slate-400 mt-1 block">Instant webhook sync</span>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
            <span className="text-slate-400 text-xs font-medium">Total Worms Deployed</span>
            <h3 className="text-lg font-bold text-white mt-1">
              {data.landfills.reduce((acc, curr) => acc + curr.worms_deployed, 0).toLocaleString()} Units
            </h3>
            <span className="text-[10px] text-emerald-400 mt-1 block">Eco-Safe Plastic Digestion</span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[420px]">
          <SatelliteView landfills={data.landfills} />
          <WormTracker landfills={data.landfills} onDeploy={handleDeployWorms} />
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-400" />
            BBMP & Automated Sentinel Alert Log
          </h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {data.alerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800/60 rounded-xl text-xs">
                <span className="text-slate-300">{alert.msg}</span>
                <span className="text-slate-500 font-mono text-[11px]">{alert.time}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}