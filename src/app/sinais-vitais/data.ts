import { apiGet } from "@/shared/lib/api";
import { NewVitalRecordFormData, PatientOption, VitalRecordItem } from "./types";

interface ApiVitalRecord {
  id: string;
  patient_name: string;
  recorded_at: string;
  note: string;
  alerts: string[];
  temperature?: string | null;
  pain?: string | null;
  respiratory_rate?: string | null;
  spo2?: string | null;
}

interface ApiPatient {
  id: number;
  full_name: string;
}

export async function getVitalRecords(): Promise<VitalRecordItem[]> {
  const payload = await apiGet<ApiVitalRecord[]>("/api/v1/vital-signs");
  if (!payload) {
    return [];
  }

  return payload.data.map((record) => ({
    id: String(record.id),
    patientName: record.patient_name,
    recordedAt: record.recorded_at,
    note: record.note,
    alerts: record.alerts,
    temperature: record.temperature ?? undefined,
    pain: record.pain ?? undefined,
    respiratoryRate: record.respiratory_rate ?? undefined,
    spo2: record.spo2 ?? undefined,
  }));
}

export async function getVitalPatientOptions(): Promise<PatientOption[]> {
  const payload = await apiGet<ApiPatient[]>("/api/v1/patients", undefined, true);
  if (!payload) {
    return [{ value: "", label: "Selecionar" }];
  }

  return [
    { value: "", label: "Selecionar" },
    ...payload.data.map((patient) => ({ value: String(patient.id), label: patient.full_name })),
  ];
}

export function getNewVitalRecordInitialData(): NewVitalRecordFormData {
  return {
    patientId: "",
    temperature: "36.5",
    heartRate: "80",
    respiratoryRate: "18",
    spo2: "98",
    systolicPressure: "120",
    diastolicPressure: "80",
    glasgow: "15",
    glucose: "100",
    pain: "0",
    notes: "",
  };
}

