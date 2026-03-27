import { NewPatientFormData, NewPatientFormErrors } from "./types";

function isValidDate(value: string) {
  return /^\d{2}\/\d{2}\/\d{4}$/.test(value);
}

export function validateNewPatientForm(data: NewPatientFormData) {
  const errors: NewPatientFormErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Informe o nome completo do paciente.";
  }

  if (!data.sex.trim()) {
    errors.sex = "Selecione o sexo do paciente.";
  }

  if (!data.admissionDate.trim()) {
    errors.admissionDate = "Informe a data de internação.";
  } else if (!isValidDate(data.admissionDate)) {
    errors.admissionDate = "Use o formato dd/mm/aaaa.";
  }

  if (!data.unit.trim()) {
    errors.unit = "Selecione a unidade do paciente.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
