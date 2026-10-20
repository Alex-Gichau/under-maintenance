
## System Maintenance — Landing Page

A minimalist, Google-inspired landing page shown while the platform undergoes
scheduled maintenance. Built with React 19, Vite and Tailwind CSS v4.

### Features

- **Google-style design system** — brand palette, Rubik typography, soft
  elevation shadows and the signature blue underline on nav links.
- **Single-viewport layout** — the whole page fits in `100dvh` with no
  page-level scrolling at any breakpoint, from 320 px phones to ultrawide
  desktops. Vertical rhythm is driven by `dvh`/`clamp()` so the layout
  rescales with the viewport instead of overflowing.
- **Live countdown** to the end of the maintenance window, with a celebratory
  confetti burst when the system comes back online.
- **Upgrade stepper** that fills in real time as the pipeline advances.
- **Status log modal** with the full maintenance pipeline.
- **Fully responsive** — from small phones through to mid-size tablets and
  wide desktop.

### Project structure

```
src/
├── App.tsx                  # Single-viewport layout, header, banner, footer
├── data.ts                  # All copy, dates, upgrade stages and log entries
├── theme.ts                 # Accent colour tokens and status styles
├── index.css                # Tailwind theme, keyframes and base styles
└── components/
    ├── CountdownDisplay.tsx # Countdown card (digits, progress bar, completion)
    └── UpgradeProgress.tsx  # Compact horizontal upgrade stepper
```

### Customising

Everything user-facing lives in `src/data.ts`:

| Field | Purpose |
| --- | --- |
| `maintenanceConfig.startDate` | When the maintenance window opened |
| `maintenanceConfig.targetDate` | When the system is expected back online |
| `maintenanceConfig.targetLabel` | Human-readable target date shown in the UI |
| `systemBannerConfig` | The yellow notice bar under the header |
| `statusMessage` | The hero headline and supporting copy |
| `upgradeStages` | The four pipeline stages shown in the stepper |
| `updateLogs` | The entries listed in the status log modal |
| `projectDetails` | Branding, version, support contact and website |

### Run locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`
3. Build for production:
   `npm run build`
4. Type-check:
   `npm run lint`

### Changelog

The last 15 changes, newest first. They landed on 2026-10-20 across two commits
(`d28b006` streamline into a single-viewport layout, `c522416` responsive redesign)
plus the follow-up rebrand.

| # | Change | Files |
| --- | --- | --- |
| 15 | **Rebrand** — the multi-colour `STANDS` letters replaced with a monochrome "System Maintenance" wordmark and neutral wrench badge; page title, meta description and favicon realigned | `src/App.tsx`, `src/data.ts`, `index.html`, `public/favicon.svg` |
| 14 | **Dead code pruned** — five unused keyframes (`float`, `pulse-ring`, `slide-x`, `bob`, `soft-pulse`) and the unused `AccentTokens.hex` field removed | `src/index.css`, `src/theme.ts` |
| 13 | **Confetti ownership moved to `App`** — the countdown now calls `onCelebrate()` instead of firing its own burst, with a `celebrationFired` ref guard so it plays exactly once | `src/App.tsx`, `src/components/CountdownDisplay.tsx` |
| 12 | **Completion state** — a "We're back online" headline, 100% progress, a green validation notice and a *Celebrate* button replace the countdown once the window closes | `src/data.ts`, `src/App.tsx`, `src/components/CountdownDisplay.tsx` |
| 11 | **Height-based responsive tiers** — `max-height: 700px / 640px / 560px` breakpoints added, because width breakpoints never fire on landscape phones | `src/App.tsx`, `src/components/CountdownDisplay.tsx` |
| 10 | **Viewport-proportional vertical rhythm** — fixed pixel spacing replaced with `dvh` + `clamp()` so the layout rescales with the viewport instead of overflowing | `src/App.tsx`, `src/components/CountdownDisplay.tsx`, `src/components/UpgradeProgress.tsx` |
| 9 | **Countdown card compacted** — smaller header, tighter digit grid, and labels that drop out on short viewports | `src/components/CountdownDisplay.tsx` |
| 8 | **Navbar countdown variant removed** — the header-embedded variant and its `navItems` export deleted | `src/components/CountdownDisplay.tsx`, `src/data.ts` |
| 7 | **Progress tracker replaced** — the cartoon SVG steamroller scene was swapped for a compact horizontal 4-segment stepper | `src/components/UpgradeProgress.tsx` (new), `src/components/AnimatedWorkers.tsx` (deleted) |
| 6 | **Single-viewport shell** — the root became `flex h-dvh overflow-hidden` and `main` became `flex-1 min-h-0 overflow-hidden`, removing page-level scrolling | `src/App.tsx` |
| 5 | **Big footer replaced** — the multi-column footer became a slim one-line bar (website, version, support email, back-online date) | `src/App.tsx` |
| 4 | **Support section removed** — the full-width contact section was dropped in favour of the slim footer bar | `src/App.tsx` |
| 3 | **"What's new" section removed** — the `featureCards` export deleted with it | `src/App.tsx`, `src/data.ts` |
| 2 | **"Live status" section removed** — the `status` section dropped in favour of the always-visible countdown card | `src/App.tsx`, `src/data.ts` |
| 1 | **Rubik typography** — the font stack and the Google Fonts link now load Rubik (Gotham was rejected as not freely licensed) | `src/index.css`, `index.html` |
