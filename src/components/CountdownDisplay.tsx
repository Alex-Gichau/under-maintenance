import React, { useState, useEffect, useRef } from "react";
import { Clock, AlertCircle, Sparkles } from "lucide-react";
import { maintenanceConfig, projectDetails } from "../data";
import confetti from "canvas-confetti";

interface CountdownDisplayProps {
  onTimeUp?: () => void;
  variant?: "card" | "navbar";
}

export default function CountdownDisplay({ onTimeUp, variant = "card" }: CountdownDisplayProps) {
  const targetTime = new Date(maintenanceConfig.targetDate);
  const startTime = new Date(maintenanceConfig.startDate);

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    progress: 100,
  });

  const totalDurationMs = targetTime.getTime() - startTime.getTime();
  const [isCompleted, setIsCompleted] = useState(false);
  const confettiFired = useRef(false);

  // Trigger high-quality celebratory confetti shower
  const fireCelebration = () => {
    // Left burst
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors: ["#f59e0b", "#3b82f6", "#10b981", "#ef4444", "#8b5cf6"]
    });
    // Right burst
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors: ["#f59e0b", "#3b82f6", "#10b981", "#ef4444", "#8b5cf6"]
    });

    // Staggered center burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 90,
        spread: 80,
        origin: { x: 0.5, y: 0.6 },
        colors: ["#fbbf24", "#34d399", "#f43f5e"]
      });
    }, 250);
  };

  // Recalculate remaining time
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetTime.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, progress: 0 });
        setIsCompleted(true);
        
        // Trigger confetti once upon reaching zero
        if (!confettiFired.current) {
          confettiFired.current = true;
          fireCelebration();
        }

        if (onTimeUp) onTimeUp();
        return;
      }

      setIsCompleted(false);
      confettiFired.current = false;
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      // Progress bar percentage (remaining / total)
      const progress = Math.max(0, Math.min(100, (difference / totalDurationMs) * 100));

      setTimeLeft({ hours, minutes, seconds, progress });
    };

    calculateTimeLeft(); // Run immediately
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  // Helper to pad numbers with leading zeros
  const padZero = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  if (variant === "navbar") {
    return (
      <div className={`w-full bg-slate-900/80 backdrop-blur-md border rounded-2xl px-4 py-2.5 shadow-xl flex items-center justify-between gap-3 text-xs font-mono transition-all duration-1000 ${
        isCompleted ? "border-emerald-500/50 shadow-emerald-500/5" : "border-slate-800/80"
      }`}>
        {/* Left Side: System status & label */}
        <div className="flex items-center space-x-2 text-slate-300">
          <Clock className={`h-4 w-4 ${isCompleted ? "text-emerald-400" : "text-amber-500 animate-spin"}`} style={{ animationDuration: "12s" }} />
          <span className={`font-bold tracking-wider text-[11px] whitespace-nowrap ${isCompleted ? "text-emerald-400" : "text-amber-500"}`}>
            {isCompleted ? "SYSTEM ONLINE" : "SYSTEM LOCKED"}
          </span>
          <span className="text-[10px] text-slate-600 hidden sm:inline">|</span>
          <span className="text-[10px] text-slate-400 font-bold hidden sm:inline uppercase tracking-wider">
            {maintenanceConfig.systemTitle}
          </span>
        </div>

        {/* Center Side: Countdown Board inside rounded badge */}
        <div className="flex items-center space-x-1.5 bg-slate-950/80 border border-slate-800/60 rounded-full px-3.5 py-1 font-mono font-bold shadow-inner">
          {isCompleted ? (
            <button 
              onClick={fireCelebration} 
              className="text-emerald-400 text-[10px] flex items-center gap-1 hover:text-emerald-300 transition-colors"
            >
              <Sparkles className="h-3 w-3 text-emerald-400 animate-pulse" />
              CELEBRATE 🎉
            </button>
          ) : (
            <>
              <span className="text-slate-500 text-[9px] tracking-wider mr-1 uppercase hidden xs:inline">Time Left:</span>
              <span className="text-white text-xs">{padZero(timeLeft.hours)}</span>
              <span className="text-amber-500/80 animate-pulse">:</span>
              <span className="text-white text-xs">{padZero(timeLeft.minutes)}</span>
              <span className="text-amber-500/80 animate-pulse">:</span>
              <span className="text-white text-xs text-amber-500">{padZero(timeLeft.seconds)}</span>
            </>
          )}
        </div>

        {/* Right Side: Progress Sync Bar */}
        <div className="flex items-center space-x-2">
          <div className="flex flex-col items-end text-right">
            <span className={`text-[9px] font-bold tracking-wider leading-none uppercase ${isCompleted ? "text-emerald-500" : "text-slate-500"}`}>
              {isCompleted ? "COMPLETED" : "UPGRADE"}
            </span>
            <span className={`text-[10px] font-bold leading-none mt-1 ${isCompleted ? "text-emerald-400" : "text-amber-500"}`}>
              {isCompleted ? "100.00%" : `${(100 - timeLeft.progress).toFixed(2)}%`}
            </span>
          </div>
          {/* Pulsing indicator */}
          <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${isCompleted ? "bg-emerald-500 animate-ping" : "bg-amber-500 animate-pulse"}`} />
        </div>
      </div>
    );
  }

  // Display labels for Card Variant
  const timeUnits = [
    { label: "HOURS", value: padZero(timeLeft.hours) },
    { label: "MINUTES", value: padZero(timeLeft.minutes) },
    { label: "SECONDS", value: padZero(timeLeft.seconds) },
  ];

  return (
    <div className={`w-full bg-slate-900/40 backdrop-blur-md border rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between h-full transition-all duration-1000 ${
      isCompleted 
        ? "border-emerald-500/40 shadow-emerald-500/5 bg-gradient-to-b from-slate-900/40 to-emerald-950/10" 
        : "border-slate-800/80"
    }`}>
      {/* Glow highlight */}
      <div className={`absolute top-0 right-1/4 w-40 h-40 rounded-full filter blur-3xl pointer-events-none transition-colors duration-1000 ${
        isCompleted ? "bg-emerald-500/10" : "bg-amber-500/5"
      }`} />

      {/* Grid section header */}
      <div className="space-y-1 pb-4 border-b border-slate-800/60">
        <div className="flex items-center space-x-2">
          <Clock className={`h-4 w-4 ${isCompleted ? "text-emerald-400" : "text-amber-500 animate-spin"}`} style={{ animationDuration: "12s" }} />
          <span className={`font-mono text-xs tracking-widest font-bold ${isCompleted ? "text-emerald-400" : "text-amber-500"}`}>
            {isCompleted ? "SYSTEM COMPLETED" : "SYSTEM LOCKED"}
          </span>
        </div>
        <h2 className="text-sm font-semibold font-mono tracking-wider text-slate-300">
          {maintenanceConfig.systemTitle.toUpperCase()}
        </h2>
      </div>

      {/* Main Countdown Board */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 my-auto py-4">
        {timeUnits.map((unit, index) => (
          <div key={unit.label} className="relative group">
            {/* Ambient Card Glow */}
            <div className={`absolute -inset-0.5 bg-gradient-to-b rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 filter blur ${
              isCompleted ? "from-emerald-500/15" : "from-amber-500/10"
            }`} />
            
            <div className={`relative border rounded-2xl p-4 text-center shadow-lg transition-all duration-1000 ${
              isCompleted ? "bg-slate-950/90 border-emerald-500/20" : "bg-slate-950/70 border-slate-850"
            }`}>
              {/* Top light bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${
                isCompleted ? "from-emerald-500/40 to-emerald-500/5" : "from-amber-500/30 to-amber-500/5"
              }`} />
              
              {/* Digit Container */}
              <div className={`relative font-mono text-3xl md:text-4xl font-black tracking-tight select-all transition-colors duration-1000 ${
                isCompleted ? "text-emerald-400" : "text-white"
              }`}>
                {unit.value}
              </div>

              {/* Label */}
              <div className="mt-2 text-[9px] md:text-[10px] font-mono font-bold tracking-widest text-slate-500">
                {unit.label}
              </div>
            </div>

            {/* Separator dots (Only between cards) */}
            {index < 2 && (
              <div className="hidden sm:flex absolute top-1/2 -right-2.5 -translate-y-1/2 flex-col space-y-1 opacity-25 z-10">
                <span className={`h-1.5 w-1.5 rounded-full ${isCompleted ? "bg-emerald-500" : "bg-amber-500"}`} />
                <span className={`h-1.5 w-1.5 rounded-full ${isCompleted ? "bg-emerald-500" : "bg-amber-500"}`} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Progress Sync Bar */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between font-mono text-xs text-slate-400">
          <div className="flex items-center space-x-1.5">
            <span className={`h-2 w-2 rounded-full ${isCompleted ? "bg-emerald-500 animate-ping" : "bg-amber-500 animate-pulse"}`} />
            <span className="font-semibold uppercase text-slate-400 text-[10px] tracking-wider">
              {isCompleted ? "MAINTENANCE_COMPLETED" : "DATABASE_UPGRADE_STREAM"}
            </span>
          </div>
          <span className={`font-semibold font-mono text-xs ${isCompleted ? "text-emerald-400" : "text-amber-500"}`}>
            {isCompleted ? "100.00%" : `${(100 - timeLeft.progress).toFixed(2)}%`}
          </span>
        </div>
        <div className="w-full h-1.5 bg-slate-950 rounded-full border border-slate-800/80 overflow-hidden relative">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out ${
              isCompleted ? "bg-emerald-500" : "bg-amber-500"
            }`}
            style={{ width: `${isCompleted ? 100 : 100 - timeLeft.progress}%` }}
          />
        </div>
      </div>

      {/* System Warning/Celebration banner if completed */}
      {isCompleted && (
        <div className="mt-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl p-3 flex items-center justify-between animate-bounce">
          <div className="flex items-center space-x-2.5">
            <AlertCircle className="h-4 w-4 shrink-0 text-emerald-400" />
            <span className="text-xs font-mono font-medium">
              SUCCESS: All systems migrated & fully validated.
            </span>
          </div>
          <button 
            onClick={fireCelebration}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-[10px] px-3 py-1 rounded-lg transition-colors flex items-center gap-1 shrink-0"
          >
            <Sparkles className="h-3 w-3" />
            BURST 🎉
          </button>
        </div>
      )}
    </div>
  );
}
