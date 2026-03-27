import { validateNewTaskForm } from "./schema";
import { NewTaskFormData } from "./types";

export async function submitNewTask(data: NewTaskFormData) {
  const result = validateNewTaskForm(data);

  if (!result.isValid) {
    return {
      ok: false,
      errors: result.errors,
      message: "Revise os campos obrigatórios antes de criar a tarefa.",
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    ok: true,
    errors: {},
    message: "Tarefa pronta para ser enviada à API.",
  };
}
