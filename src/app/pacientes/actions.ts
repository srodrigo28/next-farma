import { apiRequest } from "@/shared/lib/api";
import { ApiErrorResponse } from "@/shared/types/api";
import { validateNewPatientForm } from "./schema";
import { buildNewPatientErrorResult, buildNewPatientPayload } from "./submitNewPatient.shared";
import { NewPatientFormData } from "./types";

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
    body: JSON.stringify(buildNewPatientPayload(data)),
  });

  if (!response.ok) {
    const payload = response.payload as ApiErrorResponse | null;
    return buildNewPatientErrorResult(payload);
  }

  return {
    ok: true,
    errors: {},
    message: "Paciente cadastrado com sucesso.",
  };
}
