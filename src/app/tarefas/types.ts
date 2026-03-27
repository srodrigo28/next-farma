export type TaskTab = "pending" | "completed" | "all";

export interface TaskItem {
  id: string;
  title: string;
  category: string;
  patientName?: string;
  unit: string;
  dueAt: string;
  status: TaskTab;
  notes?: string;
}

export interface TaskFilterOption {
  id: TaskTab;
  label: string;
}

export interface TaskSelectOption {
  value: string;
  label: string;
}

export interface NewTaskFormData {
  title: string;
  category: string;
  patientId: string;
  unit: string;
  dueAt: string;
  notes: string;
}

export type NewTaskFormErrors = Partial<Record<keyof NewTaskFormData, string>>;
