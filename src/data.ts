// ---------------------------------------------------------------------------
// Content model for the maintenance landing page.
// All copy is driven from here so the layout stays purely presentational.
// ---------------------------------------------------------------------------

export type AccentColor = "blue" | "red" | "yellow" | "green";

export interface NavItem {
  label: string;
  href: string;
}

export interface ProjectDetails {
  appName: string;
  shortName: string;
  version: string;
  status: "Offline" | "Maintenance" | "Upgrading" | "Live";
  alertText: string;
  supportEmail: string;
  website: string;
}

export interface MaintenanceConfig {
  /** ISO 8601 — the moment the maintenance window opened. */
  startDate: string;
  /** ISO 8601 — the moment the system is expected to be back online. */
  targetDate: string;
  systemTitle: string;
  systemSubtitle: string;
  systemDescription: string;
  /** Human readable form of the target date, e.g. "10 July 2026 · 00:00 UTC". */
  targetLabel: string;
}

export interface UpdateLog {
  id: string;
  timestamp: string;
  component: string;
  status: "COMPLETED" | "IN_PROGRESS" | "IN-PROGRESS" | "QUEUED";
  description: string;
  accent: AccentColor;
}

export interface SystemBannerConfig {
  show: boolean;
  message: string;
  type: "warning" | "info" | "critical" | "success";
  allowDismiss: boolean;
}

export interface FeatureCard {
  id: string;
  icon: "database" | "shield" | "bolt" | "clock" | "check" | "chart";
  title: string;
  description: string;
  accent: AccentColor;
}

export interface StatusMessage {
  title: string;
  body: string;
  accent: AccentColor;
}

export const projectDetails: ProjectDetails = {
  appName: "STANDS | eRequisition",
  shortName: "STANDS",
  version: "v1.0.0",
  status: "Maintenance",
  alertText: "Scheduled Maintenance In Progress",
  supportEmail: "support@pceastandrews.org",
  website: "accounts.pceastandrews.org",
};

export const navItems: NavItem[] = [
  { label: "Overview", href: "#overview" },
  { label: "Status", href: "#status" },
  { label: "What's new", href: "#whats-new" },
  { label: "Support", href: "#support" },
];

export const systemBannerConfig: SystemBannerConfig = {
  show: true,
  message:
    "Database optimisation is running at 85% completion. System requests are paused until the upgrade finishes.",
  type: "warning",
  allowDismiss: true,
};

export const maintenanceConfig: MaintenanceConfig = {
  startDate: "2026-06-27T00:00:00Z",
  targetDate: "2026-07-10T00:00:00Z",
  systemTitle: "Scheduled Maintenance",
  systemSubtitle: "Upgrading our systems to better serve you",
  systemDescription:
    "We are optimising our database architecture and deploying new security policies across the eRequisition platform.",
  targetLabel: "10 July 2026 · 00:00 UTC",
};

export const statusMessage: StatusMessage = {
  title: "We'll be back shortly",
  body: "We're upgrading the STANDS eRequisition platform to deliver faster approvals, stronger security, and a smoother request experience.",
  accent: "blue",
};

export const featureCards: FeatureCard[] = [
  {
    id: "database",
    icon: "database",
    title: "Faster queries",
    description:
      "Rebuilding indexes and restructuring tables so requisition lookups return in milliseconds instead of seconds.",
    accent: "blue",
  },
  {
    id: "security",
    icon: "shield",
    title: "Stronger security",
    description:
      "Rolling out refreshed access policies, audit logging, and single sign-on across every staff account.",
    accent: "green",
  },
  {
    id: "uptime",
    icon: "bolt",
    title: "Higher uptime",
    description:
      "Redundant services and automated failover so an unexpected restart no longer interrupts your work.",
    accent: "yellow",
  },
  {
    id: "workflow",
    icon: "chart",
    title: "Simpler workflow",
    description:
      "Streamlined approval paths and clearer status tracking for every line of a requisition.",
    accent: "red",
  },
];

export const updateLogs: UpdateLog[] = [
  {
    id: "LOG-001",
    timestamp: "27/06/2026",
    component: "Database migration",
    status: "IN-PROGRESS",
    description: "Reindexing the core requisition tables and validating query plans.",
    accent: "blue",
  },
  {
    id: "LOG-002",
    timestamp: "28/06/2026",
    component: "Security",
    status: "QUEUED",
    description: "Deploying updated access policies and centralised audit logging.",
    accent: "green",
  },
  {
    id: "LOG-003",
    timestamp: "29/06/2026",
    component: "Application",
    status: "QUEUED",
    description: "Shipping the streamlined approval workflow and refreshed interface.",
    accent: "yellow",
  },
  {
    id: "LOG-004",
    timestamp: "10/07/2026",
    component: "Verification",
    status: "QUEUED",
    description: "End-to-end validation, load testing, and traffic handover.",
    accent: "red",
  },
];
