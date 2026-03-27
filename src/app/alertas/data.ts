import { AlertItem } from "./types";

export function getAlerts(): AlertItem[] {
  return [
    {
      id: "alert-1",
      medicationName: "Amoxicilina",
      patientName: "Mario",
      doseLabel: "0,07 mg",
      scheduleLabel: "Agendada 04:47",
      delayLabel: "20 dias atrás",
      category: "Medicações vencidas",
    },
    {
      id: "alert-2",
      medicationName: "Insulina Regular",
      patientName: "José",
      doseLabel: "10 UI",
      scheduleLabel: "Agendada 06:47",
      priority: "Alto risco",
      delayLabel: "20 dias atrás",
      category: "Medicações vencidas",
    },
    {
      id: "alert-3",
      medicationName: "Paracetamol",
      patientName: "José",
      doseLabel: "1 mg",
      scheduleLabel: "Agendada 06:56",
      delayLabel: "20 dias atrás",
      category: "Medicações vencidas",
    },
    {
      id: "alert-4",
      medicationName: "Amoxicilina",
      patientName: "Mario",
      doseLabel: "0,07 mg",
      scheduleLabel: "Agendada 12:47",
      delayLabel: "20 dias atrás",
      category: "Medicações vencidas",
    },
    {
      id: "alert-5",
      medicationName: "Insulina Regular",
      patientName: "José",
      doseLabel: "10 UI",
      scheduleLabel: "Agendada 14:47",
      priority: "Alto risco",
      delayLabel: "20 dias atrás",
      category: "Medicações vencidas",
    },
  ];
}
