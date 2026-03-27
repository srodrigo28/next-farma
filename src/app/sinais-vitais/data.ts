import { NewVitalRecordFormData, PatientOption, VitalRecordItem } from "./types";

export function getVitalRecords(): VitalRecordItem[] {
  return [
    {
      id: "maria-1",
      patientName: "Maria",
      recordedAt: "26/02/2026 21:03",
      note: "Ôioio",
      alerts: ["Temperatura alterada"],
      temperature: "40 °C",
      pain: "6/10",
    },
    {
      id: "maria-2",
      patientName: "Maria",
      recordedAt: "26/02/2026 21:02",
      note: "OK",
      alerts: [],
    },
    {
      id: "mario-1",
      patientName: "Mario",
      recordedAt: "26/02/2026 20:53",
      note: "",
      alerts: ["Temperatura alterada", "FR alterada"],
      temperature: "38,5 °C",
      respiratoryRate: "50 irpm",
      spo2: "93 %",
    },
  ];
}

export function getVitalPatientOptions(): PatientOption[] {
  return [
    { value: "", label: "Selecionar" },
    { value: "maria", label: "Maria" },
    { value: "mario", label: "Mario" },
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
