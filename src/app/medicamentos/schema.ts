import { PrescriptionFormData, PrescriptionFormErrors } from "./types";

export function validatePrescriptionForm(data: PrescriptionFormData) {
  const errors: PrescriptionFormErrors = {};

  if (!data.patientId.trim()) errors.patientId = "Selecione o paciente.";
  if (!data.medicationId.trim()) errors.medicationId = "Selecione o medicamento.";
  if (!data.dose.trim()) errors.dose = "Informe a dose.";
  if (!data.startAt.trim()) errors.startAt = "Informe o início da prescrição.";

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
