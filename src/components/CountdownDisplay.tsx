import React, { useState, useEffect } from "react";
import { Clock, AlertCircle } from "lucide-react";

interface CountdownDisplayProps {
  initialHours: number;
  onTimeUp?: () => void;
}

export default function CountdownDisplay({ initialHours = 264, onTimeUp }: CountdownDisplayProps) {
  // Store target end time in state (so it persists across component updates)
  const [targetTime] = useState<Date>(() => {
    const time = new Date();
    time.setMilliseconds(time.getMilliseconds() + initialHours * 60 * 60 * 1000);
    return time;
  });

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    progress: 100,
  });

  const totalDurationMs = initialHours * 60 * 60 * 1000;
  const [isCompleted, setIsCompleted] = useState(false);

  // Recalculate remaining time
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetTime.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, progress: 0 });
        setIsCompleted(true);
        if (onTimeUp) onTimeUp();
        return;
      }

      setIsCompleted(false);
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
  }, [targetTime, totalDurationMs, onTimeUp]);

  // Helper to pad numbers with leading zeros
  const padZero = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  // Display labels
  const timeUnits = [
    { label: "HOURS", value: padZero(timeLeft.hours) },
    { label: "MINUTES", value: padZero(timeLeft.minutes) },
    { label: "SECONDS", value: padZero(timeLeft.seconds) },
  ];

  return (
    <div className="w-full bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between h-full">
      {/* Glow highlight */}
      <div className="absolute top-0 right-1/4 w-40 h-40 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Grid section header */}
      <div className="space-y-1 pb-4 border-b border-slate-800/60">
        <div className="flex items-center space-x-2 text-amber-500">
          <Clock className="h-4 w-4 animate-spin" style={{ animationDuration: "12s" }} />
          <span className="font-mono text-xs tracking-widest font-bold">SYSTEM_LOCK.SYS</span>
        </div>
        <h2 className="text-sm font-semibold font-mono tracking-wider text-slate-300">
          SECURE_EST_OFFLINE_COUNTER
        </h2>
      </div>

      {/* Main Countdown Board */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 my-6">
        {timeUnits.map((unit, index) => (
          <div key={unit.label} className="relative group">
            {/* Ambient Card Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-b from-amber-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 filter blur" />
            
            <div className="relative bg-slate-950/70 border border-slate-850 rounded-2xl p-4 text-center shadow-lg">
              {/* Top light bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500/30 to-amber-500/5 rounded-t-2xl" />
              
              {/* Digit Container */}
              <div className="relative font-mono text-3xl md:text-4xl font-black tracking-tight text-white select-all">
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
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
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
          <span className="font-semibold text-amber-500 font-mono text-xs">
            {isCompleted ? "100.00%" : `${(100 - timeLeft.progress).toFixed(2)}%`}
          </span>
        </div>
        <div className="w-full h-1.5 bg-slate-950 rounded-full border border-slate-800/80 overflow-hidden relative">
          <div
            className="h-full bg-amber-500 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${isCompleted ? 100 : 100 - timeLeft.progress}%` }}
          />
        </div>
      </div>

      {/* System Warning banner if completed or nearing end */}
      {isCompleted && (
        <div className="mt-4 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-2xl p-3 flex items-center space-x-2.5 animate-bounce">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span className="text-xs font-mono">
            SUCCESS: Maintenance window is now complete. Performing handshake.
          </span>
        </div>
      )}
    </div>
  );
}
