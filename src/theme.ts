import type { AccentColor } from "./data";

export interface AccentTokens {
  /** Tailwind text colour class */
  text: string;
  /** Tailwind background colour class */
  bg: string;
  /** Tailwind border colour class (with alpha) */
  border: string;
  /** Tailwind soft surface background class */
  softBg: string;
  /** Raw hex value for inline styles (SVG, conic gradients) */
  hex: string;
}

export const accent: Record<AccentColor, AccentTokens> = {
  blue: {
    text: "text-g-blue",
    bg: "bg-g-blue",
    border: "border-g-blue/25",
    softBg: "bg-surface-blue",
    hex: "#4285f4",
  },
  red: {
    text: "text-g-red",
    bg: "bg-g-red",
    border: "border-g-red/25",
    softBg: "bg-surface-red",
    hex: "#ea4335",
  },
  yellow: {
    text: "text-g-yellow",
    bg: "bg-g-yellow",
    border: "border-g-yellow/35",
    softBg: "bg-surface-yellow",
    hex: "#fbbc05",
  },
  green: {
    text: "text-g-green",
    bg: "bg-g-green",
    border: "border-g-green/25",
    softBg: "bg-surface-green",
    hex: "#34a853",
  },
};

/** Status → visual treatment used by the update log rows. */
export const logStatusStyles: Record<
  string,
  { label: string; chip: string; dot: string }
> = {
  COMPLETED: {
    label: "Completed",
    chip: "bg-surface-green text-g-green",
    dot: "bg-g-green",
  },
  "IN-PROGRESS": {
    label: "In progress",
    chip: "bg-surface-blue text-g-blue",
    dot: "bg-g-blue",
  },
  IN_PROGRESS: {
    label: "In progress",
    chip: "bg-surface-blue text-g-blue",
    dot: "bg-g-blue",
  },
  QUEUED: {
    label: "Queued",
    chip: "bg-surface-alt text-ink-400 border border-line",
    dot: "bg-ink-200",
  },
};
