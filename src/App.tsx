import React, { useState } from "react";
import AnimatedWorkers from "./components/AnimatedWorkers";
import CountdownDisplay from "./components/CountdownDisplay";
import { projectDetails, maintenanceConfig, updateLogs } from "./data";
import { CheckCircle2, RefreshCw, Layers, Terminal, X } from "lucide-react";

export default function App() {
  const [isLogOpen, setIsLogOpen] = useState(false);

  // Common Log Content extracted to reuse in both desktop and mobile modal
  const renderLogContent = () => (
    <div className="flex-grow overflow-y-auto space-y-2 pr-1 text-left custom-scrollbar text-[11px]">
      {updateLogs.map((log) => (
        <div key={log.id} className="flex items-start justify-between gap-3 text-[11px] font-mono bg-slate-950/40 p-2 rounded-xl border border-slate-850">
          <div className="flex items-start gap-2 overflow-hidden">
            <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
            <div className="truncate whitespace-normal">
              <span className="text-amber-500 font-bold shrink-0">{log.component}:</span>{" "}
              <span className="text-slate-300 leading-relaxed break-words">{log.description}</span>
            </div>
          </div>
          
          <div className="shrink-0">
            {log.status === "COMPLETED" || log.status === "IN-PROGRESS" ? (
              log.status === "COMPLETED" ? (
                <span className="inline-flex items-center gap-1 text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  <CheckCircle2 className="h-2.5 w-2.5" />
                  OK
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[9px] text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded animate-pulse">
                  <RefreshCw className="h-2.5 w-2.5 animate-spin" style={{ animationDuration: "3s" }} />
                  RUN
                </span>
              )
            ) : (
              <span className="inline-flex items-center gap-1 text-[9px] text-slate-400 font-bold bg-slate-800 px-1.5 py-0.5 rounded">
                QUE
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );

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
      <header className="z-10 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-900 pb-3 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/10 shrink-0">
            <Layers className="h-5 w-5 text-slate-950" />
          </div>
          <div className="text-left">
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-white font-mono flex items-center gap-2 flex-wrap">
              {projectDetails.appName}
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60 font-semibold">
                {projectDetails.version}
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 leading-tight">{maintenanceConfig.systemSubtitle}</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800/80 shadow-xl backdrop-blur-sm shrink-0">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-amber-500 whitespace-nowrap">
            {projectDetails.alertText}
          </span>
        </div>
      </header>

      {/* Main Content Area: Responsive Layout fitting 100vh space cleanly */}
      <main className="z-10 flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-6 items-stretch flex-grow my-3 sm:my-4 overflow-hidden h-0 min-h-0">
        
        {/* Animated Workers Panel: Dominates the center space on mobile, Left Column on desktop */}
        <section className="lg:col-span-6 flex flex-col overflow-hidden h-full flex-grow">
          <AnimatedWorkers />
        </section>

        {/* Live Update Logs Panel & Countdown Card (Desktop-only section) */}
        <section className="hidden lg:flex lg:col-span-6 flex-col gap-4 lg:gap-6 overflow-hidden h-full shrink-0">
          
          {/* Top panel: Full-sized Countdown Display Card */}
          <div className="flex-1 min-h-[180px] lg:flex-grow">
            <CountdownDisplay variant="card" />
          </div>

          {/* Bottom panel: Live Update Logs Console */}
          <div className="flex-none h-52 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-5 backdrop-blur-md flex flex-col justify-between overflow-hidden">
            
            {/* Console Header */}
            <div className="flex items-center justify-between border-b border-slate-800/50 pb-2 mb-2 shrink-0">
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 bg-amber-500 rounded-full animate-pulse" />
                SYSTEM UPGRADE LOG
              </span>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-950 text-emerald-400 border border-emerald-500/20">
                LIVE FEED
              </span>
            </div>

            {/* Logs list */}
            {renderLogContent()}

          </div>

        </section>

      </main>

      {/* Floating Action Button for Mobile Logs */}
      <button 
        onClick={() => setIsLogOpen(true)}
        className="lg:hidden absolute bottom-24 right-4 z-40 bg-amber-500 text-slate-950 p-3 rounded-full shadow-lg shadow-amber-500/20 flex items-center justify-center animate-bounce hover:bg-amber-400 transition-colors"
        aria-label="View System Logs"
      >
        <Terminal className="h-5 w-5" />
      </button>

      {/* Mobile Log Modal */}
      {isLogOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4 bg-slate-950/80 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl relative flex flex-col max-h-[80vh]">
            <button 
              onClick={() => setIsLogOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-center justify-between border-b border-slate-800/50 pb-3 mb-3 shrink-0 pr-8">
              <span className="text-xs font-mono font-bold tracking-widest text-slate-400 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 bg-amber-500 rounded-full animate-pulse" />
                SYSTEM UPGRADE LOG
              </span>
            </div>
            {renderLogContent()}
          </div>
        </div>
      )}

      {/* Mobile Navbar Timer: Only visible on mobile, positioned just above the footer */}
      <div className="block lg:hidden z-10 my-2 shrink-0">
        <CountdownDisplay variant="navbar" />
      </div>

      {/* Footer System parameters details */}
      <footer className="z-10 border-t border-slate-900 pt-2.5 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-slate-500 gap-2 shrink-0">
        <div className="flex items-center gap-4">
          <span className="hover:text-slate-400 transition-colors">https://accounts.pceastandrews.org</span>
          <span>v1.0.0</span>
          <span>STANDS | eRequisition</span>
        </div>
        <div className="text-center sm:text-right">
          <span>{maintenanceConfig.systemDescription}</span>
        </div>
      </footer>
      
    </div>
  );
}
