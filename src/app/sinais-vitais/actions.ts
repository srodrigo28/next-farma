import { validateVitalRecordForm } from "./schema";
import { NewVitalRecordFormData } from "./types";

export async function submitVitalRecord(data: NewVitalRecordFormData) {
  const result = validateVitalRecordForm(data);

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
    message: "Lançamento pronto para ser enviado à API.",
  };
}
