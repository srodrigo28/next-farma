import { NewTaskFormData, NewTaskFormErrors } from "./types";

function isValidDateTime(value: string) {
  return /^\d{2}\/\d{2}\/\d{4}\s\d{2}:\d{2}$/.test(value);
}

export function validateNewTaskForm(data: NewTaskFormData) {
  const errors: NewTaskFormErrors = {};

  if (!data.title.trim()) {
    errors.title = "Informe o título da tarefa.";
  }

  if (!data.category.trim()) {
    errors.category = "Selecione a categoria.";
  }

  if (!data.unit.trim()) {
    errors.unit = "Selecione a unidade.";
  }

  if (!data.dueAt.trim()) {
    errors.dueAt = "Informe a data e hora limite.";
  } else if (!isValidDateTime(data.dueAt)) {
    errors.dueAt = "Use o formato dd/mm/aaaa hh:mm.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
