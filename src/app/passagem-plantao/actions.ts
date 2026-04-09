import { apiRequest } from "@/shared/lib/api";
import { ApiErrorResponse } from "@/shared/types/api";
import { validateHandoffNote } from "./schema";
import { NewHandoffNoteFormData } from "./types";

export async function submitHandoffNote(data: NewHandoffNoteFormData) {
  const result = validateHandoffNote(data);

  if (!result.isValid) {
    return {
      ok: false,
      errors: result.errors,
      message: "Revise os campos obrigatorios antes de salvar.",
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
    const payload = response.payload as ApiErrorResponse | null;
    return {
      ok: false,
      errors: result.errors,
      message: payload?.message || "Nao foi possivel salvar a passagem de plantao.",
    };
  }

  return {
    ok: true,
    errors: {},
    message: "Passagem de plantao salva com sucesso.",
  };
}
