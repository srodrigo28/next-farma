import { ApiErrorResponse } from "../../shared/types/api";
import { NewPatientFormData, NewPatientFormErrors, PatientDetails } from "./types";

const FIELD_MAP: Record<string, keyof NewPatientFormErrors> = {
  full_name: "fullName",
  record_id: "recordId",
  sex: "sex",
  bed: "bed",
  sector: "sector",
  admission_date: "admissionDate",
  unit: "unit",
  allergies: "allergies",
  notes: "notes",
  is_training_patient: "isTrainingPatient",
};

export function buildNewPatientPayload(data: NewPatientFormData) {
  return {
    full_name: data.fullName,
    record_id: data.recordId,
    sex: data.sex,
    bed: data.bed,
    sector: data.sector,
    admission_date: data.admissionDate,
    unit: data.unit,
    allergies: data.allergies,
    notes: data.notes,
    is_training_patient: data.isTrainingPatient,
  };
}

export function mapPatientApiToForm(patient: PatientDetails): NewPatientFormData {
  return {
    fullName: patient.full_name,
    recordId: patient.record_id,
    sex: patient.sex,
    bed: patient.bed,
    sector: patient.sector,
    admissionDate: patient.admission_date,
    unit: patient.unit,
    allergies: patient.allergies || "",
    notes: patient.notes || "",
    isTrainingPatient: patient.is_training_patient,
  };
}

export function mapNewPatientApiErrors(errors?: Record<string, string>): NewPatientFormErrors {
  if (!errors) return {};

  const mappedErrors: NewPatientFormErrors = {};
  for (const [key, message] of Object.entries(errors)) {
    const mappedKey = FIELD_MAP[key];
    if (mappedKey) {
      mappedErrors[mappedKey] = message;
    }
  }

  return mappedErrors;
}

export function buildNewPatientErrorResult(payload: ApiErrorResponse | null) {
  return {
    ok: false as const,
    errors: mapNewPatientApiErrors(payload?.errors),
    message: payload?.message || "Não foi possível salvar o paciente.",
  };
}
