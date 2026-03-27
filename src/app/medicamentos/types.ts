export interface MedicationTab {
  id: string;
  label: string;
  selected?: boolean;
}

export interface MedicationScheduleItem {
  id: string;
  patientName: string;
  medicationName: string;
  doseLabel: string;
  scheduledFor: string;
  priority?: string;
}

export interface MedicationOption {
  value: string;
  label: string;
}

export interface PrescriptionFormData {
  patientId: string;
  medicationId: string;
  dose: string;
  unit: string;
  route: string;
  frequency: string;
  intervalValue: string;
  intervalUnit: string;
  startAt: string;
  notes: string;
}

export type PrescriptionFormErrors = Partial<Record<keyof PrescriptionFormData, string>>;
