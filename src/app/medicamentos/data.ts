import {
  MedicationOption,
  MedicationScheduleItem,
  MedicationTab,
  PrescriptionFormData,
} from "./types";

export function getMedicationTabs(): MedicationTab[] {
  return [
    { id: "next-2h", label: "Próx. 2h", selected: true },
    { id: "today", label: "Hoje" },
  ];
}

export function getMedicationSchedules(): MedicationScheduleItem[] {
  return [];
}

export function getPrescriptionPatientOptions(): MedicationOption[] {
  return [
    { value: "", label: "Selecionar paciente" },
    { value: "maria", label: "Maria" },
    { value: "mario", label: "Mario" },
  ];
}

export function getPrescriptionMedicationOptions(): MedicationOption[] {
  return [
    { value: "", label: "Selecionar medicamento" },
    { value: "dipirona", label: "Dipirona" },
    { value: "paracetamol", label: "Paracetamol" },
    { value: "amoxicilina", label: "Amoxicilina" },
  ];
}

export function getDoseUnitOptions(): MedicationOption[] {
  return [
    { value: "mg", label: "mg" },
    { value: "ml", label: "mL" },
    { value: "g", label: "g" },
  ];
}

export function getRouteOptions(): MedicationOption[] {
  return [
    { value: "iv", label: "IV" },
    { value: "vo", label: "VO" },
    { value: "im", label: "IM" },
  ];
}

export function getFrequencyOptions(): MedicationOption[] {
  return [
    { value: "fixed", label: "Fixa" },
    { value: "if-needed", label: "Se necessário" },
  ];
}

export function getIntervalUnitOptions(): MedicationOption[] {
  return [
    { value: "hours", label: "Horas" },
    { value: "days", label: "Dias" },
  ];
}

export function getNewPrescriptionInitialData(): PrescriptionFormData {
  return {
    patientId: "",
    medicationId: "",
    dose: "",
    unit: "mg",
    route: "iv",
    frequency: "fixed",
    intervalValue: "8",
    intervalUnit: "hours",
    startAt: "20/03/2026, 10:24",
    notes: "",
  };
}
