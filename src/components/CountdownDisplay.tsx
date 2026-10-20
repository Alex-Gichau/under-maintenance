import React, { useCallback, useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { maintenanceConfig, projectDetails } from "../data";

interface CountdownDisplayProps {
  onTimeUp?: () => void;
  variant?: "card" | "navbar";
  /** Notifies the parent of the live progress (0–100) and completion state. */
  onProgress?: (progress: number, isCompleted: boolean) => void;
  /** Fires the celebration burst. Owned by the parent so only one burst plays. */
  onCelebrate?: () => void;
}

export default function CountdownDisplay({
  onTimeUp,
  variant = "card",
  onProgress,
  onCelebrate,
}: CountdownDisplayProps) {
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
  const completionReported = useRef(false);

  const fireCelebration = useCallback(() => {
    onCelebrate?.();
  }, [onCelebrate]);

  // Recalculate remaining time
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetTime.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, progress: 0 });
        setIsCompleted(true);

        if (!completionReported.current) {
          completionReported.current = true;
          fireCelebration();
        }

        onProgress?.(100, true);
        onTimeUp?.();
        return;
      }

      setIsCompleted(false);
      completionReported.current = false;
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      // Percentage of the maintenance window already elapsed
      const elapsed =
        totalDurationMs > 0
          ? Math.max(0, Math.min(100, ((totalDurationMs - difference) / totalDurationMs) * 100))
          : 0;

      setTimeLeft({ hours, minutes, seconds, progress: elapsed });
      onProgress?.(elapsed, false);
    };

    calculateTimeLeft(); // Run immediately
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onTimeUp, onProgress]);

  // Helper to pad numbers with leading zeros
  const padZero = (num: number): string => num.toString().padStart(2, "0");

  const accent = isCompleted ? "text-g-green" : "text-g-blue";
  const accentSoft = isCompleted ? "bg-surface-green" : "bg-surface-blue";

  if (variant === "navbar") {
    return (
      <div className="flex w-full flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-white px-5 py-3 shadow-card sm:flex-nowrap">
        {/* Left: status */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            {isCompleted ? (
              <span className="h-2 w-2 rounded-full bg-g-green" />
            ) : (
              <>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-g-blue opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-g-blue" />
              </>
            )}
          </span>
          <span className={`text-sm font-semibold ${accent}`}>
            {isCompleted ? "System online" : "System locked"}
          </span>
        </div>

        {/* Center: countdown */}
        <div className="flex items-center gap-3">
          {isCompleted ? (
            <button
              onClick={fireCelebration}
              className="inline-flex items-center gap-1.5 rounded-full bg-surface-green px-3 py-1 text-xs font-medium text-g-green transition-colors hover:bg-g-green hover:text-white"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Celebrate
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              {[
                { value: timeLeft.hours, label: "h" },
                { value: timeLeft.minutes, label: "m" },
                { value: timeLeft.seconds, label: "s" },
              ].map((unit) => (
                <div
                  key={unit.label}
                  className="flex items-baseline gap-0.5 rounded-lg bg-surface-alt px-2 py-1"
                >
                  <span className="tabular text-sm font-semibold text-ink-900">
                    {padZero(unit.value)}
                  </span>
                  <span className="text-[10px] text-ink-400">{unit.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: progress */}
        <div className="flex items-center gap-3">
          <div className="hidden w-28 sm:block">
            <div className="h-1 w-full overflow-hidden rounded-full bg-line-soft">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${
                  isCompleted ? "bg-g-green" : "bg-g-blue"
                }`}
                style={{ width: `${isCompleted ? 100 : timeLeft.progress}%` }}
              />
            </div>
          </div>
          <span className={`tabular text-sm font-semibold ${accent}`}>
            {(isCompleted ? 100 : timeLeft.progress).toFixed(1)}%
          </span>
        </div>
      </div>
    );
  }

  // Display labels for Card Variant
  const timeUnits = [
    { label: "Hours", value: padZero(timeLeft.hours) },
    { label: "Minutes", value: padZero(timeLeft.minutes) },
    { label: "Seconds", value: padZero(timeLeft.seconds) },
  ];

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${accentSoft} ${accent}`}
          >
            {isCompleted ? (
              <CheckCircle2 className="h-4.5 w-4.5" />
            ) : (
              <Clock className="h-4.5 w-4.5" />
            )}
          </div>
          <div className="leading-tight">
            <p className={`text-sm font-semibold ${accent}`}>
              {isCompleted ? "System online" : maintenanceConfig.systemTitle}
            </p>
            <p className="text-xs text-ink-600">{projectDetails.version}</p>
          </div>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            isCompleted ? "bg-surface-green text-g-green" : "bg-surface-blue text-g-blue"
          }`}
        >
          {isCompleted ? "Completed" : "In progress"}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col justify-center px-6 py-8">
        {/* Countdown digits */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {timeUnits.map((unit) => (
            <div
              key={unit.label}
              className="rounded-2xl border border-line bg-surface-alt px-3 py-5 text-center transition-colors duration-500 md:py-7"
            >
              <div
                className={`tabular text-3xl font-medium tracking-tight md:text-5xl ${
                  isCompleted ? "text-g-green" : "text-ink-900"
                }`}
              >
                {unit.value}
              </div>
              <div className="mt-1.5 text-[10px] font-medium uppercase tracking-widest text-ink-400 md:text-[11px]">
                {unit.label}
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-8">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-xs font-medium text-ink-600">
              {isCompleted ? "Upgrade complete" : "Upgrade progress"}
            </span>
            <span className={`tabular text-xs font-semibold ${accent}`}>
              {(isCompleted ? 100 : timeLeft.progress).toFixed(2)}%
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-line-soft">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                isCompleted ? "bg-g-green" : "bg-g-blue"
              }`}
              style={{ width: `${isCompleted ? 100 : timeLeft.progress}%` }}
            />
          </div>
        </div>

        {/* Completion notice */}
        {isCompleted && (
          <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-g-green/25 bg-surface-green px-4 py-3">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="h-4 w-4 shrink-0 text-g-green" />
              <span className="text-xs font-medium text-ink-800">
                All systems migrated and fully validated.
              </span>
            </div>
            <button
              onClick={fireCelebration}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-g-green px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-g-green/90"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Celebrate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
