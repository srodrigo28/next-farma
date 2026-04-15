import { apiRequest } from "@/shared/lib/api";
import { ApiErrorResponse } from "@/shared/types/api";
import { validateHandoffNote } from "./schema";
import { NewHandoffNoteFormData } from "./types";

function getErrorMessage(payload: ApiErrorResponse | null, fallback: string) {
  return payload?.message || fallback;
}

export async function submitHandoffNote(data: NewHandoffNoteFormData) {
  const result = validateHandoffNote(data);

  if (!result.isValid) {
    return {
      ok: false,
      errors: result.errors,
      message: "Revise os campos obrigatórios antes de salvar.",
    };
  }

  const response = await apiRequest<unknown>(
    "/api/v1/handoffs",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        unit: data.unit,
        shift: data.shift,
        summary: data.summary,
      }),
    },
    true,
  );

  if (!response.ok) {
    return {
      ok: false,
      errors: result.errors,
      message: getErrorMessage(response.payload, "Não foi possível salvar a passagem de plantão."),
    };
  }

  return {
    ok: true,
    errors: {},
    message: "Passagem de plantão salva com sucesso.",
  };
}

export async function updateHandoffNote(id: string, data: NewHandoffNoteFormData) {
  const result = validateHandoffNote(data);

  if (!result.isValid) {
    return {
      ok: false,
      errors: result.errors,
      message: "Revise os campos obrigatórios antes de salvar.",
    };
  }

  const response = await apiRequest<unknown>(
    `/api/v1/handoffs/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        unit: data.unit,
        shift: data.shift,
        summary: data.summary,
      }),
    },
    true,
  );

  if (!response.ok) {
    return {
      ok: false,
      errors: result.errors,
      message: getErrorMessage(response.payload, "Não foi possível atualizar a passagem de plantão."),
    };
  }

  return {
    ok: true,
    errors: {},
    message: "Passagem de plantão atualizada com sucesso.",
  };
}

export async function deleteHandoffNote(id: string) {
  const response = await apiRequest<unknown>(
    `/api/v1/handoffs/${id}`,
    {
      method: "DELETE",
    },
    true,
  );

  if (!response.ok) {
    return {
      ok: false,
      message: getErrorMessage(response.payload, "Não foi possível excluir a passagem de plantão."),
    };
  }

  return {
    ok: true,
    message: "Passagem de plantão excluída com sucesso.",
  };
}