import { NewVitalRecordFormData, NewVitalRecordErrors } from "./types";

function isNumeric(value: string) {
  return /^\d+(?:[.,]\d+)?$/.test(value);
}

export function validateVitalRecordForm(data: NewVitalRecordFormData) {
  const errors: NewVitalRecordErrors = {};

  if (!data.patientId.trim()) errors.patientId = "Selecione o paciente.";
  if (!data.temperature.trim() || !isNumeric(data.temperature)) errors.temperature = "Informe a temperatura corretamente.";
  if (!data.heartRate.trim() || !isNumeric(data.heartRate)) errors.heartRate = "Informe a FC corretamente.";
  if (!data.respiratoryRate.trim() || !isNumeric(data.respiratoryRate)) errors.respiratoryRate = "Informe a FR corretamente.";
  if (!data.spo2.trim() || !isNumeric(data.spo2)) errors.spo2 = "Informe a SpO2 corretamente.";

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
