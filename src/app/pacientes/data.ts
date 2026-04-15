import { apiGet } from "@/shared/lib/api";
import { NewPatientFormData, PatientListItem, PatientSelectOption, PatientUnitOption } from "./types";

interface ApiPatient {
  id: number;
  full_name: string;
  sex: string;
  bed: string;
  admission_date: string;
  unit: string;
}

interface ApiUnit {
  id: number;
  name: string;
  slug: string;
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? value : [];
}

function getFallbackUnits(): PatientUnitOption[] {
  return [
    { id: "all", label: "Todas as unidades", selected: true },
    { id: "internado", label: "Internado" },
    { id: "uti-adulto", label: "UTI Adulto" },
  ];
}

function formatPatientMetaLabel(sex: string) {
  if (sex === "male") return "Masculino";
  if (sex === "female") return "Feminino";
  if (sex === "other") return "Outro";
  return "Não informado";
}

export async function getPatientUnits(): Promise<PatientUnitOption[]> {
  const payload = await apiGet<ApiUnit[]>("/api/v1/units");
  const units = asArray<ApiUnit>(payload?.data);

  if (!payload || units.length === 0) {
    return getFallbackUnits();
  }

  return [
    { id: "all", label: "Todas as unidades", selected: true },
    ...units.map((unit) => ({ id: unit.slug, label: unit.name })),
  ];
}

export async function getPatients(): Promise<PatientListItem[]> {
  const payload = await apiGet<ApiPatient[]>("/api/v1/patients");
  const patients = asArray<ApiPatient>(payload?.data);

  if (!payload) {
    return [];
  }

  return patients.map((patient) => ({
    id: String(patient.id),
    name: patient.full_name,
    bed: patient.bed,
    ageLabel: formatPatientMetaLabel(patient.sex),
    admissionDate: patient.admission_date,
    unit: patient.unit,
  }));
}

export function getPatientSexOptions(): PatientSelectOption[] {
  return [
    { value: "", label: "Selecionar" },
    { value: "male", label: "Masculino" },
    { value: "female", label: "Feminino" },
    { value: "other", label: "Outro" },
  ];
}

export async function getPatientFormUnitOptions(): Promise<PatientSelectOption[]> {
  const payload = await apiGet<ApiUnit[]>("/api/v1/units");
  const units = asArray<ApiUnit>(payload?.data);

  if (!payload || units.length === 0) {
    return [{ value: "", label: "Selecionar" }];
  }

  return [
    { value: "", label: "Selecionar" },
    ...units.map((unit) => ({ value: unit.name, label: unit.name })),
  ];
}

export function getNewPatientInitialData(): NewPatientFormData {
  return {
    fullName: "",
    recordId: "",
    sex: "",
    bed: "",
    sector: "",
    admissionDate: "",
    unit: "",
    allergies: "",
    notes: "",
    isTrainingPatient: false,
  };
}
