import { NewTaskFormData, TaskFilterOption, TaskItem, TaskSelectOption } from "./types";

export function getTaskTabs(): TaskFilterOption[] {
  return [
    { id: "pending", label: "Pendentes" },
    { id: "completed", label: "Realizadas" },
    { id: "all", label: "Todas" },
  ];
}

export function getTasks(): TaskItem[] {
  return [];
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
  return [
    { value: "", label: "Sem paciente vinculado" },
    { value: "p-ana-clara", label: "Ana Clara Santos" },
    { value: "p-maria-oliveira", label: "Maria Oliveira" },
    { value: "p-joao-pedro", label: "João Pedro Lima" },
  ];
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
