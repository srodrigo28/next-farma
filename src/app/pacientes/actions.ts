import { apiRequest } from "@/shared/lib/api";
import { ApiErrorResponse } from "@/shared/types/api";
import { validateNewPatientForm } from "./schema";
import { NewPatientFormData, NewPatientFormErrors } from "./types";

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

function mapApiErrors(errors?: Record<string, string>): NewPatientFormErrors {
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

export async function submitNewPatient(data: NewPatientFormData) {
  const result = validateNewPatientForm(data);

  if (!result.isValid) {
    return {
      ok: false,
      errors: result.errors,
      message: "Revise os campos destacados antes de continuar.",
    };
  }

  const response = await apiRequest<unknown>("/api/v1/patients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
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
    }),
  });

  if (!response.ok) {
    const payload = response.payload as ApiErrorResponse | null;
    return {
      ok: false,
      errors: mapApiErrors(payload?.errors),
      message: payload?.message || "Nao foi possivel cadastrar o paciente.",
    };
  }

  return {
    ok: true,
    errors: {},
    message: "Paciente cadastrado com sucesso.",
  };
}
