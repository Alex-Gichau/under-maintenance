// System Configuration and Maintenance Parameters
export interface ProjectDetails {
  appName: string;
  version: string;
  status: "Offline" | "Maintenance" | "Upgrading" | "Live";
  alertText: string;
}

export interface MaintenanceConfig {
  // ISO Date format or simple string that can be parsed by new Date() (e.g. "2026-06-27T00:00:00Z" and "2026-07-10T00:00:00Z")
  startDate: string;
  targetDate: string;
  systemTitle: string;
  systemSubtitle: string;
  systemDescription: string;
}

export interface UpdateLog {
  id: string;
  timestamp: string;
  component: string;
  status: "COMPLETED" | "IN_PROGRESS" | "IN-PROGRESS" | "QUEUED";
  description: string;
}

export const projectDetails: ProjectDetails = {
  appName: "STANDS | eRequisiton System",
  version: "v1.0.0",
  status: "Offline",
  alertText: "Scheduled Maintenance In Progress"
};

export const maintenanceConfig: MaintenanceConfig = {
  startDate: "2026-06-27T00:00:00Z",
  targetDate: "2026-07-10T00:00:00Z", // Countdown to July 10th 2026
  systemTitle: "Scheduled Maintenance",
  systemSubtitle: "Upgrading our systems to better serve you",
  systemDescription: "We are currently optimizing our database architecture and deploying security policies."
};

export const updateLogs: UpdateLog[] = [
  {
    id: "LOG-001",
    timestamp: "27/06/2026",
    component: "DATABASE MIGRATION",
    status: "IN-PROGRESS",
    description: "We are upgrading our system functionality."
  },
  {
    id: "LOG-002",
    timestamp: "28/06/2026",
    component: "SECURITY",
    status: "QUEUED",
    description: "We are setting up security patches"
  }
  
];
