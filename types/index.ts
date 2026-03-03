export type JobStatus = 'pending' | 'in-progress' | 'completed';

export interface Job {
  id: string;
  customerName: string;
  address: string;
  lat: number;
  lng: number;
  geofenceRadius: number; // in meters
  status: JobStatus;
  startTime?: string;
  notes: string;
  beforePhotos: string[];
  afterPhotos: string[];
  priority: 'urgent' | 'high' | 'normal';
  type: 'solar' | 'plumbing' | 'electrical';
  title: string;
  description: string;
  scheduledTime: string;
}

export interface JobSummary {
  professionalDescription: string;
  workPerformed: string[];
  issuesResolved: string[];
  remainingIssues?: string[];
  suggestedUpsell?: string;
  confidence: number;
}

export const JOB_ICONS = { solar: "☀️", plumbing: "🔧", electrical: "⚡" };
export const PRIORITY_COLORS = {
  urgent: { bg: "rgba(220,38,38,0.15)", border: "#dc2626", text: "#fca5a5" },
  high: { bg: "rgba(234,88,12,0.15)", border: "#ea580c", text: "#fdba74" },
  normal: { bg: "rgba(22,163,74,0.12)", border: "#16a34a", text: "#86efac" },
};
