import { apiGet } from "@/shared/lib/api";
import { AlertItem } from "./types";

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

function buildDelayLabel(priority?: string) {
  if (priority) {
    return priority;
  }

  return "Próxima administração";
}

function buildCategory(priority?: string) {
  if (priority) {
    return "Alta vigilância";
  }

  return "Medicações nas próximas 2h";
}

export async function getAlerts(): Promise<AlertItem[]> {
  const payload = await apiGet<ApiMedicationSchedule>("/api/v1/medications/schedule?window=2h");
  if (!payload) {
    return [];
  }

  return payload.data.items.map((item) => ({
    id: String(item.id),
    medicationName: item.medication_name,
    patientName: item.patient_name,
    doseLabel: item.dose_label,
    scheduleLabel: `Agendada ${item.scheduled_for}`,
    priority: item.priority,
    delayLabel: buildDelayLabel(item.priority),
    category: buildCategory(item.priority),
  }));
}
