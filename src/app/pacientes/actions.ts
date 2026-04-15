import { apiGet, apiRequest } from "@/shared/lib/api";
import { ApiErrorResponse } from "@/shared/types/api";
import { validateNewPatientForm } from "./schema";
import {
  buildNewPatientErrorResult,
  buildNewPatientPayload,
  mapPatientApiToForm,
} from "./submitNewPatient.shared";
import { NewPatientFormData, PatientDetails } from "./types";

export async function submitNewPatient(data: NewPatientFormData) {
  const result = validateNewPatientForm(data);

  if (!result.isValid) {
    return {
      ok: false,
      errors: result.errors,
      message: "Revise os campos destacados antes de continuar.",
    };
  }

  const response = await apiRequest<unknown>(
    "/api/v1/patients",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildNewPatientPayload(data)),
    },
    true,
  );

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

export async function getPatientById(id: string) {
  const payload = await apiGet<PatientDetails>(`/api/v1/patients/${id}`, undefined, true);
  if (!payload?.data) return null;

  return mapPatientApiToForm(payload.data);
}

export async function updatePatient(id: string, data: NewPatientFormData) {
  const result = validateNewPatientForm(data);

  if (!result.isValid) {
    return {
      ok: false,
      errors: result.errors,
      message: "Revise os campos destacados antes de salvar.",
    };
  }

  const response = await apiRequest<unknown>(
    `/api/v1/patients/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildNewPatientPayload(data)),
    },
    true,
  );

  if (!response.ok) {
    const payload = response.payload as ApiErrorResponse | null;
    return buildNewPatientErrorResult(payload);
  }

  return {
    ok: true,
    errors: {},
    message: "Dados do paciente atualizados com sucesso.",
  };
}

export async function deletePatient(id: string) {
  const response = await apiRequest<unknown>(
    `/api/v1/patients/${id}`,
    {
      method: "DELETE",
    },
    true,
  );

  if (!response.ok) {
    const payload = response.payload as ApiErrorResponse | null;
    return {
      ok: false,
      errors: {},
      message: payload?.message || "Não foi possível excluir o paciente.",
    };
  }

  return {
    ok: true,
    errors: {},
    message: "Paciente excluído com sucesso.",
  };
}
