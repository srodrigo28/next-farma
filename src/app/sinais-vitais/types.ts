export interface VitalRecordItem {
  id: string;
  patientName: string;
  recordedAt: string;
  note: string;
  alerts: string[];
  temperature?: string;
  pain?: string;
  respiratoryRate?: string;
  spo2?: string;
}

export interface PatientOption {
  value: string;
  label: string;
}

export interface NewVitalRecordFormData {
  patientId: string;
  temperature: string;
  heartRate: string;
  respiratoryRate: string;
  spo2: string;
  systolicPressure: string;
  diastolicPressure: string;
  glasgow: string;
  glucose: string;
  pain: string;
  notes: string;
}

export type NewVitalRecordErrors = Partial<Record<keyof NewVitalRecordFormData, string>>;
