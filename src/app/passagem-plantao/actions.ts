import { validateHandoffNote } from "./schema";
import { NewHandoffNoteFormData } from "./types";

export async function submitHandoffNote(data: NewHandoffNoteFormData) {
  const result = validateHandoffNote(data);

  if (!result.isValid) {
    return {
      ok: false,
      errors: result.errors,
      message: "Revise os campos obrigatórios antes de salvar.",
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    ok: true,
    errors: {},
    message: "Nota pronta para ser enviada à API.",
  };
}
