export interface AlertItem {
  id: string;
  medicationName: string;
  patientName: string;
  doseLabel: string;
  scheduleLabel: string;
  priority?: string;
  delayLabel: string;
  category: string;
}
