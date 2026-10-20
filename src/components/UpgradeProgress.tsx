import React from "react";
import { Check, Loader2 } from "lucide-react";
import { upgradeStages } from "../data";
import { accent } from "../theme";

interface UpgradeProgressProps {
  /** Completion percentage (0–100) driven by the countdown. */
  progress?: number;
  isCompleted?: boolean;
}

/**
 * Compact horizontal stepper showing where the maintenance pipeline has got to.
 * Designed to sit in a single-viewport layout, so it favours height over detail.
 */
export default function UpgradeProgress({
  progress = 0,
  isCompleted = false,
}: UpgradeProgressProps) {
  const pct = Math.max(0, Math.min(100, progress));

  return (
    <div className="rounded-2xl border border-line bg-white p-3 shadow-card sm:rounded-3xl sm:p-4 [@media(max-height:620px)]:p-2.5">
      {/* Header */}
      <div className="mb-2.5 flex items-center justify-between sm:mb-3 [@media(max-height:620px)]:mb-2">
        <div className="flex items-center gap-2">
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-md sm:h-6 sm:w-6 sm:rounded-lg ${
              isCompleted ? "bg-surface-green text-g-green" : "bg-surface-blue text-g-blue"
            }`}
          >
            {isCompleted ? (
              <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={3} />
            ) : (
              <Loader2 className="h-3 w-3 animate-spin sm:h-3.5 sm:w-3.5" />
            )}
          </span>
          <span className="text-[11px] font-medium text-ink-800 sm:text-xs">
            {isCompleted ? "Upgrade complete" : "Upgrade progress"}
          </span>
        </div>
        <span
          className={`tabular text-xs font-semibold sm:text-sm ${
            isCompleted ? "text-g-green" : "text-g-blue"
          }`}
        >
          {(isCompleted ? 100 : pct).toFixed(0)}%
        </span>
      </div>

      {/* Stepper */}
      <ol className="flex gap-1.5">
        {upgradeStages.map((stage, index) => {
          const done = isCompleted || pct >= stage.threshold;
          const active = !done && pct >= (index === 0 ? 0 : upgradeStages[index - 1].threshold);
          const tokens = accent[stage.accent];

          // How much of this segment is filled
          const from = index === 0 ? 0 : upgradeStages[index - 1].threshold;
          const fill = done
            ? 100
            : Math.max(0, Math.min(100, ((pct - from) / (stage.threshold - from)) * 100));

          return (
            <li key={stage.id} className="min-w-0 flex-1">
              {/* Track */}
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                    done ? tokens.bg : active ? "bg-g-blue" : "bg-transparent"
                  }`}
                  style={{ width: `${fill}%` }}
                />
              </div>

              {/* Label */}
              <div className="mt-1.5 flex items-center gap-1">
                <span
                  className={`truncate text-[10px] font-medium leading-tight transition-colors duration-500 sm:text-[11px] ${
                    done ? "text-ink-900" : active ? "text-g-blue" : "text-ink-400"
                  }`}
                >
                  {stage.label}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
