import { NewPatientFormData, PatientListItem, PatientSelectOption, PatientUnitOption } from "./types";

export function getPatientUnits(): PatientUnitOption[] {
  return [
    { id: "all", label: "Todas as unidades", selected: true },
    { id: "maternidade", label: "Maternidade" },
    { id: "uti-adulto", label: "UTI Adulto" },
    { id: "clinica-medica", label: "Clínica Médica" },
  ];
}

export function getPatients(): PatientListItem[] {
  return [
    {
      id: "mario-silva",
      name: "Mario",
      bed: "20",
      ageLabel: "m",
      admissionDate: "02/02/26",
      unit: "Internado",
    },
  ];
}

export function getPatientSexOptions(): PatientSelectOption[] {
  return [
    { value: "", label: "Selecionar" },
    { value: "male", label: "Masculino" },
    { value: "female", label: "Feminino" },
    { value: "other", label: "Outro" },
  ];
}

export function getPatientFormUnitOptions(): PatientSelectOption[] {
  return [
    { value: "", label: "Selecionar" },
    { value: "maternidade", label: "Maternidade" },
    { value: "uti-adulto", label: "UTI Adulto" },
    { value: "clinica-medica", label: "Clínica Médica" },
    { value: "pronto-socorro", label: "Pronto-Socorro" },
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
