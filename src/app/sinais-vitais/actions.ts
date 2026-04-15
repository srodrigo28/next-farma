import { apiRequest } from "@/shared/lib/api";
import { ApiErrorResponse } from "@/shared/types/api";
import { validateVitalRecordForm } from "./schema";
import { NewVitalRecordErrors, NewVitalRecordFormData } from "./types";

const FIELD_MAP: Record<string, keyof NewVitalRecordErrors> = {
  patient_id: "patientId",
  temperature: "temperature",
  heart_rate: "heartRate",
  respiratory_rate: "respiratoryRate",
  spo2: "spo2",
  systolic_pressure: "systolicPressure",
  diastolic_pressure: "diastolicPressure",
  glasgow: "glasgow",
  glucose: "glucose",
  pain: "pain",
  notes: "notes",
};

function mapApiErrors(errors?: Record<string, string>): NewVitalRecordErrors {
  if (!errors) return {};

  const mapped: NewVitalRecordErrors = {};
  for (const [key, message] of Object.entries(errors)) {
    const mappedKey = FIELD_MAP[key];
    if (mappedKey) mapped[mappedKey] = message;
  }
  return mapped;
}

export async function submitVitalRecord(data: NewVitalRecordFormData) {
  const result = validateVitalRecordForm(data);

  if (!result.isValid) {
    return {
      ok: false,
      errors: result.errors,
      message: "Revise os campos obrigatórios antes de salvar.",
    };
  }

  const response = await apiRequest<unknown>("/api/v1/vital-signs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      patient_id: data.patientId,
      temperature: data.temperature,
      heart_rate: data.heartRate,
      respiratory_rate: data.respiratoryRate,
      spo2: data.spo2,
      systolic_pressure: data.systolicPressure,
      diastolic_pressure: data.diastolicPressure,
      glasgow: data.glasgow,
      glucose: data.glucose,
      pain: data.pain,
      notes: data.notes,
    }),
  });

  if (!response.ok) {
    const payload = response.payload as ApiErrorResponse | null;
    return {
      ok: false,
      errors: mapApiErrors(payload?.errors),
      message: payload?.message || "Não foi possível salvar os sinais vitais.",
    };
  }

  return {
    ok: true,
    errors: {},
    message: "Sinais vitais registrados com sucesso.",
  };
}
