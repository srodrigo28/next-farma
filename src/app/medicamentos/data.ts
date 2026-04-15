import { apiGet } from "@/shared/lib/api";
import {
  MedicationOption,
  MedicationScheduleItem,
  MedicationTab,
  PrescriptionFormData,
} from "./types";

interface ApiMedication {
  id: number;
  name: string;
  presentation: string;
  default_unit: string;
  default_route: string;
  is_high_alert: boolean;
  status: string;
}

interface ApiPatient {
  id: number;
  full_name: string;
}

interface ApiMedicationScheduleItem {
  id: string | number;
  patient_name: string;
  medication_name: string;
  dose_label: string;
  scheduled_for: string;
  priority?: string;
}

interface ApiMedicationSchedule {
  window: string;
  items: ApiMedicationScheduleItem[];
}

function getFallbackMedicationOptions(): MedicationOption[] {
  return [{ value: "", label: "Selecionar medicamento" }];
}

function getFallbackPatientOptions(): MedicationOption[] {
  return [{ value: "", label: "Selecionar paciente" }];
}

export function getMedicationTabs(): MedicationTab[] {
  return [
    { id: "next-2h", label: "Próx. 2h", selected: true },
    { id: "today", label: "Hoje" },
  ];
}

export async function getMedicationSchedules(): Promise<MedicationScheduleItem[]> {
  const payload = await apiGet<ApiMedicationSchedule>("/api/v1/medications/schedule?window=2h", undefined, true);
  if (!payload) {
    return [];
  }

  return payload.data.items.map((item) => ({
    id: String(item.id),
    patientName: item.patient_name,
    medicationName: item.medication_name,
    doseLabel: item.dose_label,
    scheduledFor: item.scheduled_for,
    priority: item.priority,
  }));
}

export async function getPrescriptionPatientOptions(): Promise<MedicationOption[]> {
  const payload = await apiGet<ApiPatient[]>("/api/v1/patients", undefined, true);
  if (!payload) {
    return getFallbackPatientOptions();
  }

  return [
    { value: "", label: "Selecionar paciente" },
    ...payload.data.map((patient) => ({ value: String(patient.id), label: patient.full_name })),
  ];
}

export async function getPrescriptionMedicationOptions(): Promise<MedicationOption[]> {
  const payload = await apiGet<ApiMedication[]>("/api/v1/medications");
  if (!payload) {
    return getFallbackMedicationOptions();
  }

  return [
    { value: "", label: "Selecionar medicamento" },
    ...payload.data.map((medication) => ({ value: String(medication.id), label: medication.name })),
  ];
}

export async function getMedicationCatalog(): Promise<MedicationOption[]> {
  const payload = await apiGet<ApiMedication[]>("/api/v1/medications");
  if (!payload) {
    return [];
  }

  return payload.data.map((medication) => ({
    value: String(medication.id),
    label: medication.name,
  }));
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


