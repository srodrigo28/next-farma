import { HandoffOption, HandoffRecordItem, NewHandoffNoteFormData } from "./types";

export function getHandoffRecords(): HandoffRecordItem[] {
  return [
    {
      id: "handoff-1",
      shiftLabel: "Manhã (07h-13h)",
      unitLabel: "UTI Adulto",
      date: "06/03/2026",
      summary: "teste",
      author: "nubio1976@gmail.com",
    },
  ];
}

export function getHandoffUnitOptions(): HandoffOption[] {
  return [
    { value: "pronto-socorro", label: "Pronto-Socorro" },
    { value: "maternidade", label: "Maternidade" },
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
