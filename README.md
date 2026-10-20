
## STANDS | eRequisition — Maintenance Landing Page

A minimalist, Google-inspired landing page shown while the eRequisition
platform undergoes scheduled maintenance. Built with React 19, Vite and
Tailwind CSS v4.

### Features

- **Google-style design system** — brand palette, Product Sans typography,
  soft elevation shadows and the signature blue underline on nav links.
- **Live countdown** to the end of the maintenance window, with a celebratory
  confetti burst when the system comes back online.
- **Progress ring + checklist** that fill in real time as the upgrade runs.
- **Status log modal** with the full maintenance pipeline.
- **Fully responsive** — hero, status, timeline and support sections adapt
  from mobile through to wide desktop.

### Project structure

```
src/
├── App.tsx                  # Page layout and sections
├── data.ts                  # All copy, dates and log entries
├── theme.ts                 # Accent colour tokens and status styles
├── index.css                # Tailwind theme, keyframes and base styles
└── components/
    ├── AnimatedWorkers.tsx  # Progress ring, checklist, floating chips
    └── CountdownDisplay.tsx # Countdown card + compact navbar variant
```

### Customising

Everything user-facing lives in `src/data.ts`:

| Field | Purpose |
| --- | --- |
| `maintenanceConfig.startDate` | When the maintenance window opened |
| `maintenanceConfig.targetDate` | When the system is expected back online |
| `maintenanceConfig.targetLabel` | Human-readable target date shown in the UI |
| `systemBannerConfig` | The yellow notice bar under the header |
| `featureCards` | The "What's changing" cards |
| `updateLogs` | The maintenance schedule timeline and status log |

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
