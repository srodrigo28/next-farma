import { validatePrescriptionForm } from "./schema";
import { PrescriptionFormData } from "./types";

export async function submitPrescription(data: PrescriptionFormData) {
  const result = validatePrescriptionForm(data);

  if (!result.isValid) {
    return {
      ok: false,
      errors: result.errors,
      message: "Revise os campos obrigatórios antes de criar a prescrição.",
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    ok: true,
    errors: {},
    message: "Prescrição pronta para ser enviada à API.",
  };
}
