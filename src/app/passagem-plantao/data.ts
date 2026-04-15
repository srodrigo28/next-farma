import { apiGet } from "@/shared/lib/api";
import { HandoffOption, HandoffRecordItem, NewHandoffNoteFormData } from "./types";

interface ApiHandoffRecord {
  id: number;
  unit: string;
  shift: string;
  summary: string;
  created_at: string;
  author_name: string;
  author_email: string;
}

function getShiftLabel(shift: string) {
  if (shift === "manha") return "Manhã (07h-13h)";
  if (shift === "tarde") return "Tarde (13h-19h)";
  if (shift === "noite") return "Noite (19h-07h)";
  return shift;
}

function getUnitLabel(unit: string) {
  if (unit === "uti-adulto") return "UTI Adulto";
  if (unit === "pronto-socorro") return "Pronto-Socorro";
  if (unit === "maternidade") return "aaternidade";
  return unit;
}

export async function getHandoffRecords(): Promise<HandoffRecordItem[]> {
  const payload = await apiGet<ApiHandoffRecord[]>("/api/v1/handoffs");
  if (!payload) {
    return [];
  }

  return payload.data.map((record) => ({
    id: String(record.id),
    shiftLabel: getShiftLabel(record.shift),
    unitLabel: getUnitLabel(record.unit),
    date: record.created_at,
    summary: record.summary,
    author: record.author_name || record.author_email,
  }));
}

export function getHandoffUnitOptions(): HandoffOption[] {
  return [
    { value: "pronto-socorro", label: "Pronto-Socorro" },
    { value: "maternidade", label: "aaternidade" },
    { value: "uti-adulto", label: "UTI Adulto" },
  ];
}

export function getHandoffShiftOptions(): HandoffOption[] {
  return [
    { value: "manha", label: "Manhã (07h-13h)" },
    { value: "tarde", label: "Tarde (13h-19h)" },
    { value: "noite", label: "Noite (19h-07h)" },
  ];
}

export function getNewHandoffInitialData(): NewHandoffNoteFormData {
  return {
    unit: "pronto-socorro",
    shift: "manha",
    summary: "",
  };
}
