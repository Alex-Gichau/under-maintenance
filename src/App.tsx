import React, { useCallback, useRef, useState } from "react";
import AnimatedWorkers from "./components/AnimatedWorkers";
import CountdownDisplay from "./components/CountdownDisplay";
import {
  featureCards,
  maintenanceConfig,
  navItems,
  projectDetails,
  statusMessage,
  systemBannerConfig,
  updateLogs,
} from "./data";
import { accent, logStatusStyles } from "./theme";
import {
  AlertTriangle,
  ArrowRight,
  Bolt,
  ChartNoAxesColumn,
  CheckCircle2,
  Database,
  Info,
  Mail,
  Menu,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import confetti from "canvas-confetti";

const featureIcons = {
  database: Database,
  shield: ShieldCheck,
  bolt: Bolt,
  clock: CheckCircle2,
  check: CheckCircle2,
  chart: ChartNoAxesColumn,
} as const;

const BRAND_COLORS = ["#4285f4", "#ea4335", "#fbbc05", "#34a853", "#8ab4f8"];

export default function App() {
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(systemBannerConfig.show);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const celebrationFired = useRef(false);

  const handleProgress = useCallback((value: number, completed: boolean) => {
    setProgress(value);
    setIsComplete(completed);

    // Fire the celebration exactly once, no matter how many timers report in.
    if (completed && !celebrationFired.current) {
      celebrationFired.current = true;
      fireCelebration();
    }
    if (!completed) {
      celebrationFired.current = false;
    }
  }, []);

  // Trigger the celebratory confetti shower
  const fireCelebration = useCallback(() => {
    confetti({
      particleCount: 90,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors: BRAND_COLORS,
    });
    confetti({
      particleCount: 90,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors: BRAND_COLORS,
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 90,
        spread: 80,
        origin: { x: 0.5, y: 0.6 },
        colors: ["#4285f4", "#34a853", "#ea4335"],
      });
    }, 250);
  }, []);

  const bannerIcon =
    systemBannerConfig.type === "info" ? (
      <Info className="h-5 w-5 shrink-0 text-g-blue" />
    ) : systemBannerConfig.type === "success" ? (
      <CheckCircle2 className="h-5 w-5 shrink-0 text-g-green" />
    ) : (
      <AlertTriangle className="h-5 w-5 shrink-0 text-[#a06700]" />
    );

  return (
    <div className="min-h-screen bg-white font-sans text-ink-800">
      {/* ------------------------------------------------------------------ */}
      {/* Top navigation — Google style                                          */}
      {/* ------------------------------------------------------------------ */}
      <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
          {/* Wordmark */}
          <a href="#overview" className="flex items-center gap-2.5">
            <span className="text-xl font-medium tracking-tight text-ink-900">
              <span className="text-g-blue">S</span>
              <span className="text-g-red">T</span>
              <span className="text-g-yellow">A</span>
              <span className="text-g-blue">N</span>
              <span className="text-g-green">D</span>
              <span className="text-g-red">S</span>
            </span>
            <span className="hidden text-xs text-ink-400 sm:inline">
              {projectDetails.version}
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="link-underline text-sm text-ink-600 transition-colors hover:text-ink-900"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLogOpen(true)}
              className="hidden rounded-full border border-line px-4 py-2 text-sm text-ink-800 transition-colors hover:border-ink-200 hover:bg-surface-alt sm:inline-flex sm:items-center sm:gap-2"
            >
              Status log
              <ArrowRight className="h-3.5 w-3.5 text-ink-400" />
            </button>

            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-600 transition-colors hover:bg-surface-alt md:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile nav panel */}
        {isMenuOpen && (
          <div className="border-t border-line bg-white px-5 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-ink-700 transition-colors hover:bg-surface-alt"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsLogOpen(true);
                }}
                className="mt-1 rounded-lg px-3 py-2 text-left text-sm text-g-blue transition-colors hover:bg-surface-alt"
              >
                Status log
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Service banner                                                        */}
      {/* ------------------------------------------------------------------ */}
      {showBanner && (
        <div className="border-b border-[#f9d58a] bg-surface-yellow">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-6">
            <div className="flex items-start gap-3">
              {bannerIcon}
              <p className="text-sm leading-relaxed text-ink-800">
                <span className="font-semibold">Heads up.</span>{" "}
                {systemBannerConfig.message}
              </p>
            </div>
            {systemBannerConfig.allowDismiss && (
              <button
                onClick={() => setShowBanner(false)}
                className="shrink-0 rounded-full p-1.5 text-ink-400 transition-colors hover:bg-black/5 hover:text-ink-800"
                aria-label="Dismiss notice"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section id="overview" className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-6 sm:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Copy */}
          <div className="animate-fade-up">
            {/* Live status pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-alt px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-g-blue opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-g-blue" />
              </span>
              <span className="text-xs font-medium text-ink-800">
                {isComplete ? "System online" : projectDetails.alertText}
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-medium leading-[1.1] tracking-tight text-ink-900 sm:text-5xl md:text-6xl">
              {statusMessage.title}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-600 sm:text-lg">
              {statusMessage.body}
            </p>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-400">
              {maintenanceConfig.systemDescription}
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#status"
                className="inline-flex items-center gap-2 rounded-full bg-g-blue px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#1a73e8] hover:shadow-float"
              >
                View live status
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${projectDetails.supportEmail}`}
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-ink-800 transition-colors hover:border-ink-200 hover:bg-surface-alt"
              >
                <Mail className="h-4 w-4 text-ink-400" />
                Contact support
              </a>
            </div>

            {/* Meta row */}
            <dl className="mt-10 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8">
              <div>
                <dt className="text-xs uppercase tracking-wider text-ink-400">
                  Expected back online
                </dt>
                <dd className="mt-1 text-sm font-medium text-ink-900">
                  {maintenanceConfig.targetLabel}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-ink-400">
                  Upgrade progress
                </dt>
                <dd className="tabular mt-1 text-sm font-medium text-ink-900">
                  {progress.toFixed(1)}% complete
                </dd>
              </div>
            </dl>
          </div>

          {/* Countdown card */}
          <div className="animate-fade-up [animation-delay:120ms]">
            <div className="h-130 min-h-105">
              <CountdownDisplay
                variant="card"
                onProgress={handleProgress}
                onCelebrate={fireCelebration}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Status strip — live progress + mobile countdown                      */}
      {/* ------------------------------------------------------------------ */}
      <section id="status" className="border-y border-line bg-surface-alt">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-medium tracking-tight text-ink-900">
                Live status
              </h2>
              <p className="mt-1 text-sm text-ink-600">
                Real-time view of the maintenance window.
              </p>
            </div>
            <button
              onClick={() => setIsLogOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-sm text-ink-800 transition-colors hover:border-ink-200"
            >
              Open status log
              <ArrowRight className="h-3.5 w-3.5 text-ink-400" />
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Progress illustration */}
            <div className="h-105">
              <AnimatedWorkers progress={progress} isCompleted={isComplete} />
            </div>

            {/* Right column: mobile countdown + stream progress */}
            <div className="flex flex-col gap-6">
              <div className="lg:hidden">
                <CountdownDisplay
                  variant="navbar"
                  onProgress={handleProgress}
                  onCelebrate={fireCelebration}
                />
              </div>

              <div className="flex flex-1 flex-col justify-center rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8">
                <h3 className="text-lg font-medium text-ink-900">
                  Database upgrade stream
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                  Work continues around the clock. Every stage is verified before
                  traffic is handed back.
                </p>

                <div className="mt-7">
                  <div className="mb-2.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-ink-800">
                      Overall progress
                    </span>
                    <span className="tabular font-medium text-g-blue">
                      {progress.toFixed(2)}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-line-soft">
                    <div
                      className="h-full rounded-full bg-g-blue transition-all duration-1000 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-6">
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-ink-400">
                      Window opened
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-ink-900">
                      27 June 2026
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-ink-400">
                      Expected online
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-ink-900">
                      {maintenanceConfig.targetLabel}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* What's new                                                           */}
      {/* ------------------------------------------------------------------ */}
      <section id="whats-new" className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-medium tracking-tight text-ink-900 sm:text-4xl">
            What's changing
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-600">
            The work behind this maintenance window, and the improvements it
            unlocks for everyone using eRequisition.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featureCards.map((card) => {
            const Icon = featureIcons[card.icon];
            const tokens = accent[card.accent];
            return (
              <article
                key={card.id}
                className="group rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-float"
              >
                <div
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${tokens.softBg} ${tokens.text}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-medium text-ink-900">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {card.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Timeline                                                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-line bg-surface-alt">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="text-3xl font-medium tracking-tight text-ink-900">
                Maintenance schedule
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-600">
                Each stage is validated before the next one begins, so nothing
                reaches production until it has been verified.
              </p>
              <button
                onClick={() => setIsLogOpen(true)}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink-800"
              >
                View full log
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <ol className="space-y-3 lg:col-span-8">
              {updateLogs.map((log) => {
                const status = logStatusStyles[log.status] ?? logStatusStyles.QUEUED;
                return (
                  <li
                    key={log.id}
                    className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-5 transition-shadow hover:shadow-card sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${status.dot}`}
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-medium text-ink-900">
                            {log.component}
                          </h3>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${status.chip}`}
                          >
                            {status.label}
                          </span>
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-ink-600">
                          {log.description}
                        </p>
                      </div>
                    </div>
                    <time className="shrink-0 font-mono text-xs text-ink-400 sm:pl-6">
                      {log.timestamp}
                    </time>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Support CTA                                                          */}
      {/* ------------------------------------------------------------------ */}
      <section id="support" className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
        <div className="overflow-hidden rounded-3xl border border-line bg-surface-blue">
          <div className="relative px-8 py-14 text-center sm:px-16">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/60 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-g-yellow/20 blur-3xl" />

            <div className="relative mx-auto max-w-2xl">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-g-blue shadow-card">
                <Sparkles className="h-5 w-5" />
              </div>
              <h2 className="mt-6 text-3xl font-medium tracking-tight text-ink-900 sm:text-4xl">
                Need a hand?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-600">
                Our support team is on hand for the duration of the upgrade. If
                you have an urgent requisition, reach out and we'll make sure it
                goes through.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`mailto:${projectDetails.supportEmail}`}
                  className="inline-flex items-center gap-2 rounded-full bg-g-blue px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#1a73e8] hover:shadow-float"
                >
                  <Mail className="h-4 w-4" />
                  {projectDetails.supportEmail}
                </a>
                <button
                  onClick={() => setIsLogOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3 text-sm font-medium text-ink-800 transition-colors hover:border-ink-200"
                >
                  Check system log
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Footer                                                               */}
      {/* ------------------------------------------------------------------ */}
      <footer className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
          <div className="flex flex-col gap-8 md:flex-row md:justify-between">
            <div>
              <span className="text-lg font-medium tracking-tight text-ink-900">
                <span className="text-g-blue">S</span>
                <span className="text-g-red">T</span>
                <span className="text-g-yellow">A</span>
                <span className="text-g-blue">N</span>
                <span className="text-g-green">D</span>
                <span className="text-g-red">S</span>
              </span>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-400">
                {maintenanceConfig.systemDescription}
              </p>
            </div>

            <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                  Platform
                </h4>
                <ul className="mt-3 space-y-2 text-sm">
                  {navItems.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="text-ink-600 transition-colors hover:text-g-blue"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                  Contact
                </h4>
                <ul className="mt-3 space-y-2 text-sm text-ink-600">
                  <li>
                    <a
                      href={`mailto:${projectDetails.supportEmail}`}
                      className="transition-colors hover:text-g-blue"
                    >
                      {projectDetails.supportEmail}
                    </a>
                  </li>
                  <li>{projectDetails.website}</li>
                  <li>{projectDetails.version}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} STANDS · eRequisition Platform</span>
            <span>Maintenance window: {maintenanceConfig.targetLabel}</span>
          </div>
        </div>
      </footer>

      {/* ------------------------------------------------------------------ */}
      {/* Status log modal                                                     */}
      {/* ------------------------------------------------------------------ */}
      {isLogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink-900/40 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={() => setIsLogOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="System status log"
        >
          <div
            className="flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-modal sm:rounded-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <div>
                <h2 className="text-lg font-medium text-ink-900">System log</h2>
                <p className="mt-0.5 text-xs text-ink-400">
                  Live feed of the maintenance pipeline
                </p>
              </div>
              <button
                onClick={() => setIsLogOpen(false)}
                className="rounded-full p-2 text-ink-400 transition-colors hover:bg-surface-alt hover:text-ink-800"
                aria-label="Close log"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 space-y-3 overflow-y-auto px-6 py-5 scrollbar-thin">
              {updateLogs.map((log) => {
                const tokens = accent[log.accent];
                const status = logStatusStyles[log.status] ?? logStatusStyles.QUEUED;
                return (
                  <div
                    key={log.id}
                    className="rounded-2xl border border-line p-4 transition-colors hover:bg-surface-alt"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`h-2 w-2 shrink-0 rounded-full ${status.dot}`}
                          />
                          <h3 className="text-sm font-medium text-ink-900">
                            {log.component}
                          </h3>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${status.chip}`}
                          >
                            {status.label}
                          </span>
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                          {log.description}
                        </p>
                      </div>
                      <time className="shrink-0 font-mono text-xs text-ink-400">
                        {log.timestamp}
                      </time>
                    </div>
                    <div
                      className={`mt-3 h-1 w-full overflow-hidden rounded-full bg-line-soft`}
                    >
                      <div
                        className={`h-full rounded-full ${tokens.bg}`}
                        style={{
                          width:
                            log.status === "COMPLETED"
                              ? "100%"
                              : log.status === "IN-PROGRESS" || log.status === "IN_PROGRESS"
                                ? "45%"
                                : "0%",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-line px-6 py-4">
              <span className="text-xs text-ink-400">
                Updated {new Date().toLocaleTimeString()}
              </span>
              <button
                onClick={() => setIsLogOpen(false)}
                className="rounded-full bg-ink-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-ink-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
