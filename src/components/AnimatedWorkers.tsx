import React from "react";
import { Boxes, Check, CircleDot, Database, ShieldCheck, Sparkles } from "lucide-react";
import { maintenanceConfig, projectDetails } from "../data";

interface AnimatedWorkersProps {
  /** Completion percentage (0–100) driven by the countdown. */
  progress?: number;
  isCompleted?: boolean;
}

export default function AnimatedWorkers({
  progress = 0,
  isCompleted = false,
}: AnimatedWorkersProps) {
  const pct = Math.max(0, Math.min(100, progress));
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card">
      {/* Header row */}
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-blue text-g-blue">
            <Boxes className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-ink-900">
              {projectDetails.shortName} infrastructure
            </p>
            <p className="text-xs text-ink-600">Upgrading system features</p>
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
            isCompleted
              ? "bg-surface-green text-g-green"
              : "bg-surface-yellow text-[#a06700]"
          }`}
        >
          <span className="relative flex h-2 w-2">
            {isCompleted ? (
              <span className="h-2 w-2 rounded-full bg-g-green" />
            ) : (
              <>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-g-yellow opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-g-yellow" />
              </>
            )}
          </span>
          {isCompleted ? "Live" : "Building"}
        </span>
      </div>

      {/* Illustration stage */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-surface-alt px-6 py-10">
        {/* Soft brand glows */}
        <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-surface-blue blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-surface-yellow opacity-70 blur-2xl" />

        <div className="relative w-full max-w-sm">
          {/* Progress ring */}
          <div className="relative mx-auto h-44 w-44">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#e8eaed"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke={isCompleted ? "#34a853" : "#4285f4"}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1)" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="tabular text-2xl font-semibold tracking-tight text-ink-900">
                {pct.toFixed(0)}%
              </span>
              <span className="text-[11px] uppercase tracking-wider text-ink-400">
                complete
              </span>
            </div>
          </div>

          {/* Status checklist */}
          <ul className="mt-8 space-y-2.5">
            {[
              { label: "Database migration", done: pct > 25 },
              { label: "Security policies", done: pct > 55 },
              { label: "Application rollout", done: pct > 80 },
              { label: "Verification & handover", done: isCompleted },
            ].map((row) => (
              <li key={row.label} className="flex items-center gap-3">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors duration-500 ${
                    row.done
                      ? "bg-g-green text-white"
                      : "border border-line bg-white text-ink-200"
                  }`}
                >
                  {row.done ? (
                    <Check className="h-3 w-3" strokeWidth={3} />
                  ) : (
                    <CircleDot className="h-3 w-3" />
                  )}
                </span>
                <span
                  className={`text-sm transition-colors duration-500 ${
                    row.done ? "text-ink-900" : "text-ink-400"
                  }`}
                >
                  {row.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Floating brand chips */}
        <div className="pointer-events-none absolute right-6 top-8 hidden animate-float items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 shadow-float sm:flex">
          <Database className="h-4 w-4 text-g-blue" />
          <span className="text-xs font-medium text-ink-800">Reindexing</span>
        </div>
        <div className="pointer-events-none absolute bottom-8 left-6 hidden animate-float items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 shadow-float sm:flex [animation-delay:1.4s]">
          <ShieldCheck className="h-4 w-4 text-g-green" />
          <span className="text-xs font-medium text-ink-800">Hardening</span>
        </div>
        <div className="pointer-events-none absolute right-10 top-1/2 hidden animate-float items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 shadow-float lg:flex [animation-delay:2.6s]">
          <Sparkles className="h-4 w-4 text-g-yellow" />
          <span className="text-xs font-medium text-ink-800">Optimising</span>
        </div>
      </div>

      {/* Footer strip */}
      <div className="flex items-center justify-between border-t border-line px-6 py-3.5">
        <span className="text-xs text-ink-600">
          Expected back online{" "}
          <span className="font-medium text-ink-900">
            {maintenanceConfig.targetLabel}
          </span>
        </span>
        <span className="rounded-full bg-surface-alt px-3 py-1 font-mono text-[11px] font-medium text-ink-600">
          {projectDetails.version}
        </span>
      </div>
    </div>
  );
}
