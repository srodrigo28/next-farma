import { apiRequest } from "@/shared/lib/api";
import { ApiErrorResponse } from "@/shared/types/api";
import { validatePrescriptionForm } from "./schema";
import { PrescriptionFormData, PrescriptionFormErrors } from "./types";

const FIELD_MAP: Record<string, keyof PrescriptionFormErrors> = {
  patient_id: "patientId",
  medication_id: "medicationId",
  dose: "dose",
  unit: "unit",
  route: "route",
  frequency: "frequency",
  interval_value: "intervalValue",
  interval_unit: "intervalUnit",
  start_at: "startAt",
  notes: "notes",
};

function mapApiErrors(errors?: Record<string, string>): PrescriptionFormErrors {
  if (!errors) return {};

  const mappedErrors: PrescriptionFormErrors = {};
  for (const [key, message] of Object.entries(errors)) {
    const mappedKey = FIELD_MAP[key];
    if (mappedKey) {
      mappedErrors[mappedKey] = message;
    }
  }

  return mappedErrors;
}

export async function submitPrescription(data: PrescriptionFormData) {
  const result = validatePrescriptionForm(data);

  if (!result.isValid) {
    return {
      ok: false,
      errors: result.errors,
      message: "Revise os campos obrigatorios antes de criar a prescricao.",
    };
  }

  const response = await apiRequest<unknown>("/api/v1/prescriptions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      patient_id: data.patientId,
      medication_id: data.medicationId,
      dose: data.dose,
      unit: data.unit,
      route: data.route,
      frequency: data.frequency,
      interval_value: data.intervalValue,
      interval_unit: data.intervalUnit,
      start_at: data.startAt,
      notes: data.notes,
    }),
  });

  if (!response.ok) {
    const payload = response.payload as ApiErrorResponse | null;
    return {
      ok: false,
      errors: mapApiErrors(payload?.errors),
      message: payload?.message || "Nao foi possivel criar a prescricao.",
    };
  }

  return {
    ok: true,
    errors: {},
    message: "Prescricao criada com sucesso.",
  };
}
