
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
