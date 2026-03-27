export interface HandoffRecordItem {
  id: string;
  shiftLabel: string;
  unitLabel: string;
  date: string;
  summary: string;
  author: string;
}

export interface HandoffOption {
  value: string;
  label: string;
}

export interface NewHandoffNoteFormData {
  unit: string;
  shift: string;
  summary: string;
}

export type NewHandoffNoteErrors = Partial<Record<keyof NewHandoffNoteFormData, string>>;
