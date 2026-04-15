import { apiGet } from "@/shared/lib/api";
import { NewTaskFormData, TaskFilterOption, TaskItem, TaskSelectOption } from "./types";

interface ApiTask {
  id: number;
  title: string;
  category: string;
  patient_name?: string;
  unit: string;
  due_at: string;
  status: "pending" | "completed";
  notes?: string;
}

export function getTaskTabs(): TaskFilterOption[] {
  return [
    { id: "pending", label: "Pendentes" },
    { id: "completed", label: "Realizadas" },
    { id: "all", label: "Todas" },
  ];
}

export async function getTasks(): Promise<TaskItem[]> {
  const payload = await apiGet<ApiTask[]>("/api/v1/tasks");
  if (!payload || !Array.isArray(payload.data)) return [];

  return payload.data.map((task) => ({
    id: String(task.id),
    title: task.title,
    category: task.category,
    patientName: task.patient_name || undefined,
    unit: task.unit,
    dueAt: task.due_at,
    status: task.status,
    notes: task.notes || undefined,
  }));
}

export function getTaskCategoryOptions(): TaskSelectOption[] {
  return [
    { value: "outra", label: "Outra" },
    { value: "assistencial", label: "Assistencial" },
    { value: "medicacao", label: "Medicação" },
    { value: "avaliacao", label: "Avaliação" },
    { value: "documentacao", label: "Documentação" },
  ];
}

export function getTaskPatientOptions(): TaskSelectOption[] {
  return [{ value: "", label: "Sem paciente vinculado" }];
}

export function getTaskUnitOptions(): TaskSelectOption[] {
  return [
    { value: "maternidade", label: "Maternidade" },
    { value: "clinica-medica", label: "Clínica médica" },
    { value: "uti-adulto", label: "UTI adulto" },
    { value: "pediatria", label: "Pediatria" },
  ];
}

export function getNewTaskInitialData(): NewTaskFormData {
  return {
    title: "",
    category: "outra",
    patientId: "",
    unit: "maternidade",
    dueAt: "",
    notes: "",
  };
}
