export interface PatientListItem {
  id: string;
  name: string;
  bed: string;
  ageLabel: string;
  admissionDate: string;
  unit: string;
}

export interface PatientUnitOption {
  id: string;
  label: string;
  icon?: string;
  selected?: boolean;
}

export interface PatientSelectOption {
  value: string;
  label: string;
  icon?: string;
}

export interface PatientDetails {
  id: number;
  full_name: string;
  record_id: string;
  sex: string;
  bed: string;
  sector: string;
  admission_date: string;
  unit: string;
  allergies: string;
  notes: string;
  is_training_patient: boolean;
}

export interface NewPatientFormData {
  fullName: string;
  recordId: string;
  sex: string;
  bed: string;
  sector: string;
  admissionDate: string;
  unit: string;
  allergies: string;
  notes: string;
  isTrainingPatient: boolean;
}

export type NewPatientFormErrors = Partial<Record<keyof NewPatientFormData, string>>;
