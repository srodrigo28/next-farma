import { validateNewPatientForm } from "./schema";
import { NewPatientFormData } from "./types";

export async function submitNewPatient(data: NewPatientFormData) {
  const result = validateNewPatientForm(data);

  if (!result.isValid) {
    return {
      ok: false,
      errors: result.errors,
      message: "Revise os campos destacados antes de continuar.",
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    ok: true,
    errors: {},
    message: "Paciente pronto para ser enviado à API.",
  };
}
