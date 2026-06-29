import React from "react";
import AnimatedWorkers from "./components/AnimatedWorkers";
import CountdownDisplay from "./components/CountdownDisplay";

export default function App() {
  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-200 flex flex-col items-center justify-center relative overflow-hidden selection:bg-amber-500 selection:text-slate-950 font-sans p-4 sm:p-6 md:p-8 lg:p-12">
      
      {/* Sleek Theme Background dot grid & Ambient Glows */}
      <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: "radial-gradient(#475569 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Container */}
      <div className="w-full max-w-5xl z-10 flex flex-col gap-6 md:gap-8 items-center justify-center">
        
        {/* Badge - "Scheduled Maintenance in Progress" */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800/80 shadow-2xl backdrop-blur-sm">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
          </span>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-500">
            Scheduled Maintenance In Progress
          </span>
        </div>
          
        {/* Side-by-Side Minimalist Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 w-full items-stretch">
          
          {/* Construction Zone Panel (Left Column) */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <AnimatedWorkers />
          </div>
          
          {/* Failsafe Timer Countdown Panel (Right Column) */}
          <div className="md:col-span-5 flex flex-col">
            <CountdownDisplay initialHours={264} />
          </div>
          
        </div>

      </div>

      {/* Subtle bottom accent line representing system containment */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-800/40 to-transparent" />
      
    </div>
  );
}
