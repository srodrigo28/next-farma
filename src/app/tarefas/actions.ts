import { apiRequest } from "@/shared/lib/api";
import { ApiErrorResponse } from "@/shared/types/api";
import { validateNewTaskForm } from "./schema";
import { NewTaskFormData, NewTaskFormErrors } from "./types";

const FIELD_MAP: Record<string, keyof NewTaskFormErrors> = {
  title: "title",
  category: "category",
  patient_id: "patientId",
  unit: "unit",
  due_at: "dueAt",
  notes: "notes",
};

function mapApiErrors(errors?: Record<string, string>) {
  const mappedErrors: NewTaskFormErrors = {};
  if (!errors) return mappedErrors;

  for (const [key, message] of Object.entries(errors)) {
    const mappedKey = FIELD_MAP[key];
    if (mappedKey) mappedErrors[mappedKey] = message;
  }

  return mappedErrors;
}

export async function submitNewTask(data: NewTaskFormData) {
  const result = validateNewTaskForm(data);

  if (!result.isValid) {
    return {
      ok: false,
      errors: result.errors,
      message: "Revise os campos obrigatórios antes de criar a tarefa.",
    };
  }

  const response = await apiRequest<unknown>("/api/v1/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: data.title,
      category: data.category,
      patient_id: data.patientId || null,
      unit: data.unit,
      due_at: data.dueAt,
      status: "pending",
      notes: data.notes,
    }),
  });

  if (!response.ok) {
    const payload = response.payload as ApiErrorResponse | null;
    return {
      ok: false,
      errors: mapApiErrors(payload?.errors),
      message: payload?.message || "Não foi possível criar a tarefa agora.",
    };
  }

  return {
    ok: true,
    errors: {},
    message: "Tarefa criada com sucesso.",
  };
}
