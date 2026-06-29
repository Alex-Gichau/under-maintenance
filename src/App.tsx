import React from "react";
import AnimatedWorkers from "./components/AnimatedWorkers";
import CountdownDisplay from "./components/CountdownDisplay";
import { projectDetails, maintenanceConfig, updateLogs } from "./data";
import { Play, CheckCircle2, RefreshCw, Layers } from "lucide-react";

export default function App() {
  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-200 flex flex-col justify-between relative overflow-hidden selection:bg-amber-500 selection:text-slate-950 font-sans p-4 md:p-6 lg:p-8">
      
      {/* Sleek Theme Background dot grid & Ambient Glows */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: "radial-gradient(#475569 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header Row */}
      <header className="z-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-900 pb-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/10">
            <Layers className="h-5 w-5 text-slate-950" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white font-mono flex items-center gap-2">
              {projectDetails.appName}
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60 font-semibold">
                {projectDetails.version}
              </span>
            </h1>
            <p className="text-xs text-slate-400">{maintenanceConfig.systemSubtitle}</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800/80 shadow-xl backdrop-blur-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500">
            {projectDetails.alertText}
          </span>
        </div>
      </header>

      {/* Main Content Area: Responsive Grid fitting 100vh space cleanly */}
      <main className="z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch flex-grow my-4 overflow-hidden">
        
        {/* Left Column: Roadwork Simulator */}
        <section className="lg:col-span-6 flex flex-col h-full overflow-hidden">
          <AnimatedWorkers />
        </section>

        {/* Right Column: Timer & Live Update Log console */}
        <section className="lg:col-span-6 flex flex-col gap-6 h-full overflow-hidden">
          
          {/* Top panel: Countdown Display */}
          <div className="flex-1 min-h-[180px] max-h-[300px] lg:max-h-none lg:flex-grow">
            <CountdownDisplay />
          </div>

          {/* Bottom panel: Live Update Logs */}
          <div className="h-44 sm:h-48 lg:h-52 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-5 backdrop-blur-md flex flex-col justify-between overflow-hidden">
            
            {/* Console Header */}
            <div className="flex items-center justify-between border-b border-slate-800/50 pb-2 mb-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 bg-amber-500 rounded-full animate-pulse" />
                SYSTEM UPGRADE LOG
              </span>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-950 text-emerald-400 border border-emerald-500/20">
                LIVE FEED
              </span>
            </div>

            {/* Logs list */}
            <div className="flex-grow overflow-y-auto space-y-2.5 pr-1 text-left custom-scrollbar">
              {updateLogs.map((log) => (
                <div key={log.id} className="flex items-start justify-between gap-3 text-[11px] font-mono bg-slate-950/40 p-2 rounded-xl border border-slate-850">
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
                    <div>
                      <span className="text-amber-500 font-bold shrink-0">{log.component}:</span>{" "}
                      <span className="text-slate-300 leading-relaxed">{log.description}</span>
                    </div>
                  </div>
                  
                  <div className="shrink-0">
                    {log.status === "COMPLETED" ? (
                      <span className="inline-flex items-center gap-1 text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        <CheckCircle2 className="h-2.5 w-2.5" />
                        OK
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[9px] text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded animate-pulse">
                        <RefreshCw className="h-2.5 w-2.5 animate-spin" style={{ animationDuration: "3s" }} />
                        RUN
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </section>

      </main>

      {/* Footer System parameters details */}
      <footer className="z-10 border-t border-slate-900 pt-3 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-slate-500 gap-2">
        <div className="flex items-center gap-4">
          <span>https://accounts.pceastandrews.org</span>
          <span>v.1.0.0</span>
          <span>STANDS | eRequisiton</span>
        </div>
        <div>
          <span>{maintenanceConfig.systemDescription}</span>
        </div>
      </footer>
      
    </div>
  );
}
